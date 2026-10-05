import { describe, it, expect, vi, beforeEach } from 'vitest';
import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

describe('App', () => {
  beforeEach(() => {
    localStorage.clear();
    localStorage.setItem('objectif_citoyen_onboarding_complete', 'true');
    window.history.pushState({}, '', '/flashcards');
    window.matchMedia = vi.fn().mockReturnValue({ matches: false, addEventListener: vi.fn(), removeEventListener: vi.fn() });
  });

  it('keeps a flashcard review after a reload', async () => {
    const container = document.createElement('div');
    const root = createRoot(container);
    await act(async () => {
      root.render(<App />);
    });
    await vi.waitFor(() => expect(container.textContent).toContain('Je savais'));

    await act(async () => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k' }));
    });

    const saved = JSON.parse(localStorage.getItem('objectif_citoyen_stats') ?? '{}');
    expect(Object.keys(saved.flashcardMastery ?? {})).toHaveLength(1);
  });
});
