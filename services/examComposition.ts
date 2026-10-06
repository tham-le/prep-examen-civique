import { Question } from '../types';
import { shuffle } from './spacedRepetition';

export const KNOWLEDGE_COUNT = 28;
export const SCENARIO_COUNT = 12;
// Questions of the last two exams are set aside while enough others remain
export const RECENT_LIMIT = 2 * (KNOWLEDGE_COUNT + SCENARIO_COUNT);

// Takes from the pools in turn, starting with a random pool each time, so every
// pool appears and the extra questions do not always go to the same theme.
// Questions not in `recent` come first.
const take = (pools: Question[][], count: number, recent: ReadonlySet<string>): Question[] => {
  const queues = shuffle(pools).map(pool => {
    const mixed = shuffle(pool);
    // taken from the end, so the questions seen recently go first in the array
    return [...mixed.filter(q => recent.has(q.id)), ...mixed.filter(q => !recent.has(q.id))];
  });
  const taken: Question[] = [];
  let turn = 0;
  while (taken.length < count && queues.some(queue => queue.length > 0)) {
    const question = queues[turn++ % queues.length].pop();
    if (question) taken.push(question);
  }
  return taken;
};

// Same split as the official exam: 28 knowledge questions and 12 mises en
// situation, both spread over all the themes.
export const buildExam = (
  knowledgePools: Question[][],
  scenarioPools: Question[][],
  recent: ReadonlySet<string> = new Set()
): Question[] =>
  shuffle([...take(knowledgePools, KNOWLEDGE_COUNT, recent), ...take(scenarioPools, SCENARIO_COUNT, recent)]);
