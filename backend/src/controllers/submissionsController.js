import HttpError from "../utils/HttpError.js";
import {
  validateContact,
  validateNewsletter,
} from "../validators/submissions.js";
import {
  saveContactMessage,
  subscribeEmail,
} from "../services/submissionService.js";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import NewsletterSubscription from "../models/NewsletterSubscription.js";

export async function createContact(request, response, next) {
  const validationError = validateContact(request.body);
  if (validationError) return next(new HttpError(400, validationError));
  try {
    response.status(201).json(await saveContactMessage(request.body));
  } catch (error) {
    next(error);
  }
}
export async function createNewsletterSubscription(request, response, next) {
  const validationError = validateNewsletter(request.body);
  if (validationError) return next(new HttpError(400, validationError));
  try {
    const result = await subscribeEmail(request.body.email.trim().toLowerCase());
    response.status(201).json(result);
  } catch (error) {
    next(error);
  }
}

export async function unsubscribeNewsletter(request, response) {
  try {
    const token = request.query.token || request.body?.token;
    const claims = jwt.verify(token, env.jwtSecret);
    if (claims.purpose !== "newsletter-unsubscribe" || !claims.email)
      throw new Error("Invalid unsubscribe token.");
    await NewsletterSubscription.findOneAndUpdate(
      { email: claims.email, active: true },
      { $set: { active: false, unsubscribedAt: new Date() } },
    );
    response
      .status(200)
      .type("text/plain")
      .send("You have been unsubscribed from Morning Star insight updates.");
  } catch {
    response
      .status(400)
      .type("text/plain")
      .send("This unsubscribe link is invalid or has expired.");
  }
}
