/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode:false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*',
      },
      {
        protocol: 'https',
        hostname: 'imagedelivery.net',
      },
      {
        protocol: 'https',
        hostname:'flagcdn.com'
      },
      {
        protocol: 'https',
        hostname:'api.tbotechnology.in'
      }
     
    ],
  },

  async rewrites() {
    return [

      {
        source: '/ar',
        destination: '/home',
      },
      {
        source: '/ar/flights',
        destination: '/home'
      },
      {
        source: '/flights',
        destination: '/home'
      },
      

    ];
  },
};

export default nextConfig;
