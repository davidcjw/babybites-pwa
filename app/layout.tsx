import type { Metadata, Viewport } from "next";
import "clico-ds/styles.css"; // clico tokens + fonts + component CSS
import "./globals.css";
import { Chrome } from "@/components/Chrome";
import { ServiceWorkerRegister } from "@/components/ServiceWorkerRegister";

export const metadata: Metadata = {
  applicationName: "BabyBites",
  title: "BabyBites — what to cook for your baby",
  description:
    "Randomize age-appropriate baby & toddler recipes, from first purées to toddler meals. Filter by age, with ingredients, method and source links.",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "BabyBites",
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
  return (
    <html lang="en">
      <body>
        <ServiceWorkerRegister />
        <Chrome>{children}</Chrome>
      </body>
    </html>
  );
}
