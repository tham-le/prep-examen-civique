import { describe, it, expect } from 'vitest';
import { buildExam, KNOWLEDGE_COUNT, SCENARIO_COUNT } from './examComposition';
import { Question } from '../types';

const make = (prefix: string, n: number, type: Question['type'] = 'multiple-choice'): Question[] =>
  Array.from({ length: n }, (_, i) => ({
    id: `${prefix}${i}`, text: '', options: ['a', 'b', 'c', 'd'], correctAnswer: 0, explanation: '', category: prefix, type,
  }));

describe('buildExam', () => {
  const themes = ['a', 'b', 'c', 'd', 'e'].map(p => make(p, 40));
  const scenarios = make('sc', 20, 'scenario');

  it('has 28 knowledge questions and 12 scenarios, all different', () => {
    const exam = buildExam(themes, scenarios);
    expect(exam).toHaveLength(KNOWLEDGE_COUNT + SCENARIO_COUNT);
    expect(exam.filter(q => q.type === 'scenario')).toHaveLength(SCENARIO_COUNT);
    expect(new Set(exam.map(q => q.id)).size).toBe(exam.length);
  });

  it('draws at least 5 knowledge questions from every theme', () => {
    const exam = buildExam(themes, scenarios);
    for (const p of ['a', 'b', 'c', 'd', 'e']) {
      expect(exam.filter(q => q.category === p).length).toBeGreaterThanOrEqual(5);
    }
  });

  it('uses every scenario it has when there are fewer than 12', () => {
    expect(buildExam(themes, make('sc', 5, 'scenario'))).toHaveLength(KNOWLEDGE_COUNT + 5);
  });
});
