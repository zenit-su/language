/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Optional: Enables React Strict Mode
  images: {
    domains: ["example.com", "another-domain.com"], // Replace with your image host domains
  },
  // Add any other Next.js configurations here
};

module.exports = nextConfig;
