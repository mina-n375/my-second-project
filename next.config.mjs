/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // 静的エクスポートを有効化
  images: {
    unoptimized: true, // 静的エクスポートで画像最適化を無効化
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.microcms-assets.io",
      },
    ],
  },
  trailingSlash: true, // 末尾スラッシュを付与（必要に応じて）
};

export default nextConfig;
