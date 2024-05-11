/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.divine-pride.net',
        port: '',
        pathname: '/images/skill/**',
      },
    ],
  },
};

export default nextConfig;
