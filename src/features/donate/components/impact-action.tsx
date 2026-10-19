"use client";

import * as React from "react";
import { toast } from "sonner";
import { ButtonLink } from "@/components/common/button-link";
import { Button } from "@/components/ui/button";
import { openDonateTab } from "@/features/donate/components/donate-tabs";
import type { ImpactCard } from "@/lib/sanity/types";

/** CTA for an impact card: a link, a jump to a donate tab, or a native share. */
export function ImpactAction({ card }: { card: ImpactCard }) {
  const label = card.buttonLabel;
  const tab = card.buttonAction === "tab" ? card.buttonTab : undefined;
  // Volunteering moved out of the donate panel to its own page.
  const href = card.buttonAction === "link" ? card.buttonHref : tab === "volunteer" ? "/volunteer" : undefined;
  const share = card.buttonAction === "share";

  if (href) {
    return (
      <ButtonLink href={href} variant="primary">
        {label}
      </ButtonLink>
    );
  }

  const onClick = async () => {
    if (tab && tab !== "volunteer") {
      openDonateTab(tab);
      return;
    }
    if (!share) return;

    const data = {
      title: "Global Bridges Network",
      text: "Help refugees, immigrants, and vulnerable families build safe, self sufficient lives.",
      url: window.location.origin,
    };
    try {
      if (navigator.share) {
        await navigator.share(data);
      } else {
        await navigator.clipboard.writeText(data.url);
        toast.success("Link copied", { description: "Share it with your friends and networks." });
      }
    } catch {
      // The user closed the share sheet; nothing to do.
    }
  };

  return (
    <Button type="button" variant="primary" onClick={onClick}>
      {label}
    </Button>
  );
}
