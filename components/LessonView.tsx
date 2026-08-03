
import React from 'react';
import { OFFICIAL_FICHES } from '../constants';

interface LessonViewProps {
  onStartQuiz: (themeId: string) => void;
}

// Helper function for category colors
const getCategoryColorClasses = (color: string) => {
  switch (color) {
    case 'sapphire': return 'bg-sapphire-100 dark:bg-sapphire-900/50 text-sapphire-600 dark:text-sapphire-400';
    case 'blue': return 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400';
    case 'emerald': return 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400';
    case 'amber': return 'bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400';
    case 'rose': return 'bg-rose-100 dark:bg-rose-900/50 text-rose-600 dark:text-rose-400';
    default: return 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400';
  }
};

const getButtonColorClasses = (color: string) => {
  switch (color) {
    case 'sapphire': return 'bg-sapphire-600 hover:bg-sapphire-700';
    case 'blue': return 'bg-blue-600 hover:bg-blue-700';
    case 'emerald': return 'bg-emerald-600 hover:bg-emerald-700';
    case 'amber': return 'bg-amber-600 hover:bg-amber-700';
    case 'rose': return 'bg-rose-600 hover:bg-rose-700';
    default: return 'bg-slate-600 hover:bg-slate-700';
  }
};

export const LessonView: React.FC<LessonViewProps> = ({ onStartQuiz }) => {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold dark:text-white">Fiches Officielles</h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm">
          Accédez aux fiches pédagogiques du Ministère de l'Intérieur pour approfondir vos connaissances.
        </p>
        <a
          href="https://formation-civique.interieur.gouv.fr/fiches-par-thematiques/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-xs text-sapphire-600 dark:text-sapphire-400 hover:underline"
        >
          <i className="fas fa-external-link-alt mr-1"></i>
          Voir toutes les fiches sur le site officiel
        </a>
      </div>

      <div className="space-y-6">
        {OFFICIAL_FICHES.map((category) => (
          <div key={category.id} className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
            {/* Category Header */}
            <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getCategoryColorClasses(category.color)}`}>
                  <i className={`fas ${category.icon}`}></i>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white">{category.title}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{category.fiches.length} fiches disponibles</p>
                </div>
              </div>
              <button
                onClick={() => onStartQuiz(category.id)}
                className={`px-3 py-1.5 rounded-lg text-white text-xs font-medium transition-colors flex items-center ${getButtonColorClasses(category.color)}`}
              >
                <i className="fas fa-play mr-1.5"></i>
                Quiz
              </button>
            </div>

            {/* Fiches List */}
            <div className="divide-y divide-slate-100 dark:divide-slate-700">
              {category.fiches.map((fiche) => (
                <a
                  key={fiche.id}
                  href={fiche.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors group"
                >
                  <span className="text-slate-700 dark:text-slate-300 text-sm group-hover:text-sapphire-600 dark:group-hover:text-sapphire-400">
                    {fiche.title}
                  </span>
                  <i className="fas fa-external-link-alt text-xs text-slate-400 dark:text-slate-500 group-hover:text-sapphire-500"></i>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Attribution */}
      <div className="text-center text-xs text-slate-400 dark:text-slate-500 space-y-1">
        <p>Source : Ministère de l'Intérieur</p>
        <a
          href="https://formation-civique.interieur.gouv.fr/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sapphire-500 hover:underline"
        >
          formation-civique.interieur.gouv.fr
        </a>
      </div>
    </div>
  );
};
