import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import { ExamSimulation } from './ExamSimulation';
import { DEFAULT_USER_STATS } from '../constants';

(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

describe('ExamSimulation timeout', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    localStorage.clear();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it('records the 40 exam questions when the time runs out', async () => {
    const onStatsUpdate = vi.fn();
    const container = document.createElement('div');
    const root = createRoot(container);

    await act(async () => {
      root.render(<ExamSimulation onStatsUpdate={onStatsUpdate} userStats={DEFAULT_USER_STATS} />);
    });
    const start = Array.from(container.querySelectorAll('button')).find(b => b.textContent?.includes('Lancer le chronomètre'));
    await act(async () => {
      start!.click();
    });
    await act(async () => {
      vi.advanceTimersByTime(2700 * 1000);
    });

    expect(onStatsUpdate).toHaveBeenCalledTimes(1);
    expect(Object.keys(onStatsUpdate.mock.calls[0][0].questionMastery)).toHaveLength(40);
    expect(container.textContent).toContain('Résultat par thème');
    expect(container.textContent).toContain('Mises en situation');
  });

  const startExam = async () => {
    const container = document.createElement('div');
    await act(async () => {
      createRoot(container).render(<ExamSimulation onStatsUpdate={vi.fn()} userStats={DEFAULT_USER_STATS} />);
    });
    const start = Array.from(container.querySelectorAll('button')).find(b => b.textContent?.includes('Lancer le chronomètre'));
    await act(async () => {
      start!.click();
    });
    return container;
  };

  it('jumps to a question from the numbered list and marks answered ones', async () => {
    const container = await startExam();
    const jump = container.querySelector('[aria-label="Question 17, sans réponse"]') as HTMLElement;
    await act(async () => {
      jump.click();
    });
    expect(container.textContent).toContain('17 / 40');

    const option = container.querySelector('[role=group] button') as HTMLElement;
    await act(async () => {
      option.click();
    });
    expect(container.querySelector('[aria-label="Question 17, répondue"]')).not.toBeNull();
  });

  it('asks before finishing with unanswered questions', async () => {
    const container = await startExam();
    const finish = Array.from(container.querySelectorAll('button')).find(b => b.textContent?.includes("Terminer l'examen"))!;

    const confirm = vi.spyOn(window, 'confirm').mockReturnValue(false);
    await act(async () => {
      finish.click();
    });
    expect(confirm).toHaveBeenCalledWith('40 questions sans réponse. Terminer l\'examen quand même ?');
    expect(container.textContent).not.toContain('Résultat par thème');

    confirm.mockReturnValue(true);
    await act(async () => {
      finish.click();
    });
    expect(container.textContent).toContain('Résultat par thème');
  });
});
