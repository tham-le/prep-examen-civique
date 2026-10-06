/// <reference types="vitest/config" />
import fs from 'fs';
import path from 'path';
import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { FAQ_DATA } from './constants';
import { PAGES } from './seo/routes';
import { faqBody, renderNotFound, renderPage, renderSitemap } from './seo/render';

// One HTML file per page, each with its own title, description and canonical
// link, plus a sitemap and a 404 page. Hosting serves these files before it
// falls back to anything else, so crawlers get the right tags without running the app.
const seoPages = (): Plugin => {
  let outDir = '';
  return {
    name: 'seo-pages',
    apply: 'build',
    configResolved(config) {
      outDir = path.resolve(config.root, config.build.outDir);
    },
    closeBundle() {
      const template = fs.readFileSync(path.join(outDir, 'index.html'), 'utf-8');
      for (const [route, page] of Object.entries(PAGES)) {
        const html = renderPage(template, route, page, route === '/faq' ? faqBody(FAQ_DATA) : '');
        fs.writeFileSync(path.join(outDir, route === '/' ? 'index.html' : `${route.slice(1)}.html`), html);
      }
      fs.writeFileSync(path.join(outDir, '404.html'), renderNotFound(template));
      fs.writeFileSync(path.join(outDir, 'sitemap.xml'), renderSitemap(new Date().toISOString().slice(0, 10)));
    },
  };
};

export default defineConfig({
  server: {
    port: 3000,
    // Local only; use `npm run dev -- --host` to test on a phone
    host: 'localhost',
  },
  plugins: [react(), tailwindcss(), seoPages()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    }
  },
  test: {
    environment: 'jsdom',
  },
});
