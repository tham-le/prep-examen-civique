import { describe, it, expect } from 'vitest';
import { forLevel } from './examLevel';
import { OFFICIAL_DB, THEMES } from '../constants';
import { buildExam, KNOWLEDGE_COUNT, SCENARIO_COUNT } from './examComposition';
import { ExamLevel } from '../types';

describe('every level has enough questions for a full mock exam', () => {
  for (const level of ['cr', 'csp'] as ExamLevel[]) {
    it(`level ${level}`, () => {
      const available = THEMES.map(t => forLevel(OFFICIAL_DB[t.id], level));
      const themes = available.map(pool => pool.filter(q => q.type !== 'scenario'));
      const scenarios = available.map(pool => pool.filter(q => q.type === 'scenario'));
      themes.forEach(pool => expect(pool.length).toBeGreaterThanOrEqual(10));
      scenarios.forEach(pool => expect(pool.length).toBeGreaterThanOrEqual(2));
      expect(scenarios.flat().length).toBeGreaterThanOrEqual(SCENARIO_COUNT);
      expect(buildExam(themes, scenarios)).toHaveLength(KNOWLEDGE_COUNT + SCENARIO_COUNT);
    });
  }
});
