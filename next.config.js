/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    GOOGLE_CLIENT_ID:
      '656230267348-sfffbp5v2r5c4e6d3le0oqj34ql5i2mp.apps.googleusercontent.com',
    GOOGLE_CLIENT_SECRET: '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',
  },
}

module.exports = nextConfig
