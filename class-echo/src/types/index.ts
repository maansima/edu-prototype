export type ViewMode = 'instructor' | 'student';

export interface Week {
  id: number;
  title: string;
  date: string;
  recording: Recording | null;
  slides: Slide | null;
  readings: Reading[];
  analytics: Analytics;
  suggestedResources: SuggestedResource[];
  studentSummary: string;
  keyConcepts: string[];
  quizPrompts: QuizPrompt[];
  studentProgress: StudentProgress;
}

export interface Recording {
  filename: string;
  duration: string;
  uploadedAt: string;
}

export interface Slide {
  filename: string;
  pageCount: number;
  uploadedAt: string;
}

export interface Reading {
  id: string;
  title: string;
  url: string;
  type: 'article' | 'book' | 'paper';
}

export interface Analytics {
  totalQuestions: number;
  participationRate: number;
  attendance: number;
  totalStudents: number;
  keyThemes: string[];
  participationDetails: ParticipationDetail[];
}

export interface ParticipationDetail {
  studentName: string;
  questionsAsked: number;
  timesSpoken: number;
}

export interface SuggestedResource {
  id: string;
  title: string;
  description: string;
  type: 'article' | 'podcast' | 'case' | 'video';
  addedToPlan: boolean;
}

export interface QuizPrompt {
  id: string;
  concept: string;
  relatedWeekId: number;
  expectedKeywords: string[];
  reviewResources: ReviewResource[];
}

export interface ReviewResource {
  type: 'slide' | 'reading' | 'clip';
  title: string;
  description: string;
  weekId: number;
}

export interface StudentProgress {
  quizStatus: 'not-started' | 'in-progress' | 'completed';
  currentPromptIndex: number;
  answers: QuizAnswer[];
  masteryLevel: 'not-solid' | 'getting-there' | 'confident';
}

export interface QuizAnswer {
  promptId: string;
  answer: string;
  feedback: string;
  understandingLevel: 1 | 2 | 3;
  timestamp: string;
}

export interface ChatMessage {
  id: string;
  sender: 'llm' | 'student';
  content: string;
  timestamp: string;
  understandingLevel?: 1 | 2 | 3;
  reviewResources?: ReviewResource[];
}

export interface AppState {
  currentWeek: number;
  viewMode: ViewMode;
  theme: 'light' | 'dark';
  weeks: Week[];
  chatMessages: Record<number, ChatMessage[]>;
}
