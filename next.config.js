/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "rb.gy",
      "lh3.googleusercontent.com",
      "firebasestorage.googleapis.com",
    ],
  },
};

module.exports = nextConfig;
