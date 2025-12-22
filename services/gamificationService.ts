
import { UserStats, Badge } from '../types';
import { BADGES, LEVELS, DEFAULT_USER_STATS } from '../constants';

const STORAGE_KEY = 'objectif_citoyen_stats';

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

export const checkAndUpdateStreak = (stats: UserStats): UserStats => {
  const today = new Date().toISOString().split('T')[0];
  const lastLogin = stats.lastLoginDate;

  if (!lastLogin) {
    return { ...stats, streak: 1, lastLoginDate: today };
  }

  const lastDate = new Date(lastLogin);
  const todayDate = new Date(today);
  const diffDays = Math.floor((todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return stats; // Same day, no change
  } else if (diffDays === 1) {
    return { ...stats, streak: stats.streak + 1, lastLoginDate: today };
  } else {
    return { ...stats, streak: 1, lastLoginDate: today }; // Reset streak
  }
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
  const xpPerCorrect = 10;
  const perfectBonus = score === total ? 50 : 0;
  const xpGained = (score * xpPerCorrect) + perfectBonus;

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

  // Track weak/strong questions
  if (questionIds && correctIds) {
    const wrongIds = questionIds.filter(id => !correctIds.includes(id));

    // Add wrong answers to weak questions (avoid duplicates, max 50)
    const newWeak = [...new Set([...updatedStats.weakQuestions, ...wrongIds])].slice(-50);

    // Add correct answers to strong questions (avoid duplicates, max 50)
    const newStrong = [...new Set([...updatedStats.strongQuestions, ...correctIds])].slice(-50);

    // Remove from weak if now strong
    updatedStats.weakQuestions = newWeak.filter(id => !correctIds.includes(id));
    updatedStats.strongQuestions = newStrong;
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
  timeRemaining: number
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

export const getWeakQuestions = (stats: UserStats, allQuestions: any[]): any[] => {
  if (stats.weakQuestions.length === 0) return [];
  return allQuestions.filter(q => stats.weakQuestions.includes(q.id));
};
