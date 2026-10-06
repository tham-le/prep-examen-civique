import { describe, it, expect } from 'vitest';
import { buildExam, KNOWLEDGE_COUNT, SCENARIO_COUNT } from './examComposition';
import { Question } from '../types';

const make = (prefix: string, n: number, type: Question['type'] = 'multiple-choice'): Question[] =>
  Array.from({ length: n }, (_, i) => ({
    id: `${prefix}${i}`, text: '', options: ['a', 'b', 'c', 'd'], correctAnswer: 0, explanation: '', category: prefix, type,
  }));

const THEMES = ['a', 'b', 'c', 'd', 'e'];
const knowledge = THEMES.map(p => make(p, 40));
const scenarios = THEMES.map(p => make('s' + p, 6, 'scenario'));

describe('buildExam', () => {
  it('has 28 knowledge questions and 12 scenarios, all different', () => {
    const exam = buildExam(knowledge, scenarios);
    expect(exam).toHaveLength(KNOWLEDGE_COUNT + SCENARIO_COUNT);
    expect(exam.filter(q => q.type === 'scenario')).toHaveLength(SCENARIO_COUNT);
    expect(new Set(exam.map(q => q.id)).size).toBe(exam.length);
  });

  it('draws knowledge and scenario questions from every theme', () => {
    for (let run = 0; run < 50; run++) {
      const exam = buildExam(knowledge, scenarios);
      for (const p of THEMES) {
        expect(exam.filter(q => q.category === p).length).toBeGreaterThanOrEqual(5);
        expect(exam.filter(q => q.category === 's' + p).length).toBeGreaterThanOrEqual(2);
      }
    }
  });

  it('does not always give the extra questions to the same themes', () => {
    const withSix = new Set<string>();
    for (let run = 0; run < 100; run++) {
      const exam = buildExam(knowledge, scenarios);
      for (const p of THEMES) if (exam.filter(q => q.category === p).length === 6) withSix.add(p);
    }
    expect(withSix.size).toBe(THEMES.length);
  });

  it('uses every scenario it has when there are fewer than 12', () => {
    const few = THEMES.map((p, i) => make('s' + p, i === 0 ? 3 : 0, 'scenario'));
    expect(buildExam(knowledge, few)).toHaveLength(KNOWLEDGE_COUNT + 3);
  });

  it('leaves out the questions of recent exams while others remain', () => {
    const first = buildExam(knowledge, scenarios);
    const recent = new Set(first.map(q => q.id));
    for (let run = 0; run < 30; run++) {
      const next = buildExam(knowledge, scenarios, recent);
      expect(next.filter(q => recent.has(q.id))).toHaveLength(0);
    }
  });

  it('reuses recent questions only when a pool has nothing else', () => {
    const small = THEMES.map(p => make(p, 6));
    const recent = new Set(small.flat().map(q => q.id));
    expect(buildExam(small, scenarios, recent)).toHaveLength(KNOWLEDGE_COUNT + SCENARIO_COUNT);
  });
});
