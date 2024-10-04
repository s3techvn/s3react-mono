import path from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config, { dev }) {
    const rules = config.module.rules
      .find((rule) => typeof rule.oneOf === 'object')
      .oneOf.filter((rule) => Array.isArray(rule.use));

    rules.forEach((rule) => {
      rule.use.forEach((moduleLoader) => {
        if (moduleLoader.loader?.includes('css-loader') && !moduleLoader.loader?.includes('postcss-loader')) {
          if (moduleLoader.options?.modules) {
            moduleLoader.options.modules.mode = 'local';
          }
        }
      });
    });

    if (dev) {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@s3react/core': path.resolve(process.cwd(), '../../../packages/@s3react/core/src'),
      };
    }

    return config;
  },
};

export default nextConfig;
