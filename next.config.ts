import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // clico-ds is vendored under vendor/clico-ds and ships ESM in dist/;
  // let Next transpile it for the app bundle.
  transpilePackages: ["clico-ds"],
};

export default nextConfig;
