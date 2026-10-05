import { describe, it, expect } from 'vitest';
import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import { MemoryRouter } from 'react-router-dom';
import { RevisionMode } from './RevisionMode';
import { ALL_QUESTIONS, DEFAULT_USER_STATS } from '../constants';

(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

const shown = (c: HTMLElement) => c.querySelectorAll('[id^=revision-q-]').length;

describe('RevisionMode', () => {
  it('shows 30 questions at first and 30 more on request', async () => {
    const container = document.createElement('div');
    await act(async () => {
      createRoot(container).render(<MemoryRouter><RevisionMode userStats={DEFAULT_USER_STATS} /></MemoryRouter>);
    });
    expect(shown(container)).toBe(30);
    expect(container.textContent).toContain(`${ALL_QUESTIONS.length - 30} restantes`);

    const more = Array.from(container.querySelectorAll('button')).find(b => b.textContent?.includes('de plus'));
    await act(async () => {
      more!.click();
    });
    expect(shown(container)).toBe(60);
  });
});
