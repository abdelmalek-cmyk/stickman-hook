import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const SITE = 'https://stickman-hook.co.uk';

export default defineConfig({
  site: SITE,
  trailingSlash: 'always',
  integrations: [
    sitemap({
      changefreq: 'weekly',
      lastmod: new Date(),
      // Exclude noindex pages from the sitemap
      filter: (page) =>
        !page.includes('/contact/'),
      // Per-page priority
      serialize(item) {
        const path = item.url.replace(SITE, '');
        if (path === '/' || path === '') {
          item.priority = 1.0;
          item.changefreq = 'daily';
        } else if (['/unblocked/', '/how-to-play/', '/levels/', '/skins/', '/faq/'].includes(path)) {
          item.priority = 0.9;
          item.changefreq = 'weekly';
        } else if (path === '/games/' || path === '/stickman-hook-2/' || path === '/download/') {
          item.priority = 0.85;
          item.changefreq = 'weekly';
        } else if (path.startsWith('/games/')) {
          item.priority = 0.8;
          item.changefreq = 'monthly';
        } else {
          item.priority = 0.5;
          item.changefreq = 'monthly';
        }
        return item;
      },
    }),
  ],
  vite: {
    build: {
      cssMinify: true,
      minify: 'esbuild',
    },
  },
});
