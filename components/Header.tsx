
import React from 'react';
import { UserStats } from '../types';
import { getLevelInfo } from '../services/gamificationService';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  userStats: UserStats;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, userStats }) => {
  const levelInfo = getLevelInfo(userStats.level);

  const navItems = [
    { id: 'home', label: 'Accueil', icon: 'fa-home' },
    { id: 'study', label: 'Parcours', icon: 'fa-book-open' },
    { id: 'simulation', label: 'Examen Blanc', icon: 'fa-file-alt' },
    { id: 'faq', label: 'FAQ', icon: 'fa-circle-question' },
  ];

  return (
    <header className="sticky top-0 bg-white/80 backdrop-blur-lg border-b border-slate-100 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button
            onClick={() => setActiveTab('home')}
            className="flex items-center space-x-3 group"
          >
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200 group-hover:shadow-indigo-300 transition-shadow">
              <i className="fas fa-graduation-cap text-white"></i>
            </div>
            <span className="text-xl font-extrabold brand-font tracking-tight hidden sm:block">
              Objectif<span className="text-indigo-600">Citoyen</span>
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
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
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
              <div className="hidden sm:flex items-center space-x-1 bg-orange-50 text-orange-600 px-3 py-1.5 rounded-full">
                <i className="fas fa-fire text-xs"></i>
                <span className="text-xs font-bold">{userStats.streak}j</span>
              </div>
            )}

            {/* XP indicator */}
            <div className="hidden sm:flex items-center space-x-1 bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-full">
              <i className="fas fa-star text-xs"></i>
              <span className="text-xs font-bold">{userStats.xp} XP</span>
            </div>

            {/* Profile button */}
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-xl transition-all ${
                activeTab === 'profile'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                activeTab === 'profile' ? 'bg-white/20' : 'bg-indigo-100 text-indigo-600'
              }`}>
                <i className={`fas ${levelInfo.icon} text-sm`}></i>
              </div>
              <span className="font-bold text-sm hidden md:block">Niv. {userStats.level}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="lg:hidden border-t border-slate-100 bg-white">
        <div className="flex justify-around py-2">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center py-2 px-4 rounded-xl ${
                activeTab === item.id ? 'text-indigo-600' : 'text-slate-400'
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
