
import React, { useState, useEffect, useCallback } from 'react';
import { OFFICIAL_DB, THEMES, ALL_QUESTIONS } from '../constants';
import { Question, UserStats } from '../types';
import { processQuizResult, getBadgeInfo } from '../services/gamificationService';

interface QuizProps {
  selectedTheme?: string;
  onExit: () => void;
  onStatsUpdate: (stats: UserStats) => void;
  userStats: UserStats;
}

export const Quiz: React.FC<QuizProps> = ({ selectedTheme, onExit, onStatsUpdate, userStats }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<string[]>([]);
  const [correctQuestions, setCorrectQuestions] = useState<string[]>([]);
  const [xpGained, setXpGained] = useState(0);
  const [newBadges, setNewBadges] = useState<string[]>([]);
  const [leveledUp, setLeveledUp] = useState(false);

  // Function to load and shuffle questions
  const loadQuestions = useCallback(() => {
    let pool: Question[] = [];

    if (selectedTheme === 'weak') {
      // Load weak questions for spaced repetition
      pool = ALL_QUESTIONS.filter(q => userStats.weakQuestions.includes(q.id));
    } else if (selectedTheme) {
      pool = OFFICIAL_DB[selectedTheme] || [];
    } else {
      // Mix from all categories for global review
      pool = [...ALL_QUESTIONS];
    }

    // Shuffle and select up to 10 questions
    const shuffled = [...pool]
      .sort(() => 0.5 - Math.random())
      .slice(0, 10);

    setQuestions(shuffled);
    setCurrentIdx(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
    setShowExplanation(false);
    setAnsweredQuestions([]);
    setCorrectQuestions([]);
    setXpGained(0);
    setNewBadges([]);
    setLeveledUp(false);
  }, [selectedTheme, userStats.weakQuestions]);

  // Initial load - only run when selectedTheme changes, not when userStats changes
  useEffect(() => {
    loadQuestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTheme]);

  const handleAnswer = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    const currentQuestion = questions[currentIdx];
    const isCorrect = idx === currentQuestion.correctAnswer;

    setAnsweredQuestions(prev => [...prev, currentQuestion.id]);

    if (isCorrect) {
      setScore(s => s + 1);
      setCorrectQuestions(prev => [...prev, currentQuestion.id]);
    }
    setShowExplanation(true);
  };

  const nextQuestion = () => {
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx(i => i + 1);
      setSelected(null);
      setShowExplanation(false);
    } else {
      // Quiz finished - process results
      const result = processQuizResult(
        userStats,
        score + (selected === questions[currentIdx].correctAnswer ? 1 : 0),
        questions.length,
        selectedTheme !== 'weak' ? selectedTheme : undefined,
        answeredQuestions,
        correctQuestions
      );

      setXpGained(result.xpGained);
      setNewBadges(result.newBadges);
      setLeveledUp(result.leveledUp);
      onStatsUpdate(result.stats);
      setFinished(true);
    }
  };

  const handleRestart = () => {
    setFinished(false);
    setTimeout(() => {
      loadQuestions();
    }, 100);
  };

  if (questions.length === 0) return (
    <div className="text-center py-16">
      <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center mx-auto mb-4 text-slate-400 dark:text-slate-500">
        <i className="fas fa-database"></i>
      </div>
      <p className="text-slate-500 dark:text-slate-400">Pas de questions disponibles pour ce thème.</p>
      <button onClick={onExit} className="mt-4 text-indigo-600 dark:text-indigo-400 hover:underline">Retour au menu</button>
    </div>
  );

  if (finished) {
    const finalScore = score;
    const percentage = Math.round((finalScore / questions.length) * 100);

    return (
      <div className="max-w-md mx-auto bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-8 text-center space-y-6">
        {/* XP Gained */}
        {xpGained > 0 && (
          <div className="bg-indigo-600 text-white px-4 py-2 rounded-lg inline-block">
            <i className="fas fa-star mr-2"></i>
            +{xpGained} XP
          </div>
        )}

        {/* Level Up */}
        {leveledUp && (
          <div className="bg-amber-500 text-white px-4 py-2 rounded-lg">
            <i className="fas fa-arrow-up mr-2"></i>
            Niveau supérieur atteint !
          </div>
        )}

        <div className={`w-16 h-16 rounded-lg flex items-center justify-center mx-auto ${
          percentage >= 80 ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400' : 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400'
        }`}>
          <i className={`fas ${percentage >= 80 ? 'fa-trophy' : 'fa-flag-checkered'} text-2xl`}></i>
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Session terminée</h2>
          <p className="text-slate-500 dark:text-slate-400">
            Score : <span className="text-indigo-600 dark:text-indigo-400 font-bold text-lg">{finalScore} / {questions.length}</span>
            <span className="text-slate-400 dark:text-slate-500 ml-2">({percentage}%)</span>
          </p>
          <div className="pt-2">
            {percentage >= 80 ? (
              <span className="text-xs text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-3 py-1 rounded">Excellent travail !</span>
            ) : percentage >= 60 ? (
              <span className="text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30 px-3 py-1 rounded">Bon travail !</span>
            ) : (
              <span className="text-xs text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/30 px-3 py-1 rounded">Continuez vos efforts</span>
            )}
          </div>
        </div>

        {/* New Badges */}
        {newBadges.length > 0 && (
          <div className="bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-700 p-4 rounded-lg">
            <p className="text-xs text-amber-700 dark:text-amber-400 mb-3">Nouveaux badges débloqués</p>
            <div className="flex justify-center gap-4">
              {newBadges.map(badgeId => {
                const badge = getBadgeInfo(badgeId);
                if (!badge) return null;
                return (
                  <div key={badgeId} className="text-center">
                    <div className="w-10 h-10 bg-white dark:bg-slate-700 rounded-lg flex items-center justify-center mx-auto">
                      <i className={`fas ${badge.icon} text-amber-500 dark:text-amber-400`}></i>
                    </div>
                    <p className="text-xs text-amber-700 dark:text-amber-400 mt-1">{badge.name}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="pt-2 space-y-2">
          <button
            onClick={handleRestart}
            className="w-full bg-indigo-600 text-white font-medium py-3 rounded-lg hover:bg-indigo-700 transition flex items-center justify-center"
          >
            <i className="fas fa-redo-alt mr-2 text-sm"></i> Nouvelle session
          </button>
          <button
            onClick={onExit}
            className="w-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-medium py-3 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition"
          >
            Retour à l'accueil
          </button>
        </div>
      </div>
    );
  }

  const current = questions[currentIdx];
  const themeInfo = THEMES.find(t => t.id === selectedTheme);

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <button onClick={onExit} className="w-8 h-8 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center justify-center text-slate-400 dark:text-slate-500 transition-colors">
            <i className="fas fa-chevron-left text-xs"></i>
          </button>
          <span className="text-sm text-slate-600 dark:text-slate-400">{currentIdx + 1} / {questions.length}</span>
        </div>
        <div className={`px-3 py-1 rounded text-xs ${
          selectedTheme === 'weak' ? 'bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400' :
          themeInfo ? (
            themeInfo.color === 'indigo' ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400' :
            themeInfo.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' :
            themeInfo.color === 'emerald' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400' :
            themeInfo.color === 'amber' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400' :
            'bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400'
          ) : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
        }`}>
          {selectedTheme === 'weak' ? 'Points faibles' : themeInfo?.title || 'Révision Globale'}
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-indigo-500 rounded-full transition-all"
          style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
        ></div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="p-6 space-y-6">
          {/* Question type indicator */}
          {current.type === 'scenario' && (
            <div className="inline-block px-2 py-1 bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-400 text-xs rounded">
              <i className="fas fa-lightbulb mr-1"></i> Mise en situation
            </div>
          )}

          <h3 className="text-lg md:text-xl font-medium text-slate-900 dark:text-white leading-relaxed">{current.text}</h3>

          <div className="grid gap-2" role="group" aria-label="Options de réponse">
            {current.options.map((opt, idx) => (
              <button
                key={idx}
                disabled={selected !== null}
                onClick={() => handleAnswer(idx)}
                aria-pressed={selected === idx}
                aria-describedby={selected !== null && idx === current.correctAnswer ? 'correct-answer' : undefined}
                className={`w-full text-left p-4 rounded-lg border transition-colors flex items-center justify-between focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                  selected === null
                    ? 'hover:border-indigo-400 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/50 hover:bg-white dark:hover:bg-slate-700 dark:text-slate-200'
                    : idx === current.correctAnswer
                      ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-900 dark:text-emerald-300'
                      : selected === idx
                        ? 'border-rose-500 bg-rose-50 dark:bg-rose-900/30 text-rose-900 dark:text-rose-300'
                        : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 opacity-40'
                }`}
              >
                <span className="pr-4">{opt}</span>
                <div className="flex-shrink-0">
                  {selected !== null && idx === current.correctAnswer && (
                    <div className="w-5 h-5 bg-emerald-500 text-white rounded-full flex items-center justify-center" role="img" aria-label="Bonne réponse">
                      <i className="fas fa-check text-xs" aria-hidden="true"></i>
                    </div>
                  )}
                  {selected === idx && idx !== current.correctAnswer && (
                    <div className="w-5 h-5 bg-rose-500 text-white rounded-full flex items-center justify-center" role="img" aria-label="Mauvaise réponse">
                      <i className="fas fa-times text-xs" aria-hidden="true"></i>
                    </div>
                  )}
                  {selected === null && (
                    <div className="w-5 h-5 rounded-full border-2 border-slate-300 dark:border-slate-600" aria-hidden="true"></div>
                  )}
                </div>
              </button>
            ))}
          </div>

          {showExplanation && (
            <div className="p-4 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg border border-indigo-100 dark:border-indigo-800">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 rounded-lg flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-lightbulb text-sm"></i>
                </div>
                <div>
                  <p className="text-xs text-indigo-500 dark:text-indigo-400 mb-1">Le saviez-vous ?</p>
                  <p className="text-sm text-indigo-900/80 dark:text-indigo-300">{current.explanation}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {selected !== null && (
          <div className="bg-slate-50 dark:bg-slate-700/50 p-4 border-t border-slate-200 dark:border-slate-700 flex justify-between items-center">
            <div className="text-sm text-slate-500 dark:text-slate-400">
              <i className="fas fa-check-circle text-emerald-500 mr-1"></i>
              {score + (selected === current.correctAnswer ? 1 : 0)} bonnes réponses
            </div>
            <button
              onClick={nextQuestion}
              className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition flex items-center"
            >
              {currentIdx + 1 === questions.length ? 'Voir les résultats' : 'Suivant'}
              <i className={`fas ${currentIdx + 1 === questions.length ? 'fa-flag-checkered' : 'fa-arrow-right'} ml-2 text-sm`}></i>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
