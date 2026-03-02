import type { Metadata } from "next";
import RandomQuizGame from "@/components/quiz/RandomQuizGame";

export const metadata: Metadata = {
  title: "深海探査（浅瀬）| NF Depth",
  description: "浅瀬エリアからランダム10問に挑戦しよう。",
};

export default function RandomEasyPage() {
  return <RandomQuizGame difficulty="easy" />;
}
