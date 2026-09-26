import type { NextConfig } from "next";

// Beim Bauen für GitHub Pages (Projektseite, nicht <user>.github.io) läuft die
// Seite unter /<repo-name>/ – das setzt die GitHub Action per Umgebungsvariable.
const basePath = process.env.GITHUB_PAGES_BASE_PATH || "";

const nextConfig: NextConfig = {
  // Reine Browser-App ohne Server: lässt sich als statische Seite bauen (npm run build → out/).
  output: "export",
  basePath,
  images: { unoptimized: true },
};

export default nextConfig;
