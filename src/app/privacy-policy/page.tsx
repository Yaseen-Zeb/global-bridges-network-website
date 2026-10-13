import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PolicyPage } from "@/features/legal/components/policy-page";
import { sanityFetch } from "@/lib/sanity/fetch";
import { LEGAL_PAGE_QUERY } from "@/lib/sanity/queries";
import type { LegalPage } from "@/lib/sanity/types";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Global Bridges Network collects, uses, shares, and protects the personal information you provide when you contact us, volunteer, or donate.",
  alternates: { canonical: "/privacy-policy" },
};

export default async function PrivacyPolicyPage() {
  // Content: Sanity → Legal Pages → Privacy Policy
  const page = await sanityFetch<LegalPage | null>(LEGAL_PAGE_QUERY, { id: "privacyPolicy" });
  if (!page) notFound();

  return <PolicyPage page={page} />;
}
