
import React from 'react';
import { NavLink } from 'react-router-dom';
import { UserStats } from '../types';
import { getLevelInfo } from '../services/gamificationService';
import { Logo } from './Logo';

interface HeaderProps {
  userStats: UserStats;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({ userStats, darkMode, toggleDarkMode }) => {
  const levelInfo = getLevelInfo(userStats.level);

  const navItems = [
    { path: '/', label: 'Accueil', icon: 'fa-home' },
    { path: '/quiz', label: 'Quiz', icon: 'fa-brain' },
    { path: '/fiches', label: 'Fiches', icon: 'fa-book-open' },
    { path: '/flashcards', label: 'Flashcards', icon: 'fa-clone' },
    { path: '/revision', label: 'Révision', icon: 'fa-list-check' },
    { path: '/examen-blanc', label: 'Examen', icon: 'fa-file-alt' },
    { path: '/faq', label: 'FAQ', icon: 'fa-circle-question' },
  ];

  const navLinkClass = (isActive: boolean) =>
    `px-3 py-2 rounded-md font-medium text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
      isActive
        ? 'bg-indigo-50 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400'
        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
    }`;

  return (
    <header className="sticky top-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <NavLink to="/" className="flex items-center space-x-2" end>
            <Logo className="w-9 h-9" />
            <span className="text-lg font-bold hidden sm:block dark:text-white">
              Objectif<span className="text-indigo-600 dark:text-indigo-400">Citoyen</span>
            </span>
          </NavLink>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center space-x-1" role="navigation" aria-label="Navigation principale">
            {navItems.map(item => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) => navLinkClass(isActive)}
              >
                <i className={`fas ${item.icon} mr-2 text-xs`} aria-hidden="true"></i>
                {item.label}
              </NavLink>
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

            {/* Support link */}
            <a
              href="https://en.tipeee.com/objectif-citoyen/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-md bg-rose-50 dark:bg-rose-900/30 text-rose-500 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/50 flex items-center justify-center transition-colors"
              title="Soutenir le projet"
              aria-label="Soutenir le projet sur Tipeee"
            >
              <i className="fas fa-heart text-sm" aria-hidden="true"></i>
            </a>

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
            <NavLink
              to="/profil"
              aria-label="Mon profil"
              className={({ isActive }) =>
                `flex items-center space-x-2 px-3 py-1.5 rounded-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                  isActive
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`
              }
            >
              <i className={`fas ${levelInfo.icon} text-sm`}></i>
              <span className="font-medium text-sm hidden md:block">Niv. {userStats.level}</span>
            </NavLink>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <nav className="lg:hidden border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900" role="navigation" aria-label="Navigation mobile">
        <div className="flex justify-around py-1">
          {navItems.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                `flex flex-col items-center py-2 px-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                  isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500 dark:text-slate-400'
                }`
              }
            >
              <i className={`fas ${item.icon}`} aria-hidden="true"></i>
              <span className="text-xs mt-1">{item.label}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </header>
  );
};
