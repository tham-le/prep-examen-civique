
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { THEMES, ALL_QUESTIONS, OFFICIAL_DB } from '../constants';
import { Question, UserStats } from '../types';
import { getItemStatus, ItemStatus } from '../services/spacedRepetition';

type StatusFilter = 'all' | 'due' | 'mastered' | 'never-attempted';

const STATUS_LABEL: Record<ItemStatus, string> = {
  'never-attempted': 'Jamais vue',
  due: 'À revoir',
  learning: 'En cours',
  mastered: 'Maîtrisée',
};

const STATUS_BADGE_CLASS: Record<ItemStatus, string> = {
  'never-attempted': 'bg-slate-100 dark:bg-slate-700 text-slate-400 dark:text-slate-500',
  due: 'bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400',
  learning: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400',
  mastered: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400',
};

const STATUS_BORDER_CLASS: Record<ItemStatus, string> = {
  'never-attempted': 'border-slate-200 dark:border-slate-700',
  due: 'border-rose-200 dark:border-rose-800',
  learning: 'border-amber-200 dark:border-amber-800',
  mastered: 'border-emerald-200 dark:border-emerald-800',
};

const STATUS_ICON: Record<ItemStatus, string> = {
  'never-attempted': 'fa-circle',
  due: 'fa-rotate-left',
  learning: 'fa-hourglass-half',
  mastered: 'fa-check',
};

interface RevisionModeProps {
  userStats: UserStats;
}

