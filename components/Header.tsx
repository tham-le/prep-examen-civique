
import React from 'react';
import { UserStats } from '../types';
import { getLevelInfo } from '../services/gamificationService';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  userStats: UserStats;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, userStats, darkMode, toggleDarkMode }) => {
  const levelInfo = getLevelInfo(userStats.level);

  const navItems = [
    { id: 'home', label: 'Accueil', icon: 'fa-home' },
    { id: 'study', label: 'Parcours', icon: 'fa-book-open' },
    { id: 'simulation', label: 'Examen Blanc', icon: 'fa-file-alt' },
    { id: 'faq', label: 'FAQ', icon: 'fa-circle-question' },
  ];

  return (
    <header className="sticky top-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-slate-100 dark:border-slate-800 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button
            onClick={() => setActiveTab('home')}
            className="flex items-center space-x-3 group"
          >
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200 dark:shadow-indigo-900/50 group-hover:shadow-indigo-300 transition-shadow">
              <i className="fas fa-graduation-cap text-white"></i>
            </div>
            <span className="text-xl font-extrabold brand-font tracking-tight hidden sm:block dark:text-white">
              Objectif<span className="text-indigo-600 dark:text-indigo-400">Citoyen</span>
            </span>
          </button>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-4 py-2 rounded-xl font-bold text-sm transition-all ${
                  activeTab === item.id
                    ? 'bg-indigo-50 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <i className={`fas ${item.icon} mr-2 text-xs`}></i>
                {item.label}
              </button>
            ))}
          </nav>

          {/* User Profile */}
          <div className="flex items-center space-x-3">
            {/* Streak indicator */}
            {userStats.streak > 0 && (
              <div className="hidden sm:flex items-center space-x-1 bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 px-3 py-1.5 rounded-full">
                <i className="fas fa-fire text-xs"></i>
                <span className="text-xs font-bold">{userStats.streak}j</span>
              </div>
            )}

            {/* XP indicator */}
            <div className="hidden sm:flex items-center space-x-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 px-3 py-1.5 rounded-full">
              <i className="fas fa-star text-xs"></i>
              <span className="text-xs font-bold">{userStats.xp} XP</span>
            </div>

            {/* Dark mode toggle */}
            <button
              onClick={toggleDarkMode}
              className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center transition-all"
              title={darkMode ? 'Mode clair' : 'Mode sombre'}
            >
              <i className={`fas ${darkMode ? 'fa-sun' : 'fa-moon'} text-sm`}></i>
            </button>

            {/* Profile button */}
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-xl transition-all ${
                activeTab === 'profile'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                activeTab === 'profile' ? 'bg-white/20' : 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400'
              }`}>
                <i className={`fas ${levelInfo.icon} text-sm`}></i>
              </div>
              <span className="font-bold text-sm hidden md:block">Niv. {userStats.level}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="lg:hidden border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="flex justify-around py-2">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center py-2 px-4 rounded-xl ${
                activeTab === item.id ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400 dark:text-slate-500'
              }`}
            >
              <i className={`fas ${item.icon} text-lg`}></i>
              <span className="text-[10px] font-bold mt-1">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};
