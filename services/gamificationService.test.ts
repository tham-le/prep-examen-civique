import { describe, it, expect, beforeEach } from 'vitest';
import {
  calculateLevel,
  getXPProgress,
  checkAndUpdateStreak,
  checkBadges,
  processQuizResult,
  processExamResult,
} from './gamificationService';
import { DEFAULT_USER_STATS } from '../constants';
import { UserStats } from '../types';

const freshStats = (): UserStats => ({ ...DEFAULT_USER_STATS, badges: [], themeProgress: {} });

beforeEach(() => {
  localStorage.clear();
});

describe('calculateLevel', () => {
  it('starts at level 1 with no XP', () => {
    expect(calculateLevel(0)).toBe(1);
  });

  it('advances at each level threshold', () => {
    expect(calculateLevel(99)).toBe(1);
    expect(calculateLevel(100)).toBe(2);
    expect(calculateLevel(250)).toBe(3);
  });

  it('caps at the highest defined level, even far past its threshold', () => {
    expect(calculateLevel(999999)).toBe(8);
  });
});

describe('getXPProgress', () => {
  it('computes percentage toward the next level', () => {
    expect(getXPProgress(50, 1)).toBe(50); // level 1: 0-100
  });

  it('returns 100 at the max level regardless of XP', () => {
    expect(getXPProgress(999999, 8)).toBe(100);
  });
});

describe('checkAndUpdateStreak', () => {
  it('starts the streak at 1 on first login', () => {
    const stats = { ...freshStats(), lastLoginDate: '' };
    const result = checkAndUpdateStreak(stats);
    expect(result.streak).toBe(1);
  });

  it('leaves the streak unchanged on the same day', () => {
    const today = new Date().toISOString().split('T')[0];
    const stats = { ...freshStats(), streak: 5, lastLoginDate: today };
    const result = checkAndUpdateStreak(stats);
    expect(result.streak).toBe(5);
  });

  it('increments the streak on the following consecutive day', () => {
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const stats = { ...freshStats(), streak: 5, lastLoginDate: yesterday };
    const result = checkAndUpdateStreak(stats);
    expect(result.streak).toBe(6);
  });

  it('resets the streak to 1 after a gap of more than one day', () => {
    const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const stats = { ...freshStats(), streak: 5, lastLoginDate: threeDaysAgo };
    const result = checkAndUpdateStreak(stats);
    expect(result.streak).toBe(1);
  });
});

describe('checkBadges', () => {
  it('awards first_quiz after the first quiz', () => {
    const stats = { ...freshStats(), totalQuizzes: 1 };
    expect(checkBadges(stats)).toContain('first_quiz');
  });

  it('does not re-award a badge the user already has', () => {
    const stats = { ...freshStats(), totalQuizzes: 1, badges: ['first_quiz'] };
    expect(checkBadges(stats)).not.toContain('first_quiz');
  });

  it('awards all_themes only once every theme has been practiced', () => {
    const partial = {
      ...freshStats(),
      themeProgress: { valeurs: { correct: 1, total: 1 }, institutions: { correct: 1, total: 1 } },
    };
    expect(checkBadges(partial)).not.toContain('all_themes');

    const complete = {
      ...freshStats(),
      themeProgress: {
        valeurs: { correct: 1, total: 1 },
        institutions: { correct: 1, total: 1 },
        droits: { correct: 1, total: 1 },
        culture: { correct: 1, total: 1 },
        societe: { correct: 1, total: 1 },
      },
    };
    expect(checkBadges(complete)).toContain('all_themes');
  });

  it('awards score_80 only with enough quizzes and a high enough average', () => {
    const tooFewQuizzes = { ...freshStats(), totalQuizzes: 2, totalCorrect: 90, totalQuestions: 100 };
    expect(checkBadges(tooFewQuizzes)).not.toContain('score_80');

    const qualifies = { ...freshStats(), totalQuizzes: 5, totalCorrect: 90, totalQuestions: 100 };
    expect(checkBadges(qualifies)).toContain('score_80');
  });
});

describe('processQuizResult', () => {
  it('awards 10 XP per correct answer with no perfect bonus on a partial score', () => {
    const { xpGained } = processQuizResult(freshStats(), 7, 10);
    expect(xpGained).toBe(70);
  });

  it('adds a 50 XP perfect bonus when score equals total', () => {
    const { xpGained } = processQuizResult(freshStats(), 10, 10);
    expect(xpGained).toBe(150); // 10 * 10 + 50
  });

  it('reports leveledUp when XP crosses a level threshold', () => {
    const stats = { ...freshStats(), xp: 90 };
    const { leveledUp, stats: updated } = processQuizResult(stats, 10, 10); // +150 XP -> 240, crosses the 100 XP level 2 threshold
    expect(leveledUp).toBe(true);
    expect(updated.level).toBe(2);
  });

  it('accumulates per theme progress across sessions', () => {
    let stats = freshStats();
    stats = processQuizResult(stats, 5, 10, 'valeurs').stats;
    stats = processQuizResult(stats, 8, 10, 'valeurs').stats;
    expect(stats.themeProgress.valeurs).toEqual({ correct: 13, total: 20 });
  });

  it('feeds question results into spaced repetition mastery', () => {
    const { stats } = processQuizResult(freshStats(), 1, 2, undefined, ['right', 'wrong'], ['right']);
    expect(stats.questionMastery.right.box).toBe(1);
    expect(stats.questionMastery.wrong.box).toBe(0);
  });
});

describe('processExamResult', () => {
  it('awards 15 XP per correct answer plus a 200 XP pass bonus when passed', () => {
    const { xpGained } = processExamResult(freshStats(), 32, true, 600);
    expect(xpGained).toBe(32 * 15 + 200);
  });

  it('awards no pass bonus on a failed exam', () => {
    const { xpGained } = processExamResult(freshStats(), 20, false, 600);
    expect(xpGained).toBe(20 * 15);
  });

  it('only increments examsPassed when the exam was passed', () => {
    const failed = processExamResult(freshStats(), 20, false, 600).stats;
    expect(failed.examsPassed).toBe(0);

    const passed = processExamResult(freshStats(), 32, true, 600).stats;
    expect(passed.examsPassed).toBe(1);
  });

  it('awards fast_exam only when passed with at least 25 minutes remaining', () => {
    const passedSlow = processExamResult(freshStats(), 32, true, 1000).stats;
    expect(passedSlow.badges).not.toContain('fast_exam');

    const passedFast = processExamResult(freshStats(), 32, true, 1500).stats;
    expect(passedFast.badges).toContain('fast_exam');

    const failedFast = processExamResult(freshStats(), 20, false, 1500).stats;
    expect(failedFast.badges).not.toContain('fast_exam');
  });
});
