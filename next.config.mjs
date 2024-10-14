/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            hostname: "pub-c8fdf8d859344864a033d8e116be5e64.r2.dev",
            protocol: "https",
            port: "",
          },
          {
            hostname: "lh3.googleusercontent.com",
            protocol: "https",
            port: "",
          },
        ],
    },
};

export default nextConfig;
