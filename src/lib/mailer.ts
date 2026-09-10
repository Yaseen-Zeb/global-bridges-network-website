import nodemailer from "nodemailer";

/**
 * Shared Nodemailer transporter.
 * Reads SMTP credentials from environment variables so they never touch the
 * client bundle and can be rotated without a redeploy.
 *
 * Required env vars (set in .env.local):
 *   SMTP_HOST    – e.g. smtp.gmail.com
 *   SMTP_PORT    – e.g. 587
 *   SMTP_SECURE  – "true" for port 465 SSL, "false" for 587 STARTTLS
 *   SMTP_USER    – your sending email address
 *   SMTP_PASS    – your SMTP password / app-password
 */
export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT ?? 587),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});
