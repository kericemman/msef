import { env } from "../config/env.js";
import jwt from "jsonwebtoken";
import NewsletterSubscription from "../models/NewsletterSubscription.js";

async function deliverEmail({ to, subject, text, html, replyTo, headers }) {
  if (!env.resendApiKey || !env.resendFromEmail) return "not_configured";

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    signal: AbortSignal.timeout(15000),
    headers: {
      Authorization: `Bearer ${env.resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: env.resendFromEmail,
      to: [to],
      subject,
      text,
      html,
      ...(replyTo ? { reply_to: replyTo } : {}),
      ...(headers ? { headers } : {}),
    }),
  });

  if (!response.ok) {
    const result = await response.json().catch(() => ({}));
    throw new Error(
      result.message || `Resend returned status ${response.status}.`,
    );
  }
  return "sent";
}

export async function sendContactNotification(contactMessage) {
  return deliverEmail({
    to: env.contactRecipient,
    replyTo: contactMessage.email,
    subject: `Website enquiry: ${contactMessage.subject}`,
    text: [
        `Name: ${contactMessage.name}`,
        `Email: ${contactMessage.email}`,
        `Phone: ${contactMessage.phone || "Not provided"}`,
        `Topic: ${contactMessage.subject}`,
        "",
        contactMessage.message,
    ].join("\n"),
    html: `<p><strong>Name:</strong> ${escapeHtml(contactMessage.name)}</p><p><strong>Email:</strong> ${escapeHtml(contactMessage.email)}</p><p><strong>Phone:</strong> ${escapeHtml(contactMessage.phone || "Not provided")}</p><p><strong>Topic:</strong> ${escapeHtml(contactMessage.subject)}</p><p>${escapeHtml(contactMessage.message).replace(/\n/g, "<br>")}</p>`,
  });
}

export async function sendContactConfirmation(contactMessage) {
  return deliverEmail({
    to: contactMessage.email,
    replyTo: env.contactRecipient,
    subject: "We received your enquiry | Morning Star Empowerment Foundation",
    text: [
      `Hello ${contactMessage.name},`,
      "",
      "Thank you for contacting Morning Star Empowerment Foundation. We have received your enquiry and will follow up using the contact details you provided.",
      "",
      `Enquiry topic: ${contactMessage.subject}`,
      "",
      "If you did not send this enquiry, you can ignore this email.",
      "",
      "Morning Star Empowerment Foundation",
    ].join("\n"),
    html: `<main><p>Hello ${escapeHtml(contactMessage.name)},</p><p>Thank you for contacting Morning Star Empowerment Foundation. We have received your enquiry and will follow up using the contact details you provided.</p><p><strong>Enquiry topic:</strong> ${escapeHtml(contactMessage.subject)}</p><p>If you did not send this enquiry, you can ignore this email.</p><p>Morning Star Empowerment Foundation</p></main>`,
  });
}

function escapeHtml(value = "") {
  return String(value).replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[character];
  });
}

function createUnsubscribeUrl(email) {
  const token = jwt.sign(
    { email, purpose: "newsletter-unsubscribe" },
    env.jwtSecret,
    { expiresIn: "5y" },
  );
  return `${env.publicApiUrl.replace(/\/$/, "")}/newsletter/unsubscribe?token=${encodeURIComponent(token)}`;
}

async function sendInsightEmail(subscription, insight) {
  const articleUrl = `${env.publicSiteUrl.replace(/\/$/, "")}/insights/${encodeURIComponent(insight.slug)}`;
  const unsubscribeUrl = createUnsubscribeUrl(subscription.email);
  const title = escapeHtml(insight.title);
  const excerpt = escapeHtml(insight.excerpt);
  const category = insight.category ? escapeHtml(insight.category) : "Latest insight";

  return deliverEmail({
      to: subscription.email,
      subject: `New insight from Morning Star: ${insight.title}`,
      text: [
        category,
        "",
        insight.title,
        "",
        insight.excerpt,
        "",
        `Read the insight: ${articleUrl}`,
        "",
        `Unsubscribe from insight updates: ${unsubscribeUrl}`,
      ].join("\n"),
      html: `<main><p>${category}</p><h1>${title}</h1><p>${excerpt}</p><p><a href="${articleUrl}">Read the full insight</a></p><hr><p>You received this because you subscribed to Morning Star insight updates. <a href="${unsubscribeUrl}">Unsubscribe</a>.</p></main>`,
      headers: {
        "List-Unsubscribe": `<${unsubscribeUrl}>`,
        "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
      },
  });
}

export async function sendNewsletterConfirmation(email) {
  return deliverEmail({
    to: email,
    subject: "Your insight email subscription is confirmed | Morning Star",
    text: [
      "Your subscription is confirmed.",
      "",
      "We’ll email you when Morning Star Empowerment Foundation publishes a new insight.",
      "",
      "You can unsubscribe at any time using the link in an insight update email.",
      "",
      "Morning Star Empowerment Foundation",
    ].join("\n"),
    html: "<main><h1>Your subscription is confirmed</h1><p>We’ll email you when Morning Star Empowerment Foundation publishes a new insight.</p><p>You can unsubscribe at any time using the link in an insight update email.</p><p>Morning Star Empowerment Foundation</p></main>",
  });
}

export async function sendDonationReceipt(donation) {
  return deliverEmail({
    to: donation.email,
    subject: "Donation payment confirmed | Morning Star Empowerment Foundation",
    text: [
      `Hello ${donation.donorName},`,
      "",
      `Thank you. Your donation of KES ${donation.amount.toLocaleString("en-KE")} has been confirmed.`,
      `Payment reference: ${donation.reference}`,
      "",
      "Please keep this email as your payment confirmation.",
      "",
      "Morning Star Empowerment Foundation",
    ].join("\n"),
    html: `<main><h1>Donation confirmed</h1><p>Hello ${escapeHtml(donation.donorName)},</p><p>Thank you. Your donation of <strong>KES ${donation.amount.toLocaleString("en-KE")}</strong> has been confirmed.</p><p>Payment reference: <strong>${escapeHtml(donation.reference)}</strong></p><p>Please keep this email as your payment confirmation.</p><p>Morning Star Empowerment Foundation</p></main>`,
  });
}

export async function sendInsightUpdate(insight) {
  if (!env.resendApiKey || !env.resendFromEmail || !env.jwtSecret) {
    console.warn("Insight email updates are not configured; no subscriber emails were sent.");
    return;
  }

  const subscribers = await NewsletterSubscription.find({ active: true })
    .select("email")
    .lean();
  for (const subscriber of subscribers) {
    try {
      await sendInsightEmail(subscriber, insight);
    } catch (error) {
      console.error(`Could not send an insight update to ${subscriber.email}.`, error.message);
    }
  }
}
