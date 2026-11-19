import type { NextConfig } from "next";

const isGitHubActions = process.env.GITHUB_ACTIONS === "true";
const deploymentPath = isGitHubActions ? "/shopsphere" : undefined;

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: deploymentPath,
  assetPrefix: deploymentPath ? `${deploymentPath}/` : undefined,
  images: {
    unoptimized: true,
  },
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: false,
  partialPrefetching: false,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
