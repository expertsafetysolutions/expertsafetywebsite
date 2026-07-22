/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // When real product/certification images arrive from a remote CMS or CDN,
    // add their hostnames here. Local /public assets need no configuration.
    remotePatterns: [],
    formats: ["image/avif", "image/webp"],
  },
  // Clean, trailing-slash-free canonical URLs.
  trailingSlash: false,
};

export default nextConfig;
