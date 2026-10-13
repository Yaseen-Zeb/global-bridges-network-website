"use client";

import * as React from "react";
import { Typography } from "@/components/common/typography";
import { DonationWidget } from "@/features/donate/components/donation-widget";
import { GoodsForm } from "@/features/donate/components/goods-form";
import { DONATE_TABS, VOLUNTEER_TAB, isDonateTab, type DonateTab } from "@/features/donate/data/donate-content";
import { cn } from "@/lib/utils";

export const SELECT_TAB_EVENT = "donate:select-tab";

/** Switch the donate panel to a tab and scroll it into view. */
export function openDonateTab(tab: DonateTab) {
  window.dispatchEvent(new CustomEvent(SELECT_TAB_EVENT, { detail: tab }));
  document.getElementById("donate")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

interface DonateTabsProps {
  initialTab: DonateTab;
  zeffyUrl: string | null;
}

export function DonateTabs({ initialTab, zeffyUrl }: DonateTabsProps) {
  const [active, setActive] = React.useState<DonateTab>(initialTab);
  const tabRefs = React.useRef<Record<DonateTab, HTMLButtonElement | null>>({ goods: null, money: null, volunteer: null });

  const select = React.useCallback((tab: DonateTab) => {
    setActive(tab);
    const url = new URL(window.location.href);
    url.searchParams.set("tab", tab);
    window.history.replaceState(null, "", url);
  }, []);

  // In-page buttons (e.g. "Inquire About Volunteering") switch tabs via this event.
  React.useEffect(() => {
    const onSelect = (e: Event) => {
      const tab = (e as CustomEvent<unknown>).detail;
      if (isDonateTab(tab)) select(tab);
    };
    window.addEventListener(SELECT_TAB_EVENT, onSelect);
    return () => window.removeEventListener(SELECT_TAB_EVENT, onSelect);
  }, [select]);

  const onKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const next = DONATE_TABS[(index + (e.key === "ArrowRight" ? 1 : DONATE_TABS.length - 1)) % DONATE_TABS.length].id;
    select(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <div className="bg-background p-md shadow-modal sm:p-lg">
      <div role="tablist" aria-label="Ways to give" className="mb-lg grid grid-cols-3 border border-border">
        {DONATE_TABS.map((tab, index) => {
          const selected = tab.id === active;
          return (
            <button
              key={tab.id}
              ref={(el) => {
                tabRefs.current[tab.id] = el;
              }}
              id={`donate-tab-${tab.id}`}
              role="tab"
              type="button"
              aria-selected={selected}
              aria-controls={`donate-panel-${tab.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => select(tab.id)}
              onKeyDown={(e) => onKeyDown(e, index)}
              className={cn(
                "px-xs py-sm text-xs font-medium transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring sm:text-sm",
                index > 0 && "border-l border-border",
                selected ? "bg-accent text-accent-foreground" : "text-foreground hover:bg-muted"
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div
        key={active}
        id={`donate-panel-${active}`}
        role="tabpanel"
        aria-labelledby={`donate-tab-${active}`}
        className="animate-fade-up motion-safe-only"
      >
        {active === "goods" && <GoodsForm />}

        {active === "money" &&
          (zeffyUrl ? (
            <DonationWidget zeffyUrl={zeffyUrl} className="rounded-none border-0 shadow-none" />
          ) : (
            <div className="space-y-sm py-lg text-center">
              <Typography variant="h4-semibold">Online giving is coming soon</Typography>
              <Typography variant="body-sm" className="text-muted-foreground">
                Our secure donation form is being set up. In the meantime, please reach out through our contact page.
              </Typography>
            </div>
          ))}

        {active === "volunteer" && (
          <div className="space-y-md pb-3xl">
            <div className="space-y-xs">
              <Typography variant="overline" as="p">
                {VOLUNTEER_TAB.eyebrow}
              </Typography>
              <Typography variant="h3">
                {VOLUNTEER_TAB.title.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </Typography>
            </div>
            <Typography variant="body-sm" className="text-muted-foreground">
              {VOLUNTEER_TAB.description}
            </Typography>
            <div className="space-y-xs">
              <Typography variant="body-sm" className="font-semibold">
                {VOLUNTEER_TAB.prompt}
              </Typography>
              <Typography variant="body-sm" className="text-muted-foreground">
                {VOLUNTEER_TAB.promptText}
                <br />
                Email us at{" "}
                <a href={`mailto:${VOLUNTEER_TAB.email}`} className="font-medium text-accent underline underline-offset-2 hover:text-accent/80">
                  {VOLUNTEER_TAB.email}
                </a>
              </Typography>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
