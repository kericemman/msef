import { Router } from "express";
import { rateLimit } from "express-rate-limit";
import {
  getAdminSession,
  loginAdmin,
  logoutAdmin,
} from "../controllers/adminAuthController.js";
import {
  deleteMessage,
  deleteNewsletterSubscriber,
  getDashboardSummary,
  listDonations,
  listMessages,
  listNewsletterSubscribers,
  updateMessageStatus,
} from "../controllers/adminController.js";
import {
  createContent,
  deleteContent,
  listAdminContent,
  updateContent,
} from "../controllers/contentController.js";
import { createInsightUploadSignature } from "../controllers/cloudinaryController.js";
import requireAdmin, { requireSameOrigin } from "../middleware/requireAdmin.js";

const router = Router();
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 8,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { message: "Too many sign-in attempts. Please wait and try again." },
});

router.use(requireSameOrigin);
router.post("/auth/login", loginLimiter, loginAdmin);
router.get("/auth/session", requireAdmin, getAdminSession);
router.post("/auth/logout", requireAdmin, logoutAdmin);

router.use(requireAdmin);
router.get("/dashboard", getDashboardSummary);
router.post("/cloudinary/insight-signature", createInsightUploadSignature);
router.get("/messages", listMessages);
router.patch("/messages/:id/status", updateMessageStatus);
router.delete("/messages/:id", deleteMessage);
router.get("/newsletter/subscribers", listNewsletterSubscribers);
router.delete("/newsletter/subscribers/:id", deleteNewsletterSubscriber);
router.get("/donations", listDonations);
router.get("/content/:type", listAdminContent);
router.post("/content/:type", createContent);
router.put("/content/:type/:id", updateContent);
router.delete("/content/:type/:id", deleteContent);

export default router;
