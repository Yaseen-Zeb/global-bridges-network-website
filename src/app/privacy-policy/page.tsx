import type { Metadata } from "next";
import { PolicyPage } from "@/features/legal/components/policy-page";
import { PRIVACY_POLICY } from "@/features/legal/data/privacy-policy";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Global Bridges Network collects, uses, shares, and protects the personal information you provide when you contact us, volunteer, or donate.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return <PolicyPage {...PRIVACY_POLICY} />;
}
