/**
 * Branded HTML for the notification emails sent by the form API routes.
 *
 * Email clients ignore <style> blocks and CSS variables, so the design tokens
 * (globals.css / Typography System) are repeated here as inline hex values.
 * Every value that came from a visitor is HTML-escaped before it's inserted.
 */

const BRAND = {
  blue: "#208BC1",
  green: "#76B467",
  yellow: "#F9C148",
  ink: "#111111",
  muted: "#616161",
  border: "#E0E0E0",
  surface: "#F2F2F2",
  white: "#FFFFFF",
  heading: "Montserrat, 'Segoe UI', Arial, sans-serif",
  body: "'IBM Plex Sans', 'Segoe UI', Arial, sans-serif",
};

export const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

export interface EmailRow {
  label: string;
  value?: string | null;
  /** Renders the value as a mailto link. */
  email?: boolean;
  /** Renders the value as a pill in this colour. */
  badge?: "blue" | "green";
}

export interface EmailBlock {
  label: string;
  text?: string | null;
  accent?: "blue" | "green" | "muted";
}

export interface EmailSection {
  heading?: string;
  rows?: EmailRow[];
  blocks?: EmailBlock[];
}

interface BrandedEmail {
  /** Small yellow label above the title, e.g. "Website Contact Form". */
  overline: string;
  title: string;
  /** One-line summary under the title. */
  intro?: string;
  sections: EmailSection[];
  /** Shown as a button so staff can reply in one click. */
  replyTo?: { name: string; email: string };
}

const row = ({ label, value, email, badge }: EmailRow) => {
  const text = value ? escapeHtml(value) : "Not provided";
  let cell = value ? text : `<span style="color:${BRAND.muted};">${text}</span>`;
  if (value && email) {
    cell = `<a href="mailto:${text}" style="color:${BRAND.blue};text-decoration:none;font-weight:600;">${text}</a>`;
  } else if (value && badge) {
    const colour = badge === "green" ? BRAND.green : BRAND.blue;
    cell = `<span style="display:inline-block;background:${colour};color:${BRAND.white};padding:3px 10px;font-size:12px;line-height:18px;font-weight:600;">${text}</span>`;
  }
  return `
          <tr>
            <td style="padding:10px 0;border-bottom:1px solid ${BRAND.border};width:150px;vertical-align:top;font-size:12px;line-height:18px;color:${BRAND.muted};text-transform:uppercase;letter-spacing:.06em;">${escapeHtml(label)}</td>
            <td style="padding:10px 0;border-bottom:1px solid ${BRAND.border};vertical-align:top;font-size:14px;line-height:22px;color:${BRAND.ink};">${cell}</td>
          </tr>`;
};

const block = ({ label, text, accent = "blue" }: EmailBlock) => {
  if (!text) return "";
  const colour = accent === "green" ? BRAND.green : accent === "muted" ? BRAND.border : BRAND.blue;
  return `
        <p style="margin:20px 0 8px;font-size:12px;line-height:16px;color:${BRAND.muted};text-transform:uppercase;letter-spacing:.06em;font-weight:600;">${escapeHtml(label)}</p>
        <div style="background:${BRAND.surface};border-left:4px solid ${colour};padding:14px 16px;font-size:14px;line-height:22px;color:${BRAND.ink};white-space:pre-wrap;">${escapeHtml(text)}</div>`;
};

const section = ({ heading, rows = [], blocks = [] }: EmailSection, index: number) => `
        ${
          heading
            ? `<h2 style="margin:${index === 0 ? 0 : 28}px 0 4px;font-family:${BRAND.heading};font-size:16px;line-height:24px;font-weight:600;color:${BRAND.ink};">${escapeHtml(heading)}</h2>`
            : ""
        }
        ${rows.length ? `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">${rows.map(row).join("")}</table>` : ""}
        ${blocks.map(block).join("")}`;

export function renderBrandedEmail({ overline, title, intro, sections, replyTo }: BrandedEmail) {
  const submitted = new Date().toLocaleString("en-US", { dateStyle: "long", timeStyle: "short", timeZone: "America/New_York" });

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(title)}</title>
</head>
<body style="margin:0;padding:0;background:${BRAND.surface};font-family:${BRAND.body};color:${BRAND.ink};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BRAND.surface};">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:${BRAND.white};">
          <tr>
            <td style="height:4px;background:${BRAND.green};font-size:0;line-height:0;">&nbsp;</td>
          </tr>
          <tr>
            <td style="background:${BRAND.blue};padding:28px 32px;">
              <p style="margin:0 0 6px;font-size:12px;line-height:16px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:${BRAND.yellow};">${escapeHtml(overline)}</p>
              <h1 style="margin:0;font-family:${BRAND.heading};font-size:24px;line-height:30px;font-weight:700;color:${BRAND.white};">${escapeHtml(title)}</h1>
              ${intro ? `<p style="margin:8px 0 0;font-size:14px;line-height:22px;color:${BRAND.white};opacity:.9;">${escapeHtml(intro)}</p>` : ""}
            </td>
          </tr>
          <tr>
            <td style="padding:28px 32px 8px;">
              ${sections.map(section).join("")}
            </td>
          </tr>
          ${
            replyTo
              ? `<tr>
            <td style="padding:20px 32px 8px;">
              <a href="mailto:${escapeHtml(replyTo.email)}" style="display:inline-block;background:${BRAND.blue};color:${BRAND.white};font-size:16px;line-height:24px;font-weight:600;text-decoration:none;padding:10px 24px;">Reply to ${escapeHtml(replyTo.name)}</a>
            </td>
          </tr>`
              : ""
          }
          <tr>
            <td style="padding:20px 32px 28px;">
              <p style="margin:0;font-size:12px;line-height:18px;color:${BRAND.muted};">Submitted ${escapeHtml(submitted)} (Eastern Time) via the Global Bridges Network website.</p>
            </td>
          </tr>
        </table>
        <p style="margin:16px 0 0;font-family:${BRAND.heading};font-size:13px;line-height:18px;font-weight:600;color:${BRAND.blue};">Global Bridges Network</p>
        <p style="margin:2px 0 0;font-size:12px;line-height:18px;color:${BRAND.muted};">Connecting people, resources, and opportunities.</p>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
