/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // Necesario para generar archivos estáticos
  basePath: '/simpleocean', // El nombre de tu repositorio
  images: {
    unoptimized: true, // Necesario para export estático
  },
  // Asegúrate de que las rutas funcionen en GitHub Pages
  assetPrefix: '/simpleocean',
  trailingSlash: true,
  reactStrictMode: true,
  transpilePackages: ["geist"],
};

export default nextConfig;
