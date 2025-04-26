import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /pdf\.worker\.entry\.js/,
      loader: 'worker-loader',
      options: {
        inline: 'no-fallback',
      },
    })
    return config
  },
}

export default nextConfig
