import { Router } from "express";
import { rateLimit } from "express-rate-limit";
import {
  createNewsletterSubscription,
  unsubscribeNewsletter,
} from "../controllers/submissionsController.js";
const router = Router();
const subscribeLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 5,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { message: "Too many subscription attempts. Please try again later." },
});
router.post("/", subscribeLimiter, createNewsletterSubscription);
router.route("/unsubscribe").get(unsubscribeNewsletter).post(unsubscribeNewsletter);
export default router;
