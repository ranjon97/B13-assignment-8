/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "covers.openlibrary.org" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "i.ibb.co" },
      { protocol: "https", hostname: "i.ibb.co.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "ui-avatars.com" },
      { protocol: "https", hostname: "**" },
    ],
  },
};

export default nextConfig;
