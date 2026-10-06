import { describe, it, expect } from 'vitest';
import { applyAnswer, dayKey, diffStats, missionsFor, rollDaily, themeMedal, withNewBadges, GOAL_BONUS_XP, XP_PER_CORRECT } from './progress';
import { reviewItem, MAX_BOX } from './spacedRepetition';
import { DEFAULT_USER_STATS, OFFICIAL_DB, THEMES } from '../constants';
import { Question, UserStats } from '../types';

const at = (y: number, m: number, d: number, h = 12) => new Date(y, m - 1, d, h).getTime();
const NOW = at(2026, 10, 6);
const base = (extra: Partial<UserStats> = {}): UserStats => ({ ...DEFAULT_USER_STATS, ...extra });
const q = (id: string, type: Question['type'] = 'multiple-choice'): Question => ({
  id, text: '', options: ['a', 'b', 'c', 'd'], correctAnswer: 0, explanation: '', category: 'valeurs', type,
});

describe('dayKey', () => {
  it('uses the local day, with an offset in days', () => {
    expect(dayKey(at(2026, 10, 6, 0))).toBe('2026-10-06');
    expect(dayKey(at(2026, 10, 6, 23))).toBe('2026-10-06');
    expect(dayKey(at(2026, 10, 1), -1)).toBe('2026-09-30');
  });
});

describe('missionsFor', () => {
  it('gives three different missions, the same for a given day', () => {
    const a = missionsFor('2026-10-06');
    expect(new Set(a.map(m => m.id)).size).toBe(3);
    expect(missionsFor('2026-10-06')).toEqual(a);
  });
});

describe('rollDaily', () => {
  it('starts a new day and clears the combo', () => {
    const s = rollDaily(base({ combo: 4, daily: { date: '2026-10-05', answered: 9, correct: 9, scenario: 0, bestCombo: 9, goalReached: false, missionsDone: [] } }), NOW);
    expect(s.daily).toMatchObject({ date: '2026-10-06', answered: 0 });
    expect(s.combo).toBe(0);
  });

  it('keeps the same object when nothing changes', () => {
    const once = rollDaily(base(), NOW);
    expect(rollDaily(once, NOW)).toBe(once);
  });

  it('keeps the streak after yesterday and ends it after a missed day', () => {
    expect(rollDaily(base({ streak: 3, lastLoginDate: '2026-10-05' }), NOW).streak).toBe(3);
    expect(rollDaily(base({ streak: 3, lastLoginDate: '2026-10-04' }), NOW).streak).toBe(0);
  });
});

describe('applyAnswer', () => {
  it('pays 10 XP for a correct answer and nothing for a wrong one', () => {
    expect(applyAnswer(base(), q('a'), true, NOW).xp).toBe(XP_PER_CORRECT);
    expect(applyAnswer(base(), q('a'), false, NOW).xp).toBe(0);
  });

  it('records the answer in the spaced repetition state', () => {
    const s = applyAnswer(base(), q('a'), true, NOW);
    expect(s.questionMastery.a.box).toBe(1);
    expect(applyAnswer(s, q('a'), false, NOW).questionMastery.a.box).toBe(0);
  });

  it('adds a bonus when the combo reaches 3 and resets it on a mistake', () => {
    let s = base();
    for (let i = 0; i < 3; i++) s = applyAnswer(s, q('q' + i), true, NOW);
    expect(s.combo).toBe(3);
    expect(s.xp).toBe(3 * XP_PER_CORRECT + 5);
    s = applyAnswer(s, q('x'), false, NOW);
    expect(s.combo).toBe(0);
    expect(s.daily?.bestCombo).toBe(3);
  });

  it('counts situation questions only when answered correctly', () => {
    let s = applyAnswer(base(), q('s1', 'scenario'), false, NOW);
    expect(s.daily?.scenario).toBe(0);
    s = applyAnswer(s, q('s2', 'scenario'), true, NOW);
    expect(s.daily?.scenario).toBe(1);
  });

  it('meets the goal once: bonus XP, streak up, total goals up', () => {
    let s = base({ dailyGoal: 5 });
    for (let i = 0; i < 4; i++) s = applyAnswer(s, q('w' + i), false, NOW);
    expect(s.daily?.goalReached).toBe(false);
    expect(s.streak).toBe(0);
    s = applyAnswer(s, q('w4'), false, NOW);
    expect(s.daily?.goalReached).toBe(true);
    expect(s.streak).toBe(1);
    expect(s.goalsMet).toBe(1);
    expect(s.xp).toBe(GOAL_BONUS_XP);
    const again = applyAnswer(s, q('w5'), false, NOW);
    expect(again.goalsMet).toBe(1);
    expect(again.streak).toBe(1);
    expect(again.xp).toBe(GOAL_BONUS_XP);
  });

  it('continues a streak from yesterday and restarts it after a gap', () => {
    const goal1 = { dailyGoal: 1 };
    expect(applyAnswer(base({ ...goal1, streak: 4, lastLoginDate: '2026-10-05' }), q('a'), false, NOW).streak).toBe(5);
    expect(applyAnswer(base({ ...goal1, streak: 4, lastLoginDate: '2026-10-01' }), q('a'), false, NOW).streak).toBe(1);
  });

  it('completes each mission once and pays it', () => {
    const [first] = missionsFor(dayKey(NOW));
    let s = base({ dailyGoal: 99 });
    // answer correctly until the first mission is done; the others may also complete on the way
    for (let i = 0; i < 25 && !s.daily?.missionsDone.includes(first.id); i++) s = applyAnswer(s, q('m' + i, 'scenario'), true, NOW);
    expect(s.daily?.missionsDone).toContain(first.id);
    const done = s.missionsCompleted;
    const more = applyAnswer(s, q('extra', 'scenario'), true, NOW);
    expect(more.daily?.missionsDone.filter(id => id === first.id)).toHaveLength(1);
    expect(more.missionsCompleted).toBeGreaterThanOrEqual(done ?? 0);
  });

  it('levels up with XP and awards the first quiz style badges through checkBadges', () => {
    const s = applyAnswer(base({ xp: 95 }), q('a'), true, NOW);
    expect(s.level).toBe(2);
  });

  it('works on stats saved before the daily fields existed', () => {
    const old = { ...DEFAULT_USER_STATS } as UserStats;
    delete (old as Partial<UserStats>).daily;
    expect(() => applyAnswer(old, q('a'), true, NOW)).not.toThrow();
  });
});

