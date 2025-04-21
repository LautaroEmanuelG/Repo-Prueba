import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: '/apps/app-react-prueba/my-app/out',
  assetPrefix: '/apps/app-react-prueba/my-app/out',
};

export default nextConfig;
