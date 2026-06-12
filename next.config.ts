import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1", "192.168.56.1"],
  transpilePackages: ["three"],
  devIndicators: false,
};

export default nextConfig;
