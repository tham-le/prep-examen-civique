
export type Level = 'CSP' | 'CR';

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  type?: 'multiple-choice' | 'scenario';
  category?: string;
  level?: Level;
  difficulty?: 1 | 2 | 3;
}

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
  level: Level;
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
  color: string;
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
  weakQuestions: string[];
  strongQuestions: string[];
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
  color: string;
  fiches: OfficialFiche[];
}
