import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Reine Browser-App ohne Server: lässt sich als statische Seite bauen (npm run build → out/).
  output: "export",
};

export default nextConfig;
