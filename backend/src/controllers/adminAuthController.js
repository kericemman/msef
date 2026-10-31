import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import HttpError from "../utils/HttpError.js";
import {
  cookieName,
  sessionCookieOptions,
} from "../middleware/requireAdmin.js";

function ensureConfigured() {
  if (!env.adminEmail || !env.adminPasswordHash || env.jwtSecret.length < 32) {
    throw new HttpError(
      503,
      "Admin sign-in is not configured. Set ADMIN_EMAIL, ADMIN_PASSWORD_HASH, and JWT_SECRET on the server.",
    );
  }
}

export async function loginAdmin(request, response, next) {
  try {
    ensureConfigured();
    const email =
      typeof request.body?.email === "string"
        ? request.body.email.trim().toLowerCase()
        : "";
    const password =
      typeof request.body?.password === "string" ? request.body.password : "";
    const matchesEmail = email === env.adminEmail.trim().toLowerCase();
    const matchesPassword =
      password.length <= 200 &&
      (await bcrypt.compare(password, env.adminPasswordHash));
    if (!matchesEmail || !matchesPassword)
      throw new HttpError(401, "Email or password is incorrect.");

    const token = jwt.sign({ email }, env.jwtSecret, {
      algorithm: "HS256",
      subject: "admin",
      issuer: "msef-api",
      audience: "msef-admin",
      expiresIn: "8h",
    });
    response.cookie(cookieName, token, sessionCookieOptions());
    response.json({ user: { email } });
  } catch (error) {
    next(error);
  }
}

export function getAdminSession(request, response) {
  response.json({ user: request.admin });
}

export function logoutAdmin(_request, response) {
  response.clearCookie(cookieName, sessionCookieOptions());
  response.status(204).end();
}
