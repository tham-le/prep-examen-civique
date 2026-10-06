import { DailyProgress, ExamLevel, Question, UserStats } from '../types';
import { OFFICIAL_DB, THEMES } from '../constants';
import { calculateLevel, checkBadges } from './gamificationService';
import { forLevel } from './examLevel';
import { masteredCount } from './readiness';
import { reviewItem } from './spacedRepetition';

export const DEFAULT_GOAL = 10;
export const XP_PER_CORRECT = 10;
export const GOAL_BONUS_XP = 20;
export const QUESTION_OF_DAY_BONUS_XP = 20;
const COMBO_BONUS_XP: Record<number, number> = { 3: 5, 5: 10, 10: 20 };

export type Metric = 'answered' | 'correct' | 'scenario' | 'bestCombo';

export interface Mission {
  id: string;
  label: string;
  metric: Metric;
  target: number;
  xp: number;
}

const MISSIONS: Mission[] = [
  { id: 'answer10', label: 'Répondre à 10 questions', metric: 'answered', target: 10, xp: 20 },
  { id: 'answer20', label: 'Répondre à 20 questions', metric: 'answered', target: 20, xp: 40 },
  { id: 'correct7', label: 'Donner 7 bonnes réponses', metric: 'correct', target: 7, xp: 25 },
  { id: 'scenario1', label: 'Réussir une mise en situation', metric: 'scenario', target: 1, xp: 20 },
  { id: 'combo5', label: 'Enchaîner 5 bonnes réponses', metric: 'bestCombo', target: 5, xp: 30 },
];

const pad = (n: number) => String(n).padStart(2, '0');

// Local calendar day, so a day ends at the user's midnight and not at UTC midnight
export const dayKey = (now: number, offsetDays = 0): string => {
  const d = new Date(now);
  d.setDate(d.getDate() + offsetDays);
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};

const hash = (text: string): number => {
  let h = 0;
  for (const ch of text) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return h;
};

// Three missions per day, the same all day for everyone
export const missionsFor = (date: string): Mission[] =>
  [...MISSIONS].sort((a, b) => hash(date + a.id) - hash(date + b.id)).slice(0, 3);

export const missionById = (id: string): Mission | undefined => MISSIONS.find(m => m.id === id);

// One question for everybody each day, picked from the given pool
export const questionOfDay = (date: string, pool: Question[]): Question | undefined =>
  pool.length > 0 ? pool[hash(date) % pool.length] : undefined;

export const goalOf = (stats: UserStats): number => stats.dailyGoal ?? DEFAULT_GOAL;

export const answeredToday = (stats: UserStats, now: number = Date.now()): number =>
  stats.daily?.date === dayKey(now) ? stats.daily.answered : 0;

const emptyDay = (date: string): DailyProgress => ({
  date, answered: 0, correct: 0, scenario: 0, bestCombo: 0, goalReached: false, missionsDone: [],
});

// Starts today's block and ends a streak that missed a day
export const rollDaily = (stats: UserStats, now: number = Date.now()): UserStats => {
  const today = dayKey(now);
  let next = stats;
  if (stats.daily?.date !== today) next = { ...next, daily: emptyDay(today), combo: 0 };
  if (next.streak > 0 && next.lastLoginDate && next.lastLoginDate !== today && next.lastLoginDate !== dayKey(now, -1)) {
    next = { ...next, streak: 0 };
  }
  return next;
};

// Adds the badges that the state now earns, including the medal ones
export const withNewBadges = (stats: UserStats, now: number = Date.now()): UserStats => {
  const earned = [...checkBadges(stats)];
  const tiers = THEMES.map(theme => themeMedal(stats, theme.id, now).tier);
  if (tiers.some(t => t >= 1) && !stats.badges.includes('first_medal')) earned.push('first_medal');
  if (tiers.every(t => t >= 1) && !stats.badges.includes('all_bronze')) earned.push('all_bronze');
  return earned.length > 0 ? { ...stats, badges: [...stats.badges, ...earned] } : stats;
};

