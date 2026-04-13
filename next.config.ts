import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "kgvzbxnpitajdvbjxahp.supabase.co",
        port: "",
      },
    ],
  },
};

export default nextConfig;
