
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { themeQuestions, THEMES, ALL_QUESTIONS } from '../constants';
import { Question, UserStats } from '../types';
import { processQuizResult, getBadgeInfo } from '../services/gamificationService';
import { getDueIds, selectSessionItems } from '../services/spacedRepetition';
import { answeredToday, applyAnswer, goalOf } from '../services/progress';
import { forLevel } from '../services/examLevel';

// Shuffle an array using Fisher-Yates algorithm
const shuffleArray = <T,>(array: T[]): T[] => {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};

// Shuffle answer options and return new question with updated correctAnswer
const shuffleQuestionOptions = (question: Question): Question => {
  const correctOption = question.options[question.correctAnswer];
  const shuffledOptions = shuffleArray(question.options);
  const newCorrectAnswer = shuffledOptions.indexOf(correctOption);

  return {
    ...question,
    options: shuffledOptions,
    correctAnswer: newCorrectAnswer
  };
};

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
  const [xpGained, setXpGained] = useState(0);
  const [newBadges, setNewBadges] = useState<string[]>([]);
  const [leveledUp, setLeveledUp] = useState(false);
  const [sessionXp, setSessionXp] = useState(0);
  const [lastGain, setLastGain] = useState(0);
  const start = useRef({ level: userStats.level, badges: userStats.badges });
  const [answers, setAnswers] = useState<{ question: Question; selected: number }[]>([]);

  // Function to load and shuffle questions
  const loadQuestions = useCallback(() => {
    let pool: Question[] = [];

    if (selectedTheme === 'weak') {
      // Questions previously missed and due for spaced-repetition review
      const available = forLevel(ALL_QUESTIONS, userStats.examLevel);
      const dueIds = getDueIds(userStats.questionMastery, available.map(q => q.id));
      pool = available.filter(q => dueIds.includes(q.id));
    } else if (selectedTheme) {
      pool = forLevel(themeQuestions(selectedTheme), userStats.examLevel);
    } else {
      // Mix from all categories for global review
      pool = forLevel(ALL_QUESTIONS, userStats.examLevel);
    }

    // Prioritize never-seen and due questions over ones already mastered,
    // then randomize answer order for each
    const shuffled = selectSessionItems(pool, userStats.questionMastery, 10)
      .map(shuffleQuestionOptions);

    setQuestions(shuffled);
    setCurrentIdx(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
    setShowExplanation(false);
    setXpGained(0);
    setNewBadges([]);
    setLeveledUp(false);
    setSessionXp(0);
    setLastGain(0);
    start.current = { level: userStats.level, badges: userStats.badges };
    setAnswers([]);
  }, [selectedTheme, userStats.questionMastery]);

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

    if (isCorrect) setScore(s => s + 1);
    setAnswers(prev => [...prev, { question: currentQuestion, selected: idx }]);
    // Saved per answer, so leaving the quiz early keeps what was answered
    const next = applyAnswer(userStats, currentQuestion, isCorrect);
    onStatsUpdate(next);
    setSessionXp(xp => xp + next.xp - userStats.xp);
    setLastGain(next.xp - userStats.xp);
    if (isCorrect && 'vibrate' in navigator) navigator.vibrate(30);
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
        score,
        questions.length,
        selectedTheme !== 'weak' ? selectedTheme : undefined
      );

      setXpGained(sessionXp + result.xpGained);
      setNewBadges(result.stats.badges.filter(id => !start.current.badges.includes(id)));
      setLeveledUp(result.stats.level > start.current.level);
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
      <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center mx-auto mb-4 text-slate-500 dark:text-slate-400">
        <i className="fas fa-database"></i>
      </div>
      <p className="text-slate-500 dark:text-slate-400">Pas de questions disponibles pour ce thème.</p>
      <button onClick={onExit} className="mt-4 text-sapphire-600 dark:text-sapphire-400 hover:underline">Retour au menu</button>
    </div>
  );

  if (finished) {
    const finalScore = score;
    const percentage = Math.round((finalScore / questions.length) * 100);

    const mistakes = answers.filter(a => a.selected !== a.question.correctAnswer);

    return (
      <div className="space-y-6">
      <div className="max-w-md mx-auto bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-8 text-center space-y-6">
        {/* XP Gained */}
        {xpGained > 0 && (
          <div className="bg-sapphire-600 text-white px-4 py-2 rounded-lg inline-block">
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
          percentage >= 80 ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400' : 'bg-sapphire-100 dark:bg-sapphire-900/30 text-sapphire-600 dark:text-sapphire-400'
        }`}>
          <i className={`fas ${percentage >= 80 ? 'fa-trophy' : 'fa-flag-checkered'} text-2xl`}></i>
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Session terminée</h2>
          <p className="text-slate-500 dark:text-slate-400">
            Score : <span className="text-sapphire-600 dark:text-sapphire-400 font-bold text-lg">{finalScore} / {questions.length}</span>
            <span className="text-slate-500 dark:text-slate-400 ml-2">({percentage}%)</span>
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
            className="w-full bg-sapphire-600 text-white font-medium py-3 rounded-lg hover:bg-sapphire-700 transition flex items-center justify-center"
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

      {mistakes.length > 0 && (
        <div className="max-w-2xl mx-auto space-y-3">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Correction ({mistakes.length} erreur{mistakes.length > 1 ? 's' : ''})
          </h3>
          {mistakes.map(({ question, selected: chosen }) => (
            <div key={question.id} className="bg-white dark:bg-slate-800 rounded-xl border border-rose-200 dark:border-rose-800 p-4 space-y-3">
              <p className="font-medium text-slate-900 dark:text-white">{question.text}</p>
              <div className="p-3 rounded-lg bg-rose-50 dark:bg-rose-900/30 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-300">
                <span className="block text-xs uppercase tracking-wide mb-1">Votre réponse</span>
                {question.options[chosen]}
              </div>
              <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300">
                <span className="block text-xs uppercase tracking-wide mb-1">Bonne réponse</span>
                {question.options[question.correctAnswer]}
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300">{question.explanation}</p>
            </div>
          ))}
        </div>
      )}
      </div>
    );
  }

  const current = questions[currentIdx];
  const themeInfo = THEMES.find(t => t.id === selectedTheme);

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <button onClick={onExit} className="w-8 h-8 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-400 transition-colors">
            <i className="fas fa-chevron-left text-xs"></i>
          </button>
          <span className="text-sm text-slate-600 dark:text-slate-400">{currentIdx + 1} / {questions.length}</span>
        </div>
        <div className="px-3 py-1 rounded text-xs bg-sapphire-100 dark:bg-sapphire-900/30 text-sapphire-700 dark:text-sapphire-300">
          {selectedTheme === 'weak' ? 'Points faibles' : themeInfo?.title || 'Révision Globale'}
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-sapphire-500 rounded-full transition-all"
          style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
        ></div>
      </div>

      <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
        <span className="tabular-nums">
          Objectif du jour : {Math.min(answeredToday(userStats), goalOf(userStats))} / {goalOf(userStats)}
        </span>
        {(userStats.combo ?? 0) >= 2 && (
          <span className="px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 font-semibold">
            Série ×{userStats.combo}
          </span>
        )}
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="p-6 space-y-6">
          {/* Question type indicator */}
          {current.type === 'scenario' && (
            <div className="inline-block px-2 py-1 bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-400 text-xs rounded">
              <i className="fas fa-lightbulb mr-1"></i> Mise en situation
            </div>
          )}

          <h3 className="text-xl md:text-2xl font-semibold text-slate-900 dark:text-white leading-snug">{current.text}</h3>

          <div className="grid gap-2" role="group" aria-label="Options de réponse">
            {current.options.map((opt, idx) => (
              <button
                key={idx}
                disabled={selected !== null}
                onClick={() => handleAnswer(idx)}
                aria-pressed={selected === idx}
                aria-describedby={selected !== null && idx === current.correctAnswer ? 'correct-answer' : undefined}
                className={`w-full text-left p-4 rounded-lg border transition-colors flex items-center justify-between focus:outline-none focus-visible:ring-2 focus-visible:ring-sapphire-500 ${
                  selected === null
                    ? 'hover:border-sapphire-400 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/50 hover:bg-white dark:hover:bg-slate-700 dark:text-slate-200'
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

          <div role="status" aria-live="polite">
          {showExplanation && (
            <div className="p-4 bg-sapphire-50 dark:bg-sapphire-900/30 rounded-lg border border-sapphire-100 dark:border-sapphire-800">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-white dark:bg-slate-800 text-sapphire-600 dark:text-sapphire-400 rounded-lg flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-lightbulb text-sm"></i>
                </div>
                <div>
                  <p className="text-xs text-sapphire-500 dark:text-sapphire-400 mb-1">Le saviez-vous ?</p>
                  <p className="text-sm text-sapphire-900/80 dark:text-sapphire-300">{current.explanation}</p>
                </div>
              </div>
            </div>
          )}
          </div>
        </div>

        {selected !== null && (
          <div className="bg-slate-50 dark:bg-slate-700/50 p-4 border-t border-slate-200 dark:border-slate-700 flex justify-between items-center">
            <div className="text-sm text-slate-500 dark:text-slate-400">
              <i className="fas fa-check-circle text-emerald-500 mr-1"></i>
              {score} bonnes réponses
              {lastGain > 0 && (
                <span key={currentIdx} className="xp-pop ml-3 font-semibold text-amber-600 dark:text-amber-400">+{lastGain} XP</span>
              )}
            </div>
            <button
              onClick={nextQuestion}
              className="bg-sapphire-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-sapphire-700 transition flex items-center"
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
