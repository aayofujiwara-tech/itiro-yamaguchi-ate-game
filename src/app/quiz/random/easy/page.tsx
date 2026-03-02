import type { Metadata } from "next";
import RandomQuizGame from "@/components/quiz/RandomQuizGame";

export const metadata: Metadata = {
  title: "深海探査（表層：マイワシ級）| 深海探査レベル測定",
  description: "表層からランダム10問に挑戦しよう。",
};

export default function RandomEasyPage() {
  return <RandomQuizGame difficulty="easy" />;
}
