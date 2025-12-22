
import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Quiz } from './components/Quiz';
import { LessonView } from './components/LessonView';
import { ExamSimulation } from './components/ExamSimulation';
import { FAQPage } from './components/FAQPage';
import { ProfilePage } from './components/ProfilePage';
import { THEMES } from './constants';
import { UserStats } from './types';
import { loadUserStats, saveUserStats, checkAndUpdateStreak, getLevelInfo, getXPProgress } from './services/gamificationService';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedTheme, setSelectedTheme] = useState<string | undefined>(undefined);
  const [userStats, setUserStats] = useState<UserStats>(loadUserStats());
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', String(newMode));
    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Load stats and update streak on mount
  useEffect(() => {
    const stats = loadUserStats();
    const updatedStats = checkAndUpdateStreak(stats);
    if (updatedStats !== stats) {
      saveUserStats(updatedStats);
    }
    setUserStats(updatedStats);
  }, []);

  const startQuiz = (themeId?: string) => {
    setSelectedTheme(themeId);
    setActiveTab('quiz');
  };

  const handleStatsUpdate = (newStats: UserStats) => {
    setUserStats(newStats);
  };

  const levelInfo = getLevelInfo(userStats.level);
  const xpProgress = getXPProgress(userStats.xp, userStats.level);

  return (
    <div className="min-h-screen flex flex-col selection:bg-indigo-100 selection:text-indigo-900 dark:selection:bg-indigo-900 dark:selection:text-indigo-100">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} userStats={userStats} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        {activeTab === 'home' && (
          <div className="space-y-16 animate-in fade-in duration-700">
            {/* User Progress Banner */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 rounded-3xl text-white shadow-xl">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                    <i className={`fas ${levelInfo.icon} text-2xl`}></i>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white/70 uppercase tracking-widest">Niveau {userStats.level}</p>
                    <p className="text-xl font-black">{levelInfo.name}</p>
                  </div>
                </div>
                <div className="flex-1 max-w-md w-full">
                  <div className="flex justify-between text-xs font-bold mb-2">
                    <span>{userStats.xp} XP</span>
                    <span>Niveau {userStats.level + 1}</span>
                  </div>
                  <div className="h-3 bg-white/20 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-400 rounded-full transition-all duration-500"
                      style={{ width: `${xpProgress}%` }}
                    ></div>
                  </div>
                </div>
                <div className="flex items-center space-x-6 text-center">
                  <div>
                    <p className="text-2xl font-black">{userStats.streak}</p>
                    <p className="text-xs text-white/70">Jours</p>
                  </div>
                  <div className="h-8 w-px bg-white/20"></div>
                  <div>
                    <p className="text-2xl font-black">{userStats.badges.length}</p>
                    <p className="text-xs text-white/70">Badges</p>
                  </div>
                  <div className="h-8 w-px bg-white/20"></div>
                  <div>
                    <p className="text-2xl font-black">{userStats.totalQuizzes}</p>
                    <p className="text-xs text-white/70">Quiz</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bannière Info */}
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 p-4 rounded-2xl flex items-center space-x-4 shadow-sm">
              <div className="bg-amber-400 dark:bg-amber-500 p-2.5 rounded-xl text-white shadow-lg shadow-amber-200 dark:shadow-amber-900/50">
                <i className="fas fa-bullhorn animate-bounce"></i>
              </div>
              <div className="flex-1">
                <p className="text-amber-900 dark:text-amber-300 text-xs font-bold uppercase tracking-tight">Réforme Civique 2026</p>
                <p className="text-amber-800 dark:text-amber-400 text-[11px] leading-tight">Le barème officiel impose désormais 32 bonnes réponses sur 40.</p>
              </div>
              {userStats.totalQuizzes > 0 && (
                <div className="hidden md:block bg-white dark:bg-slate-800 px-4 py-2 rounded-xl border border-amber-200 dark:border-amber-800 shadow-sm text-center">
                  <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase">Taux de réussite</p>
                  <p className="text-sm font-black text-indigo-600 dark:text-indigo-400">
                    {userStats.totalQuestions > 0
                      ? Math.round((userStats.totalCorrect / userStats.totalQuestions) * 100)
                      : 0}%
                  </p>
                </div>
              )}
            </div>

            {/* Hero Section */}
            <section className="relative overflow-hidden bg-indigo-900 rounded-[3rem] p-10 md:p-16 text-white shadow-2xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 blur-[100px] -mr-32 -mt-32 rounded-full"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-400/10 blur-[100px] -ml-32 -mb-32 rounded-full"></div>

              <div className="relative z-10 grid lg:grid-cols-5 gap-12 items-center">
                <div className="lg:col-span-3 space-y-8">
                  <div className="inline-flex items-center space-x-2 bg-white/10 px-4 py-1.5 rounded-full border border-white/20">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-100">175+ questions disponibles</span>
                  </div>
                  <h1 className="text-4xl md:text-6xl font-extrabold brand-font leading-tight">
                    Réussissez votre <span className="text-amber-400">Intégration</span>
                  </h1>
                  <p className="text-lg text-indigo-100/80 max-w-xl leading-relaxed font-medium">
                    Préparez l'examen civique 2026 en toute sérénité avec des outils conçus pour votre réussite.
                  </p>
                  <div className="flex flex-wrap gap-4 pt-4">
                    <button onClick={() => startQuiz()} className="bg-white text-indigo-900 px-8 py-4 rounded-2xl font-bold hover:bg-indigo-50 transition shadow-xl flex items-center group active:scale-95">
                      Quiz Aléatoire <i className="fas fa-random ml-3 text-indigo-300 group-hover:rotate-180 transition-transform duration-500"></i>
                    </button>
                    <button onClick={() => setActiveTab('simulation')} className="bg-indigo-600 border border-indigo-400 text-white px-8 py-4 rounded-2xl font-bold hover:bg-indigo-700 transition shadow-lg active:scale-95">
                      Lancer un Examen Blanc
                    </button>
                  </div>
                </div>
                <div className="lg:col-span-2 hidden lg:flex justify-center">
                  <div className="relative group">
                    <div className="absolute -inset-8 bg-indigo-500/30 blur-3xl rounded-full group-hover:bg-indigo-400/40 transition-colors"></div>
                    <div className="relative bg-white/5 backdrop-blur-sm p-4 rounded-[2rem] border border-white/10 shadow-2xl rotate-3 group-hover:rotate-0 transition-all duration-700">
                      <img src="https://flagcdn.com/fr.svg" alt="France" className="w-56 h-auto rounded-xl shadow-lg" />
                      <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-2xl shadow-xl text-indigo-900">
                        <i className="fas fa-check-circle text-2xl text-emerald-500"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Thématiques */}
            <section className="space-y-10">
              <div className="flex flex-col md:flex-row justify-between items-end gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
                <div className="space-y-2">
                  <h2 className="text-3xl font-extrabold brand-font text-slate-900 dark:text-white tracking-tight">Révisez par Thématique</h2>
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Entraînement ciblé pour une progression constante.</p>
                </div>
                <div className="flex space-x-2">
                  <div className="flex items-center space-x-2 bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-xl text-slate-500 dark:text-slate-400 text-xs font-bold">
                    <i className="fas fa-database text-indigo-400"></i>
                    <span>Base de données complète</span>
                  </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
                {THEMES.map((theme) => {
                  const progress = userStats.themeProgress[theme.id];
                  const percentage = progress ? Math.round((progress.correct / progress.total) * 100) : 0;

                  return (
                    <button
                      key={theme.id}
                      onClick={() => startQuiz(theme.id)}
                      className="bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all group text-center flex flex-col items-center active:scale-95"
                    >
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-2xl transition-all shadow-sm group-hover:shadow-lg ${
                        theme.color === 'indigo' ? 'bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white group-hover:shadow-indigo-200' :
                        theme.color === 'blue' ? 'bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white group-hover:shadow-blue-200' :
                        theme.color === 'emerald' ? 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white group-hover:shadow-emerald-200' :
                        theme.color === 'amber' ? 'bg-amber-50 text-amber-600 group-hover:bg-amber-600 group-hover:text-white group-hover:shadow-amber-200' :
                        'bg-rose-50 text-rose-600 group-hover:bg-rose-600 group-hover:text-white group-hover:shadow-rose-200'
                      }`}>
                        <i className={`fas ${theme.icon}`}></i>
                      </div>
                      <h3 className="font-bold text-slate-900 dark:text-white mb-1 leading-tight">{theme.title}</h3>
                      {progress && (
                        <div className="w-full mt-3">
                          <div className="h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-indigo-500 rounded-full transition-all"
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                          <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1">{percentage}% maîtrisé</p>
                        </div>
                      )}
                      {!progress && (
                        <p className="text-[10px] text-slate-400 dark:text-slate-500 uppercase font-black tracking-widest mt-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">Commencer</p>
                      )}
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Weak Questions Section */}
            {userStats.weakQuestions.length > 0 && (
              <section className="bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800 p-8 rounded-3xl">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-rose-500 rounded-xl flex items-center justify-center text-white">
                      <i className="fas fa-target"></i>
                    </div>
                    <div>
                      <h3 className="font-bold text-rose-900 dark:text-rose-300">Points à améliorer</h3>
                      <p className="text-xs text-rose-600 dark:text-rose-400">{userStats.weakQuestions.length} questions à retravailler</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedTheme('weak');
                      setActiveTab('quiz');
                    }}
                    className="bg-rose-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-rose-600 transition active:scale-95"
                  >
                    Réviser mes points faibles
                  </button>
                </div>
              </section>
            )}
          </div>
        )}

        {activeTab === 'study' && <LessonView />}
        {activeTab === 'quiz' && (
          <Quiz
            selectedTheme={selectedTheme}
            onExit={() => setActiveTab('home')}
            onStatsUpdate={handleStatsUpdate}
            userStats={userStats}
          />
        )}
        {activeTab === 'simulation' && (
          <ExamSimulation
            onStatsUpdate={handleStatsUpdate}
            userStats={userStats}
          />
        )}
        {activeTab === 'faq' && <FAQPage />}
        {activeTab === 'profile' && (
          <ProfilePage
            userStats={userStats}
            onStatsUpdate={handleStatsUpdate}
          />
        )}
      </main>

      <footer className="bg-slate-950 text-white py-20 mt-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/5 blur-[120px] rounded-full"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-10">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-900/50">
                <i className="fas fa-graduation-cap text-white"></i>
              </div>
              <span className="text-2xl font-extrabold brand-font tracking-tight">Objectif<span className="text-indigo-400">Citoyen</span></span>
            </div>
            <div className="flex space-x-8 text-sm font-bold text-slate-400">
              <button onClick={() => setActiveTab('home')} className="hover:text-white transition-colors">Accueil</button>
              <button onClick={() => setActiveTab('study')} className="hover:text-white transition-colors">Parcours</button>
              <button onClick={() => setActiveTab('simulation')} className="hover:text-white transition-colors">Simulation</button>
              <button onClick={() => setActiveTab('faq')} className="hover:text-white transition-colors">FAQ</button>
              <a href="https://formation-civique.interieur.gouv.fr/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Site Officiel</a>
            </div>
          </div>

          {/* Source Attribution */}
          <div className="p-6 bg-indigo-500/10 rounded-2xl border border-indigo-500/20">
            <div className="flex items-center space-x-2 text-indigo-400 font-bold uppercase tracking-widest text-[10px] mb-3">
              <i className="fas fa-link"></i>
              <span>Source des informations</span>
            </div>
            <p className="text-sm text-slate-300">
              Les informations relatives à l'examen civique sont issues du site officiel du Ministère de l'Intérieur :{' '}
              <a
                href="https://formation-civique.interieur.gouv.fr/examen-civique/informations-g%C3%A9n%C3%A9rales-sur-lexamen-civique/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-400 hover:text-indigo-300 underline"
              >
                formation-civique.interieur.gouv.fr
              </a>
            </p>
          </div>

          <div className="p-10 bg-white/5 rounded-[2.5rem] border border-white/10 text-xs text-slate-400 leading-relaxed space-y-6">
            <div className="flex items-center space-x-2 text-indigo-400 font-bold uppercase tracking-widest text-[10px]">
              <i className="fas fa-shield-alt"></i>
              <span>Transparence et Responsabilité</span>
            </div>
            <p>
              <strong>Objectif Citoyen</strong> est une plateforme pédagogique indépendante éditée à titre privé. Elle n'est en aucun cas affiliée au Ministère de l'Intérieur, à l'OFII ou à tout organisme gouvernemental français. Les contenus proposés sont des aides à la révision basées sur les référentiels publics.
            </p>
            <p>
              En utilisant ce site, vous reconnaissez que la réussite aux simulations présentes ne garantit pas l'obtention de l'examen officiel. Les données de progression sont stockées localement sur votre appareil. Aucune information personnelle n'est envoyée à nos serveurs.
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 gap-4">
            <div className="text-slate-600 text-[10px] uppercase font-bold tracking-widest">
              © 2026 — Plateforme d'entraînement libre à but non lucratif
            </div>
            <div className="flex space-x-4 text-slate-500">
              <i className="fab fa-github hover:text-white cursor-pointer transition-colors"></i>
              <i className="fab fa-twitter hover:text-white cursor-pointer transition-colors"></i>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
