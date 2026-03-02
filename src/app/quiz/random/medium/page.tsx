import type { Metadata } from "next";
import RandomQuizGame from "@/components/quiz/RandomQuizGame";

export const metadata: Metadata = {
  title: "深海探査（中層）| NF Depth",
  description: "medium問題からランダム10問に挑戦しよう。",
};

export default function RandomMediumPage() {
  return <RandomQuizGame difficulty="medium" />;
}
