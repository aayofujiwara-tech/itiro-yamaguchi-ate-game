export type QuizMode = "image" | "cult" | "lyrics-fill" | "lyrics-intro" | "quotes";

export type RandomQuizType = "cult" | "lyrics-fill" | "lyrics-intro" | "quotes";
export type RandomDifficulty = "easy" | "medium" | "hard";

export interface RandomQuizItem {
  quizType: RandomQuizType;
  id: number;
  answer: string;
  options: string[];
  raw: Record<string, unknown>;
}

export interface CategoryScore {
  quizType: RandomQuizType;
  correct: number;
  total: number;
}

export interface Quiz {
  id: number;
  imageId: string;
  answer: string;
  hint: string;
  options: string[];
  officialUrl: string | null;
  officialUrlLabel: string | null;
  category: string;
  sourceUrl: string | null;
  sourceLabel: string | null;
  contributor: string | null;
  relatedSong: string | null;
  difficulty: string;
}

export interface CultQuiz {
  id: number;
  question: string;
  answer: string;
  options: string[];
  category: string;
  difficulty: string;
  explanation: string;
}

export interface LyricsFill {
  id: number;
  songTitle: string;
  lyricBefore: string;
  blank: string;
  lyricAfter: string;
  options: string[];
  difficulty: string;
}

export interface LyricsIntro {
  id: number;
  lyricsHint: string;
  answer: string;
  options: string[];
  hintLength: number;
  difficulty: string;
}

export interface IchiroQuote {
  id: number;
  quote: string;
  answer: string;
  options: string[];
  source: string;
  category: string;
  difficulty: string;
  explanation: string;
}

export interface ModeConfig {
  mode: QuizMode | string;
  title: string;
  icon: string;
  description: string;
  path: string;
  questionCount: number;
}
