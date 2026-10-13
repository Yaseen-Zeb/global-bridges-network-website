import type { Metadata } from "next";
import { PolicyPage } from "@/features/legal/components/policy-page";
import { TERMS_AND_CONDITIONS } from "@/features/legal/data/terms-and-conditions";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "The rules for using the Global Bridges Network website, including acceptable use, monetary donations, and goods donations.",
  alternates: { canonical: "/terms-and-conditions" },
};

export default function TermsAndConditionsPage() {
  return <PolicyPage {...TERMS_AND_CONDITIONS} />;
}
