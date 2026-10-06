
import { UserStats, Badge, ExamResult, DailyProgress, ExamLevel, SRSMap } from '../types';
import { BADGES, LEVELS, DEFAULT_USER_STATS } from '../constants';
import { reviewItems } from './spacedRepetition';

const STORAGE_KEY = 'objectif_citoyen_stats';
const EXAM_HISTORY_KEY = 'objectif_citoyen_exam_history';

const isRecord = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null && !Array.isArray(v);
const finite = (v: unknown): v is number => typeof v === 'number' && Number.isFinite(v);
const numberOr = (v: unknown, fallback: number): number => (finite(v) ? v : fallback);
const strings = (v: unknown): string[] => (Array.isArray(v) ? v.filter((x): x is string => typeof x === 'string') : []);

// Entries saved before mastered items got a recheck date have dueAt null (Infinity does not survive JSON)
const srsMap = (v: unknown): SRSMap =>
  isRecord(v)
    ? Object.fromEntries(
        Object.entries(v).flatMap(([id, entry]) =>
          isRecord(entry) && finite(entry.box) ? [[id, { box: entry.box, dueAt: numberOr(entry.dueAt, 0) }]] : []
        )
      )
    : {};

const dailyProgress = (v: unknown): DailyProgress | undefined => {
  if (!isRecord(v) || typeof v.date !== 'string') return undefined;
  const qod = v.questionOfDay;
  const questionOfDay = isRecord(qod) && typeof qod.id === 'string' && finite(qod.choice) ? { id: qod.id, choice: qod.choice } : undefined;
  return {
    date: v.date,
    answered: numberOr(v.answered, 0),
    correct: numberOr(v.correct, 0),
    scenario: numberOr(v.scenario, 0),
    bestCombo: numberOr(v.bestCombo, 0),
    goalReached: v.goalReached === true,
    missionsDone: strings(v.missionsDone),
    ...(questionOfDay && { questionOfDay }),
  };
};

// Keeps each saved field only if it has the right type, so one damaged value
// cannot make every page crash. Unknown fields are dropped.
export const sanitizeStats = (raw: unknown): UserStats => {
  if (!isRecord(raw)) return { ...DEFAULT_USER_STATS };
  const d = DEFAULT_USER_STATS;
  const themeProgress = isRecord(raw.themeProgress)
    ? Object.fromEntries(
        Object.entries(raw.themeProgress).flatMap(([id, p]) =>
          isRecord(p) && finite(p.correct) && finite(p.total) ? [[id, { correct: p.correct, total: p.total }]] : []
        )
      )
    : {};
  const optionalNumbers = ['combo', 'goalsMet', 'missionsCompleted', 'bestBlitz', 'bestSurvival', 'dailyGoal'] as const;
  const daily = dailyProgress(raw.daily);
  return {
    xp: numberOr(raw.xp, d.xp),
    level: numberOr(raw.level, d.level),
    streak: numberOr(raw.streak, d.streak),
    lastLoginDate: typeof raw.lastLoginDate === 'string' ? raw.lastLoginDate : d.lastLoginDate,
    totalQuizzes: numberOr(raw.totalQuizzes, d.totalQuizzes),
    totalCorrect: numberOr(raw.totalCorrect, d.totalCorrect),
    totalQuestions: numberOr(raw.totalQuestions, d.totalQuestions),
    perfectScores: numberOr(raw.perfectScores, d.perfectScores),
    examsPassed: numberOr(raw.examsPassed, d.examsPassed),
    badges: strings(raw.badges),
    questionMastery: srsMap(raw.questionMastery),
    flashcardMastery: srsMap(raw.flashcardMastery),
    themeProgress,
    ...(raw.examLevel === 'cr' || raw.examLevel === 'csp' ? { examLevel: raw.examLevel as ExamLevel } : {}),
    ...(typeof raw.examDate === 'string' ? { examDate: raw.examDate } : {}),
    ...(Array.isArray(raw.seenQuestions) ? { seenQuestions: strings(raw.seenQuestions) } : {}),
    ...(Array.isArray(raw.recentExamQuestions) ? { recentExamQuestions: strings(raw.recentExamQuestions) } : {}),
    ...(daily ? { daily } : {}),
    ...Object.fromEntries(optionalNumbers.filter(key => finite(raw[key])).map(key => [key, raw[key]])),
  };
};

