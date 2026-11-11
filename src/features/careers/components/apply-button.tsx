"use client";

import { Button } from "@/components/ui/button";

export const SELECT_ROLE_EVENT = "careers:select-role";

/** Preselect a role in the application form and scroll it into view. */
export function selectRole(role: string) {
  window.dispatchEvent(new CustomEvent(SELECT_ROLE_EVENT, { detail: role }));
  document.getElementById("apply")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function ApplyButton({ role, label }: { role: string; label: string }) {
  return (
    <Button type="button" variant="primary" onClick={() => selectRole(role)}>
      {label}
    </Button>
  );
}
