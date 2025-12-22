
import React from 'react';
import { UserStats } from '../types';
import { BADGES, LEVELS, THEMES } from '../constants';
import { getLevelInfo, getXPProgress, getNextLevelInfo } from '../services/gamificationService';

interface ProfilePageProps {
  userStats: UserStats;
  onStatsUpdate: (stats: UserStats) => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ userStats, onStatsUpdate }) => {
  const levelInfo = getLevelInfo(userStats.level);
  const nextLevelInfo = getNextLevelInfo(userStats.level);
  const xpProgress = getXPProgress(userStats.xp, userStats.level);

  const successRate = userStats.totalQuestions > 0
    ? Math.round((userStats.totalCorrect / userStats.totalQuestions) * 100)
    : 0;

  const resetStats = () => {
    if (window.confirm('Êtes-vous sûr de vouloir réinitialiser toutes vos statistiques ? Cette action est irréversible.')) {
      localStorage.removeItem('objectif_citoyen_stats');
      window.location.reload();
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in duration-500">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 rounded-3xl text-white">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-24 h-24 bg-white/20 rounded-3xl flex items-center justify-center">
            <i className={`fas ${levelInfo.icon} text-4xl`}></i>
          </div>
          <div className="text-center md:text-left flex-1">
            <p className="text-sm font-bold text-white/70 uppercase tracking-widest mb-1">Niveau {userStats.level}</p>
            <h1 className="text-3xl font-black brand-font mb-2">{levelInfo.name}</h1>
            <div className="max-w-sm">
              <div className="flex justify-between text-xs font-bold mb-2">
                <span>{userStats.xp} XP</span>
                {nextLevelInfo && <span>{nextLevelInfo.minXP} XP pour niveau {userStats.level + 1}</span>}
              </div>
              <div className="h-3 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-400 rounded-full transition-all duration-500"
                  style={{ width: `${xpProgress}%` }}
                ></div>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-6 text-center">
            {userStats.streak > 0 && (
              <div className="bg-white/10 px-4 py-2 rounded-xl">
                <i className="fas fa-fire text-orange-400 mb-1"></i>
                <p className="text-xl font-black">{userStats.streak}</p>
                <p className="text-[10px] text-white/70">Jours</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm text-center">
          <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-3">
            <i className="fas fa-brain"></i>
          </div>
          <p className="text-2xl font-black text-slate-900">{userStats.totalQuizzes}</p>
          <p className="text-xs text-slate-500 font-bold uppercase">Quiz complétés</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm text-center">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-3">
            <i className="fas fa-check-circle"></i>
          </div>
          <p className="text-2xl font-black text-slate-900">{userStats.totalCorrect}</p>
          <p className="text-xs text-slate-500 font-bold uppercase">Bonnes réponses</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm text-center">
          <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center mx-auto mb-3">
            <i className="fas fa-percentage"></i>
          </div>
          <p className="text-2xl font-black text-slate-900">{successRate}%</p>
          <p className="text-xs text-slate-500 font-bold uppercase">Taux de réussite</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm text-center">
          <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mx-auto mb-3">
            <i className="fas fa-award"></i>
          </div>
          <p className="text-2xl font-black text-slate-900">{userStats.examsPassed}</p>
          <p className="text-xs text-slate-500 font-bold uppercase">Examens réussis</p>
        </div>
      </div>

      {/* Theme Progress */}
      <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
          <i className="fas fa-chart-pie text-indigo-500 mr-3"></i>
          Progression par thème
        </h2>
        <div className="space-y-4">
          {THEMES.map(theme => {
            const progress = userStats.themeProgress[theme.id];
            const percentage = progress ? Math.round((progress.correct / progress.total) * 100) : 0;
            const total = progress?.total || 0;

            return (
              <div key={theme.id} className="flex items-center space-x-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  theme.color === 'indigo' ? 'bg-indigo-100 text-indigo-600' :
                  theme.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                  theme.color === 'emerald' ? 'bg-emerald-100 text-emerald-600' :
                  theme.color === 'amber' ? 'bg-amber-100 text-amber-600' :
                  'bg-rose-100 text-rose-600'
                }`}>
                  <i className={`fas ${theme.icon}`}></i>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="font-bold text-slate-700 text-sm">{theme.title}</span>
                    <span className="text-xs text-slate-500">
                      {total > 0 ? `${percentage}% (${progress?.correct}/${total})` : 'Pas encore commencé'}
                    </span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        theme.color === 'indigo' ? 'bg-indigo-500' :
                        theme.color === 'blue' ? 'bg-blue-500' :
                        theme.color === 'emerald' ? 'bg-emerald-500' :
                        theme.color === 'amber' ? 'bg-amber-500' :
                        'bg-rose-500'
                      }`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Badges */}
      <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
          <i className="fas fa-medal text-amber-500 mr-3"></i>
          Badges ({userStats.badges.length}/{BADGES.length})
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {BADGES.map(badge => {
            const isUnlocked = userStats.badges.includes(badge.id);
            return (
              <div
                key={badge.id}
                className={`p-4 rounded-2xl border text-center transition-all ${
                  isUnlocked
                    ? 'bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-200'
                    : 'bg-slate-50 border-slate-100 opacity-50'
                }`}
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3 ${
                  isUnlocked ? `bg-${badge.color}-100 text-${badge.color}-600` : 'bg-slate-200 text-slate-400'
                }`}>
                  <i className={`fas ${badge.icon} text-xl`}></i>
                </div>
                <h4 className={`font-bold text-sm ${isUnlocked ? 'text-slate-900' : 'text-slate-400'}`}>
                  {badge.name}
                </h4>
                <p className="text-[10px] text-slate-500 mt-1">{badge.description}</p>
                {isUnlocked && (
                  <span className="inline-block mt-2 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                    Débloqué
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Levels */}
      <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
          <i className="fas fa-layer-group text-purple-500 mr-3"></i>
          Niveaux
        </h2>
        <div className="flex flex-wrap gap-3">
          {LEVELS.map(level => {
            const isCurrentOrBelow = userStats.level >= level.level;
            const isCurrent = userStats.level === level.level;
            return (
              <div
                key={level.level}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl border ${
                  isCurrent
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : isCurrentOrBelow
                    ? 'bg-indigo-50 text-indigo-600 border-indigo-200'
                    : 'bg-slate-50 text-slate-400 border-slate-100'
                }`}
              >
                <i className={`fas ${level.icon}`}></i>
                <span className="font-bold text-sm">{level.name}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Reset Button */}
      <div className="text-center">
        <button
          onClick={resetStats}
          className="text-sm text-slate-400 hover:text-rose-500 transition-colors"
        >
          <i className="fas fa-trash-alt mr-2"></i>
          Réinitialiser mes statistiques
        </button>
      </div>
    </div>
  );
};
