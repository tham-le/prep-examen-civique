import { describe, it, expect, beforeEach } from 'vitest';
import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import { Flashcards, FLASHCARDS } from './Flashcards';
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

  it('shows a card that was never seen before cards already reviewed', async () => {
    const target = FLASHCARDS.find(c => c.id === 'q-i64')!;
    const flashcardMastery = Object.fromEntries(
      FLASHCARDS.filter(c => c.id !== target.id).map(c => [c.id, { box: 1, dueAt: Date.now() + 86_400_000 }])
    );
    const container = document.createElement('div');
    await act(async () => {
      createRoot(container).render(<Flashcards userStats={{ ...DEFAULT_USER_STATS, flashcardMastery }} onStatsUpdate={() => {}} />);
    });
    expect(container.querySelector('.perspective-1000 p')?.textContent).toBe(target.front);
  });
});
