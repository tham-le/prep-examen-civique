import { describe, it, expect, beforeEach } from 'vitest';
import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import { Flashcards } from './Flashcards';
import { ALL_QUESTIONS, DEFAULT_USER_STATS } from '../constants';

(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

const total = (container: HTMLElement) => Number(container.textContent?.match(/\d+ \/ (\d+)/)?.[1]);

describe('Flashcards', () => {
  beforeEach(() => localStorage.clear());

  it('has a card for every question and filters by theme', async () => {
    const container = document.createElement('div');
    await act(async () => {
      createRoot(container).render(<Flashcards userStats={DEFAULT_USER_STATS} onStatsUpdate={() => {}} />);
    });
    expect(total(container)).toBeGreaterThanOrEqual(ALL_QUESTIONS.length);

    const droits = Array.from(container.querySelectorAll('button')).find(b => b.textContent === 'Droits et devoirs');
    await act(async () => {
      droits!.click();
    });
    expect(total(container)).toBeGreaterThanOrEqual(ALL_QUESTIONS.filter(q => q.category === 'droits').length);
    expect(total(container)).toBeLessThan(ALL_QUESTIONS.length);
  });
});
