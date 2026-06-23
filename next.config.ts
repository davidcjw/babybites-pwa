import type { NextConfig } from "next";

// Safe, high-value security headers. The CSP intentionally does NOT restrict
// script/style/font-src: clico-ds imports Google Fonts and Next ships inline
// hydration scripts, so a strict source CSP would break the app. It still adds
// clickjacking (frame-ancestors), base-uri, object-src and mixed-content guards.
const securityHeaders = [
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
  {
    key: "Content-Security-Policy",
    value: "base-uri 'self'; object-src 'none'; frame-ancestors 'none'; upgrade-insecure-requests",
  },
];

const nextConfig: NextConfig = {
  // clico-ds is vendored under vendor/clico-ds and ships ESM in dist/;
  // let Next transpile it for the app bundle.
  transpilePackages: ["clico-ds"],
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      // Service worker must revalidate so updates ship promptly.
      { source: "/sw.js", headers: [{ key: "Cache-Control", value: "public, max-age=0, must-revalidate" }] },
    ];
  },
};

export default nextConfig;
