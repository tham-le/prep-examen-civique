import React from 'react';
import { UserStats } from '../types';
import { answeredToday, dayKey, goalOf, missionsFor } from '../services/progress';

const GOALS = [5, 10, 20];
const RING_RADIUS = 40;
const RING_LENGTH = 2 * Math.PI * RING_RADIUS;

interface DailyCardProps {
  userStats: UserStats;
  onStatsUpdate: (stats: UserStats) => void;
}

export const DailyCard: React.FC<DailyCardProps> = ({ userStats, onStatsUpdate }) => {
  const today = dayKey(Date.now());
  const daily = userStats.daily?.date === today ? userStats.daily : undefined;
  const goal = goalOf(userStats);
  const answered = answeredToday(userStats);
  const filled = Math.min(answered / goal, 1);

  return (
    <section className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 grid md:grid-cols-5 gap-8 items-center" aria-label="Aujourd'hui">
      <div className="md:col-span-2 flex items-center gap-6">
        <div className="relative w-28 h-28 flex-shrink-0">
          <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90" aria-hidden="true">
            <circle cx="50" cy="50" r={RING_RADIUS} fill="none" strokeWidth="10" className="stroke-slate-100 dark:stroke-slate-700" />
            <circle
              cx="50" cy="50" r={RING_RADIUS} fill="none" strokeWidth="10" strokeLinecap="round"
              className={daily?.goalReached ? 'stroke-emerald-500' : 'stroke-sapphire-500'}
              strokeDasharray={RING_LENGTH}
              strokeDashoffset={RING_LENGTH * (1 - filled)}
              style={{ transition: 'stroke-dashoffset 0.5s ease-out' }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums">{Math.min(answered, goal)}/{goal}</span>
            <span className="text-xs text-slate-500 dark:text-slate-400">questions</span>
          </div>
        </div>
        <div className="space-y-3">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Aujourd'hui</h2>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              {daily?.goalReached ? 'Objectif atteint, bravo.' : `Encore ${Math.max(goal - answered, 0)} question${goal - answered > 1 ? 's' : ''} pour votre objectif.`}
            </p>
          </div>
          <p className="text-sm font-semibold text-amber-600 dark:text-amber-400">
            <i className="fas fa-fire mr-1" aria-hidden="true"></i>
            {userStats.streak} jour{userStats.streak > 1 ? 's' : ''} de suite
          </p>
          <div className="inline-flex p-1 bg-slate-100 dark:bg-slate-700 rounded-lg text-xs" role="group" aria-label="Objectif par jour">
            {GOALS.map(n => (
              <button
                key={n}
                onClick={() => onStatsUpdate({ ...userStats, dailyGoal: n })}
                aria-pressed={goal === n}
                className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                  goal === n ? 'bg-white dark:bg-slate-600 text-sapphire-700 dark:text-sapphire-300' : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="md:col-span-3 space-y-3">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Missions du jour</h3>
        <ul className="space-y-3">
          {missionsFor(today).map(mission => {
            const done = daily?.missionsDone.includes(mission.id) ?? false;
            const value = Math.min(daily?.[mission.metric] ?? 0, mission.target);
            return (
              <li key={mission.id} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className={done ? 'text-slate-500 dark:text-slate-400 line-through' : 'text-slate-900 dark:text-white'}>
                    {done && <i className="fas fa-check text-emerald-500 mr-2" aria-hidden="true"></i>}
                    {mission.label}
                  </span>
                  <span className="text-xs tabular-nums text-slate-500 dark:text-slate-400">
                    {done ? `+${mission.xp} XP` : `${value} / ${mission.target}`}
                  </span>
                </div>
                <div className="h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${done ? 'bg-emerald-500' : 'bg-sapphire-500'}`}
                    style={{ width: `${(value / mission.target) * 100}%` }}
                  ></div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};
