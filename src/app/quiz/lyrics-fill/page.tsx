import type { Metadata } from "next";
import QuizGame from "@/components/quiz/QuizGame";

export const metadata: Metadata = {
  title: "歌詞穴埋め | NF Depth",
  description: "サカナクションの歌詞の空欄を埋めるクイズ。",
};

export default function LyricsFillPage() {
  return <QuizGame mode="lyrics-fill" />;
}
