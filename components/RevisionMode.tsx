
import React, { useState } from 'react';
import { THEMES, ALL_QUESTIONS, OFFICIAL_DB } from '../constants';
import { Question } from '../types';

export const RevisionMode: React.FC = () => {
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const [expandedQuestions, setExpandedQuestions] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');

  const getQuestionsForTheme = (themeId: string): Question[] => {
    return OFFICIAL_DB[themeId] || [];
  };

  const toggleQuestion = (questionId: string) => {
    const newExpanded = new Set(expandedQuestions);
    if (newExpanded.has(questionId)) {
      newExpanded.delete(questionId);
    } else {
      newExpanded.add(questionId);
    }
    setExpandedQuestions(newExpanded);
  };

  const expandAll = () => {
    const questions = selectedTheme ? getQuestionsForTheme(selectedTheme) : ALL_QUESTIONS;
    const filtered = searchQuery
      ? questions.filter(q => q.text.toLowerCase().includes(searchQuery.toLowerCase()))
      : questions;
    setExpandedQuestions(new Set(filtered.map(q => q.id)));
  };

  const collapseAll = () => {
    setExpandedQuestions(new Set());
  };

  const questions = selectedTheme ? getQuestionsForTheme(selectedTheme) : ALL_QUESTIONS;
  const filteredQuestions = searchQuery
    ? questions.filter(q =>
        q.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.options.some(o => o.toLowerCase().includes(searchQuery.toLowerCase())) ||
        q.explanation.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : questions;

  const themeInfo = THEMES.find(t => t.id === selectedTheme);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Mode Révision</h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm">
          Parcourez toutes les questions avec leurs réponses pour réviser efficacement
        </p>
      </div>

      {/* Theme selector */}
      <div className="flex flex-wrap justify-center gap-2">
        <button
          onClick={() => setSelectedTheme(null)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            selectedTheme === null
              ? 'bg-indigo-600 text-white'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
          }`}
        >
          Toutes ({ALL_QUESTIONS.length})
        </button>
        {THEMES.map((theme) => {
          const count = getQuestionsForTheme(theme.id).length;
          return (
            <button
              key={theme.id}
              onClick={() => setSelectedTheme(theme.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center ${
                selectedTheme === theme.id
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              <i className={`fas ${theme.icon} mr-2 text-xs`}></i>
              {theme.title} ({count})
            </button>
          );
        })}
      </div>

      {/* Search and controls */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500"></i>
          <input
            type="text"
            placeholder="Rechercher une question..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={expandAll}
            className="px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 text-sm font-medium"
          >
            <i className="fas fa-expand-alt mr-2"></i>Tout déplier
          </button>
          <button
            onClick={collapseAll}
            className="px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 text-sm font-medium"
          >
            <i className="fas fa-compress-alt mr-2"></i>Tout replier
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
        <span>
          {filteredQuestions.length} question{filteredQuestions.length > 1 ? 's' : ''}
          {searchQuery && ` pour "${searchQuery}"`}
        </span>
        {themeInfo && (
          <span className={`px-2 py-1 rounded text-xs ${
            themeInfo.color === 'indigo' ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400' :
            themeInfo.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' :
            themeInfo.color === 'emerald' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400' :
            themeInfo.color === 'amber' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400' :
            'bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400'
          }`}>
            <i className={`fas ${themeInfo.icon} mr-1`}></i>
            {themeInfo.title}
          </span>
        )}
      </div>

      {/* Questions list */}
      <div className="space-y-3">
        {filteredQuestions.map((question, index) => (
          <div
            key={question.id}
            className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden"
          >
            {/* Question header */}
            <button
              onClick={() => toggleQuestion(question.id)}
              className="w-full p-4 text-left flex items-start justify-between hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
            >
              <div className="flex-1 pr-4">
                <span className="text-xs text-slate-400 dark:text-slate-500 mr-2">#{index + 1}</span>
                <span className="text-slate-900 dark:text-white">{question.text}</span>
              </div>
              <i className={`fas fa-chevron-${expandedQuestions.has(question.id) ? 'up' : 'down'} text-slate-400 dark:text-slate-500 mt-1`}></i>
            </button>

            {/* Expanded content */}
            {expandedQuestions.has(question.id) && (
              <div className="px-4 pb-4 space-y-3 border-t border-slate-100 dark:border-slate-700">
                {/* Options */}
                <div className="grid gap-2 pt-3">
                  {question.options.map((option, optIdx) => (
                    <div
                      key={optIdx}
                      className={`p-3 rounded-lg text-sm ${
                        optIdx === question.correctAnswer
                          ? 'bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300'
                          : 'bg-slate-50 dark:bg-slate-700/50 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      <span className="flex items-center">
                        {optIdx === question.correctAnswer && (
                          <i className="fas fa-check-circle text-emerald-500 mr-2"></i>
                        )}
                        {option}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Explanation */}
                <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg border border-indigo-100 dark:border-indigo-800">
                  <div className="flex items-start space-x-2">
                    <i className="fas fa-lightbulb text-indigo-500 dark:text-indigo-400 mt-0.5"></i>
                    <div>
                      <p className="text-xs text-indigo-600 dark:text-indigo-400 mb-1">Explication</p>
                      <p className="text-sm text-indigo-900 dark:text-indigo-300">{question.explanation}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredQuestions.length === 0 && (
        <div className="text-center py-12">
          <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center mx-auto mb-3 text-slate-400">
            <i className="fas fa-search"></i>
          </div>
          <p className="text-slate-500 dark:text-slate-400">Aucune question trouvée</p>
        </div>
      )}
    </div>
  );
};
