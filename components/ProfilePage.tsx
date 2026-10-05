
import React, { useState, useEffect } from 'react';
import { UserStats, ExamResult } from '../types';
import { BADGES, LEVELS, THEMES } from '../constants';
import { getLevelInfo, getXPProgress, getNextLevelInfo, loadExamHistory } from '../services/gamificationService';

// Helper function for badge colors since Tailwind can't handle dynamic classes
const getBadgeColorClasses = (isUnlocked: boolean) =>
  isUnlocked
    ? 'bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400'
    : 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400';

interface ProfilePageProps {
  userStats: UserStats;
  onStatsUpdate: (stats: UserStats) => void;
  onShowTutorial?: () => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ userStats, onStatsUpdate, onShowTutorial }) => {
  const [examHistory, setExamHistory] = useState<ExamResult[]>([]);

  useEffect(() => {
    setExamHistory(loadExamHistory());
  }, []);

  const levelInfo = getLevelInfo(userStats.level);
  const nextLevelInfo = getNextLevelInfo(userStats.level);
  const xpProgress = getXPProgress(userStats.xp, userStats.level);

  const successRate = userStats.totalQuestions > 0
    ? Math.round((userStats.totalCorrect / userStats.totalQuestions) * 100)
    : 0;

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const resetStats = () => {
    if (window.confirm('Êtes-vous sûr de vouloir réinitialiser toutes vos statistiques ? Cette action est irréversible.')) {
      localStorage.removeItem('objectif_citoyen_stats');
      window.location.reload();
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Profile Header */}
      <div className="bg-sapphire-600 p-6 rounded-xl text-white">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
            <i className={`fas ${levelInfo.icon} text-2xl`}></i>
          </div>
          <div className="text-center md:text-left flex-1">
            <p className="text-sm text-sapphire-200 mb-1">Niveau {userStats.level}</p>
            <h1 className="text-2xl font-bold mb-2">{levelInfo.name}</h1>
            <div className="max-w-xs">
              <div className="flex justify-between text-xs mb-1">
                <span>{userStats.xp} XP</span>
                {nextLevelInfo && <span>{nextLevelInfo.minXP} XP pour niveau {userStats.level + 1}</span>}
              </div>
              <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-400 rounded-full"
                  style={{ width: `${xpProgress}%` }}
                ></div>
              </div>
            </div>
          </div>
          {userStats.streak > 0 && (
            <div className="text-center bg-white/10 px-4 py-2 rounded-lg">
              <i className="fas fa-fire text-amber-400"></i>
              <p className="text-lg font-bold">{userStats.streak}</p>
              <p className="text-xs text-sapphire-200">Jours</p>
            </div>
          )}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700 text-center">
          <div className="w-10 h-10 bg-sapphire-100 dark:bg-sapphire-900/50 text-sapphire-600 dark:text-sapphire-400 rounded-lg flex items-center justify-center mx-auto mb-2">
            <i className="fas fa-brain text-sm"></i>
          </div>
          <p className="text-xl font-bold text-slate-900 dark:text-white">{userStats.totalQuizzes}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">Quiz complétés</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700 text-center">
          <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 rounded-lg flex items-center justify-center mx-auto mb-2">
            <i className="fas fa-check-circle text-sm"></i>
          </div>
          <p className="text-xl font-bold text-slate-900 dark:text-white">{userStats.totalCorrect}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">Bonnes réponses</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700 text-center">
          <div className="w-10 h-10 bg-sapphire-100 dark:bg-sapphire-900/50 text-sapphire-600 dark:text-sapphire-400 rounded-lg flex items-center justify-center mx-auto mb-2">
            <i className="fas fa-percentage text-sm"></i>
          </div>
          <p className="text-xl font-bold text-slate-900 dark:text-white">{successRate}%</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">Taux de réussite</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700 text-center">
          <div className="w-10 h-10 bg-sapphire-100 dark:bg-sapphire-900/50 text-sapphire-600 dark:text-sapphire-400 rounded-lg flex items-center justify-center mx-auto mb-2">
            <i className="fas fa-award text-sm"></i>
          </div>
          <p className="text-xl font-bold text-slate-900 dark:text-white">{userStats.examsPassed}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">Examens réussis</p>
        </div>
      </div>

      {/* Theme Progress */}
      <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center">
          <i className="fas fa-chart-pie text-sapphire-500 dark:text-sapphire-400 mr-2 text-sm"></i>
          Progression par thème
        </h2>
        <div className="space-y-3">
          {THEMES.map(theme => {
            const progress = userStats.themeProgress[theme.id];
            const percentage = progress ? Math.round((progress.correct / progress.total) * 100) : 0;
            const total = progress?.total || 0;

            return (
              <div key={theme.id} className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-sm bg-sapphire-100 dark:bg-sapphire-900/50 text-sapphire-600 dark:text-sapphire-400">
                  <i className={`fas ${theme.icon}`}></i>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-slate-700 dark:text-slate-300">{theme.title}</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {total > 0 ? `${percentage}%` : '-'}
                    </span>
                  </div>
                  <div className="h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-sapphire-500"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Exam History */}
      {examHistory.length > 0 && (
        <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center">
            <i className="fas fa-history text-sapphire-500 dark:text-sapphire-400 mr-2 text-sm"></i>
            Historique des examens
          </h2>
          <div className="space-y-2">
            {[...examHistory].reverse().slice(0, 10).map((exam) => (
              <div
                key={exam.id}
                className={`flex items-center justify-between p-3 rounded-lg border ${
                  exam.passed
                    ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800'
                    : 'bg-rose-50 dark:bg-rose-900/20 border-rose-200 dark:border-rose-800'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    exam.passed
                      ? 'bg-emerald-500 text-white'
                      : 'bg-rose-500 text-white'
                  }`}>
                    <i className={`fas ${exam.passed ? 'fa-check' : 'fa-times'} text-xs`}></i>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                      {exam.score}/40
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {formatDate(exam.date)}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    <i className="fas fa-clock mr-1"></i>
                    {formatDuration(exam.duration)}
                  </p>
                </div>
              </div>
            ))}
          </div>
          {examHistory.length > 10 && (
            <p className="text-xs text-slate-500 dark:text-slate-400 text-center mt-3">
              Affichage des 10 derniers examens
            </p>
          )}
        </div>
      )}

      {/* Badges */}
      <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center">
          <i className="fas fa-medal text-amber-500 dark:text-amber-400 mr-2 text-sm"></i>
          Badges ({userStats.badges.length}/{BADGES.length})
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {BADGES.map(badge => {
            const isUnlocked = userStats.badges.includes(badge.id);
            return (
              <div
                key={badge.id}
                className={`p-3 rounded-lg border text-center ${
                  isUnlocked
                    ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-700'
                    : 'bg-slate-50 dark:bg-slate-700/50 border-slate-200 dark:border-slate-600 opacity-50'
                }`}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-2 ${getBadgeColorClasses(isUnlocked)}`}>
                  <i className={`fas ${badge.icon}`}></i>
                </div>
                <h4 className={`text-sm ${isUnlocked ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400'}`}>
                  {badge.name}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{badge.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Levels */}
      <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center">
          <i className="fas fa-layer-group text-sapphire-500 dark:text-sapphire-400 mr-2 text-sm"></i>
          Niveaux
        </h2>
        <div className="flex flex-wrap gap-2">
          {LEVELS.map(level => {
            const isCurrentOrBelow = userStats.level >= level.level;
            const isCurrent = userStats.level === level.level;
            return (
              <div
                key={level.level}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg border text-sm ${
                  isCurrent
                    ? 'bg-sapphire-600 text-white border-sapphire-600'
                    : isCurrentOrBelow
                    ? 'bg-sapphire-50 dark:bg-sapphire-900/50 text-sapphire-600 dark:text-sapphire-400 border-sapphire-200 dark:border-sapphire-700'
                    : 'bg-slate-50 dark:bg-slate-700 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-600'
                }`}
              >
                <i className={`fas ${level.icon} text-xs`}></i>
                <span>{level.name}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Support */}
      <div className="bg-sapphire-50 dark:bg-sapphire-900/20 p-5 rounded-xl border border-sapphire-200 dark:border-sapphire-800">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="w-12 h-12 bg-sapphire-100 dark:bg-sapphire-900/50 text-sapphire-600 dark:text-sapphire-400 rounded-xl flex items-center justify-center flex-shrink-0">
            <i className="fas fa-heart text-xl"></i>
          </div>
          <div className="text-center sm:text-left flex-1">
            <h3 className="font-medium text-slate-900 dark:text-white mb-1">Ce projet vous aide ?</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Cette application est et restera <strong>100% gratuite</strong>. Un petit tip permet de continuer à l'améliorer.
            </p>
          </div>
          <a
            href="https://en.tipeee.com/objectif-citoyen/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-sapphire-600 hover:bg-sapphire-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors flex items-center flex-shrink-0"
          >
            <i className="fas fa-hand-holding-heart mr-2"></i>
            Soutenir
          </a>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
        {onShowTutorial && (
          <button
            onClick={onShowTutorial}
            className="text-sm text-slate-500 dark:text-slate-400 hover:text-sapphire-600 dark:hover:text-sapphire-400 transition-colors"
          >
            <i className="fas fa-graduation-cap mr-2"></i>
            Revoir le tutoriel
          </button>
        )}
        <button
          onClick={resetStats}
          className="text-sm text-slate-500 dark:text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 transition-colors"
        >
          <i className="fas fa-trash-alt mr-2"></i>
          Réinitialiser mes statistiques
        </button>
      </div>
    </div>
  );
};
