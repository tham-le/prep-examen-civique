import React from 'react';
import { ALL_QUESTIONS } from '../constants';
import { UserStats } from '../types';
import { forLevel } from '../services/examLevel';
import { QUESTION_OF_DAY_BONUS_XP, XP_PER_CORRECT, answerQuestionOfDay, dayKey, questionOfDay } from '../services/progress';

interface QuestionOfDayProps {
  userStats: UserStats;
  onStatsUpdate: (stats: UserStats) => void;
}

export const QuestionOfDay: React.FC<QuestionOfDayProps> = ({ userStats, onStatsUpdate }) => {
  const today = dayKey(Date.now());
  const answered = userStats.daily?.date === today ? userStats.daily.questionOfDay : undefined;
  const question = answered
    ? ALL_QUESTIONS.find(q => q.id === answered.id)
    : questionOfDay(today, forLevel(ALL_QUESTIONS, userStats.examLevel));
  if (!question) return null;

  return (
    <section className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 space-y-4" aria-label="Question du jour">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">Question du jour</h2>
        <span className="text-xs text-slate-500 dark:text-slate-400">+{QUESTION_OF_DAY_BONUS_XP} XP si vous réussissez</span>
      </div>
      <p className="font-medium text-slate-900 dark:text-white">{question.text}</p>
      <div className="grid sm:grid-cols-2 gap-2" role="group" aria-label="Options de réponse">
        {question.options.map((option, i) => (
          <button
            key={i}
            disabled={answered !== undefined}
            onClick={() => onStatsUpdate(answerQuestionOfDay(userStats, question, i))}
            className={`text-left p-3 rounded-lg border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sapphire-500 ${
              !answered
                ? 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/50 hover:border-sapphire-400 dark:text-slate-200'
                : i === question.correctAnswer
                  ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-900 dark:text-emerald-300'
                  : answered.choice === i
                    ? 'border-rose-500 bg-rose-50 dark:bg-rose-900/30 text-rose-900 dark:text-rose-300'
                    : 'border-slate-200 dark:border-slate-700 opacity-40'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
      {answered && (
        <div role="status" className="text-sm text-slate-700 dark:text-slate-300 space-y-1">
          <p className="font-semibold">
            {answered.choice === question.correctAnswer
              ? `Bravo, +${XP_PER_CORRECT + QUESTION_OF_DAY_BONUS_XP} XP. Rendez-vous demain.`
              : 'Pas cette fois. Rendez-vous demain.'}
          </p>
          <p>{question.explanation}</p>
        </div>
      )}
    </section>
  );
};
