import type { Metadata } from "next";
import { IBM_Plex_Sans, Montserrat } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/common/header";
import { Footer } from "@/components/common/footer";
import { Toaster } from "sonner";
import { CookieConsent } from "@/features/consent/components/cookie-consent";
import { OG_IMAGE, SITE_DESCRIPTION, SITE_KEYWORDS, SITE_NAME, SITE_URL } from "@/lib/seo";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-heading",
  display: "swap",
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
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
        <Header />
        {children}
        <Footer />
        <Toaster position="bottom-right" richColors closeButton duration={5000} />
        {/* Cookie banner; Google Analytics (NEXT_PUBLIC_GA_ID) loads only after the visitor accepts. */}
        <CookieConsent gaId={GA_ID} />
      </body>
    </html>
  );
}
