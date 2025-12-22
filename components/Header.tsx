
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
    { id: 'study', label: 'Fiches', icon: 'fa-book-open' },
    { id: 'simulation', label: 'Examen Blanc', icon: 'fa-file-alt' },
    { id: 'faq', label: 'FAQ', icon: 'fa-circle-question' },
  ];

  return (
    <header className="sticky top-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => setActiveTab('home')}
            className="flex items-center space-x-2"
          >
            <div className="w-9 h-9 bg-indigo-600 rounded-lg flex items-center justify-center">
              <i className="fas fa-graduation-cap text-white text-sm"></i>
            </div>
            <span className="text-lg font-bold hidden sm:block dark:text-white">
              Objectif<span className="text-indigo-600 dark:text-indigo-400">Citoyen</span>
            </span>
          </button>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center space-x-1" role="navigation" aria-label="Navigation principale">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-3 py-2 rounded-md font-medium text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                  activeTab === item.id
                    ? 'bg-indigo-50 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
                aria-current={activeTab === item.id ? 'page' : undefined}
              >
                <i className={`fas ${item.icon} mr-2 text-xs`} aria-hidden="true"></i>
                {item.label}
              </button>
            ))}
          </nav>

          {/* User Profile */}
          <div className="flex items-center space-x-2">
            {/* Streak indicator */}
            {userStats.streak > 0 && (
              <div className="hidden sm:flex items-center space-x-1 text-orange-600 dark:text-orange-400 px-2 py-1 text-sm">
                <i className="fas fa-fire text-xs"></i>
                <span className="font-medium">{userStats.streak}j</span>
              </div>
            )}

            {/* XP indicator */}
            <div className="hidden sm:flex items-center space-x-1 text-indigo-600 dark:text-indigo-400 px-2 py-1 text-sm">
              <i className="fas fa-star text-xs"></i>
              <span className="font-medium">{userStats.xp} XP</span>
            </div>

            {/* Dark mode toggle */}
            <button
              onClick={toggleDarkMode}
              className="w-9 h-9 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              title={darkMode ? 'Mode clair' : 'Mode sombre'}
              aria-label={darkMode ? 'Activer le mode clair' : 'Activer le mode sombre'}
            >
              <i className={`fas ${darkMode ? 'fa-sun' : 'fa-moon'} text-sm`} aria-hidden="true"></i>
            </button>

            {/* Profile button */}
            <button
              onClick={() => setActiveTab('profile')}
              aria-label="Mon profil"
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                activeTab === 'profile'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              <i className={`fas ${levelInfo.icon} text-sm`}></i>
              <span className="font-medium text-sm hidden md:block">Niv. {userStats.level}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <nav className="lg:hidden border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900" role="navigation" aria-label="Navigation mobile">
        <div className="flex justify-around py-1">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              aria-current={activeTab === item.id ? 'page' : undefined}
              className={`flex flex-col items-center py-2 px-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                activeTab === item.id ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500 dark:text-slate-400'
              }`}
            >
              <i className={`fas ${item.icon}`} aria-hidden="true"></i>
              <span className="text-xs mt-1">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </header>
  );
};
