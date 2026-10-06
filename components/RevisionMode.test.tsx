import { describe, it, expect } from 'vitest';
import React, { act, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { MemoryRouter } from 'react-router-dom';
import { RevisionMode } from './RevisionMode';
import { ALL_QUESTIONS, DEFAULT_USER_STATS } from '../constants';
import { UserStats } from '../types';

(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

let latest: UserStats;
const Harness = () => {
  const [stats, setStats] = useState<UserStats>(DEFAULT_USER_STATS);
  latest = stats;
  return (
    <MemoryRouter>
      <RevisionMode userStats={stats} onStatsUpdate={setStats} />
    </MemoryRouter>
  );
};

const setup = async () => {
  const container = document.createElement('div');
  await act(async () => {
    createRoot(container).render(<Harness />);
  });
  return container;
};

const shown = (c: HTMLElement) => c.querySelectorAll('[id^=revision-q-]').length;
const header = (c: HTMLElement, i: number) => c.querySelector(`#revision-q-${i} button`) as HTMLElement;
const badgeTitle = (c: HTMLElement, i: number) => c.querySelector(`#revision-q-${i} span[title]`)?.getAttribute('title');

describe('RevisionMode', () => {
  it('shows 30 questions at first and 30 more on request', async () => {
    const container = await setup();
    expect(shown(container)).toBe(30);
    expect(container.textContent).toContain(`${ALL_QUESTIONS.length - 30} restantes`);

    const more = Array.from(container.querySelectorAll('button')).find(b => b.textContent?.includes('de plus'));
    await act(async () => {
      more!.click();
    });
    expect(shown(container)).toBe(60);
  });

  it('marks a question as seen once its answer is opened', async () => {
    const container = await setup();
    expect(badgeTitle(container, 0)).toBe('Jamais vue');
    await act(async () => {
      header(container, 0).click();
    });
    expect(badgeTitle(container, 0)).toBe('Vue');
    expect(latest.seenQuestions).toHaveLength(1);
    expect(container.textContent).toContain('Vues (1)');
  });

  it('marks the next question as seen with Suivante', async () => {
    const container = await setup();
    await act(async () => {
      header(container, 0).click();
    });
    const next = Array.from(container.querySelectorAll('button')).find(b => b.textContent?.includes('Suivante'));
    await act(async () => {
      next!.click();
    });
    expect(badgeTitle(container, 1)).toBe('Vue');
    expect(latest.seenQuestions).toHaveLength(2);
  });

  it('lets a quiz answer win over the seen mark', async () => {
    const container = document.createElement('div');
    const id = ALL_QUESTIONS[0].id;
    const stats: UserStats = {
      ...DEFAULT_USER_STATS,
      seenQuestions: [id],
      questionMastery: { [id]: { box: 1, dueAt: Date.now() + 86_400_000 } },
    };
    await act(async () => {
      createRoot(container).render(
        <MemoryRouter>
          <RevisionMode userStats={stats} onStatsUpdate={() => {}} />
        </MemoryRouter>
      );
    });
    expect(badgeTitle(container, 0)).toBe('En cours');
  });
});
