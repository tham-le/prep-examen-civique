
import React, { useState, useEffect, useRef } from 'react';
import { Question, Level, UserStats } from '../types';
import { OFFICIAL_DB } from '../constants';
import { processExamResult, getBadgeInfo } from '../services/gamificationService';

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
    const score = questions.reduce((acc, q, idx) => acc + (answers[q.id + idx] === q.correctAnswer ? 1 : 0), 0);
    const passed = score >= 32;

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
    setAnswers(prev => ({ ...prev, [questions[currentIdx].id + currentIdx]: idx }));
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
    <div className="flex flex-col items-center justify-center py-32 animate-pulse">
      <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin shadow-lg"></div>
      <h2 className="mt-8 text-xl font-extrabold text-slate-800 dark:text-slate-200 brand-font tracking-tight">Préparation du dossier d'examen...</h2>
      <p className="text-slate-400 dark:text-slate-500 text-sm mt-2">Mélange des questions officielles</p>
    </div>
  );

  if (!started) return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-slate-800 p-10 md:p-14 rounded-[3rem] border border-slate-100 dark:border-slate-700 shadow-2xl shadow-indigo-100/50 dark:shadow-slate-900/50 text-center space-y-12 animate-in slide-in-from-bottom-8 duration-700">
      <div className="w-24 h-24 bg-indigo-600 text-white rounded-[2rem] flex items-center justify-center mx-auto shadow-2xl shadow-indigo-200 dark:shadow-indigo-900/50 rotate-3 transition-transform hover:rotate-0">
        <i className="fas fa-file-contract text-4xl"></i>
      </div>
      <div className="space-y-4">
        <h2 className="text-4xl font-black brand-font text-slate-900 dark:text-white tracking-tight">Examen Blanc 2026</h2>
        <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">Simulez l'épreuve de l'OFII dans les conditions du décret de 2025.</p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {[
          { label: 'Questions', value: '40', icon: 'fa-list-check' },
          { label: 'Temps', value: '45 min', icon: 'fa-clock' },
          { label: 'Réussite', value: '32/40', icon: 'fa-check-double' },
        ].map((item, i) => (
          <div key={i} className="p-6 bg-slate-50 dark:bg-slate-700/50 rounded-[2rem] border border-slate-100 dark:border-slate-600 group hover:bg-white dark:hover:bg-slate-700 hover:shadow-xl transition-all duration-300">
            <i className={`fas ${item.icon} text-indigo-400 mb-3 text-sm group-hover:scale-110 transition-transform`}></i>
            <div className="text-indigo-900 dark:text-indigo-300 font-black text-xl">{item.value}</div>
            <div className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest">{item.label}</div>
          </div>
        ))}
      </div>

      <div className="flex p-2 bg-slate-100 dark:bg-slate-700 rounded-2xl border border-slate-200 dark:border-slate-600">
        <button onClick={() => setLevel('CSP')} className={`flex-1 py-4 rounded-xl font-bold transition-all text-sm ${level === 'CSP' ? 'bg-white dark:bg-slate-600 text-indigo-700 dark:text-indigo-300 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'}`}>
          Niveau CSP
          <span className="block text-[10px] text-slate-400 dark:text-slate-500 mt-1">Carte de Séjour Pluriannuelle</span>
        </button>
        <button onClick={() => setLevel('CR')} className={`flex-1 py-4 rounded-xl font-bold transition-all text-sm ${level === 'CR' ? 'bg-white dark:bg-slate-600 text-indigo-700 dark:text-indigo-300 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'}`}>
          Niveau CR
          <span className="block text-[10px] text-slate-400 dark:text-slate-500 mt-1">Carte de Résident</span>
        </button>
      </div>

      {/* User's exam history */}
      {userStats.examsPassed > 0 && (
        <div className="bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 p-4 rounded-2xl">
          <p className="text-emerald-700 dark:text-emerald-400 font-bold">
            <i className="fas fa-trophy mr-2"></i>
            Vous avez réussi {userStats.examsPassed} examen(s) blanc(s)
          </p>
        </div>
      )}

      <button onClick={startSimulation} className="w-full bg-slate-950 dark:bg-indigo-600 text-white py-6 rounded-2xl font-bold text-lg hover:bg-black dark:hover:bg-indigo-700 transition-all shadow-xl active:scale-95 flex items-center justify-center group">
        Lancer le chronomètre <i className="fas fa-arrow-right ml-4 group-hover:translate-x-2 transition-transform"></i>
      </button>
    </div>
  );

  if (finished) {
    const score = questions.reduce((acc, q, idx) => acc + (answers[q.id + idx] === q.correctAnswer ? 1 : 0), 0);
    const passed = score >= 32;

    return (
      <div className="max-w-3xl mx-auto space-y-10 animate-in fade-in zoom-in-95 duration-500">
        <div className={`p-16 rounded-[3.5rem] text-center border shadow-2xl relative overflow-hidden ${passed ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800 shadow-emerald-100 dark:shadow-emerald-900/50' : 'bg-rose-50 dark:bg-rose-900/20 border-rose-200 dark:border-rose-800 shadow-rose-100 dark:shadow-rose-900/50'}`}>
          {passed && <div className="absolute top-10 left-10 text-emerald-100 dark:text-emerald-900/50 text-9xl opacity-20 -rotate-12"><i className="fas fa-certificate"></i></div>}

          {/* XP Gained */}
          {xpGained > 0 && (
            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-2xl inline-block mb-6 animate-bounce">
              <i className="fas fa-star mr-2"></i>
              +{xpGained} XP
            </div>
          )}

          {/* Level Up */}
          {leveledUp && (
            <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-6 py-4 rounded-2xl mb-6 animate-pulse">
              <i className="fas fa-arrow-up mr-2"></i>
              Niveau supérieur atteint !
            </div>
          )}

          <div className={`w-24 h-24 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-xl ${passed ? 'bg-emerald-500 text-white shadow-emerald-200 dark:shadow-emerald-900' : 'bg-rose-500 text-white shadow-rose-200 dark:shadow-rose-900'}`}>
            <i className={`fas ${passed ? 'fa-award' : 'fa-triangle-exclamation'} text-4xl`}></i>
          </div>

          <h2 className="text-5xl font-black mb-4 brand-font text-slate-900 dark:text-white tracking-tight">{passed ? 'Félicitations !' : 'Continuez à réviser'}</h2>
          <p className="text-2xl mb-6 text-slate-600 dark:text-slate-400">Score Final : <span className={`font-black text-4xl ${passed ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>{score} / 40</span></p>

          <div className={`inline-block px-8 py-3 rounded-full font-bold text-sm bg-white dark:bg-slate-800 shadow-sm border ${passed ? 'text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-800' : 'text-rose-600 dark:text-rose-400 border-rose-100 dark:border-rose-800'}`}>
            {passed ? 'Attestation de réussite simulée obtenue' : 'Admission non obtenue (seuil : 32 pts)'}
          </div>

          {/* New Badges */}
          {newBadges.length > 0 && (
            <div className="mt-8 bg-white/80 dark:bg-slate-800/80 border border-amber-200 dark:border-amber-800 p-6 rounded-2xl">
              <p className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase mb-3">Nouveaux badges débloqués !</p>
              <div className="flex justify-center gap-4">
                {newBadges.map(badgeId => {
                  const badge = getBadgeInfo(badgeId);
                  if (!badge) return null;
                  return (
                    <div key={badgeId} className="text-center">
                      <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/50 rounded-xl flex items-center justify-center mx-auto shadow-sm">
                        <i className={`fas ${badge.icon} text-amber-600 dark:text-amber-400`}></i>
                      </div>
                      <p className="text-xs font-bold text-amber-700 dark:text-amber-400 mt-2">{badge.name}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="mt-14 flex flex-col sm:flex-row justify-center gap-4">
            <button onClick={startSimulation} className="bg-slate-900 dark:bg-indigo-600 text-white px-10 py-4 rounded-2xl font-bold shadow-lg hover:bg-black dark:hover:bg-indigo-700 transition active:scale-95">Réessayer l'épreuve</button>
            <button onClick={() => shareResult(passed, score)} className="bg-white dark:bg-slate-700 border-2 border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 px-10 py-4 rounded-2xl font-bold hover:bg-slate-50 dark:hover:bg-slate-600 transition active:scale-95 flex items-center justify-center">
              <i className={`fas ${copySuccess ? 'fa-check text-emerald-500' : 'fa-share-nodes'} mr-3`}></i>
              {copySuccess ? 'Copié !' : 'Partager mon score'}
            </button>
            <button onClick={resetExam} className="bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 px-8 py-4 rounded-2xl font-bold hover:bg-slate-200 dark:hover:bg-slate-600 transition active:scale-95">Retour Accueil</button>
          </div>
        </div>
      </div>
    );
  }

  const current = questions[currentIdx];

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between bg-white dark:bg-slate-800 px-8 py-5 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-xl shadow-slate-200/40 dark:shadow-slate-900/50 sticky top-24 z-30">
        <div className="flex items-center space-x-10">
          <div className="text-center">
            <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">Temps Restant</p>
            <p className={`text-2xl font-black tabular-nums transition-colors ${timeLeft < 300 ? 'text-rose-600 animate-pulse' : 'text-indigo-600 dark:text-indigo-400'}`}>{formatTime(timeLeft)}</p>
          </div>
          <div className="h-10 w-px bg-slate-100 dark:bg-slate-700"></div>
          <div className="text-center">
            <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">Progression</p>
            <p className="text-2xl font-black text-slate-900 dark:text-white leading-none">{currentIdx + 1} <span className="text-sm text-slate-300 dark:text-slate-600 font-bold">/ 40</span></p>
          </div>
        </div>
        <div className="hidden sm:block w-48 bg-slate-100 dark:bg-slate-700 h-3 rounded-full overflow-hidden border border-slate-50 dark:border-slate-600">
          <div className="bg-indigo-600 h-full transition-all duration-500 shadow-sm" style={{ width: `${((currentIdx + 1) / 40) * 100}%` }}></div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-[3rem] border border-slate-100 dark:border-slate-700 shadow-2xl p-10 md:p-14 space-y-12 relative overflow-hidden">
        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm ${current.type === 'scenario' ? 'bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800' : 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800'}`}>
              {current.type === 'scenario' ? 'Mise en situation' : 'Question de cours'}
            </span>
          </div>
          <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight brand-font tracking-tight">{current.text}</h3>
        </div>

        <div className="grid gap-4">
          {current.options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              className={`w-full text-left p-7 rounded-[1.5rem] border-2 transition-all duration-300 flex items-center justify-between group active:scale-[0.98] ${
                answers[current.id + currentIdx] === idx
                  ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/30 shadow-lg shadow-indigo-100/50 dark:shadow-indigo-900/50'
                  : 'border-slate-50 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/50 hover:bg-white dark:hover:bg-slate-700 hover:border-slate-200 dark:hover:border-slate-600'
              }`}
            >
              <span className={`font-bold transition-colors ${answers[current.id + currentIdx] === idx ? 'text-indigo-900 dark:text-indigo-300' : 'text-slate-600 dark:text-slate-300'}`}>{opt}</span>
              <div className={`w-7 h-7 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${answers[current.id + currentIdx] === idx ? 'bg-indigo-600 border-indigo-600 shadow-lg shadow-indigo-200 dark:shadow-indigo-900' : 'border-slate-300 dark:border-slate-600 group-hover:border-slate-400 dark:group-hover:border-slate-500'}`}>
                {answers[current.id + currentIdx] === idx && <i className="fas fa-check text-[10px] text-white"></i>}
              </div>
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between pt-8 border-t border-slate-100 dark:border-slate-700">
          <button
            disabled={currentIdx === 0}
            onClick={() => setCurrentIdx(i => i - 1)}
            className="text-slate-400 dark:text-slate-500 font-bold hover:text-indigo-600 dark:hover:text-indigo-400 disabled:opacity-0 transition-colors flex items-center space-x-2"
          >
            <i className="fas fa-arrow-left text-xs"></i>
            <span>Précédent</span>
          </button>

          <button
            onClick={() => currentIdx === 39 ? finishExam() : setCurrentIdx(i => i + 1)}
            className="bg-slate-950 dark:bg-indigo-600 text-white px-12 py-5 rounded-2xl font-bold shadow-xl hover:bg-black dark:hover:bg-indigo-700 transition-all active:scale-95 flex items-center group"
          >
            {currentIdx === 39 ? 'Valider mes réponses' : 'Continuer'}
            <i className={`fas ${currentIdx === 39 ? 'fa-flag-checkered' : 'fa-arrow-right'} ml-4 text-sm opacity-50 group-hover:translate-x-1 transition-transform`}></i>
          </button>
        </div>
      </div>

      <p className="text-center text-slate-400 dark:text-slate-600 text-[10px] font-bold uppercase tracking-[0.2em]">Session d'examen sécurisée par Objectif Citoyen</p>
    </div>
  );
};
