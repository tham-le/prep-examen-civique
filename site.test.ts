import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';

describe('index.html', () => {
  const html = readFileSync('index.html', 'utf-8');

  it('loads no stylesheet, font or script from another site', () => {
    const loaded = [...html.matchAll(/<(?:link|script)\b[^>]*\b(?:href|src)="(https?:\/\/[^"]+)"/g)].map(m => m[1]);
    // the canonical link is not loaded; everything else must come from this site
    expect(loaded.filter(url => !url.startsWith('https://objectif-citoyen.fr/'))).toEqual([]);
  });

  it('serves the font from the site', () => {
    expect(html).toContain('/fonts/inter-latin.woff2');
    expect(readFileSync('public/fonts/inter-latin.woff2').length).toBeGreaterThan(10_000);
  });
});

describe('hosting security headers', () => {
  const hosting = JSON.parse(readFileSync('firebase.json', 'utf-8')).hosting;
  const all: Record<string, string> = Object.fromEntries(
    hosting.headers.find((h: { source: string }) => h.source === '**').headers.map((h: { key: string; value: string }) => [h.key, h.value])
  );

  it('sets a content security policy that allows no inline script and no other site', () => {
    const csp = all['Content-Security-Policy'];
    expect(csp).toContain("script-src 'self';");
    expect(csp).toContain("frame-ancestors 'none'");
    expect(csp).toContain("object-src 'none'");
    expect(csp).not.toMatch(/https?:\/\//);
  });

  it('sets the other basic headers', () => {
    expect(all['X-Content-Type-Options']).toBe('nosniff');
    expect(all['Referrer-Policy']).toBeTruthy();
    expect(all['X-Frame-Options']).toBe('DENY');
  });

  it('keeps index.html free of inline scripts', () => {
    const html = readFileSync('index.html', 'utf-8');
    const inline = [...html.matchAll(/<script\b([^>]*)>/g)].filter(m => !/\bsrc=/.test(m[1]) && !/application\/ld\+json/.test(m[1]));
    expect(inline).toEqual([]);
  });

  it('lets the service worker update without waiting for the cache', () => {
    const rule = hosting.headers.find((h: { source: string }) => h.source === '/sw.js');
    expect(rule.headers[0]).toEqual({ key: 'Cache-Control', value: 'no-cache' });
  });
});
