import type { Metadata } from "next";
import RandomQuizGame from "@/components/quiz/RandomQuizGame";

export const metadata: Metadata = {
  title: "深海探査（深海）| 深海探査レベル測定",
  description: "深海エリアからランダム10問に挑戦しよう。",
};

export default function RandomHardPage() {
  return <RandomQuizGame difficulty="hard" />;
}