export const RevisionMode: React.FC<RevisionModeProps> = ({ userStats }) => {
  const navigate = useNavigate();
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [expandedQuestions, setExpandedQuestions] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [shuffled, setShuffled] = useState(false);
  const [shuffledOrder, setShuffledOrder] = useState<string[]>([]);
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);

  const mastery = userStats.questionMastery;

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

  const goToNext = (index: number) => {
    if (index < filteredQuestions.length - 1) {
      const current = filteredQuestions[index];
      const next = filteredQuestions[index + 1];
      const newExpanded = new Set(expandedQuestions);
      newExpanded.delete(current.id);
      newExpanded.add(next.id);
      setExpandedQuestions(newExpanded);
      setFocusedIndex(index + 1);
    }
  };

  const expandAll = () => {
    setExpandedQuestions(new Set(filteredQuestions.map(q => q.id)));
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
  const searchedQuestions = searchQuery
    ? questions.filter(q =>
        q.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.options[q.correctAnswer].toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.explanation.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : questions;

  // Status counts computed before the status filter itself is applied, so the
  // filter chips always show how many questions each filter would reveal.
  const masteredCount = searchedQuestions.filter(q => getItemStatus(mastery, q.id) === 'mastered').length;
  const dueCount = searchedQuestions.filter(q => getItemStatus(mastery, q.id) === 'due').length;
  const neverCount = searchedQuestions.filter(q => getItemStatus(mastery, q.id) === 'never-attempted').length;

  const filteredQuestions = statusFilter === 'all'
    ? searchedQuestions
    : searchedQuestions.filter(q => getItemStatus(mastery, q.id) === statusFilter);

  const themeInfo = THEMES.find(t => t.id === selectedTheme);

  // Keyboard navigation
  React.useEffect(() => {
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
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  // Scroll focused item into view
  React.useEffect(() => {
    if (focusedIndex >= 0) {
      const element = document.getElementById(`revision-q-${focusedIndex}`);
      element?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [focusedIndex]);

  const STATUS_FILTERS: { id: StatusFilter; label: string; count: number }[] = [
    { id: 'all', label: `Toutes (${searchedQuestions.length})`, count: searchedQuestions.length },
    { id: 'due', label: `À revoir (${dueCount})`, count: dueCount },
    { id: 'mastered', label: `Maîtrisées (${masteredCount})`, count: masteredCount },
    { id: 'never-attempted', label: `Jamais vues (${neverCount})`, count: neverCount },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Mode Révision</h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm">
          Révisez les questions avec leurs réponses et explications
        </p>
      </div>

      {/* Progress bar: driven by real quiz/exam mastery, not a manual checkbox */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Maîtrisées : {masteredCount} / {searchedQuestions.length}
          </span>
          <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
            {searchedQuestions.length > 0 ? Math.round((masteredCount / searchedQuestions.length) * 100) : 0}%
          </span>
        </div>
        <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-500 rounded-full transition-all duration-500"
            style={{ width: `${searchedQuestions.length > 0 ? (masteredCount / searchedQuestions.length) * 100 : 0}%` }}
          ></div>
        </div>
        <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">
          La maîtrise vient de vos réponses en Quiz et en Examen Blanc, pas d'une simple lecture.
        </p>
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

      {/* Status filter */}
      <div className="flex flex-wrap justify-center gap-2">
        {STATUS_FILTERS.map(f => (
          <button
            key={f.id}
            onClick={() => setStatusFilter(f.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              statusFilter === f.id
                ? 'bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-900'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {dueCount > 0 && (statusFilter === 'due' || statusFilter === 'all') && (
        <div className="flex justify-center">
          <button
            onClick={() => navigate('/quiz?theme=weak')}
            className="text-xs text-rose-600 dark:text-rose-400 hover:underline"
          >
            <i className="fas fa-arrow-right mr-1"></i>
            Réviser ces {dueCount} question{dueCount > 1 ? 's' : ''} dans un Quiz
          </button>
        </div>
      )}

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
        <kbd className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 rounded">Entrée</kbd> ouvrir
      </p>

      {/* Questions list */}
      <div className="space-y-3">
        {filteredQuestions.map((question, index) => {
          const isExpanded = expandedQuestions.has(question.id);
          const isFocused = focusedIndex === index;
          const status = getItemStatus(mastery, question.id);

          return (
            <div
              key={question.id}
              id={`revision-q-${index}`}
              className={`bg-white dark:bg-slate-800 rounded-xl border overflow-hidden transition-all ${
                isFocused
                  ? 'border-indigo-500 ring-2 ring-indigo-200 dark:ring-indigo-800'
                  : STATUS_BORDER_CLASS[status]
              }`}
            >
              {/* Question header */}
              <button
                onClick={() => { toggleQuestion(question.id); setFocusedIndex(index); }}
                className="w-full p-4 text-left flex items-start justify-between hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
              >
                <div className="flex-1 pr-4 flex items-start">
                  <span
                    title={STATUS_LABEL[status]}
                    className={`text-xs mr-3 mt-1 px-2 py-0.5 rounded flex items-center gap-1 flex-shrink-0 ${STATUS_BADGE_CLASS[status]}`}
                  >
                    <i className={`fas ${STATUS_ICON[status]}`}></i>
                  </span>
                  <span className="text-slate-900 dark:text-white">{question.text}</span>
                </div>
                <i className={`fas fa-chevron-${isExpanded ? 'up' : 'down'} text-slate-400 dark:text-slate-500 mt-1`}></i>
              </button>

              {/* Expanded content - simplified: just answer + explanation */}
              {isExpanded && (
                <div className="px-4 pb-4 space-y-3 border-t border-slate-100 dark:border-slate-700">
                  <div className="pt-3 flex items-center gap-2">
                    <span className={`text-xs px-2 py-0.5 rounded ${STATUS_BADGE_CLASS[status]}`}>
                      {STATUS_LABEL[status]}
                    </span>
                  </div>

                  {/* Correct answer */}
                  <div>
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

                  {/* Navigation */}
                  {index < filteredQuestions.length - 1 && (
                    <div className="flex justify-end pt-2">
                      <button
                        onClick={() => goToNext(index)}
                        className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-colors"
                      >
                        Suivante <i className="fas fa-arrow-right ml-2"></i>
                      </button>
                    </div>
                  )}
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
