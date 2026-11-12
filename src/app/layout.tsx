import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/common/header";
import { Footer } from "@/components/common/footer";
import { Toaster } from "sonner";
import { CookieConsent } from "@/features/consent/components/cookie-consent";
import { OG_IMAGE, SITE_DESCRIPTION, SITE_KEYWORDS, SITE_NAME, SITE_URL } from "@/lib/seo";

// Self-hosted (Latin subset, from Fontsource) so builds don't depend on reaching Google Fonts.
const montserrat = localFont({
  src: [
    { path: "../fonts/montserrat-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "../fonts/montserrat-latin-600-normal.woff2", weight: "600", style: "normal" },
    { path: "../fonts/montserrat-latin-700-normal.woff2", weight: "700", style: "normal" },
    { path: "../fonts/montserrat-latin-800-normal.woff2", weight: "800", style: "normal" },
  ],
  variable: "--font-heading",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

const ibmPlexSans = localFont({
  src: [
    { path: "../fonts/ibm-plex-sans-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../fonts/ibm-plex-sans-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "../fonts/ibm-plex-sans-latin-600-normal.woff2", weight: "600", style: "normal" },
    { path: "../fonts/ibm-plex-sans-latin-700-normal.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-body",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Supporting Refugees, Immigrants & Communities`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "nonprofit",
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: SITE_NAME,
    url: "/",
    title: `${SITE_NAME} | Supporting Refugees, Immigrants & Communities`,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE.url],
  },
  formatDetection: { telephone: false, email: false, address: false },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} ${ibmPlexSans.variable}`}>
      <body className="font-sans">
        <a
          href="#main-content"
          className="sr-only z-[100] bg-primary px-md py-sm font-semibold text-primary-foreground focus:not-sr-only focus:fixed focus:left-md focus:top-md"
        >
          Skip to main content
        </a>
        <Header />
        <div id="main-content" tabIndex={-1} className="outline-none">
          {children}
        </div>
        <Footer />
        <Toaster position="bottom-right" richColors closeButton duration={5000} />
        {/* Cookie banner; Google Analytics (NEXT_PUBLIC_GA_ID) loads only after the visitor accepts. */}
        <CookieConsent gaId={GA_ID} />
      </body>
    </html>
  );
}
