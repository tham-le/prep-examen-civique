
import React, { useState } from 'react';
import { LESSONS } from '../constants';
import { Lesson } from '../types';

export const LessonView: React.FC = () => {
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [quizMode, setQuizMode] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});

  if (selectedLesson) {
    return (
      <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4">
        <button
          onClick={() => { setSelectedLesson(null); setQuizMode(false); setQuizFinished(false); setSelectedAnswers({}); }}
          className="text-blue-600 dark:text-blue-400 font-bold flex items-center hover:underline"
        >
          <i className="fas fa-chevron-left mr-2"></i> Retour aux leçons
        </button>

        <div className="bg-white dark:bg-slate-800 rounded-3xl border border-gray-100 dark:border-slate-700 shadow-sm overflow-hidden">
          <div className="p-8 space-y-6">
            {!quizMode ? (
              <>
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center text-2xl">
                    <i className={`fas ${selectedLesson.icon}`}></i>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">{selectedLesson.category}</span>
                    <h2 className="text-2xl font-bold dark:text-white">{selectedLesson.title}</h2>
                  </div>
                </div>

                <div className="space-y-4">
                  {selectedLesson.content.map((p, i) => (
                    <div key={i} className="flex space-x-4 p-4 rounded-xl bg-gray-50 dark:bg-slate-700/50 border border-gray-100 dark:border-slate-600">
                      <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                        {i + 1}
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{p}</p>
                    </div>
                  ))}
                </div>

                <div className="pt-6">
                  <button
                    onClick={() => setQuizMode(true)}
                    className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-200 dark:shadow-blue-900/50"
                  >
                    Vérifier ma compréhension <i className="fas fa-check-circle ml-2"></i>
                  </button>
                </div>
              </>
            ) : (
              <div className="space-y-8">
                <h3 className="text-xl font-bold text-center dark:text-white">Quiz de fin de leçon</h3>
                {selectedLesson.quiz.map((q, idx) => {
                  const selectedAnswer = selectedAnswers[q.id];
                  const hasAnswered = selectedAnswer !== undefined;

                  return (
                    <div key={q.id} className="space-y-6">
                      <p className="text-lg font-medium text-gray-800 dark:text-gray-200">{q.text}</p>
                      <div className="grid gap-3">
                        {q.options.map((opt, oIdx) => (
                          <button
                            key={oIdx}
                            disabled={hasAnswered}
                            onClick={() => setSelectedAnswers(prev => ({ ...prev, [q.id]: oIdx }))}
                            className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                              !hasAnswered
                                ? 'border-gray-100 dark:border-slate-600 bg-gray-50 dark:bg-slate-700/50 hover:border-blue-600 dark:text-gray-200'
                                : oIdx === q.correctAnswer
                                  ? 'border-green-500 bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                                  : selectedAnswer === oIdx
                                    ? 'border-red-500 bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-300'
                                    : 'border-gray-50 dark:border-slate-700 bg-white dark:bg-slate-800 opacity-40'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span>{opt}</span>
                              {hasAnswered && oIdx === q.correctAnswer && <i className="fas fa-check-circle text-green-500"></i>}
                            </div>
                          </button>
                        ))}
                      </div>
                      {hasAnswered && (
                        <div className="p-4 bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 rounded-xl">
                          <p className="text-sm text-blue-800 dark:text-blue-300"><span className="font-bold">Note :</span> {q.explanation}</p>
                        </div>
                      )}
                    </div>
                  );
                })}

                {Object.keys(selectedAnswers).length === selectedLesson.quiz.length && (
                  <button
                    onClick={() => { setSelectedLesson(null); setQuizMode(false); setQuizFinished(false); setSelectedAnswers({}); }}
                    className="w-full bg-gray-900 dark:bg-slate-600 text-white py-4 rounded-2xl font-bold hover:bg-black dark:hover:bg-slate-500 transition"
                  >
                    Terminer la leçon
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <h2 className="text-3xl font-bold marianne-title dark:text-white">Module d'Apprentissage</h2>
        <p className="text-gray-600 dark:text-gray-400">Des leçons courtes et interactives pour maîtriser les fondamentaux de la vie en France.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {LESSONS.map((lesson) => (
          <div
            key={lesson.id}
            onClick={() => setSelectedLesson(lesson)}
            className="group bg-white dark:bg-slate-800 p-6 rounded-3xl border border-gray-100 dark:border-slate-700 shadow-sm hover:shadow-xl hover:border-blue-600 dark:hover:border-blue-500 transition-all cursor-pointer flex items-start space-x-6"
          >
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center text-2xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <i className={`fas ${lesson.icon}`}></i>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">{lesson.category}</span>
                <span className="text-xs text-gray-400 dark:text-gray-500 font-medium">5 min</span>
              </div>
              <h3 className="text-xl font-bold mb-2 dark:text-white">{lesson.title}</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2">Approfondissez vos connaissances sur {lesson.title.toLowerCase()} et testez-vous.</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
