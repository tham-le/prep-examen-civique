
import React, { useState, useEffect, useRef, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Header } from './components/Header';
import { InstallPrompt } from './components/InstallPrompt';
import { Onboarding } from './components/Onboarding';
import { Logo } from './components/Logo';
import { usePageMeta } from './hooks/usePageMeta';
import { THEMES, ALL_QUESTIONS } from './constants';
import { ExamLevel, UserStats } from './types';
import { loadUserStats, saveUserStats, loadExamHistory } from './services/gamificationService';
import { diffStats, rollDaily, themeMedal } from './services/progress';
import { Medal } from './components/Medal';
import { Toast, Toasts, describeEvent } from './components/Toasts';
import { DailyCard } from './components/DailyCard';
import { QuestionOfDay } from './components/QuestionOfDay';
import { countDue } from './services/spacedRepetition';
import { forLevel } from './services/examLevel';
import { daysUntil, masteredCount } from './services/readiness';

// Code split per route: only the home page ships eagerly, everything else
// loads on first visit to that route.
const Quiz = lazy(() => import('./components/Quiz').then(m => ({ default: m.Quiz })));
const LessonView = lazy(() => import('./components/LessonView').then(m => ({ default: m.LessonView })));
const ExamSimulation = lazy(() => import('./components/ExamSimulation').then(m => ({ default: m.ExamSimulation })));
const FAQPage = lazy(() => import('./components/FAQPage').then(m => ({ default: m.FAQPage })));
const ProfilePage = lazy(() => import('./components/ProfilePage').then(m => ({ default: m.ProfilePage })));
const Arcade = lazy(() => import('./components/Arcade').then(m => ({ default: m.Arcade })));
const Flashcards = lazy(() => import('./components/Flashcards').then(m => ({ default: m.Flashcards })));
const RevisionMode = lazy(() => import('./components/RevisionMode').then(m => ({ default: m.RevisionMode })));

