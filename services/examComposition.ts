import { Question } from '../types';
import { shuffle } from './spacedRepetition';

export const KNOWLEDGE_COUNT = 28;
export const SCENARIO_COUNT = 12;

// Same split as the official exam: 28 knowledge questions and 12 mises en
// situation. Knowledge questions are drawn in turn from each theme so every
// theme appears.
export const buildExam = (themePools: Question[][], scenarios: Question[]): Question[] => {
  const queues = themePools.map(shuffle);
  const knowledge: Question[] = [];
  let turn = 0;
  while (knowledge.length < KNOWLEDGE_COUNT && queues.some(q => q.length > 0)) {
    const question = queues[turn++ % queues.length].pop();
    if (question) knowledge.push(question);
  }
  return shuffle([...knowledge, ...shuffle(scenarios).slice(0, SCENARIO_COUNT)]);
};
