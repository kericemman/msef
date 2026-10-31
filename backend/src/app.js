import cors from "cors";
import express from "express";
import helmet from "helmet";
import { rateLimit } from "express-rate-limit";
import { env } from "./config/env.js";
import errorHandler from "./middleware/errorHandler.js";
import notFound from "./middleware/notFound.js";
import contactRoutes from "./routes/contact.js";
import healthRoutes from "./routes/health.js";
import newsletterRoutes from "./routes/newsletter.js";
import donationRoutes from "./routes/donations.js";
import adminRoutes from "./routes/admin.js";
import contentRoutes from "./routes/content.js";

const app = express();
app.disable("x-powered-by");
if (env.trustProxy) app.set("trust proxy", env.trustProxy);
app.use(helmet());
app.use(cors({ origin: env.frontendOrigin, credentials: true }));
app.use(
  express.json({
    limit: "100kb",
    verify: (request, _response, buffer) => {
      request.rawBody = Buffer.from(buffer);
    },
  }),
);
app.use(express.urlencoded({ extended: false, limit: "10kb" }));
app.use(
  "/api",
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 300,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    message: { message: "Too many requests. Please try again shortly." },
  }),
);
app.use("/api/health", healthRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/newsletter", newsletterRoutes);
app.use("/api/donations", donationRoutes);
app.use("/api/content", contentRoutes);
app.use("/api/admin", adminRoutes);
app.use(notFound);
app.use(errorHandler);
export default app;
