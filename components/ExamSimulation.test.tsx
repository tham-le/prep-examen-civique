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
});
