import React, { useEffect, useRef, useState } from 'react';
import { ALL_QUESTIONS } from '../constants';
import { Question, UserStats } from '../types';
import { forLevel } from '../services/examLevel';
import { applyAnswer, withNewBadges } from '../services/progress';
import { selectSessionItems, shuffle } from '../services/spacedRepetition';

export type ArcadeMode = 'blitz' | 'survival';

const BLITZ_SECONDS = 60;
const LIVES = 3;
const POOL_SIZE = 200;
const NEXT_DELAY_MS = 700;

const CONFIG = {
  blitz: {
    title: 'Défi éclair',
    icon: 'fa-bolt',
    rules: `${BLITZ_SECONDS} secondes pour donner un maximum de bonnes réponses.`,
    best: 'bestBlitz' as const,
    unit: 'bonnes réponses',
  },
  survival: {
    title: 'Survie',
    icon: 'fa-heart-pulse',
    rules: `Vous avez ${LIVES} vies. Chaque erreur en coûte une. Jusqu'où irez-vous ?`,
    best: 'bestSurvival' as const,
    unit: 'bonnes réponses',
  },
};

const withShuffledOptions = (question: Question): Question => {
  const right = question.options[question.correctAnswer];
  const options = shuffle(question.options);
  return { ...question, options, correctAnswer: options.indexOf(right) };
};

interface ArcadeProps {
  mode: ArcadeMode;
  userStats: UserStats;
  onStatsUpdate: (stats: UserStats) => void;
  onExit: () => void;
}

