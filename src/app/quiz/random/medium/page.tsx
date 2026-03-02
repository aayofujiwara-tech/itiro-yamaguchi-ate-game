import type { Metadata } from "next";
import RandomQuizGame from "@/components/quiz/RandomQuizGame";

export const metadata: Metadata = {
  title: "サカナクション検定（中級）| サカナクション検定",
  description: "medium問題からランダム10問に挑戦しよう。",
};

export default function RandomMediumPage() {
  return <RandomQuizGame difficulty="medium" />;
}
