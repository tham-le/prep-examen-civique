import { describe, it, expect } from 'vitest';
import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import { MemoryRouter } from 'react-router-dom';
import { Entretien, ENTRETIEN_QUESTIONS, ENTRETIEN_THEMES } from './Entretien';
import { DEFAULT_USER_STATS } from '../constants';
import { UserStats } from '../types';

(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

const render = async (stats: UserStats, onStatsUpdate: (s: UserStats) => void) => {
  const container = document.createElement('div');
  await act(async () => {
    createRoot(container).render(
      <MemoryRouter>
        <Entretien userStats={stats} onStatsUpdate={onStatsUpdate} />
      </MemoryRouter>
    );
  });
  return container;
};

const button = (container: HTMLElement, text: RegExp) =>
  Array.from(container.querySelectorAll('button')).find(b => text.test(b.textContent ?? ''))!;

describe('Entretien', () => {
  it('has unique ids, a known theme and points on every question', () => {
    expect(new Set(ENTRETIEN_QUESTIONS.map(q => q.id)).size).toBe(ENTRETIEN_QUESTIONS.length);
    for (const q of ENTRETIEN_QUESTIONS) {
      expect(ENTRETIEN_THEMES, q.id).toContain(q.theme);
      expect(q.points.length, q.id).toBeGreaterThan(0);
    }
  });

  it('labels the bullets as hints for a personal question and as key points otherwise', async () => {
    const container = await render(DEFAULT_USER_STATS, () => {});
    const labelOf = (id: string) => {
      const q = ENTRETIEN_QUESTIONS.find(x => x.id === id)!;
      const item = Array.from(container.querySelectorAll('details')).find(d => d.textContent?.includes(q.question))!;
      return item.querySelector('p')?.textContent;
    };
    expect(labelOf('m1')).toBe('Pistes pour construire votre réponse');
    expect(labelOf('c3')).toBe('Points clés');
  });

  it('saves the answer written under a question when the field loses focus', async () => {
    let saved: UserStats | undefined;
    const container = await render(DEFAULT_USER_STATS, s => (saved = s));
    const area = container.querySelector('textarea')!;
    await act(async () => {
      area.value = 'Je suis arrivé en 2015 pour mes études.';
      area.dispatchEvent(new FocusEvent('focusout', { bubbles: true }));
    });
    expect(saved?.entretienNotes).toEqual({ [ENTRETIEN_QUESTIONS[0].id]: 'Je suis arrivé en 2015 pour mes études.' });
  });

  it('rates a question of the oral simulation and shows the written answer', async () => {
    let saved: UserStats | undefined;
    const stats = { ...DEFAULT_USER_STATS, entretienNotes: Object.fromEntries(ENTRETIEN_QUESTIONS.map(q => [q.id, `ma réponse ${q.id}`])) };
    const container = await render(stats, s => (saved = s));
    await act(async () => button(container, /Simulation orale/).click());
    await act(async () => button(container, /^Voir les/).click());
    expect(container.textContent).toMatch(/ma réponse [a-z]+\d+/);
    await act(async () => button(container, /Je savais|Réponse prête/).click());
    const [[id, state]] = Object.entries(saved!.entretienMastery!);
    expect(ENTRETIEN_QUESTIONS.some(q => q.id === id)).toBe(true);
    expect(state.box).toBe(1);
  });
});
