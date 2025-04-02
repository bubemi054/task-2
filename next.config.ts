import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["images.unsplash.com", "be2-documents-staging.s3.amazonaws.com", "www.google.com"],
  },
};

export default nextConfig;
