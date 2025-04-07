/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removed 'output: export' to enable API routes and middleware
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.notion.so',
      },
      {
        protocol: 'https',
        hostname: 'notion.so',
      },
    ],
  },
  // The i18n config is no longer needed in app directory
  // We're handling it with middleware and [lang] directories
};

module.exports = nextConfig;
