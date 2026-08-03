import { describe, it, expect } from 'vitest';
import { reviewItem, reviewItems, isMastered, isDueForReview, getDueIds, countDue, MAX_BOX } from './spacedRepetition';

const DAY_MS = 24 * 60 * 60 * 1000;
const NOW = 1_000_000_000_000;

describe('reviewItem', () => {
  it('starts an unseen item at box 0 and advances it on a correct answer', () => {
    const map = reviewItem({}, 'q1', true, NOW);
    expect(map.q1.box).toBe(1);
  });

  it('climbs one box per consecutive correct answer', () => {
    let map = reviewItem({}, 'q1', true, NOW);
    map = reviewItem(map, 'q1', true, NOW);
    map = reviewItem(map, 'q1', true, NOW);
    expect(map.q1.box).toBe(3);
  });

  it('resets to box 0 on a wrong answer, even from a high box', () => {
    let map = reviewItem({}, 'q1', true, NOW);
    map = reviewItem(map, 'q1', true, NOW);
    map = reviewItem(map, 'q1', true, NOW);
    map = reviewItem(map, 'q1', false, NOW);
    expect(map.q1.box).toBe(0);
  });

  it('never advances past MAX_BOX', () => {
    let map: Record<string, { box: number; dueAt: number }> = {};
    for (let i = 0; i < 10; i++) {
      map = reviewItem(map, 'q1', true, NOW);
    }
    expect(map.q1.box).toBe(MAX_BOX);
  });

  it('sets dueAt to now for a wrong answer (due immediately)', () => {
    const map = reviewItem({}, 'q1', false, NOW);
    expect(map.q1.dueAt).toBe(NOW);
  });

  it('sets dueAt one day out after the first correct answer', () => {
    const map = reviewItem({}, 'q1', true, NOW);
    expect(map.q1.dueAt).toBe(NOW + 1 * DAY_MS);
  });

  it('sets dueAt to Infinity once an item reaches MAX_BOX (mastered, never due again)', () => {
    let map: Record<string, { box: number; dueAt: number }> = {};
    for (let i = 0; i <= MAX_BOX; i++) {
      map = reviewItem(map, 'q1', true, NOW);
    }
    expect(map.q1.dueAt).toBe(Infinity);
  });

  it('does not mutate the input map', () => {
    const original = { q1: { box: 2, dueAt: NOW } };
    const frozen = { ...original, q1: { ...original.q1 } };
    reviewItem(original, 'q1', true, NOW);
    expect(original).toEqual(frozen);
  });
});

describe('reviewItems', () => {
  it('applies correct/wrong to each id independently based on the correctIds list', () => {
    const map = reviewItems({}, ['a', 'b', 'c'], ['a', 'c'], NOW);
    expect(map.a.box).toBe(1);
    expect(map.b.box).toBe(0);
    expect(map.c.box).toBe(1);
  });
});

describe('isMastered', () => {
  it('is false for an unseen item', () => {
    expect(isMastered({}, 'q1')).toBe(false);
  });

  it('is false below MAX_BOX and true once it reaches MAX_BOX', () => {
    let map: Record<string, { box: number; dueAt: number }> = {};
    for (let i = 0; i < MAX_BOX; i++) {
      expect(isMastered(map, 'q1')).toBe(false);
      map = reviewItem(map, 'q1', true, NOW);
    }
    expect(isMastered(map, 'q1')).toBe(true);
  });
});

describe('isDueForReview', () => {
  it('is false for an item that was never attempted (new, not weak)', () => {
    expect(isDueForReview({}, 'q1', NOW)).toBe(false);
  });

  it('is true right after a wrong answer', () => {
    const map = reviewItem({}, 'q1', false, NOW);
    expect(isDueForReview(map, 'q1', NOW)).toBe(true);
  });

  it('is false before the scheduled due date and true once it arrives', () => {
    const map = reviewItem({}, 'q1', true, NOW);
    expect(isDueForReview(map, 'q1', NOW + 12 * 60 * 60 * 1000)).toBe(false); // 12h later, box 1 needs a full day
    expect(isDueForReview(map, 'q1', NOW + 1 * DAY_MS)).toBe(true);
  });
});

describe('getDueIds / countDue', () => {
  it('excludes unseen items and items not yet due, includes overdue items', () => {
    let map: Record<string, { box: number; dueAt: number }> = {};
    map = reviewItem(map, 'wrong', false, NOW); // due now
    map = reviewItem(map, 'correct', true, NOW); // due in 1 day, not yet
    const ids = ['wrong', 'correct', 'never-seen'];

    expect(getDueIds(map, ids, NOW)).toEqual(['wrong']);
    expect(countDue(map, ids, NOW)).toBe(1);
  });
});
