import { describe, it, expect } from 'vitest';
import React, { act, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { QuestionOfDay } from './QuestionOfDay';
import { ALL_QUESTIONS, DEFAULT_USER_STATS } from '../constants';
import { dayKey, questionOfDay } from '../services/progress';
import { UserStats } from '../types';

(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

let latest: UserStats;
const Harness = ({ initial }: { initial: UserStats }) => {
  const [stats, setStats] = useState(initial);
  latest = stats;
  return <QuestionOfDay userStats={stats} onStatsUpdate={setStats} />;
};

const render = async (initial: UserStats = DEFAULT_USER_STATS) => {
  const container = document.createElement('div');
  await act(async () => {
    createRoot(container).render(<Harness initial={initial} />);
  });
  return container;
};

describe('QuestionOfDay', () => {
  const todays = questionOfDay(dayKey(Date.now()), ALL_QUESTIONS)!;

  it('shows today\'s question and lets you answer once', async () => {
    const container = await render();
    expect(container.textContent).toContain(todays.text);
    const options = Array.from(container.querySelectorAll('[role=group] button')) as HTMLElement[];
    await act(async () => {
      options[todays.correctAnswer].click();
    });
    expect(container.textContent).toContain('Bravo, +30 XP');
    expect(container.textContent).toContain(todays.explanation);
    expect(latest.daily?.questionOfDay?.choice).toBe(todays.correctAnswer);
    expect(options.every(b => (b as HTMLButtonElement).disabled)).toBe(true);
  });

  it('shows the answer again after a reload', async () => {
    const wrong = (todays.correctAnswer + 1) % 4;
    const container = await render({
      ...DEFAULT_USER_STATS,
      daily: { date: dayKey(Date.now()), answered: 1, correct: 0, scenario: 0, bestCombo: 0, goalReached: false, missionsDone: [], questionOfDay: { id: todays.id, choice: wrong } },
    });
    expect(container.textContent).toContain('Pas cette fois');
  });
});
