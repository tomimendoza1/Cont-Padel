import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	transpilePackages: ["@tuapp/db"],
};

export default nextConfig;