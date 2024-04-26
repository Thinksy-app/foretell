/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: { appDir: true },
};

// module.exports = nextConfig;

module.exports = { 
  reactStrictMode: true,
  experimental: { appDir: true },
  output: 'export',
  basePath: '',  
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
}

// /**
//  * @type {import('next/dist/next-server/server/config').NextConfig}
//  **/
// module.exports = () => {
//   const plugins = [withContentlayer, withBundleAnalyzer]
//   return plugins.reduce((acc, next) => next(acc), {
//     reactStrictMode: true,
//     pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
//     basePath: "",
//     output: 'export',
//     typescript: {
//       // !! WARN !!
//       // Dangerously allow production builds to successfully complete even if
//       // your project has type errors.
//       // !! WARN !!
//       ignoreBuildErrors: true,
//     },
//     webpack: (config, options) => {
//       config.module.rules.push({
//         test: /\.svg$/,
//         use: ['@svgr/webpack'],
//       })

//       return config
//     },
//   })
// }