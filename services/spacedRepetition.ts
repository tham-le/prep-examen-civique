
import { SRSMap } from '../types';

// Leitner box system: each correct answer moves an item up a box (longer delay
// before it's due again); any wrong answer sends it back to box 0 (due immediately).
// Reaching the last box means the item needs no further review.
const BOX_INTERVAL_DAYS = [0, 1, 3, 7, 16];
export const MAX_BOX = BOX_INTERVAL_DAYS.length - 1;
const DAY_MS = 24 * 60 * 60 * 1000;

export const reviewItem = (map: SRSMap, id: string, correct: boolean, now: number = Date.now()): SRSMap => {
  const prevBox = map[id]?.box ?? 0;
  const nextBox = correct ? Math.min(prevBox + 1, MAX_BOX) : 0;
  const dueAt = nextBox === MAX_BOX ? Infinity : now + BOX_INTERVAL_DAYS[nextBox] * DAY_MS;

  return { ...map, [id]: { box: nextBox, dueAt } };
};

export const reviewItems = (map: SRSMap, ids: string[], correctIds: string[], now: number = Date.now()): SRSMap => {
  let result = map;
  for (const id of ids) {
    result = reviewItem(result, id, correctIds.includes(id), now);
  }
  return result;
};

export const isMastered = (map: SRSMap, id: string): boolean => (map[id]?.box ?? 0) >= MAX_BOX;

// "Due for review" only applies to items that have been attempted before;
// items never seen are new, not weak, so they're excluded here.
export const isDueForReview = (map: SRSMap, id: string, now: number = Date.now()): boolean => {
  const state = map[id];
  return state !== undefined && state.dueAt <= now;
};

export const getDueIds = (map: SRSMap, ids: string[], now: number = Date.now()): string[] =>
  ids.filter(id => isDueForReview(map, id, now));

export const countDue = (map: SRSMap, ids: string[], now: number = Date.now()): number =>
  getDueIds(map, ids, now).length;

export type ItemStatus = 'never-attempted' | 'due' | 'learning' | 'mastered';

// A single status combining the checks above, for UI that shows one badge per item.
export const getItemStatus = (map: SRSMap, id: string, now: number = Date.now()): ItemStatus => {
  const state = map[id];
  if (!state) return 'never-attempted';
  if (state.box >= MAX_BOX) return 'mastered';
  if (state.dueAt <= now) return 'due';
  return 'learning';
};

const shuffle = <T,>(items: T[]): T[] => {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};

// Builds a session from a pool, prioritizing never-attempted items, then due
// items, then everything else, each shuffled within its own group. A pure
// random sample of a themed pool (as small as ~55 questions) overlaps
// heavily between two consecutive sessions by chance; this keeps sessions
// cycling through unseen and weak material first instead of re-serving
// questions already mastered.
export const selectSessionItems = <T extends { id: string }>(
  pool: T[],
  map: SRSMap,
  size: number,
  now: number = Date.now()
): T[] => {
  const never = pool.filter(item => !map[item.id]);
  const due = pool.filter(item => map[item.id] && isDueForReview(map, item.id, now));
  const rest = pool.filter(item => map[item.id] && !isDueForReview(map, item.id, now));

  return [...shuffle(never), ...shuffle(due), ...shuffle(rest)].slice(0, size);
};
