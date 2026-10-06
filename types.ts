
export type ExamLevel = 'cr' | 'csp';

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  type?: 'multiple-choice' | 'scenario';
  category?: string;
  // Only in the exam list of this residence permit; no level means both
  level?: ExamLevel;
  difficulty?: 1 | 2 | 3;
}

// Leitner-style spaced repetition state for a single item (question or flashcard).
export interface SRSState {
  box: number;
  dueAt: number;
}

export type SRSMap = Record<string, SRSState>;

export interface Lesson {
  id: string;
  title: string;
  category: string;
  content: string[];
  quiz: Question[];
  icon: string;
}

export interface StudyTopic {
  id: string;
  title: string;
  category: 'Institutions' | 'Valeurs' | 'Histoire' | 'Vie Quotidienne';
  description: string;
  icon: string;
}

export interface ExamSession {
  startTime: number;
  questions: Question[];
  answers: Record<string, number>;
  isFinished: boolean;
}

export interface ExamResult {
  id: string;
  date: string;
  score: number;
  passed: boolean;
  duration: number; // in seconds
}

// Gamification Types
export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: number;
}

export interface UserStats {
  xp: number;
  level: number;
  streak: number;
  lastLoginDate: string;
  totalQuizzes: number;
  totalCorrect: number;
  totalQuestions: number;
  perfectScores: number;
  examsPassed: number;
  badges: string[];
  questionMastery: SRSMap;
  flashcardMastery: SRSMap;
  themeProgress: Record<string, { correct: number; total: number }>;
  examLevel?: ExamLevel;
  seenQuestions?: string[];
  recentExamQuestions?: string[];
  examDate?: string;
  dailyGoal?: number;
  daily?: DailyProgress;
  combo?: number;
  goalsMet?: number;
  missionsCompleted?: number;
  bestBlitz?: number;
  bestSurvival?: number;
}

// What was done on one local day; replaced when the day changes
export interface DailyProgress {
  date: string;
  answered: number;
  correct: number;
  scenario: number;
  bestCombo: number;
  goalReached: boolean;
  missionsDone: string[];
  questionOfDay?: { id: string; choice: number };
}

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export interface OfficialFiche {
  id: string;
  title: string;
  url: string;
}

export interface FicheCategory {
  id: string;
  title: string;
  icon: string;
  fiches: OfficialFiche[];
}