export const loadUserStats = (): UserStats => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return sanitizeStats(JSON.parse(saved));
    }
  } catch (e) {
    console.warn('Error loading stats:', e);
  }
  return { ...DEFAULT_USER_STATS };
};

export const saveUserStats = (stats: UserStats): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
  } catch (e) {
    console.warn('Error saving stats:', e);
  }
};

export const calculateLevel = (xp: number): number => {
  let level = 1;
  for (const l of LEVELS) {
    if (xp >= l.minXP) {
      level = l.level;
    }
  }
  return level;
};

export const getLevelInfo = (level: number) => {
  return LEVELS.find(l => l.level === level) || LEVELS[0];
};

export const getNextLevelInfo = (level: number) => {
  return LEVELS.find(l => l.level === level + 1);
};

export const getXPProgress = (xp: number, level: number): number => {
  const currentLevel = getLevelInfo(level);
  const nextLevel = getNextLevelInfo(level);

  if (!nextLevel) return 100; // Max level

  const xpInCurrentLevel = xp - currentLevel.minXP;
  const xpNeededForNext = nextLevel.minXP - currentLevel.minXP;

  return Math.min(100, Math.round((xpInCurrentLevel / xpNeededForNext) * 100));
};

export const checkBadges = (stats: UserStats): string[] => {
  const newBadges: string[] = [];

  // First quiz
  if (stats.totalQuizzes >= 1 && !stats.badges.includes('first_quiz')) {
    newBadges.push('first_quiz');
  }

  // Perfect score
  if (stats.perfectScores >= 1 && !stats.badges.includes('perfect_quiz')) {
    newBadges.push('perfect_quiz');
  }

  // Streaks
  if (stats.streak >= 3 && !stats.badges.includes('streak_3')) {
    newBadges.push('streak_3');
  }
  if (stats.streak >= 7 && !stats.badges.includes('streak_7')) {
    newBadges.push('streak_7');
  }
  if (stats.streak >= 30 && !stats.badges.includes('streak_30')) {
    newBadges.push('streak_30');
  }

  // Quiz counts
  if (stats.totalQuizzes >= 10 && !stats.badges.includes('quiz_10')) {
    newBadges.push('quiz_10');
  }
  if (stats.totalQuizzes >= 50 && !stats.badges.includes('quiz_50')) {
    newBadges.push('quiz_50');
  }

  // Daily goals, combos, missions and arcade scores
  if ((stats.goalsMet ?? 0) >= 1 && !stats.badges.includes('first_goal')) newBadges.push('first_goal');
  if ((stats.goalsMet ?? 0) >= 7 && !stats.badges.includes('goals_7')) newBadges.push('goals_7');
  if ((stats.combo ?? 0) >= 10 && !stats.badges.includes('combo_10')) newBadges.push('combo_10');
  if ((stats.missionsCompleted ?? 0) >= 10 && !stats.badges.includes('missions_10')) newBadges.push('missions_10');
  if ((stats.bestBlitz ?? 0) >= 20 && !stats.badges.includes('blitz_20')) newBadges.push('blitz_20');
  if ((stats.bestSurvival ?? 0) >= 15 && !stats.badges.includes('survival_15')) newBadges.push('survival_15');

  // Exam passed
  if (stats.examsPassed >= 1 && !stats.badges.includes('exam_passed')) {
    newBadges.push('exam_passed');
  }
  if (stats.examsPassed >= 3 && !stats.badges.includes('exam_master')) {
    newBadges.push('exam_master');
  }

  // All themes completed
  const themes = ['valeurs', 'institutions', 'droits', 'culture', 'societe'];
  const allThemesCompleted = themes.every(t => stats.themeProgress[t]?.total > 0);
  if (allThemesCompleted && !stats.badges.includes('all_themes')) {
    newBadges.push('all_themes');
  }

  // 80% average
  if (stats.totalQuestions > 0) {
    const avg = (stats.totalCorrect / stats.totalQuestions) * 100;
    if (avg >= 80 && stats.totalQuizzes >= 5 && !stats.badges.includes('score_80')) {
      newBadges.push('score_80');
    }
  }

  return newBadges;
};

