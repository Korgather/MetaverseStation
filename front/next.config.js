/** @type {import('next').NextConfig} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const withPlugins = require('next-compose-plugins');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
// eslint-disable-next-line @typescript-eslint/no-var-requires
const withPWA = require('next-pwa');
const nextConfig = {
  compress: true,
  reactStrictMode: true,
  images: {
    domains: [
      'cdn.metabusstation.shop',
      'lh3.googleusercontent.com',
      'phinf.pstatic.net',
      'ssl.pstatic.net',
    ],
  },
  swcMinify: true,
  compiler: {
    // ssr and displayName are configured by default
    styledComponents: true,
  },
  pwa: {
    dest: 'public',
  },
  experimental: {
    antd: {
      transform: 'antd/lib/{{member}}',
    },
  },
  webpack(config, { webpack }) {
    const prod = process.env.NODE_ENV === 'production';
    const plugins = [
      ...config.plugins,
      new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /^\.\/ko$/),
    ];
    return {
      ...config,
      mode: prod ? 'production' : 'development',
      devtool: prod ? 'hidden-source-map' : 'eval',
      plugins,
    };
  },
};

module.exports = withPlugins([withPWA, withBundleAnalyzer], nextConfig);
