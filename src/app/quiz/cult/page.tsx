import type { Metadata } from "next";
import QuizGame from "@/components/quiz/QuizGame";

export const metadata: Metadata = {
  title: "カルトクイズ | NF Depth",
  description: "サカナクションに関するマニアック知識を試すクイズ。",
};

export default function CultQuizPage() {
  return <QuizGame mode="cult" />;
}
