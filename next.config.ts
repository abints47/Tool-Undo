import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep ytdl-core out of the serverless bundle: it fetches YouTube's player
  // script at runtime and spawns worker threads, which don't survive bundling.
  serverExternalPackages: ["@distube/ytdl-core"],
};

export default nextConfig;
