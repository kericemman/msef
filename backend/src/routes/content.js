import { Router } from "express";
import {
  getPublishedInsight,
  listPublishedContent,
} from "../controllers/contentController.js";

const router = Router();
router.get("/insights/:slug", getPublishedInsight);
router.get("/:type", listPublishedContent);
export default router;
