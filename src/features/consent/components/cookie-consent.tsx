"use client";

import * as React from "react";
import Link from "next/link";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Cookie } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/common/typography";
import {
  OPEN_CONSENT_EVENT,
  clearAnalyticsCookies,
  readConsent,
  saveConsent,
  type ConsentChoice,
} from "@/features/consent/consent";

/**
 * Shows the cookie banner until the visitor chooses, and loads Google Analytics
 * only after they accept. Rendered once in the root layout.
 */
export function CookieConsent({ gaId }: { gaId?: string }) {
  // null until mounted: the stored choice only exists in the browser, so the server
  // renders nothing and there is no hydration mismatch.
  const [choice, setChoice] = React.useState<ConsentChoice | null>(null);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const stored = readConsent();
    setChoice(stored);
    setOpen(stored === null);

    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_CONSENT_EVENT, reopen);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, reopen);
  }, []);

  const decide = (next: ConsentChoice) => {
    saveConsent(next);
    setOpen(false);
    if (next === "denied" && choice === "granted") {
      // Analytics is already running in this tab: clear its cookies and reload without it.
      clearAnalyticsCookies();
      window.location.reload();
      return;
    }
    setChoice(next);
  };

  return (
    <>
      {gaId && choice === "granted" && <GoogleAnalytics gaId={gaId} />}

      {open && (
        <section
          role="dialog"
          aria-live="polite"
          aria-labelledby="cookie-consent-title"
          aria-describedby="cookie-consent-text"
          className="fixed inset-x-md bottom-md z-[60] mx-auto max-w-3xl animate-fade-up border border-border bg-background p-lg shadow-modal motion-safe-only sm:inset-x-lg"
        >
          <div className="flex flex-col gap-md md:flex-row md:items-center md:gap-lg">
            <Cookie className="hidden h-8 w-8 shrink-0 text-primary md:block" aria-hidden="true" />
            <div className="flex-1 space-y-xs">
              <Typography variant="body" as="h2" id="cookie-consent-title" className="font-semibold">
                We value your privacy
              </Typography>
              <Typography variant="body-sm" id="cookie-consent-text" className="text-muted-foreground">
                We use analytics cookies to understand how visitors use our website and improve it. They&apos;re only
                set if you accept. See our{" "}
                <Link href="/privacy-policy" className="font-medium text-primary underline underline-offset-2">
                  Privacy Policy
                </Link>
                .
              </Typography>
            </div>
            <div className="flex shrink-0 gap-sm">
              <Button type="button" variant="outline" onClick={() => decide("denied")} className="flex-1 md:flex-none">
                Decline
              </Button>
              <Button type="button" variant="primary" onClick={() => decide("granted")} className="flex-1 md:flex-none">
                Accept
              </Button>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

/** Footer link that reopens the banner so visitors can change their choice. */
export function CookieSettingsButton({ className }: { className?: string }) {
  return (
    <button type="button" onClick={() => window.dispatchEvent(new Event(OPEN_CONSENT_EVENT))} className={className}>
      Cookie settings
    </button>
  );
}
