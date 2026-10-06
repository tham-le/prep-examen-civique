import { NOT_FOUND, PAGES, PageSeo, SITE_URL, indexedRoutes } from './routes';

export const escapeHtml = (text: string): string =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const setMeta = (html: string, attr: 'name' | 'property', key: string, value: string): string =>
  html.replace(new RegExp(`(<meta\\s+${attr}="${key}"\\s+content=")[^"]*(")`), (_, open, close) => open + escapeHtml(value) + close);

export const urlFor = (route: string): string => SITE_URL + route;

// Text for visitors and crawlers that do not run JavaScript; the app replaces the page once it loads
const fallbackBody = (route: string, page: PageSeo, extra: string): string => {
  const links = indexedRoutes()
    .map(r => `<li><a href="${r}">${escapeHtml(PAGES[r].label)}</a></li>`)
    .join('');
  return `<noscript><main><h1>${escapeHtml(page.heading)}</h1><p>${escapeHtml(page.intro)}</p>${extra}<nav aria-label="Pages"><ul>${links}</ul></nav><p>Cette application a besoin de JavaScript pour fonctionner.</p></main></noscript>`;
};

export const renderPage = (template: string, route: string, page: PageSeo, extraBody = ''): string => {
  const url = urlFor(route);
  let html = template.replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(page.title)}</title>`);
  html = setMeta(html, 'name', 'description', page.description);
  html = setMeta(html, 'name', 'robots', page.indexed ? 'index, follow' : 'noindex, follow');
  html = setMeta(html, 'property', 'og:title', page.title);
  html = setMeta(html, 'property', 'og:description', page.description);
  html = setMeta(html, 'property', 'og:url', url);
  html = setMeta(html, 'name', 'twitter:title', page.title);
  html = setMeta(html, 'name', 'twitter:description', page.description);
  html = html.replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`);
  return html.replace('<div id="root"></div>', `${fallbackBody(route, page, extraBody)}<div id="root"></div>`);
};

export const renderNotFound = (template: string): string => renderPage(template, '/', NOT_FOUND).replace(/(<link rel="canonical" href=")[^"]*(">)\s*/, '');

export const renderSitemap = (date: string): string =>
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  indexedRoutes().map(route => `  <url>\n    <loc>${urlFor(route)}</loc>\n    <lastmod>${date}</lastmod>\n  </url>\n`).join('') +
  `</urlset>\n`;

export const faqBody = (items: { question: string; answer: string }[]): string =>
  `<section>${items.map(i => `<h2>${escapeHtml(i.question)}</h2><p>${escapeHtml(i.answer)}</p>`).join('')}</section>`;
