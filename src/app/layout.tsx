import type { Metadata } from "next";
import { IBM_Plex_Sans, Montserrat } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/common/header";
import { Footer } from "@/components/common/footer";
import { Toaster } from "sonner";

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

export const metadata: Metadata = {
  title: {
    default: "Global Bridges Network | Empowering Refugees, Immigrants & Women Worldwide",
    template: "%s | Global Bridges Network",
  },
  description:
    "Global Bridges Network connects communities across borders, assisting incoming refugees and immigrants with resettlement, health, legal, education, and employment support while advancing women empowerment initiatives.",
  openGraph: {
    title: "Global Bridges Network | Empowering Refugees, Immigrants & Women Worldwide",
    description:
      "Connecting communities across borders, assisting refugees and immigrants while supporting overseas women empowerment programs.",
    url: "https://globalbridgesnetwork.org",
    siteName: "Global Bridges Network",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Global Bridges Network",
    description:
      "Connecting communities across borders, assisting refugees and immigrants while supporting overseas women empowerment programs.",
  },
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
      </body>
    </html>
  );
}
