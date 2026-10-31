import { createHash } from "node:crypto";
import { env } from "../config/env.js";
import HttpError from "../utils/HttpError.js";

export function createInsightUploadSignature(request, response, next) {
  if (
    !env.cloudinaryCloudName ||
    !env.cloudinaryApiKey ||
    !env.cloudinaryApiSecret
  ) {
    return next(
      new HttpError(
        503,
        "Cloudinary uploads are not configured on the server.",
      ),
    );
  }

  const folder = request.body?.folder || "msef/site/insights";
  const resourceType = request.body?.resourceType || "image";
  if (
    !["msef/site/insights", "msef/site/testimonials"].includes(folder) ||
    !["image", "video"].includes(resourceType) ||
    (resourceType === "video" && folder !== "msef/site/testimonials")
  ) {
    return next(new HttpError(400, "Choose a valid Cloudinary upload type and folder."));
  }
  const timestamp = Math.floor(Date.now() / 1000);
  const signature = createHash("sha1")
    .update(`folder=${folder}&timestamp=${timestamp}${env.cloudinaryApiSecret}`)
    .digest("hex");

  response.json({
    cloudName: env.cloudinaryCloudName,
    apiKey: env.cloudinaryApiKey,
    timestamp,
    folder,
    resourceType,
    signature,
  });
}
