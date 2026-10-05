import { describe, it, expect } from 'vitest';
import { daysUntil, masteredCount } from './readiness';
import { reviewItem, MAX_BOX } from './spacedRepetition';
import { forLevel } from './examLevel';

const NOW = new Date(2026, 9, 5, 15, 30).getTime();

describe('daysUntil', () => {
  it('counts whole days from today', () => {
    expect(daysUntil('2026-10-05', NOW)).toBe(0);
    expect(daysUntil('2026-10-12', NOW)).toBe(7);
    expect(daysUntil('2026-10-01', NOW)).toBe(-4);
  });
});

describe('masteredCount', () => {
  it('counts only items that reached the last box', () => {
    let map = {};
    for (let i = 0; i <= MAX_BOX; i++) map = reviewItem(map, 'a', true, NOW);
    map = reviewItem(map, 'b', true, NOW);
    expect(masteredCount(map, ['a', 'b', 'c'], NOW)).toBe(1);
  });
});

describe('forLevel', () => {
  const items = [{ id: 1 }, { id: 2, level: 'cr' as const }, { id: 3, level: 'csp' as const }];
  it('keeps everything without a level', () => {
    expect(forLevel(items)).toHaveLength(3);
  });
  it('keeps items with no level plus those of the chosen level', () => {
    expect(forLevel(items, 'cr').map(i => i.id)).toEqual([1, 2]);
    expect(forLevel(items, 'csp').map(i => i.id)).toEqual([1, 3]);
  });
});
