import ContactMessage from "../models/ContactMessage.js";
import HttpError from "../utils/HttpError.js";
import {
  sendContactConfirmation,
  sendContactNotification,
  sendNewsletterConfirmation,
} from "../integrations/resend.js";
import NewsletterSubscription from "../models/NewsletterSubscription.js";
import { env } from "../config/env.js";

export async function saveContactMessage(data) {
  if (!env.mongodbUri || !ContactMessage.db.readyState) {
    throw new HttpError(
      503,
      "The contact form is temporarily unavailable. Please email starmorning2010@gmail.com.",
    );
  }

  const message = await ContactMessage.create({
    name: data.name.trim(),
    email: data.email.trim().toLowerCase(),
    phone: data.phone?.trim() || "",
    subject: data.subject.trim(),
    message: data.message.trim(),
    consentAt: new Date(),
    notificationStatus: "pending",
    senderConfirmationStatus: "pending",
  });

  try {
    message.notificationStatus = await sendContactNotification(message);
  } catch (error) {
    message.notificationStatus = "failed";
    console.error(
      "Resend contact notification could not be delivered.",
      error.message,
    );
  }

  try {
    message.senderConfirmationStatus = await sendContactConfirmation(message);
  } catch (error) {
    message.senderConfirmationStatus = "failed";
    console.error("Resend enquiry confirmation could not be delivered.", error.message);
  }
  await message.save();

  return {
    confirmationEmailSent: message.senderConfirmationStatus === "sent",
    message: message.senderConfirmationStatus === "sent"
      ? `Your enquiry was received. A confirmation email has been sent to ${message.email}.`
      : `Your enquiry was received, but we could not send a confirmation email to ${message.email}. Please check the address or contact Morning Star directly.`,
  };
}
export async function subscribeEmail(email) {
  if (!env.mongodbUri || !NewsletterSubscription.db.readyState) {
    throw new HttpError(503, "Email subscriptions are temporarily unavailable. Please try again later.");
  }

  const now = new Date();
  const existing = await NewsletterSubscription.findOne({ email }).lean();
  const canSendConfirmation =
    !existing?.active ||
    !existing?.confirmationSentAt ||
    now.getTime() - new Date(existing.confirmationSentAt).getTime() > 15 * 60 * 1000;
  const subscription = await NewsletterSubscription.findOneAndUpdate(
    { email },
    {
      $set: { active: true, consentAt: now },
      $unset: { unsubscribedAt: 1 },
      $setOnInsert: { email, subscribedAt: now },
    },
    { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true },
  );

  let confirmationEmailSent = Boolean(subscription.confirmationSentAt);
  if (canSendConfirmation) {
    try {
      const deliveryStatus = await sendNewsletterConfirmation(email);
      subscription.confirmationEmailStatus = deliveryStatus;
      confirmationEmailSent = deliveryStatus === "sent";
      if (confirmationEmailSent) subscription.confirmationSentAt = now;
    } catch (error) {
      subscription.confirmationEmailStatus = "failed";
      confirmationEmailSent = false;
      console.error("Resend subscription confirmation could not be delivered.", error.message);
    }
    await subscription.save();
  }

  return {
    confirmationEmailSent,
    message: confirmationEmailSent
      ? `Your subscription is confirmed. We sent a confirmation email to ${email}.`
      : "Your subscription is active, but we could not send a confirmation email. Please check the address or contact Morning Star.",
  };
}
