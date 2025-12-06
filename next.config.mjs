/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Disable ESLint during builds
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Disable TypeScript errors during builds (optional, for faster deploys)
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Image optimization for Vercel
  images: {
    domains: ['img.youtube.com', 'i.ytimg.com'],
    unoptimized: false,
  },
  
  // Enable trailing slashes for consistent URLs
  trailingSlash: false,
  
  // Optimize for production
  poweredByHeader: false,
};

export default nextConfig;
