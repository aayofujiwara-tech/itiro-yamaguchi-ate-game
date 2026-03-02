import type { Metadata } from "next";
import RandomQuizGame from "@/components/quiz/RandomQuizGame";

export const metadata: Metadata = {
  title: "サカナクション検定（上級）| サカナクション検定",
  description: "hard問題からランダム10問に挑戦しよう。",
};

export default function RandomHardPage() {
  return <RandomQuizGame difficulty="hard" />;
}
