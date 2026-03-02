import type { Metadata } from "next";
import QuizGame from "@/components/quiz/QuizGame";

export const metadata: Metadata = {
  title: "カルトクイズ | 深海探査レベル測定",
  description: "サカナクションに関するマニアック知識を試すクイズ。",
};

export default function CultQuizPage() {
  return <QuizGame mode="cult" />;
}
