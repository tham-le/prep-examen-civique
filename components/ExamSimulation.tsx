
import React, { useState, useEffect, useRef } from 'react';
import { Question, Level, UserStats } from '../types';
import { OFFICIAL_DB } from '../constants';
import { processExamResult, getBadgeInfo, addExamResult } from '../services/gamificationService';

interface ExamSimulationProps {
  onStatsUpdate: (stats: UserStats) => void;
  userStats: UserStats;
}

export const ExamSimulation: React.FC<ExamSimulationProps> = ({ onStatsUpdate, userStats }) => {
  const [level, setLevel] = useState<Level>('CSP');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(false);
  const [started, setStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(2700); // 45 minutes
  const [finished, setFinished] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [xpGained, setXpGained] = useState(0);
  const [newBadges, setNewBadges] = useState<string[]>([]);
  const [leveledUp, setLeveledUp] = useState(false);
  const timerRef = useRef<number | null>(null);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const startSimulation = async () => {
    setLoading(true);
    const pool = OFFICIAL_DB[level];
    let simulated: Question[] = [];

    // Create a pool with enough questions by repeating if necessary
    while (simulated.length < 40) {
      const shuffled = [...pool].sort(() => 0.5 - Math.random());
      simulated = [...simulated, ...shuffled];
    }

    setQuestions(simulated.slice(0, 40));
    setAnswers({});
    setCurrentIdx(0);
    setTimeLeft(2700);
    setFinished(false);
    setXpGained(0);
    setNewBadges([]);
    setLeveledUp(false);
    setStarted(true);
    setLoading(false);

    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = window.setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          finishExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const finishExam = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    // Calculate score
    const score = questions.reduce((acc, q, idx) => acc + (answers[`${q.id}_${idx}`] === q.correctAnswer ? 1 : 0), 0);
    const passed = score >= 32;
    const duration = 2700 - timeLeft; // Time spent in seconds

    // Save to exam history
    addExamResult(level, score, passed, duration);

    // Process gamification
    const result = processExamResult(userStats, score, passed, timeLeft);
    setXpGained(result.xpGained);
    setNewBadges(result.newBadges);
    setLeveledUp(result.leveledUp);
    onStatsUpdate(result.stats);

    setFinished(true);
  };

  const shareResult = (passed: boolean, score: number) => {
    const text = `J'ai passé l'examen civique blanc sur Objectif Citoyen !\n\nRésultat : ${passed ? 'ADMIS' : 'ÉCHEC'}\nScore : ${score}/40\nPréparez-vous aussi sur : ${window.location.origin}`;
    navigator.clipboard.writeText(text).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleSelect = (idx: number) => {
    setAnswers(prev => ({ ...prev, [`${questions[currentIdx].id}_${currentIdx}`]: idx }));
  };

  const resetExam = () => {
    setStarted(false);
    setFinished(false);
    setQuestions([]);
    setAnswers({});
    setCurrentIdx(0);
    setTimeLeft(2700);
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="w-12 h-12 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      <h2 className="mt-6 text-lg font-medium text-slate-800 dark:text-slate-200">Préparation de l'examen...</h2>
      <p className="text-slate-400 dark:text-slate-500 text-sm mt-1">Mélange des questions</p>
    </div>
  );

  if (!started) return (
    <div className="max-w-xl mx-auto bg-white dark:bg-slate-800 p-8 rounded-xl border border-slate-200 dark:border-slate-700 text-center space-y-8">
      <div className="w-16 h-16 bg-indigo-600 text-white rounded-xl flex items-center justify-center mx-auto">
        <i className="fas fa-file-contract text-2xl"></i>
      </div>
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Examen Blanc 2026</h2>
        <p className="text-slate-500 dark:text-slate-400">Simulez l'épreuve de l'OFII dans les conditions du décret de 2025.</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Questions', value: '40', icon: 'fa-list-check' },
          { label: 'Temps', value: '45 min', icon: 'fa-clock' },
          { label: 'Réussite', value: '32/40', icon: 'fa-check-double' },
        ].map((item, i) => (
          <div key={i} className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg border border-slate-100 dark:border-slate-600">
            <i className={`fas ${item.icon} text-indigo-500 mb-2 text-sm`}></i>
            <div className="text-slate-900 dark:text-white font-bold text-lg">{item.value}</div>
            <div className="text-xs text-slate-400 dark:text-slate-500">{item.label}</div>
          </div>
        ))}
      </div>

      <div className="flex p-1 bg-slate-100 dark:bg-slate-700 rounded-lg">
        <button onClick={() => setLevel('CSP')} className={`flex-1 py-3 rounded-md font-medium transition-colors text-sm ${level === 'CSP' ? 'bg-white dark:bg-slate-600 text-indigo-700 dark:text-indigo-300' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'}`}>
          Niveau CSP
          <span className="block text-xs text-slate-400 dark:text-slate-500 mt-0.5">Carte de Séjour Pluriannuelle</span>
        </button>
        <button onClick={() => setLevel('CR')} className={`flex-1 py-3 rounded-md font-medium transition-colors text-sm ${level === 'CR' ? 'bg-white dark:bg-slate-600 text-indigo-700 dark:text-indigo-300' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'}`}>
          Niveau CR
          <span className="block text-xs text-slate-400 dark:text-slate-500 mt-0.5">Carte de Résident</span>
        </button>
      </div>

      {/* User's exam history */}
      {userStats.examsPassed > 0 && (
        <div className="bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-700 p-3 rounded-lg">
          <p className="text-emerald-700 dark:text-emerald-400 text-sm">
            <i className="fas fa-trophy mr-2"></i>
            Vous avez réussi {userStats.examsPassed} examen(s) blanc(s)
          </p>
        </div>
      )}

      <button onClick={startSimulation} className="w-full bg-indigo-600 text-white py-4 rounded-lg font-medium hover:bg-indigo-700 transition flex items-center justify-center">
        Lancer le chronomètre <i className="fas fa-arrow-right ml-3"></i>
      </button>
    </div>
  );

  if (finished) {
    const score = questions.reduce((acc, q, idx) => acc + (answers[`${q.id}_${idx}`] === q.correctAnswer ? 1 : 0), 0);
    const passed = score >= 32;

    return (
      <div className="max-w-xl mx-auto space-y-6">
        <div className={`p-8 rounded-xl text-center border ${passed ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-700' : 'bg-rose-50 dark:bg-rose-900/20 border-rose-200 dark:border-rose-700'}`}>
          {/* XP Gained */}
          {xpGained > 0 && (
            <div className="bg-indigo-600 text-white px-4 py-2 rounded-lg inline-block mb-4">
              <i className="fas fa-star mr-2"></i>
              +{xpGained} XP
            </div>
          )}

          {/* Level Up */}
          {leveledUp && (
            <div className="bg-amber-500 text-white px-4 py-2 rounded-lg mb-4">
              <i className="fas fa-arrow-up mr-2"></i>
              Niveau supérieur atteint !
            </div>
          )}

          <div className={`w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6 ${passed ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'}`}>
            <i className={`fas ${passed ? 'fa-award' : 'fa-triangle-exclamation'} text-2xl`}></i>
          </div>

          <h2 className="text-2xl font-bold mb-2 text-slate-900 dark:text-white">{passed ? 'Félicitations !' : 'Continuez à réviser'}</h2>
          <p className="text-lg mb-4 text-slate-600 dark:text-slate-400">Score : <span className={`font-bold text-2xl ${passed ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>{score} / 40</span></p>

          <div className={`inline-block px-4 py-2 rounded-lg text-sm ${passed ? 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-400' : 'bg-rose-100 dark:bg-rose-900/50 text-rose-700 dark:text-rose-400'}`}>
            {passed ? 'Réussite simulée' : 'Seuil non atteint (32/40)'}
          </div>

          {/* New Badges */}
          {newBadges.length > 0 && (
            <div className="mt-6 bg-white dark:bg-slate-800 border border-amber-200 dark:border-amber-700 p-4 rounded-lg">
              <p className="text-xs text-amber-700 dark:text-amber-400 mb-3">Nouveaux badges</p>
              <div className="flex justify-center gap-4">
                {newBadges.map(badgeId => {
                  const badge = getBadgeInfo(badgeId);
                  if (!badge) return null;
                  return (
                    <div key={badgeId} className="text-center">
                      <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/50 rounded-lg flex items-center justify-center mx-auto">
                        <i className={`fas ${badge.icon} text-amber-600 dark:text-amber-400`}></i>
                      </div>
                      <p className="text-xs text-amber-700 dark:text-amber-400 mt-1">{badge.name}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
            <button onClick={startSimulation} className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition">Réessayer</button>
            <button onClick={() => shareResult(passed, score)} className="bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 px-6 py-3 rounded-lg font-medium hover:bg-slate-50 dark:hover:bg-slate-600 transition flex items-center justify-center">
              <i className={`fas ${copySuccess ? 'fa-check text-emerald-500' : 'fa-share-nodes'} mr-2`}></i>
              {copySuccess ? 'Copié' : 'Partager'}
            </button>
            <button onClick={resetExam} className="bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 px-6 py-3 rounded-lg font-medium hover:bg-slate-200 dark:hover:bg-slate-600 transition">Retour</button>
          </div>
        </div>
      </div>
    );
  }

  const current = questions[currentIdx];

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <div className="flex items-center justify-between bg-white dark:bg-slate-800 px-5 py-3 rounded-lg border border-slate-200 dark:border-slate-700 sticky top-20 z-30">
        <div className="flex items-center space-x-6">
          <div className="text-center">
            <p className="text-xs text-slate-400 dark:text-slate-500">Temps</p>
            <p className={`text-lg font-bold tabular-nums ${timeLeft < 300 ? 'text-rose-600' : 'text-indigo-600 dark:text-indigo-400'}`}>{formatTime(timeLeft)}</p>
          </div>
          <div className="h-8 w-px bg-slate-200 dark:bg-slate-700"></div>
          <div className="text-center">
            <p className="text-xs text-slate-400 dark:text-slate-500">Question</p>
            <p className="text-lg font-bold text-slate-900 dark:text-white">{currentIdx + 1} / 40</p>
          </div>
        </div>
        <div className="hidden sm:block w-32 bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
          <div className="bg-indigo-600 h-full transition-all" style={{ width: `${((currentIdx + 1) / 40) * 100}%` }}></div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 space-y-6">
        <div className="space-y-4">
          <span className={`px-2 py-1 rounded text-xs ${current.type === 'scenario' ? 'bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-400' : 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-400'}`}>
            {current.type === 'scenario' ? 'Mise en situation' : 'Question de cours'}
          </span>
          <h3 className="text-lg font-medium text-slate-900 dark:text-white leading-relaxed">{current.text}</h3>
        </div>

        <div className="grid gap-2" role="group" aria-label="Options de réponse">
          {current.options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              aria-pressed={answers[`${current.id}_${currentIdx}`] === idx}
              className={`w-full text-left p-4 rounded-lg border transition-colors flex items-center justify-between focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                answers[`${current.id}_${currentIdx}`] === idx
                  ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30'
                  : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/50 hover:bg-white dark:hover:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
              }`}
            >
              <span className={`${answers[`${current.id}_${currentIdx}`] === idx ? 'text-indigo-900 dark:text-indigo-300' : 'text-slate-600 dark:text-slate-300'}`}>{opt}</span>
              <div className={`w-5 h-5 rounded-full border-2 transition-colors flex items-center justify-center ${answers[`${current.id}_${currentIdx}`] === idx ? 'bg-indigo-600 border-indigo-600' : 'border-slate-300 dark:border-slate-600'}`} aria-hidden="true">
                {answers[`${current.id}_${currentIdx}`] === idx && <i className="fas fa-check text-xs text-white"></i>}
              </div>
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700">
          <button
            disabled={currentIdx === 0}
            onClick={() => setCurrentIdx(i => i - 1)}
            className="text-slate-400 dark:text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 disabled:opacity-0 transition-colors flex items-center space-x-2"
          >
            <i className="fas fa-arrow-left text-xs"></i>
            <span>Précédent</span>
          </button>

          <button
            onClick={() => currentIdx === 39 ? finishExam() : setCurrentIdx(i => i + 1)}
            className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition flex items-center"
          >
            {currentIdx === 39 ? 'Valider' : 'Suivant'}
            <i className={`fas ${currentIdx === 39 ? 'fa-flag-checkered' : 'fa-arrow-right'} ml-2 text-sm`}></i>
          </button>
        </div>
      </div>

      <p className="text-center text-slate-400 dark:text-slate-600 text-xs">Objectif Citoyen</p>
    </div>
  );
};