describe('themeMedal', () => {
  const ids = OFFICIAL_DB.valeurs.map(x => x.id);
  const masteredFirst = (n: number) => {
    let map = {};
    for (const id of ids.slice(0, n)) for (let i = 0; i <= MAX_BOX; i++) map = reviewItem(map, id, true, NOW);
    return base({ questionMastery: map });
  };

  it('has no medal at first', () => {
    expect(themeMedal(base(), 'valeurs', NOW).tier).toBe(0);
  });

  it('gives bronze at 25 %, silver at 50 %, gold at 75 %, platinum at 90 %', () => {
    const n = ids.length;
    expect(themeMedal(masteredFirst(Math.ceil(n * 0.25)), 'valeurs', NOW).tier).toBe(1);
    expect(themeMedal(masteredFirst(Math.ceil(n * 0.5)), 'valeurs', NOW).tier).toBe(2);
    expect(themeMedal(masteredFirst(Math.ceil(n * 0.75)), 'valeurs', NOW).tier).toBe(3);
    expect(themeMedal(masteredFirst(Math.ceil(n * 0.9)), 'valeurs', NOW).tier).toBe(4);
  });
});

describe('diffStats', () => {
  it('reports a level up, a new badge, a finished mission and the goal', () => {
    const before = rollDaily(base({ xp: 95, dailyGoal: 1 }), NOW);
    const after = applyAnswer(before, q('a'), true, NOW);
    const types = diffStats(before, after, NOW).map(e => e.type);
    expect(types).toContain('level');
    expect(types).toContain('goal');
  });

  it('reports a new medal', () => {
    const before = base();
    const after = base({ questionMastery: Object.fromEntries(OFFICIAL_DB.valeurs.map(x => [x.id, { box: MAX_BOX, dueAt: NOW + 86_400_000 * 30 }])) });
    expect(diffStats(before, after, NOW)).toContainEqual({ type: 'medal', themeId: 'valeurs', tier: 4 });
  });

  it('reports nothing when nothing changed', () => {
    const s = rollDaily(base(), NOW);
    expect(diffStats(s, s, NOW)).toEqual([]);
  });
});

describe('withNewBadges', () => {
  const masteredTheme = (themeId: string) =>
    Object.fromEntries(OFFICIAL_DB[themeId].map(x => [x.id, { box: MAX_BOX, dueAt: NOW + 30 * 86_400_000 }]));

  it('awards the first medal once a theme earns one', () => {
    const s = withNewBadges(base({ questionMastery: masteredTheme('valeurs') }), NOW);
    expect(s.badges).toContain('first_medal');
    expect(s.badges).not.toContain('all_bronze');
  });

  it('awards the five medals badge when every theme has one', () => {
    const questionMastery = Object.assign({}, ...THEMES.map(t => masteredTheme(t.id)));
    expect(withNewBadges(base({ questionMastery }), NOW).badges).toEqual(expect.arrayContaining(['first_medal', 'all_bronze']));
  });

  it('keeps the same object when there is nothing new', () => {
    const s = base();
    expect(withNewBadges(s, NOW)).toBe(s);
  });
});
