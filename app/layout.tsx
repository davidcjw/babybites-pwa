import type { Metadata, Viewport } from "next";
import "clico-ds/styles.css"; // clico tokens + fonts + component CSS
import "./globals.css";
import { Chrome } from "@/components/Chrome";
import { ServiceWorkerRegister } from "@/components/ServiceWorkerRegister";

const SITE_URL = "https://babybites.davidcjw.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: "BabyBites",
  title: "BabyBites — what to cook for your baby",
  description:
    "Randomize age-appropriate baby & toddler recipes, from first purées to toddler meals. Filter by age, with ingredients, method and source links.",
  manifest: "/manifest.webmanifest",
  alternates: { canonical: "/" },
  keywords: [
    "baby recipes",
    "toddler recipes",
    "baby food",
    "weaning",
    "first foods",
    "baby led weaning",
    "Singapore baby food",
  ],
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "BabyBites",
  },
  openGraph: {
    type: "website",
    siteName: "BabyBites",
    url: SITE_URL,
    title: "BabyBites — what to cook for your baby",
    description:
      "Randomize age-appropriate baby & toddler recipes, from first purées to toddler meals. Filter by age, with ingredients, method and source links.",
  },
  twitter: {
    card: "summary_large_image",
    title: "BabyBites — what to cook for your baby",
    description:
      "Randomize age-appropriate baby & toddler recipes, from first purées to toddler meals.",
  },
  icons: {
    icon: [
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#f6f3ec",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "BabyBites",
    url: SITE_URL,
    description:
      "Randomize age-appropriate baby & toddler recipes, from first purées to toddler meals.",
  };

  return (
    <html lang="en">
      <body>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <ServiceWorkerRegister />
        <Chrome>{children}</Chrome>
      </body>
    </html>
  );
}
