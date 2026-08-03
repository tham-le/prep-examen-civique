
import React, { useState, useEffect } from 'react';
import { THEMES, ALL_QUESTIONS, OFFICIAL_DB } from '../constants';
import { Question } from '../types';

export const RevisionMode: React.FC = () => {
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const [expandedQuestions, setExpandedQuestions] = useState<Set<string>>(new Set());
  const [reviewedQuestions, setReviewedQuestions] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [shuffled, setShuffled] = useState(false);
  const [shuffledOrder, setShuffledOrder] = useState<string[]>([]);
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);

  // Load reviewed questions from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('objectif_citoyen_reviewed_questions');
    if (saved) {
      setReviewedQuestions(new Set(JSON.parse(saved) as string[]));
    }
  }, []);

  const saveReviewedQuestions = (questions: Set<string>) => {
    localStorage.setItem('objectif_citoyen_reviewed_questions', JSON.stringify([...questions]));
  };

  const getQuestionsForTheme = (themeId: string): Question[] => {
    return OFFICIAL_DB[themeId] || [];
  };

  const toggleQuestion = (questionId: string) => {
    const newExpanded = new Set<string>(expandedQuestions);
    if (newExpanded.has(questionId)) {
      newExpanded.delete(questionId);
    } else {
      newExpanded.add(questionId);
    }
    setExpandedQuestions(newExpanded);
  };

  const toggleReviewed = (questionId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newReviewed = new Set<string>(reviewedQuestions);
    if (newReviewed.has(questionId)) {
      newReviewed.delete(questionId);
    } else {
      newReviewed.add(questionId);
    }
    setReviewedQuestions(newReviewed);
    saveReviewedQuestions(newReviewed);
  };

  const markAsReviewedAndNext = (questionId: string, index: number) => {
    // Mark as reviewed
    const newReviewed = new Set<string>(reviewedQuestions);
    newReviewed.add(questionId);
    setReviewedQuestions(newReviewed);
    saveReviewedQuestions(newReviewed);

    // Collapse current and expand next
    const newExpanded = new Set<string>(expandedQuestions);
    newExpanded.delete(questionId);

    if (index < filteredQuestions.length - 1) {
      const nextQuestion = filteredQuestions[index + 1];
      newExpanded.add(nextQuestion.id);
      setFocusedIndex(index + 1);
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

  const shuffleQuestions = () => {
    if (shuffled) {
      setShuffled(false);
      setShuffledOrder([]);
    } else {
      const questions = selectedTheme ? getQuestionsForTheme(selectedTheme) : ALL_QUESTIONS;
      const ids = questions.map(q => q.id);
      // Fisher-Yates shuffle
      for (let i = ids.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [ids[i], ids[j]] = [ids[j], ids[i]];
      }
      setShuffledOrder(ids);
      setShuffled(true);
    }
    setExpandedQuestions(new Set());
  };

  const resetProgress = () => {
    if (window.confirm('Réinitialiser la progression de révision ?')) {
      setReviewedQuestions(new Set());
      localStorage.removeItem('objectif_citoyen_reviewed_questions');
    }
  };

  // Get questions based on theme
  let questions = selectedTheme ? getQuestionsForTheme(selectedTheme) : ALL_QUESTIONS;

  // Apply shuffle if active
  if (shuffled && shuffledOrder.length > 0) {
    const questionMap = new Map(questions.map(q => [q.id, q]));
    questions = shuffledOrder
      .filter(id => questionMap.has(id))
      .map(id => questionMap.get(id)!);
  }

  // Apply search filter
  const filteredQuestions = searchQuery
    ? questions.filter(q =>
        q.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.options[q.correctAnswer].toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.explanation.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : questions;

  const themeInfo = THEMES.find(t => t.id === selectedTheme);
  const reviewedCount = filteredQuestions.filter(q => reviewedQuestions.has(q.id)).length;
  const progressPercent = filteredQuestions.length > 0
    ? Math.round((reviewedCount / filteredQuestions.length) * 100)
    : 0;

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (filteredQuestions.length === 0) return;

      if (e.key === 'ArrowDown' || e.key === 'j') {
        e.preventDefault();
        setFocusedIndex(prev => Math.min(prev + 1, filteredQuestions.length - 1));
      } else if (e.key === 'ArrowUp' || e.key === 'k') {
        e.preventDefault();
        setFocusedIndex(prev => Math.max(prev - 1, 0));
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (focusedIndex >= 0 && focusedIndex < filteredQuestions.length) {
          toggleQuestion(filteredQuestions[focusedIndex].id);
        }
      } else if (e.key === 'r' || e.key === 'R') {
        if (focusedIndex >= 0 && focusedIndex < filteredQuestions.length) {
          const q = filteredQuestions[focusedIndex];
          const newReviewed = new Set<string>(reviewedQuestions);
          if (newReviewed.has(q.id)) {
            newReviewed.delete(q.id);
          } else {
            newReviewed.add(q.id);
          }
          setReviewedQuestions(newReviewed);
          saveReviewedQuestions(newReviewed);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  // Scroll focused item into view
  useEffect(() => {
    if (focusedIndex >= 0) {
      const element = document.getElementById(`revision-q-${focusedIndex}`);
      element?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [focusedIndex]);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Mode Révision</h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm">
          Révisez les questions avec leurs réponses et explications
        </p>
      </div>

      {/* Progress bar */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Progression: {reviewedCount} / {filteredQuestions.length} questions révisées
          </span>
          <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">{progressPercent}%</span>
        </div>
        <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-indigo-500 rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
        {reviewedCount > 0 && (
          <button
            onClick={resetProgress}
            className="text-xs text-slate-400 hover:text-rose-500 mt-2"
          >
            <i className="fas fa-redo mr-1"></i>Réinitialiser
          </button>
        )}
      </div>

      {/* Theme selector */}
      <div className="flex flex-wrap justify-center gap-2">
        <button
          onClick={() => { setSelectedTheme(null); setShuffled(false); }}
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
              onClick={() => { setSelectedTheme(theme.id); setShuffled(false); }}
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
            onClick={shuffleQuestions}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              shuffled
                ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <i className="fas fa-random mr-2"></i>{shuffled ? 'Mélangé' : 'Mélanger'}
          </button>
          <button
            onClick={expandAll}
            className="px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 text-sm font-medium"
          >
            <i className="fas fa-expand-alt mr-2"></i>Déplier
          </button>
          <button
            onClick={collapseAll}
            className="px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 text-sm font-medium"
          >
            <i className="fas fa-compress-alt mr-2"></i>Replier
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
        <span>
          {filteredQuestions.length} question{filteredQuestions.length > 1 ? 's' : ''}
          {searchQuery && ` pour "${searchQuery}"`}
          {shuffled && ' (ordre aléatoire)'}
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

      {/* Keyboard hint */}
      <p className="text-center text-xs text-slate-400 dark:text-slate-500">
        <kbd className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 rounded">↑</kbd>{' '}
        <kbd className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 rounded">↓</kbd> naviguer ·{' '}
        <kbd className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 rounded">Entrée</kbd> ouvrir ·{' '}
        <kbd className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 rounded">R</kbd> marquer révisé
      </p>

      {/* Questions list */}
      <div className="space-y-3">
        {filteredQuestions.map((question, index) => {
          const isExpanded = expandedQuestions.has(question.id);
          const isReviewed = reviewedQuestions.has(question.id);
          const isFocused = focusedIndex === index;

          return (
            <div
              key={question.id}
              id={`revision-q-${index}`}
              className={`bg-white dark:bg-slate-800 rounded-xl border overflow-hidden transition-all ${
                isFocused
                  ? 'border-indigo-500 ring-2 ring-indigo-200 dark:ring-indigo-800'
                  : isReviewed
                    ? 'border-emerald-200 dark:border-emerald-800'
                    : 'border-slate-200 dark:border-slate-700'
              }`}
            >
              {/* Question header */}
              <button
                onClick={() => { toggleQuestion(question.id); setFocusedIndex(index); }}
                className="w-full p-4 text-left flex items-start justify-between hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
              >
                <div className="flex-1 pr-4 flex items-start">
                  <span className={`text-xs mr-3 mt-1 px-2 py-0.5 rounded ${
                    isReviewed
                      ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-400 dark:text-slate-500'
                  }`}>
                    {isReviewed ? <i className="fas fa-check"></i> : `#${index + 1}`}
                  </span>
                  <span className="text-slate-900 dark:text-white">{question.text}</span>
                </div>
                <i className={`fas fa-chevron-${isExpanded ? 'up' : 'down'} text-slate-400 dark:text-slate-500 mt-1`}></i>
              </button>

              {/* Expanded content - simplified: just answer + explanation */}
              {isExpanded && (
                <div className="px-4 pb-4 space-y-3 border-t border-slate-100 dark:border-slate-700">
                  {/* Correct answer */}
                  <div className="pt-3">
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wide">Réponse</p>
                    <div className="p-4 rounded-lg bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800">
                      <span className="flex items-center text-emerald-800 dark:text-emerald-300 font-medium">
                        <i className="fas fa-check-circle text-emerald-500 mr-3"></i>
                        {question.options[question.correctAnswer]}
                      </span>
                    </div>
                  </div>

                  {/* Explanation */}
                  <div className="p-4 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg border border-indigo-100 dark:border-indigo-800">
                    <div className="flex items-start space-x-3">
                      <i className="fas fa-lightbulb text-indigo-500 dark:text-indigo-400 mt-0.5"></i>
                      <div>
                        <p className="text-xs text-indigo-600 dark:text-indigo-400 mb-1 uppercase tracking-wide">Explication</p>
                        <p className="text-sm text-indigo-900 dark:text-indigo-300">{question.explanation}</p>
                      </div>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex justify-between items-center pt-2">
                    <button
                      onClick={(e) => toggleReviewed(question.id, e)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        isReviewed
                          ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:text-emerald-600'
                      }`}
                    >
                      <i className={`fas ${isReviewed ? 'fa-check-circle' : 'fa-circle'} mr-2`}></i>
                      {isReviewed ? 'Révisée' : 'Marquer comme révisée'}
                    </button>

                    {index < filteredQuestions.length - 1 && (
                      <button
                        onClick={() => markAsReviewedAndNext(question.id, index)}
                        className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-colors"
                      >
                        Suivante <i className="fas fa-arrow-right ml-2"></i>
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
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
