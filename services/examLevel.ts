import { ExamLevel } from '../types';

// Keeps what applies to the chosen residence permit: items with no level count for both.
export const forLevel = <T extends { level?: ExamLevel }>(items: T[], level?: ExamLevel): T[] =>
  level ? items.filter(item => !item.level || item.level === level) : items;
