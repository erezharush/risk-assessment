import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/lib/i18n/request.ts");

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/risk-assessment",
  images: {
    unoptimized: true,
  },
};

export default withNextIntl(nextConfig);
