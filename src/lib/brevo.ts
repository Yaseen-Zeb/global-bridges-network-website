/**
 * Minimal Brevo (formerly Sendinblue) client: server-only.
 *
 * Needs two env vars (never prefixed NEXT_PUBLIC_, so they stay on the server):
 *   BREVO_API_KEY  – Brevo → Settings → SMTP & API → API Keys
 *   BREVO_LIST_ID  – Brevo → Contacts → Lists → the list's ID number
 */

const BREVO_CONTACTS_URL = "https://api.brevo.com/v3/contacts";

export class BrevoConfigError extends Error {}

/**
 * Adds an email to the newsletter list. Safe to call twice for the same person:
 * `updateEnabled` makes Brevo update the existing contact instead of failing.
 */
export async function addNewsletterContact(email: string) {
  const apiKey = process.env.BREVO_API_KEY;
  const listId = Number(process.env.BREVO_LIST_ID);
  if (!apiKey || !Number.isInteger(listId) || listId <= 0) {
    throw new BrevoConfigError("BREVO_API_KEY or BREVO_LIST_ID is missing or invalid.");
  }

  const response = await fetch(BREVO_CONTACTS_URL, {
    method: "POST",
    headers: {
      "api-key": apiKey,
      "content-type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify({ email, listIds: [listId], updateEnabled: true }),
    // Don't let a slow third party hang the request.
    signal: AbortSignal.timeout(10_000),
  });

  // 201 = new contact created, 204 = existing contact updated (added to the list).
  if (response.status === 201 || response.status === 204) return;

  const details = await response.text().catch(() => "");
  throw new Error(`Brevo responded ${response.status}: ${details.slice(0, 300)}`);
}
