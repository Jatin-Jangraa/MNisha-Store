import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";

import { Footer } from "@/components/footer";
import { LuxuryCursor } from "@/components/luxury-cursor";
import { Navbar } from "@/components/navbar";
import { ProtectImages } from "@/components/protect-images";
import { Providers } from "@/components/providers";
import { ScrollProgress } from "@/components/scroll-progress";
import { SmoothScroll } from "@/components/smooth-scroll";
import { siteConfig } from "@/constants/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"]
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"]
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | ${siteConfig.title}`,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
  keywords: [
    "designer clothing gallery",
    "luxury fashion",
    "fashion portfolio",
    "editorial fashion",
    "designer collections",
    "couture",
    "haute couture"
  ],
  openGraph: {
    title: `${siteConfig.name} | ${siteConfig.title}`,
    description: siteConfig.description,
    type: "website",
    images: [
      {
        url: siteConfig.logo,
        width: 1254,
        height: 1254,
        alt: "Mnisha logo"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable}`}>
        <Providers>
          <SmoothScroll />
          <ScrollProgress />
          <LuxuryCursor />
          <ProtectImages />
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
