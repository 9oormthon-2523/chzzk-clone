import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: false,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },  
  images: {
    domains: ['img1.kakaocdn.net', 'yltgalkuhjkkvczgyano.supabase.co', ],
  },
};

export default nextConfig;