
export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  type?: 'multiple-choice' | 'scenario';
  category?: string;
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
