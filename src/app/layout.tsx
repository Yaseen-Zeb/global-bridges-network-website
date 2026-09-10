import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Header } from "@/components/common/header";
import { Footer } from "@/components/common/footer";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Bridge Global Network | Empowering Refugees, Immigrants & Women Worldwide",
    template: "%s | Bridge Global Network",
  },
  description:
    "Bridge Global Network connects communities across borders, assisting incoming refugees and immigrants with resettlement, health, legal, education, and employment support while advancing women empowerment initiatives.",
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
      { url: "/icon", type: "image/png" }
    ],
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "Bridge Global Network | Empowering Refugees, Immigrants & Women Worldwide",
    description:
      "Connecting communities across borders, assisting refugees and immigrants while supporting overseas women empowerment programs.",
    url: "https://bridgeglobalnetwork.org",
    siteName: "Bridge Global Network",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bridge Global Network",
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
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Header />
          {children}
          <Footer />
          <Toaster position="bottom-right" richColors closeButton duration={5000} />
        </Providers>
      </body>
    </html>
  );
}
