import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Optimize external script loading for GTM
  experimental: {
    optimizePackageImports: ['next/script'],
  },
  // Headers for analytics scripts
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
