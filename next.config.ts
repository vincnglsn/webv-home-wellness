import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Métadonnées (title, description, canonique) toujours rendues dans le <head>, pour
  // tous les visiteurs et robots : sans cela, une page générée à la volée peut envoyer
  // son titre plus tard dans le <body>, et certains robots ne le voient pas.
  htmlLimitedBots: /.*/,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cf.cjdropshipping.com" },
      { protocol: "https", hostname: "oss-cf.cjdropshipping.com" },
      { protocol: "https", hostname: "cj-product-center.oss-accelerate.aliyuncs.com" },
    ],
  },
};

export default nextConfig;
