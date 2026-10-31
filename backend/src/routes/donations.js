import { Router } from "express";
import { rateLimit } from "express-rate-limit";
import {
  checkDonation,
  createDonation,
  handlePaystackWebhook,
} from "../controllers/donationsController.js";

const router = Router();
const initializeLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { message: "Too many donation attempts. Please wait and try again." },
});
const verifyLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 30,
  standardHeaders: "draft-8",
  legacyHeaders: false,
});
router.post("/initialize", initializeLimiter, createDonation);
router.get("/verify", verifyLimiter, checkDonation);
router.post("/webhook", handlePaystackWebhook);
export default router;
