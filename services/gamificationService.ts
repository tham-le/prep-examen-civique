
import { UserStats, Badge, ExamResult } from '../types';
import { BADGES, LEVELS, DEFAULT_USER_STATS } from '../constants';
import { reviewItems } from './spacedRepetition';

const STORAGE_KEY = 'objectif_citoyen_stats';
const EXAM_HISTORY_KEY = 'objectif_citoyen_exam_history';

export const loadUserStats = (): UserStats => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return { ...DEFAULT_USER_STATS, ...JSON.parse(saved) };
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
    const saved = localStorage.getItem(EXAM_HISTORY_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
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
