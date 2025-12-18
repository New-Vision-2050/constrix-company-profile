import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "constrix.*",
        pathname: "**",
      },
    ],
  },
  output: "standalone", // Required for Docker deployment
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
