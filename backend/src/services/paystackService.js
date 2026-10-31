import { randomUUID } from "node:crypto";
import { env } from "../config/env.js";
import Donation from "../models/Donation.js";
import HttpError from "../utils/HttpError.js";
import { sendDonationReceipt } from "../integrations/resend.js";

async function sendReceiptIfNeeded(donation) {
  if (donation.receiptEmailSentAt) return true;

  try {
    const status = await sendDonationReceipt(donation);
    if (status !== "sent") return false;
    donation.receiptEmailSentAt = new Date();
    await donation.save();
    return true;
  } catch (error) {
    console.error("Resend donation receipt could not be delivered.", error.message);
    return false;
  }
}

async function paystackRequest(path, options = {}) {
  if (!env.paystackSecretKey)
    throw new HttpError(503, "Online donations are not configured yet.");
  const response = await fetch(`https://api.paystack.co${path}`, {
    ...options,
    signal: AbortSignal.timeout(15000),
    headers: {
      Authorization: `Bearer ${env.paystackSecretKey}`,
      "Content-Type": "application/json",
      ...options.headers,
    },
  });
  const result = await response.json();
  if (!response.ok || !result.status) {
    throw new HttpError(
      502,
      "We could not start the payment. Please try again.",
    );
  }
  return result.data;
}

export async function initializeDonation({ donorName, email, phone, amount }) {
  if (!env.mongodbUri || !Donation.db.readyState) {
    throw new HttpError(
      503,
      "Donations are temporarily unavailable. Please try again later.",
    );
  }
  const reference = `msef-${randomUUID()}`;
  const donation = await Donation.create({
    reference,
    donorName,
    email,
    phone,
    amount,
    currency: "KES",
    status: "pending",
  });
  const data = await paystackRequest("/transaction/initialize", {
    method: "POST",
    body: JSON.stringify({
      email,
      amount: String(amount * 100),
      currency: "KES",
      reference,
      callback_url: `${env.publicSiteUrl.replace(/\/$/, "")}/callback`,
      metadata: {
        donor_name: donorName,
        phone: phone || "",
        purpose: "Donation to Morning Star Empowerment Foundation",
      },
    }),
  });
  if (!data.authorization_url) {
    donation.paystackStatus = "initialization_incomplete";
    await donation.save();
    throw new HttpError(502, "We could not start the payment. Please try again.");
  }
  return { authorizationUrl: data.authorization_url, reference };
}

export async function verifyDonation(reference) {
  if (!env.mongodbUri || !Donation.db.readyState) {
    throw new HttpError(
      503,
      "Donation verification is temporarily unavailable.",
    );
  }
  const donation = await Donation.findOne({ reference });
  if (!donation)
    throw new HttpError(
      404,
      "We could not find this donation. Please contact the Foundation if you were charged.",
    );
  if (donation.status === "success")
    return {
      status: "success",
      amount: donation.amount,
      currency: donation.currency,
      receiptEmailSent: await sendReceiptIfNeeded(donation),
    };

  const transaction = await paystackRequest(
    `/transaction/verify/${encodeURIComponent(reference)}`,
  );
  const expectedSubunitAmount = donation.amount * 100;
  const matched =
    transaction.reference === reference &&
    transaction.amount === expectedSubunitAmount &&
    transaction.currency === donation.currency;
  const succeeded = transaction.status === "success" && matched;
  const stillProcessing = ["pending", "ongoing", "processing", "queued"].includes(
    String(transaction.status || "").toLowerCase(),
  );
  donation.status = succeeded ? "success" : stillProcessing ? "pending" : "failed";
  donation.paystackStatus = transaction.status || "unknown";
  await donation.save();

  const receiptEmailSent = succeeded
    ? await sendReceiptIfNeeded(donation)
    : false;

  return {
    status: succeeded ? "success" : stillProcessing ? "pending" : "failed",
    amount: donation.amount,
    currency: donation.currency,
    receiptEmailSent,
  };
}
