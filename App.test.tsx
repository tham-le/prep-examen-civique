import { describe, it, expect, vi, beforeEach } from 'vitest';
import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { ALL_QUESTIONS, DEFAULT_USER_STATS, OFFICIAL_DB } from './constants';
import { MAX_BOX } from './services/spacedRepetition';
import { forLevel } from './services/examLevel';

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

  it('narrows the question count to the chosen level and remembers it', async () => {
    window.history.pushState({}, '', '/');
    const container = document.createElement('div');
    await act(async () => {
      createRoot(container).render(<App />);
    });
    expect(container.textContent).toContain(`${ALL_QUESTIONS.length} questions sur les 5 thèmes`);

    const csp = Array.from(container.querySelectorAll('button')).find(b => b.textContent === 'CSP');
    await act(async () => {
      csp!.click();
    });
    const expected = forLevel(ALL_QUESTIONS, 'csp').length;
    expect(expected).toBeLessThan(ALL_QUESTIONS.length);
    expect(container.textContent).toContain(`${expected} questions sur les 5 thèmes`);
    expect(JSON.parse(localStorage.getItem('objectif_citoyen_stats') ?? '{}').examLevel).toBe('csp');
  });

  it('announces a level up and the daily goal right after the answer that earns them', async () => {
    localStorage.setItem('objectif_citoyen_stats', JSON.stringify({ ...DEFAULT_USER_STATS, xp: 95, dailyGoal: 1 }));
    window.history.pushState({}, '', '/quiz');
    const container = document.createElement('div');
    await act(async () => {
      createRoot(container).render(<App />);
    });
    await vi.waitFor(() => expect(container.querySelector('[role=group] button')).not.toBeNull());

    const question = ALL_QUESTIONS.find(q => q.text === container.querySelector('h3')!.textContent)!;
    const right = question.options[question.correctAnswer];
    const option = Array.from(container.querySelectorAll('[role=group] button')).find(b => b.textContent?.trim() === right);
    await act(async () => {
      (option as HTMLElement).click();
    });
    expect(container.textContent).toContain('Niveau 2');
    expect(container.textContent).toContain('Objectif du jour atteint');
  });

  it('shows a medal and the mastered share on a theme tile', async () => {
    const mastery = Object.fromEntries(OFFICIAL_DB.valeurs.map(q => [q.id, { box: MAX_BOX, dueAt: Date.now() + 30 * 86_400_000 }]));
    localStorage.setItem('objectif_citoyen_stats', JSON.stringify({ ...DEFAULT_USER_STATS, questionMastery: mastery }));
    window.history.pushState({}, '', '/');
    const container = document.createElement('div');
    await act(async () => {
      createRoot(container).render(<App />);
    });
    expect(container.textContent).toContain('Médaille platine');
    expect(container.textContent).toContain('100 % maîtrisé');
    expect(container.textContent).toContain('Pas encore commencé');
  });

  it('still opens with damaged saved stats', async () => {
    localStorage.setItem('objectif_citoyen_stats', JSON.stringify({ xp: 'many', questionMastery: null, badges: 'x', daily: 5 }));
    localStorage.setItem('objectif_citoyen_exam_history', '{"not":"a list"}');
    window.history.pushState({}, '', '/');
    const container = document.createElement('div');
    await act(async () => {
      createRoot(container).render(<App />);
    });
    expect(container.textContent).toContain("Préparez l'examen civique");
    expect(container.textContent).not.toContain('Une erreur est survenue');
  });
});
