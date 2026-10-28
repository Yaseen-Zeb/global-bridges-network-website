/**
 * Cookie consent: the visitor's choice is stored in localStorage (no cookie of our
 * own), so nothing is tracked before they decide.
 */

export type ConsentChoice = "granted" | "denied";

const STORAGE_KEY = "gbn-cookie-consent";

/** Fired by the footer "Cookie settings" link to reopen the banner. */
export const OPEN_CONSENT_EVENT = "gbn:open-cookie-settings";

export function readConsent(): ConsentChoice | null {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    // Private mode or blocked storage: ask again each visit.
    return null;
  }
}

export function saveConsent(choice: ConsentChoice) {
  try {
    window.localStorage.setItem(STORAGE_KEY, choice);
  } catch {
    // Ignore: the choice still applies for this page view.
  }
}

/** Removes Google Analytics cookies (_ga, _ga_XXXX) after consent is withdrawn. */
export function clearAnalyticsCookies() {
  const host = window.location.hostname;
  const domains = ["", host, `.${host}`, `.${host.split(".").slice(-2).join(".")}`];
  for (const cookie of document.cookie.split(";")) {
    const name = cookie.split("=")[0]?.trim();
    if (!name || !name.startsWith("_ga")) continue;
    for (const domain of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/${domain ? `; domain=${domain}` : ""}`;
    }
  }
}
