import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import React, { act, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Arcade, ArcadeMode } from './Arcade';
import { ALL_QUESTIONS, DEFAULT_USER_STATS } from '../constants';
import { UserStats } from '../types';

(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

let latest: UserStats;
const Harness = ({ mode }: { mode: ArcadeMode }) => {
  const [stats, setStats] = useState<UserStats>(DEFAULT_USER_STATS);
  latest = stats;
  return <Arcade mode={mode} userStats={stats} onStatsUpdate={setStats} onExit={() => {}} />;
};

const setup = async (mode: ArcadeMode) => {
  const container = document.createElement('div');
  await act(async () => {
    createRoot(container).render(<Harness mode={mode} />);
  });
  return container;
};

const press = async (container: HTMLElement, label: string) => {
  const button = Array.from(container.querySelectorAll('button')).find(b => b.textContent?.includes(label));
  await act(async () => {
    button!.click();
  });
};

const optionsOf = (container: HTMLElement) => Array.from(container.querySelectorAll('[role=group] button'));
const rightOption = (container: HTMLElement) => {
  const question = ALL_QUESTIONS.find(q => q.text === container.querySelector('h3')!.textContent)!;
  return question.options[question.correctAnswer];
};
const answer = async (container: HTMLElement, correct: boolean) => {
  const right = rightOption(container);
  const option = optionsOf(container).find(b => (b.textContent?.trim() === right) === correct);
  await act(async () => {
    (option as HTMLElement).click();
  });
};
const wait = async (ms: number) => {
  await act(async () => {
    vi.advanceTimersByTime(ms);
  });
};

describe('Arcade', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    localStorage.clear();
  });
  afterEach(() => vi.useRealTimers());

  it('Défi éclair: counts correct answers for 60 seconds and keeps the best score', async () => {
    const container = await setup('blitz');
    expect(container.textContent).toContain('Meilleur score : 0');
    await press(container, 'Commencer');

    await answer(container, true);
    await wait(800);
    await answer(container, false);
    await wait(800);
    await answer(container, true);
    await wait(800);
    expect(container.textContent).toContain('58 s');

    await wait(60_000);
    expect(container.textContent).toContain('Partie terminée');
    expect(latest.bestBlitz).toBe(2);
    expect(container.textContent).toContain('À retenir (1)');
    expect(container.textContent).toContain('Nouveau record');
  });

  it('Défi éclair: an answer right before the end does not break the result screen', async () => {
    const container = await setup('blitz');
    await press(container, 'Commencer');
    await wait(59_500);
    await answer(container, true);
    await wait(2_000);
    expect(container.textContent).toContain('Partie terminée');
    expect(latest.bestBlitz).toBe(1);
  });

  it('Survie: ends on the third mistake and shows what to remember', async () => {
    const container = await setup('survival');
    await press(container, 'Commencer');
    await answer(container, true);
    await wait(800);

    for (let i = 0; i < 3; i++) {
      await answer(container, false);
      expect(container.textContent).toContain(i < 2 ? 'Continuer' : 'Voir le résultat');
      await press(container, i < 2 ? 'Continuer' : 'Voir le résultat');
    }
    expect(container.textContent).toContain('Partie terminée');
    expect(container.textContent).toContain('À retenir (3)');
    expect(latest.bestSurvival).toBe(1);
  });

  it('pays XP and counts toward the day like a quiz answer', async () => {
    const container = await setup('survival');
    await press(container, 'Commencer');
    await answer(container, true);
    expect(latest.xp).toBeGreaterThanOrEqual(10);
    expect(latest.daily?.answered).toBe(1);
    expect(Object.keys(latest.questionMastery)).toHaveLength(1);
  });
});
