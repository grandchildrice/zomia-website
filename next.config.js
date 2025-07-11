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
      {
        protocol: 'https',
        hostname: 'prod-files-secure.s3.us-west-2.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: '**.amazonaws.com', // Allow all Amazon S3 domains
      },
    ],
    // Enable image optimization with caching
    minimumCacheTTL: 3600, // Cache images for 1 hour
  },
  // The i18n config is no longer needed in app directory
  // We're handling it with middleware and [lang] directories
};

module.exports = nextConfig;
