export type ArchiveQuestionType = "image" | "quote" | "description" | "reverse";

export interface ArchiveQuizQuestion {
  id: number;
  questionType: ArchiveQuestionType;
  imageKey?: string | null;
  quoteText?: string | null;
  descriptionText?: string | null;
  reverseTitle?: string | null;
  question?: string | null;
  answer: string;
  options: string[];
  explanation: string;
  difficulty: "easy" | "medium" | "hard";
  streamTitle: string;
  streamDate?: string | null;
  youtubeUrl: string;
  youtubeLabel?: string | null;
  highlight: string;
  category?: string | null;
}
