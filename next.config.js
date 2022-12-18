/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'storage.googleapis.com',
      }
    ]
  },
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return {
      fallback: [
        {
          source: '/:path*',
          destination: `https://us-central1-ensoul-labs-df8ed.cloudfunctions.net/app/:path*`,
        },
      ],
    }
  },
}

module.exports = nextConfig
