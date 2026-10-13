import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PolicyPage } from "@/features/legal/components/policy-page";
import { sanityFetch } from "@/lib/sanity/fetch";
import { LEGAL_PAGE_QUERY } from "@/lib/sanity/queries";
import type { LegalPage } from "@/lib/sanity/types";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "The rules for using the Global Bridges Network website, including acceptable use, monetary donations, and goods donations.",
  alternates: { canonical: "/terms-and-conditions" },
};

export default async function TermsAndConditionsPage() {
  // Content: Sanity → Legal Pages → Terms & Conditions
  const page = await sanityFetch<LegalPage | null>(LEGAL_PAGE_QUERY, { id: "termsAndConditions" });
  if (!page) notFound();

  return <PolicyPage page={page} />;
}
