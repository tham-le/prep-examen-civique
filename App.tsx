
import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Header } from './components/Header';
import { InstallPrompt } from './components/InstallPrompt';
import { Onboarding } from './components/Onboarding';
import { Logo } from './components/Logo';
import { usePageMeta } from './hooks/usePageMeta';
import { THEMES, ALL_QUESTIONS } from './constants';
import { UserStats } from './types';
import { loadUserStats, saveUserStats, checkAndUpdateStreak, getLevelInfo, getXPProgress } from './services/gamificationService';
import { countDue } from './services/spacedRepetition';

// Code split per route: only the home page ships eagerly, everything else
// loads on first visit to that route.
const Quiz = lazy(() => import('./components/Quiz').then(m => ({ default: m.Quiz })));
const LessonView = lazy(() => import('./components/LessonView').then(m => ({ default: m.LessonView })));
const ExamSimulation = lazy(() => import('./components/ExamSimulation').then(m => ({ default: m.ExamSimulation })));
const FAQPage = lazy(() => import('./components/FAQPage').then(m => ({ default: m.FAQPage })));
const ProfilePage = lazy(() => import('./components/ProfilePage').then(m => ({ default: m.ProfilePage })));
const Flashcards = lazy(() => import('./components/Flashcards').then(m => ({ default: m.Flashcards })));
const RevisionMode = lazy(() => import('./components/RevisionMode').then(m => ({ default: m.RevisionMode })));