export const processQuizResult = (
  stats: UserStats,
  score: number,
  total: number,
  themeId?: string,
  questionIds?: string[],
  correctIds?: string[]
): { stats: UserStats; newBadges: string[]; xpGained: number; leveledUp: boolean } => {
  // Correct answers were paid one by one (see applyAnswer); only the perfect bonus is left
  const xpGained = score === total ? 50 : 0;

  const oldLevel = stats.level;

  let updatedStats: UserStats = {
    ...stats,
    xp: stats.xp + xpGained,
    totalQuizzes: stats.totalQuizzes + 1,
    totalCorrect: stats.totalCorrect + score,
    totalQuestions: stats.totalQuestions + total,
    perfectScores: score === total ? stats.perfectScores + 1 : stats.perfectScores,
  };

  // Update level
  updatedStats.level = calculateLevel(updatedStats.xp);
  const leveledUp = updatedStats.level > oldLevel;

  // Update theme progress
  if (themeId) {
    const currentProgress = updatedStats.themeProgress[themeId] || { correct: 0, total: 0 };
    updatedStats.themeProgress = {
      ...updatedStats.themeProgress,
      [themeId]: {
        correct: currentProgress.correct + score,
        total: currentProgress.total + total
      }
    };
  }

  // Update spaced-repetition state for every question seen this session
  if (questionIds && correctIds) {
    updatedStats.questionMastery = reviewItems(updatedStats.questionMastery, questionIds, correctIds);
  }

  // Check for new badges
  const newBadges = checkBadges(updatedStats);
  updatedStats.badges = [...updatedStats.badges, ...newBadges];

  // Save
  saveUserStats(updatedStats);

  return { stats: updatedStats, newBadges, xpGained, leveledUp };
};

export const processExamResult = (
  stats: UserStats,
  score: number,
  passed: boolean,
  timeRemaining: number,
  questionIds?: string[],
  correctIds?: string[]
): { stats: UserStats; newBadges: string[]; xpGained: number; leveledUp: boolean } => {
  const xpPerCorrect = 15;
  const passBonus = passed ? 200 : 0;
  const xpGained = (score * xpPerCorrect) + passBonus;

  const oldLevel = stats.level;

  let updatedStats: UserStats = {
    ...stats,
    xp: stats.xp + xpGained,
    totalQuizzes: stats.totalQuizzes + 1,
    totalCorrect: stats.totalCorrect + score,
    totalQuestions: stats.totalQuestions + 40,
    examsPassed: passed ? stats.examsPassed + 1 : stats.examsPassed,
  };

  // Update level
  updatedStats.level = calculateLevel(updatedStats.xp);
  const leveledUp = updatedStats.level > oldLevel;

  // Fast exam badge (less than 20 minutes = more than 25 minutes remaining)
  if (passed && timeRemaining >= 1500 && !stats.badges.includes('fast_exam')) {
    updatedStats.badges = [...updatedStats.badges, 'fast_exam'];
  }

  // Update spaced-repetition state for every question seen this exam
  if (questionIds && correctIds) {
    updatedStats.questionMastery = reviewItems(updatedStats.questionMastery, questionIds, correctIds);
  }

  // Check for new badges
  const newBadges = checkBadges(updatedStats);
  updatedStats.badges = [...new Set([...updatedStats.badges, ...newBadges])];

  // Save
  saveUserStats(updatedStats);

  return { stats: updatedStats, newBadges, xpGained, leveledUp };
};

export const getBadgeInfo = (badgeId: string): Badge | undefined => {
  return BADGES.find(b => b.id === badgeId);
};

// Exam History functions
export const loadExamHistory = (): ExamResult[] => {
  try {
    const saved = JSON.parse(localStorage.getItem(EXAM_HISTORY_KEY) ?? '[]');
    return Array.isArray(saved)
      ? saved.filter(
          (e): e is ExamResult =>
            isRecord(e) && typeof e.id === 'string' && typeof e.date === 'string' &&
            finite(e.score) && typeof e.passed === 'boolean' && finite(e.duration)
        )
      : [];
  } catch (e) {
    console.warn('Error loading exam history:', e);
  }
  return [];
};

export const saveExamHistory = (history: ExamResult[]): void => {
  try {
    // Keep only the last 20 exams
    const trimmed = history.slice(-20);
    localStorage.setItem(EXAM_HISTORY_KEY, JSON.stringify(trimmed));
  } catch (e) {
    console.warn('Error saving exam history:', e);
  }
};

export const addExamResult = (score: number, passed: boolean, duration: number): ExamResult => {
  const result: ExamResult = {
    id: Date.now().toString(),
    date: new Date().toISOString(),
    score,
    passed,
    duration
  };

  const history = loadExamHistory();
  history.push(result);
  saveExamHistory(history);

  return result;
};