const RouteLoadingFallback: React.FC = () => (
  <div className="flex justify-center py-20">
    <div className="w-10 h-10 border-3 border-sapphire-600 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

interface HomePageProps {
  userStats: UserStats;
  onStatsUpdate: (stats: UserStats) => void;
}

const TILE = 'block bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 text-left transition-colors hover:border-sapphire-400 dark:hover:border-sapphire-500';
const ICON_BOX = 'w-11 h-11 rounded-xl flex items-center justify-center bg-sapphire-100 dark:bg-sapphire-900/50 text-sapphire-600 dark:text-sapphire-400';

const LEVELS: { value: ExamLevel | undefined; label: string }[] = [
  { value: undefined, label: 'Tous' },
  { value: 'csp', label: 'CSP' },
  { value: 'cr', label: 'CR' },
];

const MODES = [
  { to: '/quiz', icon: 'fa-brain', title: 'Quiz', text: '10 questions, corrigées au fur et à mesure' },
  { to: '/flashcards', icon: 'fa-clone', title: 'Flashcards', text: 'Mémorisez les notions clés' },
  { to: '/revision', icon: 'fa-list-check', title: 'Révision', text: 'Parcourez toutes les questions' },
  { to: '/fiches', icon: 'fa-book-open', title: 'Fiches officielles', text: 'Les cours du ministère' },
  { to: '/defi', icon: 'fa-bolt', title: 'Défi éclair', text: '60 secondes, un maximum de bonnes réponses', wide: true },
  { to: '/survie', icon: 'fa-heart-pulse', title: 'Survie', text: "3 vies, jusqu'où irez-vous ?", wide: true },
];

const HomePage: React.FC<HomePageProps> = ({ userStats, onStatsUpdate }) => {
  const navigate = useNavigate();
  const questions = forLevel(ALL_QUESTIONS, userStats.examLevel);
  const dueCount = countDue(userStats.questionMastery, questions.map(q => q.id));
  const recentExams = loadExamHistory().slice(-3);
  const average = recentExams.length
    ? Math.round(recentExams.reduce((sum, e) => sum + e.score, 0) / recentExams.length)
    : null;

  const mastered = masteredCount(userStats.questionMastery, questions.map(q => q.id));
  const daysLeft = userStats.examDate ? daysUntil(userStats.examDate) : null;

  const startQuiz = (themeId?: string) => {
    navigate(themeId ? `/quiz?theme=${themeId}` : '/quiz');
  };

  return (
    <div className="space-y-12">
      <section className="grid lg:grid-cols-5 gap-8 items-start">
        <div className="lg:col-span-3 space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">
          Préparez l'examen civique
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-300">
          {questions.length} questions sur les 5 thèmes officiels. L'examen compte 40 questions, dure 45 minutes et demande 32 bonnes réponses.
        </p>
        <div className="flex flex-wrap gap-3">
          {dueCount > 0 ? (
            <button onClick={() => startQuiz('weak')} className="bg-sapphire-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-sapphire-700 transition-colors">
              Réviser {dueCount} question{dueCount > 1 ? 's' : ''} à revoir
            </button>
          ) : (
            <button onClick={() => startQuiz()} className="bg-sapphire-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-sapphire-700 transition-colors">
              Commencer un quiz
            </button>
          )}
          <button onClick={() => navigate('/examen-blanc')} className="bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white px-6 py-3 rounded-xl font-semibold hover:border-sapphire-400 transition-colors">
            Examen blanc
          </button>
        </div>
        </div>

        <div className="lg:col-span-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 space-y-6">
        <div className="space-y-2" role="group" aria-label="Titre de séjour visé">
          <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Votre examen</p>
          <div className="inline-flex p-1 bg-slate-100 dark:bg-slate-700 rounded-xl text-sm">
            {LEVELS.map(({ value, label }) => (
              <button
                key={label}
                onClick={() => onStatsUpdate({ ...userStats, examLevel: value })}
                aria-pressed={userStats.examLevel === value}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  userStats.examLevel === value
                    ? 'bg-white dark:bg-slate-700 text-sapphire-700 dark:text-sapphire-300'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">CSP : carte de séjour pluriannuelle. CR : carte de résident.</p>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm text-slate-700 dark:text-slate-300 mb-1">
              <span>Questions maîtrisées</span>
              <span className="tabular-nums">{mastered} / {questions.length}</span>
            </div>
            <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full bg-sapphire-500 rounded-full" style={{ width: `${questions.length ? (mastered / questions.length) * 100 : 0}%` }}></div>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-700 dark:text-slate-300">
            <label htmlFor="exam-date">Date de l'examen</label>
            <input
              id="exam-date"
              type="date"
              value={userStats.examDate ?? ''}
              onChange={e => onStatsUpdate({ ...userStats, examDate: e.target.value || undefined })}
              className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800"
            />
            {daysLeft !== null && (
              <span className="font-semibold">
                {daysLeft > 1 ? `dans ${daysLeft} jours` : daysLeft === 1 ? 'demain' : daysLeft === 0 ? "aujourd'hui" : 'date passée'}
              </span>
            )}
          </div>
        </div>
        </div>
      </section>

      <DailyCard userStats={userStats} onStatsUpdate={onStatsUpdate} />

      <QuestionOfDay userStats={userStats} onStatsUpdate={onStatsUpdate} />

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link
          to="/examen-blanc"
          className="sm:col-span-2 lg:row-span-2 bg-sapphire-600 text-white rounded-2xl p-6 flex flex-col justify-between gap-8 hover:bg-sapphire-700 transition-colors"
        >
          <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center">
            <i className="fas fa-file-lines"></i>
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Examen blanc</h2>
            <p className="text-sapphire-100">28 questions de connaissance et 12 mises en situation, 45 minutes.</p>
            {average !== null && (
              <p className="font-semibold">
                Moyenne de vos {recentExams.length} dernier{recentExams.length > 1 ? 's' : ''} : {average}/40 (seuil : 32)
              </p>
            )}
          </div>
        </Link>

        {MODES.map(mode => (
          <Link key={mode.to} to={mode.to} className={`${TILE}${mode.wide ? ' lg:col-span-2' : ''}`}>
            <div className={`${ICON_BOX} mb-4`}>
              <i className={`fas ${mode.icon}`}></i>
            </div>
            <h2 className="font-semibold text-slate-900 dark:text-white">{mode.title}</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{mode.text}</p>
          </Link>
        ))}
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Révisez par thème</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {THEMES.map((theme) => {
            const { tier, ratio } = themeMedal(userStats, theme.id);
            const percentage = Math.round(ratio * 100);
            const started = userStats.themeProgress[theme.id] || ratio > 0;

            return (
              <button key={theme.id} onClick={() => startQuiz(theme.id)} className={TILE}>
                <div className="flex items-start justify-between mb-4">
                  <div className={ICON_BOX}>
                    <i className={`fas ${theme.icon}`}></i>
                  </div>
                  <Medal tier={tier} />
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white text-sm">{theme.title}</h3>
                {started ? (
                  <div className="mt-3">
                    <div className="h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full bg-sapphire-500 rounded-full" style={{ width: `${percentage}%` }}></div>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 tabular-nums">{percentage} % maîtrisé</p>
                  </div>
                ) : (
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-3">Pas encore commencé</p>
                )}
              </button>
            );
          })}
        </div>
      </section>
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

const ArcadePage: React.FC<{ mode: 'blitz' | 'survival'; userStats: UserStats; onStatsUpdate: (stats: UserStats) => void }> = ({ mode, userStats, onStatsUpdate }) => {
  const navigate = useNavigate();
  return <Arcade key={mode} mode={mode} userStats={userStats} onStatsUpdate={onStatsUpdate} onExit={() => navigate('/')} />;
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
        <Route path="/" element={<HomePage userStats={userStats} onStatsUpdate={onStatsUpdate} />} />
        <Route path="/fiches" element={<LessonPage />} />
        <Route path="/flashcards" element={<Flashcards userStats={userStats} onStatsUpdate={onStatsUpdate} />} />
        <Route path="/defi" element={<ArcadePage mode="blitz" userStats={userStats} onStatsUpdate={onStatsUpdate} />} />
        <Route path="/survie" element={<ArcadePage mode="survival" userStats={userStats} onStatsUpdate={onStatsUpdate} />} />
        <Route path="/revision" element={<RevisionMode userStats={userStats} onStatsUpdate={onStatsUpdate} />} />
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
  const statsRef = useRef(userStats);
  const nextToastId = useRef(1);
  const [toasts, setToasts] = useState<Toast[]>([]);
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

  // Start today's block and end a streak that missed a day
  useEffect(() => {
    const stats = rollDaily(loadUserStats());
    statsRef.current = stats;
    saveUserStats(stats);
    setUserStats(stats);
  }, []);

  const showToasts = (messages: Omit<Toast, 'id'>[]) => {
    const added = messages.map(message => ({ ...message, id: nextToastId.current++ }));
    setToasts(current => [...current, ...added].slice(-5));
    added.forEach(toast => window.setTimeout(() => setToasts(current => current.filter(t => t.id !== toast.id)), 4500));
  };

  const handleStatsUpdate = (newStats: UserStats) => {
    showToasts(diffStats(statsRef.current, newStats).map(event => describeEvent(event, newStats)));
    statsRef.current = newStats;
    setUserStats(newStats);
    saveUserStats(newStats);
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

        <Toasts toasts={toasts} />

        <InstallPrompt />

        {showOnboarding && (
          <Onboarding onComplete={() => setShowOnboarding(false)} />
        )}
      </div>
    </BrowserRouter>
  );
};

export default App;
