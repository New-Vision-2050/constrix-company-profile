import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  output: "standalone", // Required for Docker deployment
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
