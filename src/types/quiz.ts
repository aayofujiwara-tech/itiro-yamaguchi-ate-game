export interface Quiz {
  id: number;
  imageUrl: string;
  answer: string;
  hint: string;
  options: string[];
}

export interface QuizState {
  currentIndex: number;
  score: number;
  hintUsedCount: number;
  answered: boolean;
  selectedOption: string | null;
  isCorrect: boolean | null;
  hintUsed: boolean;
  showHint: boolean;
  quizzes: Quiz[];
  finished: boolean;
}
