"use client";

import * as React from "react";
import { toast } from "sonner";
import { ButtonLink } from "@/components/common/button-link";
import { Button } from "@/components/ui/button";
import { openDonateTab } from "@/features/donate/components/donate-tabs";
import type { DonateTab } from "@/features/donate/data/donate-content";

type ImpactActionProps = { label: string } & (
  | { href: string; tab?: never; share?: never }
  | { tab: DonateTab; href?: never; share?: never }
  | { share: true; href?: never; tab?: never }
);

/** CTA for an impact card: a link, a jump to a donate tab, or a native share. */
export function ImpactAction({ label, href, tab, share }: ImpactActionProps) {
  if (href) {
    return (
      <ButtonLink href={href} variant="primary">
        {label}
      </ButtonLink>
    );
  }

  const onClick = async () => {
    if (tab) {
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
