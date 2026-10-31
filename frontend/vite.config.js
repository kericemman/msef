import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

const publicRoutes = [
  '/',
  '/about',
  '/programmes',
  '/programmes/agriculture',
  '/programmes/youth-and-recovery',
  '/programmes/education-and-skills',
  '/programmes/environment',
  '/programmes/economic-empowerment',
  '/programmes/other-services',
  '/get-involved',
  '/contact',
  '/terms',
  '/privacy',
];

function searchFiles(configuredSiteUrl) {
  return {
    name: 'msef-search-files',
    configureServer(server) {
      server.middlewares.use('/robots.txt', (_request, response) => {
        response.setHeader('Content-Type', 'text/plain; charset=utf-8');
        response.end(robotsText(normalizeSiteUrl(configuredSiteUrl?.trim())));
      });
    },
    generateBundle() {
      const siteOrigin = configuredSiteUrl?.trim();
      const siteUrl = normalizeSiteUrl(siteOrigin);
      if (!siteUrl) {
        console.warn('VITE_SITE_URL is empty; sitemap.xml was not generated.');
      } else {
        const sitemapEntries = publicRoutes
          .map((route) => `  <url><loc>${siteUrl}${route}</loc></url>`)
          .join('\n');
        this.emitFile({
          type: 'asset',
          fileName: 'sitemap.xml',
          source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapEntries}\n</urlset>\n`,
        });
      }
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: robotsText(siteUrl),
      });
    },
  };
}

function normalizeSiteUrl(value) {
  if (!value) return "";
  try {
    const parsedSiteUrl = new URL(value);
    if (parsedSiteUrl.protocol !== 'https:') {
      throw new Error('The production site URL must use HTTPS.');
    }
    return parsedSiteUrl.origin;
  } catch {
    throw new Error('VITE_SITE_URL must be a valid HTTPS URL.');
  }
}

function robotsText(siteUrl) {
  return `User-agent: *\nAllow: /\nDisallow: /admin\n${siteUrl ? `\nSitemap: ${siteUrl}/sitemap.xml\n` : ""}`;
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react(), tailwindcss(), searchFiles(env.VITE_SITE_URL)],
    server: {
      proxy: {
        "/api": {
          target: "http://127.0.0.1:5005",
          changeOrigin: false,
        },
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('/node_modules/@tiptap/')) return 'tiptap';
            if (id.includes('/node_modules/prosemirror-')) return 'prosemirror';
          },
        },
      },
    },
  };
});
