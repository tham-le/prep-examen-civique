import { SRSMap } from '../types';
import { getItemStatus } from './spacedRepetition';

export const masteredCount = (map: SRSMap, ids: string[], now: number = Date.now()): number =>
  ids.filter(id => getItemStatus(map, id, now) === 'mastered').length;

// Whole days from today to a yyyy-mm-dd date; negative once it has passed.
export const daysUntil = (date: string, now: number = Date.now()): number => {
  const today = new Date(now);
  today.setHours(0, 0, 0, 0);
  return Math.round((new Date(`${date}T00:00:00`).getTime() - today.getTime()) / 86_400_000);
};
