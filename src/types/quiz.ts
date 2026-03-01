export type QuizMode = "image" | "cult" | "lyrics-fill" | "lyrics-intro" | "quotes";

export interface Quiz {
  id: number;
  imageUrl: string;
  answer: string;
  hint: string;
  options: string[];
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
  mode: QuizMode;
  title: string;
  icon: string;
  description: string;
  path: string;
  questionCount: number;
}
