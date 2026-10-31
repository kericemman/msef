export const env = {
  port: Number(process.env.PORT) || 5000,
  frontendOrigin: process.env.FRONTEND_ORIGIN || "http://localhost:5173",
  publicSiteUrl: process.env.PUBLIC_SITE_URL || process.env.FRONTEND_ORIGIN || "http://localhost:5173",
  publicApiUrl: process.env.PUBLIC_API_URL || `${process.env.FRONTEND_ORIGIN || "http://localhost:5173"}/api`,
  mongodbUri: process.env.MONGODB_URI || "",
  paystackSecretKey: process.env.PAYSTACK_SECRET_KEY || "",
  resendApiKey: process.env.RESEND_API_KEY || "",
  resendFromEmail: process.env.RESEND_FROM_EMAIL || "",
  contactRecipient: process.env.CONTACT_RECIPIENT || "",
  adminEmail: process.env.ADMIN_EMAIL || "",
  adminPasswordHash: process.env.ADMIN_PASSWORD_HASH || "",
  jwtSecret: process.env.JWT_SECRET || "",
  cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME || "",
  cloudinaryApiKey: process.env.CLOUDINARY_API_KEY || "",
  cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET || "",
  adminCookieSameSite: process.env.ADMIN_COOKIE_SAME_SITE || "strict",
  nodeEnv: process.env.NODE_ENV || "development",
  trustProxy: process.env.TRUST_PROXY === "1" ? 1 : false,
};

export function validateProductionConfiguration() {
  if (env.nodeEnv !== "production") return;

  const missing = [];
  for (const [name, value] of [
    ["MONGODB_URI", env.mongodbUri],
    ["PAYSTACK_SECRET_KEY", env.paystackSecretKey],
    ["RESEND_API_KEY", env.resendApiKey],
    ["RESEND_FROM_EMAIL", env.resendFromEmail],
    ["CONTACT_RECIPIENT", env.contactRecipient],
    ["ADMIN_EMAIL", env.adminEmail],
    ["ADMIN_PASSWORD_HASH", env.adminPasswordHash],
    ["CLOUDINARY_CLOUD_NAME", env.cloudinaryCloudName],
    ["CLOUDINARY_API_KEY", env.cloudinaryApiKey],
    ["CLOUDINARY_API_SECRET", env.cloudinaryApiSecret],
  ]) {
    if (!value) missing.push(name);
  }
  if (env.jwtSecret.length < 32) missing.push("JWT_SECRET (at least 32 characters)");
  if (env.frontendOrigin !== "https://morningstar-ef.org")
    missing.push("FRONTEND_ORIGIN=https://morningstar-ef.org");
  if (env.publicSiteUrl !== "https://morningstar-ef.org")
    missing.push("PUBLIC_SITE_URL=https://morningstar-ef.org");
  if (env.publicApiUrl !== "https://morningstar-ef.org/api")
    missing.push("PUBLIC_API_URL=https://morningstar-ef.org/api");
  if (env.trustProxy !== 1) missing.push("TRUST_PROXY=1 (Nginx reverse proxy)");
  if (env.adminCookieSameSite !== "strict")
    missing.push("ADMIN_COOKIE_SAME_SITE=strict");

  if (missing.length) {
    throw new Error(
      `Production environment is incomplete or unsafe: ${missing.join(", ")}`,
    );
  }
}
