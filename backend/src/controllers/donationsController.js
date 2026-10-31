import { createHmac, timingSafeEqual } from "node:crypto";
import { env } from "../config/env.js";
import HttpError from "../utils/HttpError.js";
import Donation from "../models/Donation.js";
import {
  initializeDonation,
  verifyDonation,
} from "../services/paystackService.js";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function createDonation(request, response, next) {
  const { donorName, email, phone = "", amount } = request.body || {};
  if (
    typeof donorName !== "string" ||
    donorName.trim().length < 2 ||
    donorName.trim().length > 120
  ) {
    return next(new HttpError(400, "Enter your name."));
  }
  if (
    typeof email !== "string" ||
    email.length > 254 ||
    !emailPattern.test(email.trim())
  ) {
    return next(new HttpError(400, "Enter a valid email address."));
  }
  if (!Number.isSafeInteger(amount) || amount < 3 || amount > 100000000) {
    return next(new HttpError(400, "Enter a valid donation amount in KES."));
  }
  if (typeof phone !== "string" || phone.length > 30)
    return next(new HttpError(400, "Enter a valid phone number."));

  try {
    const result = await initializeDonation({
      donorName: donorName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      amount,
    });
    response.status(201).json(result);
  } catch (error) {
    next(error);
  }
}

export async function checkDonation(request, response, next) {
  const reference = request.query.reference;
  if (
    typeof reference !== "string" ||
    !/^msef-[0-9a-f-]{36}$/i.test(reference)
  ) {
    return next(new HttpError(400, "A valid payment reference is required."));
  }
  try {
    response.json(await verifyDonation(reference));
  } catch (error) {
    next(error);
  }
}

export async function handlePaystackWebhook(request, response, next) {
  const signature = request.get("x-paystack-signature") || "";
  if (!env.paystackSecretKey || !request.rawBody || !/^[a-f0-9]{128}$/i.test(signature)) {
    return response.sendStatus(401);
  }

  const expectedSignature = createHmac("sha512", env.paystackSecretKey)
    .update(request.rawBody)
    .digest();
  const receivedSignature = Buffer.from(signature, "hex");
  if (
    receivedSignature.length !== expectedSignature.length ||
    !timingSafeEqual(receivedSignature, expectedSignature)
  ) {
    return response.sendStatus(401);
  }

  if (request.body?.event !== "charge.success") return response.sendStatus(200);
  const reference = request.body?.data?.reference;
  if (typeof reference !== "string" || !/^msef-[0-9a-f-]{36}$/i.test(reference)) {
    return response.sendStatus(200);
  }

  try {
    const donationExists = await Donation.exists({ reference });
    if (!donationExists) return response.sendStatus(200);
    const verification = await verifyDonation(reference);
    if (verification.status === "pending") return response.sendStatus(503);
    response.sendStatus(200);
  } catch (error) {
    next(error);
  }
}
