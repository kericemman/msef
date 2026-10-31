import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import HttpError from "../utils/HttpError.js";

const cookieName = "msef_admin_session";

function readCookie(request, name) {
  const cookies = request.headers.cookie?.split(";") || [];
  const pair = cookies
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith(`${name}=`));
  return pair ? pair.slice(name.length + 1) : "";
}

export default function requireAdmin(request, _response, next) {
  if (!env.jwtSecret)
    return next(new HttpError(503, "Admin authentication is not configured."));
  const token = readCookie(request, cookieName);
  if (!token) return next(new HttpError(401, "Admin sign-in required."));

  try {
    const claims = jwt.verify(token, env.jwtSecret, {
      algorithms: ["HS256"],
      issuer: "msef-api",
      audience: "msef-admin",
    });
    if (
      claims.sub !== "admin" ||
      claims.email !== env.adminEmail.trim().toLowerCase()
    )
      throw new Error("Invalid admin session.");
    request.admin = { email: claims.email };
    next();
  } catch {
    next(
      new HttpError(
        401,
        "Your admin session has expired. Please sign in again.",
      ),
    );
  }
}

export function requireSameOrigin(request, _response, next) {
  if (
    ["POST", "PUT", "PATCH", "DELETE"].includes(request.method) &&
    request.headers.origin !== env.frontendOrigin
  ) {
    return next(new HttpError(403, "This request origin is not allowed."));
  }
  next();
}

export function sessionCookieOptions() {
  return {
    httpOnly: true,
    secure: env.nodeEnv === "production",
    sameSite: env.adminCookieSameSite,
    path: "/api/admin",
    maxAge: 8 * 60 * 60 * 1000,
  };
}

export { cookieName };
