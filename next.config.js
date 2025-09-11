/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NODE_ENV === 'production' 
      ? '/api/proxy'
      : 'http://localhost:4000/api',
  },
  async rewrites() {
    return [
      {
        source: '/auth/login',
        destination: '/auth/user-login',
      },
    ];
  },
};

module.exports = nextConfig;