/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  async rewrites() {
    return [
      {
        source: '/app',
        destination: '/app/index.html',
      },
    ]
  },
}

module.exports = nextConfig
