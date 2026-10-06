import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { PAGES, NOT_FOUND, SITE_URL, indexedRoutes, isKnownPage, pageFor } from './routes';
import { faqBody, renderNotFound, renderPage, renderSitemap } from './render';
import { ALL_QUESTIONS } from '../constants';

const template = readFileSync('index.html', 'utf-8');

describe('page table', () => {
  const entries = Object.entries(PAGES);

  it('has a title of at most 60 characters and a description of 70 to 160', () => {
    for (const [route, page] of entries) {
      expect(page.title.length, route).toBeLessThanOrEqual(60);
      expect(page.description.length, route).toBeGreaterThanOrEqual(70);
      expect(page.description.length, route).toBeLessThanOrEqual(160);
    }
  });

  it('gives every page its own title and description', () => {
    expect(new Set(entries.map(([, p]) => p.title)).size).toBe(entries.length);
    expect(new Set(entries.map(([, p]) => p.description)).size).toBe(entries.length);
  });

  it('does not call the site official or claim official questions', () => {
    for (const [route, page] of [...entries, ['404', NOT_FOUND] as const]) {
      expect(`${page.title} ${page.description} ${page.intro}`, route).not.toMatch(/simulat\w+ officiel|questions officielles|site officiel/i);
    }
  });

  it('covers every route of the app', () => {
    const app = readFileSync('App.tsx', 'utf-8');
    const routes = [...app.matchAll(/<Route path="(\/[^"]*)"/g)].map(m => m[1]);
    expect(routes.length).toBeGreaterThan(5);
    for (const route of routes) expect(isKnownPage(route), route).toBe(true);
  });

  it('keeps the question count claims true', () => {
    expect(ALL_QUESTIONS.length).toBeGreaterThan(450);
    expect(ALL_QUESTIONS.length).toBeLessThan(500);
  });

  it('treats object method names as unknown pages', () => {
    expect(pageFor('constructor')).toBe(NOT_FOUND);
    expect(pageFor('/nope')).toBe(NOT_FOUND);
  });

  it('keeps the profile out of the index', () => {
    expect(PAGES['/profil'].indexed).toBe(false);
    expect(indexedRoutes()).not.toContain('/profil');
  });
});

describe('renderPage', () => {
  const html = renderPage(template, '/quiz', PAGES['/quiz']);

  it('writes the title, description and canonical link of the page', () => {
    expect(html).toContain(`<title>${PAGES['/quiz'].title}</title>`);
    expect(html).toContain(`<meta name="description" content="${PAGES['/quiz'].description}">`);
    expect(html).toContain(`<link rel="canonical" href="${SITE_URL}/quiz">`);
    expect(html).toContain(`<meta property="og:url" content="${SITE_URL}/quiz">`);
    expect(html).toContain(`<meta property="og:title" content="${PAGES['/quiz'].title}">`);
    expect(html).toContain('<meta name="robots" content="index, follow">');
  });

  it('has one title and one canonical link only', () => {
    expect(html.match(/<title>/g)).toHaveLength(1);
    expect(html.match(/rel="canonical"/g)).toHaveLength(1);
  });

  it('puts the heading, text and links to every indexed page in a noscript block before the app', () => {
    const block = html.match(/<noscript>(.*?)<\/noscript>/s)![1];
    expect(block).toContain(`<h1>${PAGES['/quiz'].heading}</h1>`);
    for (const route of indexedRoutes()) expect(block).toContain(`href="${route}"`);
    expect(block).not.toContain('href="/profil"');
    expect(html.indexOf('<noscript>')).toBeLessThan(html.indexOf('<div id="root">'));
  });

  it('marks the profile noindex', () => {
    expect(renderPage(template, '/profil', PAGES['/profil'])).toContain('<meta name="robots" content="noindex, follow">');
  });

  it('escapes text', () => {
    const page = { ...PAGES['/quiz'], title: 'A "quoted" <b>', heading: '<script>' };
    const out = renderPage(template, '/quiz', page);
    expect(out).toContain('<title>A &quot;quoted&quot; &lt;b&gt;</title>');
    expect(out).not.toContain('<h1><script>');
  });

  it('adds the questions to the FAQ page', () => {
    const out = renderPage(template, '/faq', PAGES['/faq'], faqBody([{ question: 'Combien ?', answer: '40 questions & plus' }]));
    expect(out).toContain('<h2>Combien ?</h2><p>40 questions &amp; plus</p>');
  });
});

describe('renderNotFound and renderSitemap', () => {
  it('has no canonical link and is not indexed', () => {
    const html = renderNotFound(template);
    expect(html).not.toContain('rel="canonical"');
    expect(html).toContain('<meta name="robots" content="noindex, follow">');
    expect(html).toContain('<title>Page introuvable | Objectif Citoyen</title>');
  });

  it('lists only the indexed pages, with the date given', () => {
    const xml = renderSitemap('2026-10-06');
    expect(xml.match(/<loc>/g)).toHaveLength(indexedRoutes().length);
    expect(xml).toContain(`<loc>${SITE_URL}/</loc>`);
    expect(xml).toContain('<lastmod>2026-10-06</lastmod>');
    expect(xml).not.toContain('/profil');
  });
});
