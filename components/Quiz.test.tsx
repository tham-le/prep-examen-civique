import { describe, it, expect, beforeEach } from 'vitest';
import React, { act, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Quiz } from './Quiz';
import { ALL_QUESTIONS, DEFAULT_USER_STATS } from '../constants';
import { UserStats } from '../types';

(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

let latest: UserStats;
const Harness = () => {
  const [stats, setStats] = useState<UserStats>(DEFAULT_USER_STATS);
  latest = stats;
  return <Quiz onExit={() => {}} onStatsUpdate={setStats} userStats={stats} />;
};

const click = async (el: Element | undefined) => {
  await act(async () => {
    (el as HTMLElement).click();
  });
};

// Answers the shown question correctly, looking its right option up in the bank
const answerCorrectly = async (container: HTMLElement) => {
  const text = container.querySelector('h3')!.textContent;
  const question = ALL_QUESTIONS.find(q => q.text === text)!;
  const right = question.options[question.correctAnswer];
  const options = Array.from(container.querySelectorAll('[role=group] button'));
  await click(options.find(b => b.textContent?.trim() === right));
};

const findButton = (container: HTMLElement, label: string) =>
  Array.from(container.querySelectorAll('button')).find(b => b.textContent?.includes(label));

describe('Quiz', () => {
  beforeEach(() => localStorage.clear());

  const setup = async () => {
    const container = document.createElement('div');
    await act(async () => {
      createRoot(container).render(<Harness />);
    });
    return container;
  };

  it('records each answer at once, even if the quiz is left early', async () => {
    const container = await setup();
    for (let i = 0; i < 3; i++) {
      await answerCorrectly(container);
      await click(findButton(container, 'Suivant'));
    }
    expect(Object.keys(latest.questionMastery)).toHaveLength(3);
  });

  it('counts a perfect session once', async () => {
    const container = await setup();
    await answerCorrectly(container);
    expect(container.textContent).toContain('1 bonnes réponses');
    for (let i = 0; i < 10; i++) {
      if (i > 0) await answerCorrectly(container);
      await click(findButton(container, i === 9 ? 'Voir les résultats' : 'Suivant'));
    }
    expect(container.textContent).toContain('10 / 10');
    expect(latest.totalCorrect).toBe(10);
    expect(Object.keys(latest.questionMastery)).toHaveLength(10);
  });
});

describe('Quiz corrections', () => {
  beforeEach(() => localStorage.clear());

  it('lists the wrong answers with the right one after the last question', async () => {
    const container = document.createElement('div');
    await act(async () => {
      createRoot(container).render(<Harness />);
    });
    for (let i = 0; i < 10; i++) {
      if (i < 4) {
        // answer wrong on the first 4 questions: pick an option that is not the right one
        const text = container.querySelector('h3')!.textContent;
        const question = ALL_QUESTIONS.find(q => q.text === text)!;
        const right = question.options[question.correctAnswer];
        const wrong = Array.from(container.querySelectorAll('[role=group] button')).find(b => b.textContent?.trim() !== right);
        await click(wrong);
      } else {
        await answerCorrectly(container);
      }
      await click(findButton(container, i === 9 ? 'Voir les résultats' : 'Suivant'));
    }
    expect(container.textContent).toContain('Correction (4 erreurs)');
    expect(container.textContent).toContain('Votre réponse');
    expect(container.textContent).toContain('Bonne réponse');
  });
});