const RouteLoadingFallback: React.FC = () => (
  <div className="flex justify-center py-20">
    <div className="w-10 h-10 border-3 border-sapphire-600 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

interface HomePageProps {
  userStats: UserStats;
}

const HomePage: React.FC<HomePageProps> = ({ userStats }) => {
  const navigate = useNavigate();
  const levelInfo = getLevelInfo(userStats.level);
  const xpProgress = getXPProgress(userStats.xp, userStats.level);
  const dueCount = countDue(userStats.questionMastery, ALL_QUESTIONS.map(q => q.id));

  const startQuiz = (themeId?: string) => {
    navigate(themeId ? `/quiz?theme=${themeId}` : '/quiz');
  };

  return (
    <div className="space-y-10">
      {/* User Progress Banner */}
      <div className="bg-sapphire-600 p-5 rounded-xl text-white">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <i className={`fas ${levelInfo.icon} text-xl`}></i>
            </div>
            <div>
              <p className="text-xs text-sapphire-200">Niveau {userStats.level}</p>
              <p className="text-lg font-bold">{levelInfo.name}</p>
            </div>
          </div>
          <div className="flex-1 max-w-sm w-full">
            <div className="flex justify-between text-xs mb-1">
              <span>{userStats.xp} XP</span>
              <span>Niveau {userStats.level + 1}</span>
            </div>
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-400 rounded-full"
                style={{ width: `${xpProgress}%` }}
              ></div>
            </div>
          </div>
          <div className="flex items-center space-x-4 text-center text-sm">
            <div>
              <p className="text-xl font-bold">{userStats.streak}</p>
              <p className="text-xs text-sapphire-200">Jours</p>
            </div>
            <div className="h-6 w-px bg-white/20"></div>
            <div>
              <p className="text-xl font-bold">{userStats.badges.length}</p>
              <p className="text-xs text-sapphire-200">Badges</p>
            </div>
            <div className="h-6 w-px bg-white/20"></div>
            <div>
              <p className="text-xl font-bold">{userStats.totalQuizzes}</p>
              <p className="text-xs text-sapphire-200">Quiz</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bannière Info */}
      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 p-4 rounded-lg flex items-center space-x-3">
        <div className="bg-amber-500 p-2 rounded-md text-white">
          <i className="fas fa-bullhorn text-sm"></i>
        </div>
        <div className="flex-1">
          <p className="text-amber-900 dark:text-amber-300 text-sm font-medium">Réforme Civique 2026</p>
          <p className="text-amber-700 dark:text-amber-400 text-xs">Le barème officiel impose désormais 32 bonnes réponses sur 40.</p>
        </div>
        {userStats.totalQuizzes > 0 && (
          <div className="hidden md:block text-right">
            <p className="text-xs text-slate-500 dark:text-slate-400">Taux de réussite</p>
            <p className="text-lg font-bold text-sapphire-600 dark:text-sapphire-400">
              {userStats.totalQuestions > 0
                ? Math.round((userStats.totalCorrect / userStats.totalQuestions) * 100)
                : 0}%
            </p>
          </div>
        )}
      </div>

      {/* Hero Section */}
      <section className="bg-slate-900 rounded-xl p-8 md:p-12 text-white">
        <div className="grid lg:grid-cols-5 gap-8 items-center">
          <div className="lg:col-span-3 space-y-6">
            <div className="inline-flex items-center space-x-2 bg-white/10 px-3 py-1 rounded text-xs text-sapphire-200">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
              <span>{ALL_QUESTIONS.length} questions disponibles</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold leading-tight">
              Réussissez votre <span className="text-amber-400">Intégration</span>
            </h1>
            <p className="text-slate-300 max-w-xl">
              Préparez l'examen civique 2026 en toute sérénité avec des outils conçus pour votre réussite.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <button onClick={() => startQuiz()} className="bg-white text-slate-900 px-6 py-3 rounded-lg font-medium hover:bg-slate-100 transition flex items-center">
                Quiz Aléatoire <i className="fas fa-random ml-2 text-slate-400"></i>
              </button>
              <button onClick={() => navigate('/examen-blanc')} className="bg-sapphire-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-sapphire-700 transition">
                Lancer un Examen Blanc
              </button>
            </div>
          </div>
          <div className="lg:col-span-2 hidden lg:flex justify-center">
            <div className="bg-white/5 p-6 rounded-lg border border-white/10">
              <Logo className="w-40 h-40" />
            </div>
          </div>
        </div>
      </section>

      {/* Modes d'apprentissage */}
      <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link
          to="/flashcards"
          className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-amber-300 dark:hover:border-amber-600 transition-colors text-left group"
        >
          <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400 rounded-lg flex items-center justify-center mb-3">
            <i className="fas fa-clone"></i>
          </div>
          <h3 className="font-medium text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400">Flashcards</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Mémorisez les notions clés</p>
        </Link>

        <Link
          to="/revision"
          className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-purple-300 dark:hover:border-purple-600 transition-colors text-left group"
        >
          <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400 rounded-lg flex items-center justify-center mb-3">
            <i className="fas fa-list-check"></i>
          </div>
          <h3 className="font-medium text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400">Mode Révision</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Parcourez toutes les questions</p>
        </Link>

        <button
          onClick={() => startQuiz()}
          className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-emerald-300 dark:hover:border-emerald-600 transition-colors text-left group"
        >
          <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 rounded-lg flex items-center justify-center mb-3">
            <i className="fas fa-brain"></i>
          </div>
          <h3 className="font-medium text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400">Quiz Pratique</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Testez vos connaissances</p>
        </button>

        <Link
          to="/examen-blanc"
          className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-sapphire-300 dark:hover:border-sapphire-600 transition-colors text-left group"
        >
          <div className="w-10 h-10 bg-sapphire-100 dark:bg-sapphire-900/50 text-sapphire-600 dark:text-sapphire-400 rounded-lg flex items-center justify-center mb-3">
            <i className="fas fa-file-alt"></i>
          </div>
          <h3 className="font-medium text-slate-900 dark:text-white group-hover:text-sapphire-600 dark:group-hover:text-sapphire-400">Examen Blanc</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Conditions réelles (45 min)</p>
        </Link>
      </section>

      {/* Thématiques */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-end gap-4 border-b border-slate-200 dark:border-slate-700 pb-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Révisez par Thématique</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm">Entraînement ciblé pour une progression constante.</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {THEMES.map((theme) => {
            const progress = userStats.themeProgress[theme.id];
            const percentage = progress ? Math.round((progress.correct / progress.total) * 100) : 0;

            return (
              <button
                key={theme.id}
                onClick={() => startQuiz(theme.id)}
                className="bg-white dark:bg-slate-800 p-5 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-sapphire-300 dark:hover:border-sapphire-600 transition-colors text-center flex flex-col items-center"
              >
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-3 text-xl ${
                  theme.color === 'sapphire' ? 'bg-sapphire-100 dark:bg-sapphire-900/50 text-sapphire-600 dark:text-sapphire-400' :
                  theme.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400' :
                  theme.color === 'emerald' ? 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400' :
                  theme.color === 'amber' ? 'bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400' :
                  'bg-rose-100 dark:bg-rose-900/50 text-rose-600 dark:text-rose-400'
                }`}>
                  <i className={`fas ${theme.icon}`}></i>
                </div>
                <h3 className="font-medium text-slate-900 dark:text-white text-sm">{theme.title}</h3>
                {progress && (
                  <div className="w-full mt-2">
                    <div className="h-1 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-sapphire-500 rounded-full"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">{percentage}%</p>
                  </div>
                )}
                {!progress && (
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">Commencer</p>
                )}
              </button>
            );
          })}
        </div>
      </section>

      {/* Due for Review Section */}
      {dueCount > 0 && (
        <section className="bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-700 p-5 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-rose-500 rounded-lg flex items-center justify-center text-white">
                <i className="fas fa-target"></i>
              </div>
              <div>
                <h3 className="font-medium text-rose-900 dark:text-rose-300">Points à améliorer</h3>
                <p className="text-sm text-rose-600 dark:text-rose-400">{dueCount} question{dueCount > 1 ? 's' : ''} à revoir aujourd'hui</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/quiz?theme=weak')}
              className="bg-rose-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-rose-600 transition"
            >
              Réviser mes points faibles
            </button>
          </div>
        </section>
      )}
    </div>
  );
};

interface QuizPageProps {
  userStats: UserStats;
  onStatsUpdate: (stats: UserStats) => void;
}

const QuizPage: React.FC<QuizPageProps> = ({ userStats, onStatsUpdate }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const selectedTheme = searchParams.get('theme') ?? undefined;

  return (
    <Quiz
      selectedTheme={selectedTheme}
      onExit={() => navigate('/')}
      onStatsUpdate={onStatsUpdate}
      userStats={userStats}
    />
  );
};

const LessonPage: React.FC = () => {
  const navigate = useNavigate();
  return <LessonView onStartQuiz={(themeId) => navigate(`/quiz?theme=${themeId}`)} />;
};

interface AppRoutesProps {
  userStats: UserStats;
  onStatsUpdate: (stats: UserStats) => void;
  onShowTutorial: () => void;
}

const AppRoutes: React.FC<AppRoutesProps> = ({ userStats, onStatsUpdate, onShowTutorial }) => {
  usePageMeta();

  return (
    <Suspense fallback={<RouteLoadingFallback />}>
      <Routes>
        <Route path="/" element={<HomePage userStats={userStats} />} />
        <Route path="/fiches" element={<LessonPage />} />
        <Route path="/flashcards" element={<Flashcards userStats={userStats} onStatsUpdate={onStatsUpdate} />} />
        <Route path="/revision" element={<RevisionMode userStats={userStats} />} />
        <Route path="/quiz" element={<QuizPage userStats={userStats} onStatsUpdate={onStatsUpdate} />} />
        <Route path="/examen-blanc" element={<ExamSimulation onStatsUpdate={onStatsUpdate} userStats={userStats} />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route
          path="/profil"
          element={
            <ProfilePage
              userStats={userStats}
              onStatsUpdate={onStatsUpdate}
              onShowTutorial={onShowTutorial}
            />
          }
        />
      </Routes>
    </Suspense>
  );
};

const App: React.FC = () => {
  const [userStats, setUserStats] = useState<UserStats>(loadUserStats());
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });
  const [showOnboarding, setShowOnboarding] = useState(() => {
    return localStorage.getItem('objectif_citoyen_onboarding_complete') !== 'true';
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

  const handleStatsUpdate = (newStats: UserStats) => {
    setUserStats(newStats);
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col selection:bg-sapphire-100 selection:text-sapphire-900 dark:selection:bg-sapphire-900 dark:selection:text-sapphire-100">
        <Header userStats={userStats} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
          <AppRoutes
            userStats={userStats}
            onStatsUpdate={handleStatsUpdate}
            onShowTutorial={() => setShowOnboarding(true)}
          />
        </main>

        <footer className="bg-slate-900 text-white py-12 mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <Link to="/" className="flex items-center space-x-2">
                <Logo className="w-8 h-8" />
                <span className="text-lg font-bold">Objectif<span className="text-sapphire-400">Citoyen</span></span>
              </Link>
              <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-400">
                <Link to="/" className="hover:text-white transition-colors">Accueil</Link>
                <Link to="/fiches" className="hover:text-white transition-colors">Parcours</Link>
                <Link to="/examen-blanc" className="hover:text-white transition-colors">Simulation</Link>
                <Link to="/faq" className="hover:text-white transition-colors">FAQ</Link>
                <a href="https://formation-civique.interieur.gouv.fr/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Site Officiel</a>
              </div>
            </div>

            {/* Source Attribution */}
            <div className="p-4 bg-slate-800 rounded-lg border border-slate-700">
              <p className="text-xs text-slate-400 mb-2">Source des informations</p>
              <p className="text-sm text-slate-300">
                Les informations relatives à l'examen civique sont issues du site officiel du Ministère de l'Intérieur :{' '}
                <a
                  href="https://formation-civique.interieur.gouv.fr/examen-civique/informations-g%C3%A9n%C3%A9rales-sur-lexamen-civique/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sapphire-400 hover:text-sapphire-300 underline"
                >
                  formation-civique.interieur.gouv.fr
                </a>
              </p>
            </div>

            <div className="p-5 bg-slate-800/50 rounded-lg border border-slate-700 text-xs text-slate-400 space-y-3">
              <p className="text-xs text-slate-500 uppercase">Transparence</p>
              <p>
                <strong>Objectif Citoyen</strong> est une plateforme pédagogique indépendante. Elle n'est pas affiliée au Ministère de l'Intérieur, à l'OFII ou à tout organisme gouvernemental. Les contenus sont des aides à la révision basées sur les référentiels publics.
              </p>
              <p>
                La réussite aux simulations ne garantit pas l'obtention de l'examen officiel. Les données sont stockées localement sur votre appareil.
              </p>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center pt-6 border-t border-slate-800 gap-4">
              <div className="text-slate-500 text-xs">
                © 2026, Plateforme d'entraînement libre
              </div>
              <div className="flex items-center space-x-4 text-slate-500">
                <a
                  href="https://en.tipeee.com/objectif-citoyen/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-rose-400 transition-colors flex items-center text-xs"
                >
                  <i className="fas fa-heart mr-1"></i> Soutenir
                </a>
                <a
                  href="https://github.com/tham-le/prep-examen-civique/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center text-xs"
                >
                  <i className="fab fa-github mr-1"></i> Feedback
                </a>
                <a
                  href="mailto:objectifcitoyen2026@gmail.com"
                  className="hover:text-white transition-colors flex items-center text-xs"
                >
                  <i className="fas fa-envelope mr-1"></i> Contact
                </a>
              </div>
            </div>
          </div>
        </footer>

        <InstallPrompt />

        {showOnboarding && (
          <Onboarding onComplete={() => setShowOnboarding(false)} />
        )}
      </div>
    </BrowserRouter>
  );
};

export default App;