export const applyAnswer = (
  stats: UserStats,
  question: Question,
  isCorrect: boolean,
  now: number = Date.now()
): UserStats => {
  const today = dayKey(now);
  const rolled = rollDaily(stats, now);
  const daily: DailyProgress = { ...rolled.daily! };

  const combo = isCorrect ? (rolled.combo ?? 0) + 1 : 0;
  daily.answered += 1;
  if (isCorrect) {
    daily.correct += 1;
    if (question.type === 'scenario') daily.scenario += 1;
  }
  daily.bestCombo = Math.max(daily.bestCombo, combo);

  let xp = isCorrect ? XP_PER_CORRECT + (COMBO_BONUS_XP[combo] ?? 0) : 0;
  let next: UserStats = { ...rolled, combo, daily };

  for (const mission of missionsFor(today)) {
    if (!daily.missionsDone.includes(mission.id) && daily[mission.metric] >= mission.target) {
      daily.missionsDone = [...daily.missionsDone, mission.id];
      next.missionsCompleted = (next.missionsCompleted ?? 0) + 1;
      xp += mission.xp;
    }
  }

  if (!daily.goalReached && daily.answered >= goalOf(next)) {
    daily.goalReached = true;
    next.goalsMet = (next.goalsMet ?? 0) + 1;
    next.streak = next.lastLoginDate === today ? next.streak : next.lastLoginDate === dayKey(now, -1) ? next.streak + 1 : 1;
    next.lastLoginDate = today;
    xp += GOAL_BONUS_XP;
  }

  next = {
    ...next,
    questionMastery: reviewItem(next.questionMastery, question.id, isCorrect, now),
    xp: next.xp + xp,
  };
  next.level = calculateLevel(next.xp);
  return withNewBadges(next, now);
};

// The first answer of the day to the question of the day; later calls change nothing
export const answerQuestionOfDay = (
  stats: UserStats,
  question: Question,
  choice: number,
  now: number = Date.now()
): UserStats => {
  const rolled = rollDaily(stats, now);
  if (rolled.daily?.questionOfDay) return rolled;
  const isCorrect = choice === question.correctAnswer;
  let next = applyAnswer(rolled, question, isCorrect, now);
  next = { ...next, daily: { ...next.daily!, questionOfDay: { id: question.id, choice } } };
  if (isCorrect) {
    next.xp += QUESTION_OF_DAY_BONUS_XP;
    next.level = calculateLevel(next.xp);
  }
  return withNewBadges(next, now);
};

export type MedalTier = 0 | 1 | 2 | 3 | 4;
export const MEDAL_NAMES = ['', 'Bronze', 'Argent', 'Or', 'Platine'];
export const MEDAL_THRESHOLDS = [0.25, 0.5, 0.75, 0.9];

// Share of the theme's questions that are mastered, and the medal it earns
export const themeMedal = (
  stats: UserStats,
  themeId: string,
  now: number = Date.now()
): { tier: MedalTier; ratio: number } => {
  const ids = forLevel(OFFICIAL_DB[themeId] ?? [], stats.examLevel as ExamLevel | undefined).map(q => q.id);
  const ratio = ids.length ? masteredCount(stats.questionMastery, ids, now) / ids.length : 0;
  const tier = MEDAL_THRESHOLDS.filter(t => ratio >= t).length as MedalTier;
  return { tier, ratio };
};

export type ProgressEvent =
  | { type: 'level'; level: number }
  | { type: 'badge'; id: string }
  | { type: 'mission'; id: string }
  | { type: 'goal' }
  | { type: 'medal'; themeId: string; tier: MedalTier };

// What changed between two states and deserves a message
export const diffStats = (before: UserStats, after: UserStats, now: number = Date.now()): ProgressEvent[] => {
  const events: ProgressEvent[] = [];
  if (after.level > before.level) events.push({ type: 'level', level: after.level });
  for (const id of after.badges) if (!before.badges.includes(id)) events.push({ type: 'badge', id });
  const doneBefore = before.daily?.date === after.daily?.date ? before.daily?.missionsDone ?? [] : [];
  for (const id of after.daily?.missionsDone ?? []) if (!doneBefore.includes(id)) events.push({ type: 'mission', id });
  const goalBefore = before.daily?.date === after.daily?.date && before.daily?.goalReached;
  if (after.daily?.goalReached && !goalBefore) events.push({ type: 'goal' });
  if (before.questionMastery !== after.questionMastery) {
    for (const theme of THEMES) {
      const was = themeMedal(before, theme.id, now).tier;
      const is = themeMedal(after, theme.id, now).tier;
      if (is > was) events.push({ type: 'medal', themeId: theme.id, tier: is });
    }
  }
  return events;
};
