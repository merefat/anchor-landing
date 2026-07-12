/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],
  poweredByHeader: false,
  compress: true,
  productionBrowserSourceMaps: false,
  devIndicators: false,
  experimental: {
    optimizePackageImports: ['lucide-react', 'motion'],
  },
};

module.exports = nextConfig;
