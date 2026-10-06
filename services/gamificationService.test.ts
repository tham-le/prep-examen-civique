import { describe, it, expect, beforeEach } from 'vitest';
import {
  calculateLevel,
  getXPProgress,
  checkBadges,
  processQuizResult,
  processExamResult,
  loadUserStats,
  loadExamHistory,
  saveUserStats,
  sanitizeStats,
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

describe('checkBadges for the daily game', () => {
  it('awards badges for goals, combo, missions and arcade scores', () => {
    const stats = { ...freshStats(), goalsMet: 7, combo: 10, missionsCompleted: 10, bestBlitz: 20, bestSurvival: 15 };
    expect(checkBadges(stats)).toEqual(expect.arrayContaining(['first_goal', 'goals_7', 'combo_10', 'missions_10', 'blitz_20', 'survival_15']));
  });

  it('awards nothing on stats saved before these fields existed', () => {
    expect(checkBadges(freshStats())).toEqual([]);
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
  it('pays nothing at the end on a partial score (correct answers are paid one by one)', () => {
    const { xpGained } = processQuizResult(freshStats(), 7, 10);
    expect(xpGained).toBe(0);
  });

  it('pays a 50 XP perfect bonus when score equals total', () => {
    const { xpGained } = processQuizResult(freshStats(), 10, 10);
    expect(xpGained).toBe(50);
  });

  it('reports leveledUp when XP crosses a level threshold', () => {
    const stats = { ...freshStats(), xp: 90 };
    const { leveledUp, stats: updated } = processQuizResult(stats, 10, 10); // +50 XP -> 140, crosses the 100 XP level 2 threshold
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

describe('loadUserStats with damaged saved data', () => {
  const load = (value: string) => {
    localStorage.setItem('objectif_citoyen_stats', value);
    return loadUserStats();
  };

  it('uses the defaults for a value of the wrong type and keeps the valid ones', () => {
    const stats = load(JSON.stringify({ xp: 250, streak: 'x', badges: 'x', questionMastery: null, flashcardMastery: [], themeProgress: 5, level: 3 }));
    expect(stats.xp).toBe(250);
    expect(stats.level).toBe(3);
    expect(stats.streak).toBe(0);
    expect(stats.badges).toEqual([]);
    expect(stats.questionMastery).toEqual({});
    expect(stats.flashcardMastery).toEqual({});
    expect(stats.themeProgress).toEqual({});
  });

  it('falls back to the defaults for data that is not an object or not JSON', () => {
    for (const value of ['null', '5', '"text"', '[]', '{not json']) {
      expect(load(value)).toEqual(DEFAULT_USER_STATS);
    }
  });

  it('drops broken entries and keeps the good ones in the question maps', () => {
    const stats = load(JSON.stringify({ questionMastery: { a: { box: 2, dueAt: 5 }, b: 'x', c: { box: 'no' }, d: { box: 1, dueAt: null } } }));
    expect(stats.questionMastery).toEqual({ a: { box: 2, dueAt: 5 }, d: { box: 1, dueAt: 0 } });
  });

  it('does not let a __proto__ key change the object it builds', () => {
    const stats = load('{"questionMastery":{"__proto__":{"box":1,"dueAt":1}},"xp":10}');
    expect(Object.getPrototypeOf(stats.questionMastery)).toBe(Object.prototype);
    expect(({} as Record<string, unknown>).box).toBeUndefined();
    expect(stats.xp).toBe(10);
  });

  it('drops fields it does not know', () => {
    expect(load(JSON.stringify({ xp: 1, injected: { a: 1 } }))).not.toHaveProperty('injected');
  });

  it('loads a full state saved by the current version unchanged', () => {
    const full: UserStats = {
      ...DEFAULT_USER_STATS,
      xp: 340, level: 3, streak: 4, lastLoginDate: '2026-10-05', badges: ['first_quiz'],
      questionMastery: { v1: { box: 2, dueAt: 123 } }, flashcardMastery: { f1: { box: 1, dueAt: 9 } },
      themeProgress: { valeurs: { correct: 3, total: 4 } },
      examLevel: 'csp', examDate: '2026-11-20', seenQuestions: ['v1'], recentExamQuestions: ['v2'],
      dailyGoal: 20, combo: 2, goalsMet: 3, missionsCompleted: 5, bestBlitz: 12, bestSurvival: 7,
      daily: { date: '2026-10-06', answered: 4, correct: 3, scenario: 1, bestCombo: 2, goalReached: false, missionsDone: ['answer10'], questionOfDay: { id: 'v3', choice: 1 } },
    };
    saveUserStats(full);
    expect(loadUserStats()).toEqual(full);
  });

  it('ignores an invalid level, exam date type and a daily block without a date', () => {
    const stats = sanitizeStats({ examLevel: 'other', examDate: 5, daily: { answered: 3 } });
    expect(stats).not.toHaveProperty('examLevel');
    expect(stats).not.toHaveProperty('examDate');
    expect(stats).not.toHaveProperty('daily');
  });
});

describe('loadExamHistory with damaged saved data', () => {
  it('returns an empty list for something that is not a list', () => {
    for (const value of ['null', '{"a":1}', '5', '{bad']) {
      localStorage.setItem('objectif_citoyen_exam_history', value);
      expect(loadExamHistory()).toEqual([]);
    }
  });

  it('keeps only complete results', () => {
    const good = { id: '1', date: '2026-10-05', score: 30, passed: false, duration: 100 };
    localStorage.setItem('objectif_citoyen_exam_history', JSON.stringify([good, { id: '2' }, null, { ...good, score: 'x' }]));
    expect(loadExamHistory()).toEqual([good]);
  });
});
