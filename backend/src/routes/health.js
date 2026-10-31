import { Router } from "express";
import mongoose from "mongoose";
const router = Router();
router.get("/", (_request, response) =>
  response.json({ status: "ok", service: "msef-api" }),
);
router.get("/ready", (_request, response) => {
  const databaseReady = mongoose.connection.readyState === 1;
  response.status(databaseReady ? 200 : 503).json({
    status: databaseReady ? "ready" : "not_ready",
    database: databaseReady ? "connected" : "disconnected",
  });
});
export default router;
