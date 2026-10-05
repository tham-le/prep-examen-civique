import { describe, it, expect } from 'vitest';
import { forLevel } from './examLevel';
import { OFFICIAL_DB, THEMES, ALL_QUESTIONS } from '../constants';
import { buildExam, KNOWLEDGE_COUNT, SCENARIO_COUNT } from './examComposition';
import { ExamLevel } from '../types';

describe('every level has enough questions for a full mock exam', () => {
  for (const level of ['cr', 'csp'] as ExamLevel[]) {
    it(`level ${level}`, () => {
      const themes = THEMES.map(t => forLevel(OFFICIAL_DB[t.id], level).filter(q => q.type !== 'scenario'));
      themes.forEach(pool => expect(pool.length).toBeGreaterThanOrEqual(10));
      const scenarios = forLevel(ALL_QUESTIONS, level).filter(q => q.type === 'scenario');
      expect(scenarios.length).toBeGreaterThanOrEqual(SCENARIO_COUNT);
      expect(buildExam(themes, scenarios)).toHaveLength(KNOWLEDGE_COUNT + SCENARIO_COUNT);
    });
  }
});
