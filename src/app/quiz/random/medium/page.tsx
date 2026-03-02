import type { Metadata } from "next";
import RandomQuizGame from "@/components/quiz/RandomQuizGame";

export const metadata: Metadata = {
  title: "深海探査（中層）| NF Depth",
  description: "中層エリアからランダム10問に挑戦しよう。",
};

export default function RandomMediumPage() {
  return <RandomQuizGame difficulty="medium" />;
}
