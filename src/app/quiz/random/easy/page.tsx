import type { Metadata } from "next";
import RandomQuizGame from "@/components/quiz/RandomQuizGame";

export const metadata: Metadata = {
  title: "サカナクション検定（初級）| サカナクション検定",
  description: "easy問題からランダム10問に挑戦しよう。",
};

export default function RandomEasyPage() {
  return <RandomQuizGame difficulty="easy" />;
}
