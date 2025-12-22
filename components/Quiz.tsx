
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

  // Initial load
  useEffect(() => {
    loadQuestions();
  }, [loadQuestions]);

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
    <div className="text-center py-20 animate-in fade-in">
      <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
        <i className="fas fa-database text-xl"></i>
      </div>
      <p className="text-slate-500 font-medium">Pas de questions disponibles pour ce thème.</p>
      <button onClick={onExit} className="mt-4 text-indigo-600 font-bold hover:underline">Retour au menu</button>
    </div>
  );

  if (finished) {
    const finalScore = score;
    const percentage = Math.round((finalScore / questions.length) * 100);

    return (
      <div className="max-w-md mx-auto bg-white rounded-[2.5rem] shadow-2xl border p-12 text-center space-y-8 animate-in zoom-in-95 duration-300">
        {/* XP Gained Animation */}
        {xpGained > 0 && (
          <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-2xl inline-block animate-bounce">
            <i className="fas fa-star mr-2"></i>
            +{xpGained} XP
          </div>
        )}

        {/* Level Up */}
        {leveledUp && (
          <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-6 py-4 rounded-2xl animate-pulse">
            <i className="fas fa-arrow-up mr-2"></i>
            Niveau supérieur atteint !
          </div>
        )}

        <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto ring-8 ${
          percentage >= 80 ? 'bg-emerald-50 text-emerald-600 ring-emerald-50/50' : 'bg-indigo-50 text-indigo-600 ring-indigo-50/50'
        }`}>
          <i className={`fas ${percentage >= 80 ? 'fa-trophy' : 'fa-flag-checkered'} text-4xl`}></i>
        </div>

        <div className="space-y-2">
          <h2 className="text-3xl font-black brand-font text-slate-900">Session terminée</h2>
          <p className="text-slate-500 font-medium">
            Score : <span className="text-indigo-600 font-black text-xl">{finalScore} / {questions.length}</span>
            <span className="text-slate-400 ml-2">({percentage}%)</span>
          </p>
          <div className="pt-2">
            {percentage >= 80 ? (
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-4 py-1.5 rounded-full uppercase tracking-widest">Excellent travail !</span>
            ) : percentage >= 60 ? (
              <span className="text-xs font-bold text-amber-600 bg-amber-50 px-4 py-1.5 rounded-full uppercase tracking-widest">Bon travail !</span>
            ) : (
              <span className="text-xs font-bold text-rose-600 bg-rose-50 px-4 py-1.5 rounded-full uppercase tracking-widest">Continuez vos efforts</span>
            )}
          </div>
        </div>

        {/* New Badges */}
        {newBadges.length > 0 && (
          <div className="bg-amber-50 border border-amber-200 p-6 rounded-2xl">
            <p className="text-xs font-bold text-amber-700 uppercase mb-3">Nouveaux badges débloqués !</p>
            <div className="flex justify-center gap-4">
              {newBadges.map(badgeId => {
                const badge = getBadgeInfo(badgeId);
                if (!badge) return null;
                return (
                  <div key={badgeId} className="text-center">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mx-auto shadow-sm">
                      <i className={`fas ${badge.icon} text-amber-500`}></i>
                    </div>
                    <p className="text-xs font-bold text-amber-700 mt-2">{badge.name}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="pt-4 space-y-3">
          <button
            onClick={handleRestart}
            className="w-full bg-indigo-600 text-white font-bold py-4 rounded-2xl hover:bg-indigo-700 transition shadow-lg shadow-indigo-100 flex items-center justify-center"
          >
            <i className="fas fa-redo-alt mr-3 text-sm opacity-70"></i> Nouvelle session
          </button>
          <button
            onClick={onExit}
            className="w-full bg-slate-100 text-slate-600 font-bold py-4 rounded-2xl hover:bg-slate-200 transition"
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
    <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center px-4">
        <div className="flex items-center space-x-4">
          <button onClick={onExit} className="w-9 h-9 rounded-xl bg-white border border-slate-100 shadow-sm hover:bg-slate-50 flex items-center justify-center text-slate-400 transition-colors">
            <i className="fas fa-chevron-left text-xs"></i>
          </button>
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Progression</span>
            <span className="text-sm font-bold text-slate-700">{currentIdx + 1} / {questions.length}</span>
          </div>
        </div>
        <div className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${
          selectedTheme === 'weak' ? 'bg-rose-50 text-rose-600 border border-rose-100' :
          themeInfo ? (
            themeInfo.color === 'indigo' ? 'bg-indigo-50 text-indigo-600 border border-indigo-100' :
            themeInfo.color === 'blue' ? 'bg-blue-50 text-blue-600 border border-blue-100' :
            themeInfo.color === 'emerald' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
            themeInfo.color === 'amber' ? 'bg-amber-50 text-amber-600 border border-amber-100' :
            'bg-rose-50 text-rose-600 border border-rose-100'
          ) : 'bg-slate-100 text-slate-600 border border-slate-200'
        }`}>
          {selectedTheme === 'weak' ? 'Points faibles' : themeInfo?.title || 'Révision Globale'}
        </div>
      </div>

      {/* Progress bar */}
      <div className="px-4">
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-indigo-500 rounded-full transition-all duration-500"
            style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-100 overflow-hidden shadow-slate-200/40 transition-all duration-300">
        <div className="p-8 md:p-12 space-y-10">
          {/* Question type indicator */}
          {current.type === 'scenario' && (
            <div className="inline-block px-3 py-1 bg-amber-100 text-amber-700 text-xs font-bold rounded-full">
              <i className="fas fa-lightbulb mr-1"></i> Mise en situation
            </div>
          )}

          <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 leading-tight brand-font">{current.text}</h3>

          <div className="grid gap-3">
            {current.options.map((opt, idx) => (
              <button
                key={idx}
                disabled={selected !== null}
                onClick={() => handleAnswer(idx)}
                className={`w-full text-left p-6 rounded-2xl border-2 transition-all duration-200 flex items-center justify-between group ${
                  selected === null
                    ? 'hover:border-indigo-600 border-slate-50 bg-slate-50 hover:bg-white'
                    : idx === current.correctAnswer
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-900'
                      : selected === idx
                        ? 'border-rose-500 bg-rose-50 text-rose-900'
                        : 'border-slate-50 bg-white opacity-40'
                }`}
              >
                <span className="font-bold pr-4">{opt}</span>
                <div className="flex-shrink-0">
                  {selected !== null && idx === current.correctAnswer && (
                    <div className="w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center animate-in zoom-in">
                      <i className="fas fa-check text-[10px]"></i>
                    </div>
                  )}
                  {selected === idx && idx !== current.correctAnswer && (
                    <div className="w-6 h-6 bg-rose-500 text-white rounded-full flex items-center justify-center animate-in zoom-in">
                      <i className="fas fa-times text-[10px]"></i>
                    </div>
                  )}
                  {selected === null && (
                    <div className="w-6 h-6 rounded-full border-2 border-slate-200 group-hover:border-indigo-300 transition-colors"></div>
                  )}
                </div>
              </button>
            ))}
          </div>

          {showExplanation && (
            <div className="mt-8 p-6 bg-indigo-50 rounded-3xl border border-indigo-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-white text-indigo-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm border border-indigo-100">
                  <i className="fas fa-lightbulb"></i>
                </div>
                <div>
                  <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">Le saviez-vous ?</p>
                  <p className="text-sm md:text-base text-indigo-900/80 leading-relaxed font-medium">{current.explanation}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {selected !== null && (
          <div className="bg-slate-50/50 p-6 border-t border-slate-100 flex justify-between items-center">
            <div className="text-sm text-slate-500">
              <i className="fas fa-check-circle text-emerald-500 mr-1"></i>
              {score + (selected === current.correctAnswer ? 1 : 0)} bonnes réponses
            </div>
            <button
              onClick={nextQuestion}
              className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-bold hover:bg-black transition-all shadow-lg flex items-center"
            >
              {currentIdx + 1 === questions.length ? 'Voir les résultats' : 'Suivant'}
              <i className={`fas ${currentIdx + 1 === questions.length ? 'fa-flag-checkered' : 'fa-arrow-right'} ml-3 text-sm opacity-50`}></i>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
