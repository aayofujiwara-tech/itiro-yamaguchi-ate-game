import type { Metadata } from "next";
import QuizGame from "@/components/quiz/QuizGame";

export const metadata: Metadata = {
  title: "配信画像当て | サカナクション検定",
  description: "配信画像を見て、どの配信回のものかを当てるクイズ。",
};

export default function ImageQuizPage() {
  return <QuizGame mode="image" />;
}
