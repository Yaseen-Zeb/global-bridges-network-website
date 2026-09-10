/**
 * Sanity GROQ Client
 *
 * Reads configuration from environment variables:
 *   NEXT_PUBLIC_SANITY_PROJECT_ID  – Your Sanity project ID
 *   NEXT_PUBLIC_SANITY_DATASET     – Dataset name (default: "production")
 *   SANITY_API_TOKEN               – Server-only read token (for draft previews)
 *
 * useCdn: true  → fast cached responses for published content (production)
 * useCdn: false → always fresh, required for draft/preview mode
 */

import { createClient } from "next-sanity";

export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "YOUR_PROJECT_ID";
export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
export const apiVersion = "2024-01-01";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === "production",
});

/**
 * Preview client — uses the server-side API token to fetch drafts.
 * Only import this in Server Components or API Routes, never in client code.
 */
export const previewClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  perspective: "previewDrafts",
});

/**
 * Returns the appropriate client based on whether preview mode is active.
 */
export function getClient(preview = false) {
  return preview ? previewClient : client;
}
