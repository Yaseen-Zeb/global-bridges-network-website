/** Helpers for rendering contact details that come from Sanity. */

export const telHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, "")}`;

export const addressLines = (address?: string) =>
  (address ?? "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
