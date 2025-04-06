/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // Necesario para generar archivos estáticos
  basePath: '/simpleocean', // El nombre de tu repositorio
  images: {
    unoptimized: true, // Necesario para export estático
  },
  // Asegúrate de que las rutas funcionen en GitHub Pages
  assetPrefix: '/simpleocean/',
  reactStrictMode: true,

  /**
   * If you are using `appDir` then you must comment the below `i18n` config out.
   *
   * @see https://github.com/vercel/next.js/issues/41980
   */
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  transpilePackages: ["geist"],
};

module.exports = nextConfig;
