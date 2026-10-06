import React from 'react';
import { THEMES } from '../constants';
import { UserStats } from '../types';
import { getBadgeInfo, getLevelInfo } from '../services/gamificationService';
import { MEDAL_NAMES, ProgressEvent, missionById } from '../services/progress';

export interface Toast {
  id: number;
  icon: string;
  text: string;
}

export const describeEvent = (event: ProgressEvent, stats: UserStats): Omit<Toast, 'id'> => {
  switch (event.type) {
    case 'level':
      return { icon: 'fa-arrow-up', text: `Niveau ${event.level} : ${getLevelInfo(event.level).name}` };
    case 'badge': {
      const badge = getBadgeInfo(event.id);
      return { icon: badge?.icon ?? 'fa-medal', text: `Badge débloqué : ${badge?.name ?? event.id}` };
    }
    case 'mission': {
      const mission = missionById(event.id);
      return { icon: 'fa-check', text: `Mission réussie : ${mission?.label ?? event.id} (+${mission?.xp ?? 0} XP)` };
    }
    case 'goal':
      return {
        icon: 'fa-bullseye',
        text: stats.streak > 1 ? `Objectif du jour atteint, série de ${stats.streak} jours` : 'Objectif du jour atteint',
      };
    case 'medal':
      return {
        icon: 'fa-medal',
        text: `Médaille ${MEDAL_NAMES[event.tier].toLowerCase()} : ${THEMES.find(t => t.id === event.themeId)?.title ?? event.themeId}`,
      };
  }
};

export const Toasts: React.FC<{ toasts: Toast[] }> = ({ toasts }) => (
  <div role="status" aria-live="polite" className="fixed top-36 lg:top-20 inset-x-0 z-[60] flex flex-col items-center gap-2 px-4 pointer-events-none">
    {toasts.map(toast => (
      <div key={toast.id} className="xp-pop flex items-center gap-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-4 py-3 rounded-xl shadow-lg max-w-sm w-full">
        <i className={`fas ${toast.icon} text-amber-400 dark:text-amber-600`} aria-hidden="true"></i>
        <span className="text-sm font-medium">{toast.text}</span>
      </div>
    ))}
  </div>
);
