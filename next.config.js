/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL || 'https://vizhaa-backend-1.onrender.com/api'}/:path*`,
      },
      {
        source: '/auth/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL || 'https://vizhaa-backend-1.onrender.com/api'}/auth/:path*`,
      },
      {
        source: '/organizer/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL || 'https://vizhaa-backend-1.onrender.com/api'}/organizer/:path*`,
      },
      {
        source: '/supplier/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL || 'https://vizhaa-backend-1.onrender.com/api'}/supplier/:path*`,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET, POST, PUT, DELETE, OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization, X-Requested-With' },
        ],
      },
    ];
  },
};

module.exports = nextConfig;