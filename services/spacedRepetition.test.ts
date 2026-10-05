import { describe, it, expect } from 'vitest';
import { reviewItem, reviewItems, isMastered, isDueForReview, getDueIds, countDue, getItemStatus, selectSessionItems, MAX_BOX } from './spacedRepetition';

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

  it('sets dueAt 30 days out once an item reaches MAX_BOX (mastered, checked once more later)', () => {
    let map: Record<string, { box: number; dueAt: number }> = {};
    for (let i = 0; i <= MAX_BOX; i++) {
      map = reviewItem(map, 'q1', true, NOW);
    }
    expect(map.q1.dueAt).toBe(NOW + 30 * DAY_MS);
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
      expect(isMastered(map, 'q1', NOW)).toBe(false);
      map = reviewItem(map, 'q1', true, NOW);
    }
    expect(isMastered(map, 'q1', NOW)).toBe(true);
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

describe('getItemStatus', () => {
  it('classifies an unseen item as never-attempted', () => {
    expect(getItemStatus({}, 'q1', NOW)).toBe('never-attempted');
  });

  it('classifies a wrong answer as due', () => {
    const map = reviewItem({}, 'q1', false, NOW);
    expect(getItemStatus(map, 'q1', NOW)).toBe('due');
  });

  it('classifies a correct answer not yet due as learning', () => {
    const map = reviewItem({}, 'q1', true, NOW);
    expect(getItemStatus(map, 'q1', NOW)).toBe('learning');
  });

  it('classifies an item that reached MAX_BOX as mastered until its recheck is due', () => {
    let map: Record<string, { box: number; dueAt: number }> = {};
    for (let i = 0; i <= MAX_BOX; i++) {
      map = reviewItem(map, 'q1', true, NOW);
    }
    expect(getItemStatus(map, 'q1', NOW + 29 * DAY_MS)).toBe('mastered');
    expect(getItemStatus(map, 'q1', NOW + 31 * DAY_MS)).toBe('due');
  });

  it('keeps a rechecked item mastered after a correct answer and drops it to box 0 after a wrong one', () => {
    let map: Record<string, { box: number; dueAt: number }> = {};
    for (let i = 0; i <= MAX_BOX; i++) {
      map = reviewItem(map, 'q1', true, NOW);
    }
    const later = NOW + 31 * DAY_MS;
    expect(getItemStatus(reviewItem(map, 'q1', true, later), 'q1', later)).toBe('mastered');
    expect(reviewItem(map, 'q1', false, later).q1.box).toBe(0);
  });
});

describe('selectSessionItems', () => {
  const item = (id: string) => ({ id });

  it('fills the session with never-attempted items first when there are enough', () => {
    const pool = [item('a'), item('b'), item('c'), item('d')];
    const map = reviewItem({}, 'a', true, NOW); // 'a' has been seen, learning
    const session = selectSessionItems(pool, map, 2, NOW);
    expect(session.every(q => q.id !== 'a')).toBe(true);
  });

  it('prioritizes due items over already-learned ones when there are not enough unseen items', () => {
    const pool = [item('learned'), item('due')];
    let map = reviewItem({}, 'learned', true, NOW); // learning, not due yet
    map = reviewItem(map, 'due', false, NOW); // wrong answer, due now
    const session = selectSessionItems(pool, map, 1, NOW);
    expect(session[0].id).toBe('due');
  });

  it('falls back to already-learned items to fill the session once new and due items run out', () => {
    const pool = [item('learned')];
    const map = reviewItem({}, 'learned', true, NOW);
    const session = selectSessionItems(pool, map, 5, NOW);
    expect(session).toHaveLength(1);
    expect(session[0].id).toBe('learned');
  });

  it('caps the session at the requested size', () => {
    const pool = [item('a'), item('b'), item('c')];
    const session = selectSessionItems(pool, {}, 2, NOW);
    expect(session).toHaveLength(2);
  });
});