export const Arcade: React.FC<ArcadeProps> = ({ mode, userStats, onStatsUpdate, onExit }) => {
  const config = CONFIG[mode];
  const [phase, setPhase] = useState<'intro' | 'play' | 'done'>('intro');
  const [queue, setQueue] = useState<Question[]>([]);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(LIVES);
  const [timeLeft, setTimeLeft] = useState(BLITZ_SECONDS);
  const [mistakes, setMistakes] = useState<{ question: Question; selected: number }[]>([]);
  const [xpAtStart, setXpAtStart] = useState(0);
  const [bestAtStart, setBestAtStart] = useState(0);
  const phaseRef = useRef(phase);
  phaseRef.current = phase;

  // Latest stats, updated at once so answers given a moment apart build on each other
  const stats = useRef(userStats);
  stats.current = userStats;
  const commit = (next: UserStats) => {
    stats.current = next;
    onStatsUpdate(next);
  };

  const timers = useRef<number[]>([]);
  const later = (fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms));
  };
  useEffect(() => () => timers.current.forEach(window.clearTimeout), []);

  const best = userStats[config.best] ?? 0;

  const finish = () => {
    commit(withNewBadges({ ...stats.current, [config.best]: Math.max(stats.current[config.best] ?? 0, score) }));
    setPhase('done');
  };

  const start = () => {
    const pool = forLevel(ALL_QUESTIONS, stats.current.examLevel);
    setQueue(selectSessionItems(pool, stats.current.questionMastery, POOL_SIZE).map(withShuffledOptions));
    setIndex(0);
    setSelected(null);
    setScore(0);
    setLives(LIVES);
    setTimeLeft(BLITZ_SECONDS);
    setMistakes([]);
    setXpAtStart(stats.current.xp);
    setBestAtStart(stats.current[config.best] ?? 0);
    setPhase('play');
  };

  useEffect(() => {
    if (phase !== 'play' || mode !== 'blitz') return;
    const id = window.setInterval(() => setTimeLeft(t => Math.max(t - 1, 0)), 1000);
    return () => window.clearInterval(id);
  }, [phase, mode]);

  // Runs in the render that sees the clock reach 0, so finish reads the final score
  useEffect(() => {
    if (phase === 'play' && mode === 'blitz' && timeLeft === 0) finish();
  }, [timeLeft]);

  const advance = (nextLives: number) => {
    if (phaseRef.current !== 'play') return;
    const exhausted = index + 1 >= queue.length;
    if ((mode === 'survival' && nextLives === 0) || exhausted) {
      finish();
      return;
    }
    setIndex(i => i + 1);
    setSelected(null);
  };

  const answer = (choice: number) => {
    if (selected !== null || phase !== 'play') return;
    const question = queue[index];
    const isCorrect = choice === question.correctAnswer;
    setSelected(choice);
    commit(applyAnswer(stats.current, question, isCorrect));

    if (isCorrect) {
      setScore(s => s + 1);
      if ('vibrate' in navigator) navigator.vibrate(30);
      later(() => advance(lives), NEXT_DELAY_MS);
      return;
    }
    setMistakes(list => [...list, { question, selected: choice }]);
    const nextLives = mode === 'survival' ? lives - 1 : lives;
    setLives(nextLives);
    // In Survie a mistake stops on the explanation; in the Défi the clock keeps running
    if (mode === 'blitz') later(() => advance(nextLives), NEXT_DELAY_MS);
  };

  if (phase === 'intro') {
    return (
      <div className="max-w-md mx-auto bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-8 text-center space-y-6">
        <div className="w-14 h-14 mx-auto rounded-xl bg-sapphire-600 text-white flex items-center justify-center text-xl">
          <i className={`fas ${config.icon}`} aria-hidden="true"></i>
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{config.title}</h2>
        <p className="text-slate-600 dark:text-slate-300">{config.rules}</p>
        <p className="text-sm text-slate-500 dark:text-slate-400">Meilleur score : <span className="font-semibold tabular-nums">{best}</span></p>
        <div className="space-y-2">
          <button onClick={start} className="w-full bg-sapphire-600 text-white font-semibold py-3 rounded-xl hover:bg-sapphire-700 transition-colors">
            Commencer
          </button>
          <button onClick={onExit} className="w-full text-slate-600 dark:text-slate-300 py-2 hover:underline">Retour</button>
        </div>
      </div>
    );
  }

  if (phase === 'done') {
    const record = score > bestAtStart;
    return (
      <div className="space-y-6">
        <div className="max-w-md mx-auto bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-8 text-center space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Partie terminée</h2>
          <p className="text-5xl font-bold text-sapphire-600 dark:text-sapphire-400 tabular-nums">{score}</p>
          <p className="text-slate-600 dark:text-slate-300">{config.unit}</p>
          {record && <p className="text-sm font-semibold text-amber-600 dark:text-amber-400">Nouveau record !</p>}
          <p className="text-sm text-slate-500 dark:text-slate-400">+{userStats.xp - xpAtStart} XP · meilleur score : {best}</p>
          <div className="space-y-2 pt-2">
            <button onClick={start} className="w-full bg-sapphire-600 text-white font-semibold py-3 rounded-xl hover:bg-sapphire-700 transition-colors">Rejouer</button>
            <button onClick={onExit} className="w-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-medium py-3 rounded-xl">Retour à l'accueil</button>
          </div>
        </div>

        {mistakes.length > 0 && (
          <div className="max-w-2xl mx-auto space-y-3">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">À retenir ({mistakes.length})</h3>
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

  const current = queue[index];
  const stoppedOnMistake = mode === 'survival' && selected !== null && selected !== current.correctAnswer;

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 text-sm font-semibold text-slate-700 dark:text-slate-300">
          <i className={`fas ${config.icon} text-sapphire-600 dark:text-sapphire-400`} aria-hidden="true"></i>
          <span className="tabular-nums">{score}</span>
        </div>
        {mode === 'blitz' ? (
          <span className={`text-lg font-bold tabular-nums ${timeLeft <= 10 ? 'text-rose-600 dark:text-rose-400' : 'text-slate-900 dark:text-white'}`} aria-label={`${timeLeft} secondes restantes`}>
            {timeLeft} s
          </span>
        ) : (
          <span className="text-rose-500" aria-label={`${lives} vies restantes`}>
            {Array.from({ length: LIVES }, (_, i) => (
              <i key={i} className={`fas fa-heart mr-1 ${i < lives ? '' : 'opacity-20'}`} aria-hidden="true"></i>
            ))}
          </span>
        )}
      </div>

      {mode === 'blitz' && (
        <div className="h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
          <div className="h-full bg-sapphire-500 rounded-full transition-all duration-1000 ease-linear" style={{ width: `${(timeLeft / BLITZ_SECONDS) * 100}%` }}></div>
        </div>
      )}

      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 space-y-6">
        <h3 className="text-xl md:text-2xl font-semibold text-slate-900 dark:text-white leading-snug">{current.text}</h3>
        <div className="grid gap-2" role="group" aria-label="Options de réponse">
          {current.options.map((option, i) => (
            <button
              key={i}
              disabled={selected !== null}
              onClick={() => answer(i)}
              className={`w-full text-left p-4 rounded-lg border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sapphire-500 ${
                selected === null
                  ? 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/50 hover:border-sapphire-400 dark:text-slate-200'
                  : i === current.correctAnswer
                    ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-900 dark:text-emerald-300'
                    : selected === i
                      ? 'border-rose-500 bg-rose-50 dark:bg-rose-900/30 text-rose-900 dark:text-rose-300'
                      : 'border-slate-200 dark:border-slate-700 opacity-40'
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        {stoppedOnMistake && (
          <div className="space-y-3" role="status">
            <p className="text-sm text-slate-700 dark:text-slate-300">{current.explanation}</p>
            <button onClick={() => advance(lives)} className="w-full bg-sapphire-600 text-white font-semibold py-3 rounded-xl hover:bg-sapphire-700 transition-colors">
              {lives === 0 ? 'Voir le résultat' : 'Continuer'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
