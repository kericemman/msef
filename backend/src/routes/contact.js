import { Router } from "express";
import { rateLimit } from "express-rate-limit";
import { createContact } from "../controllers/submissionsController.js";
const router = Router();
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 8,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { message: "Too many enquiries were sent. Please try again later." },
});
router.post("/", contactLimiter, createContact);
export default router;
