import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    experimental: {
        serverActions: {
            bodySizeLimit: "25mb"
        }
    },
    images: {
        remotePatterns: [
            {
                protocol: "http",
                hostname: "localhost",
                port: "3000",
                pathname: "/media/**",
            },
        ],
    },
};

export default nextConfig;