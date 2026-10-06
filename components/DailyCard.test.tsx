import { describe, it, expect, vi } from 'vitest';
import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import { DailyCard } from './DailyCard';
import { DEFAULT_USER_STATS } from '../constants';
import { UserStats } from '../types';
import { dayKey, missionsFor } from '../services/progress';

(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

const render = async (stats: UserStats = DEFAULT_USER_STATS, onStatsUpdate = vi.fn()) => {
  const container = document.createElement('div');
  await act(async () => {
    createRoot(container).render(<DailyCard userStats={stats} onStatsUpdate={onStatsUpdate} />);
  });
  return container;
};

describe('DailyCard', () => {
  it('shows an empty day with the default goal and three missions', async () => {
    const container = await render();
    expect(container.textContent).toContain('0/10');
    expect(container.querySelectorAll('li')).toHaveLength(3);
    expect(container.textContent).toContain('0 jour de suite');
  });

  it('shows what was done today', async () => {
    const today = dayKey(Date.now());
    const [first] = missionsFor(today);
    const container = await render({
      ...DEFAULT_USER_STATS,
      streak: 3,
      daily: { date: today, answered: 4, correct: 3, scenario: 0, bestCombo: 2, goalReached: false, missionsDone: [first.id] },
    });
    expect(container.textContent).toContain('4/10');
    expect(container.textContent).toContain('Encore 6 questions');
    expect(container.textContent).toContain('3 jours de suite');
    expect(container.textContent).toContain(`+${first.xp} XP`);
  });

  it('ignores progress from another day', async () => {
    const container = await render({
      ...DEFAULT_USER_STATS,
      daily: { date: '2020-01-01', answered: 9, correct: 9, scenario: 0, bestCombo: 9, goalReached: true, missionsDone: [] },
    });
    expect(container.textContent).toContain('0/10');
  });

  it('changes the daily goal', async () => {
    const onStatsUpdate = vi.fn();
    const container = await render(DEFAULT_USER_STATS, onStatsUpdate);
    const twenty = Array.from(container.querySelectorAll('button')).find(b => b.textContent === '20');
    await act(async () => {
      twenty!.click();
    });
    expect(onStatsUpdate).toHaveBeenCalledWith(expect.objectContaining({ dailyGoal: 20 }));
  });
});
