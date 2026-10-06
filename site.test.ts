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
