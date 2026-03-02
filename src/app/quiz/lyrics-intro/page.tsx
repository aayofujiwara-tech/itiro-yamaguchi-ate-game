import type { Metadata } from "next";
import QuizGame from "@/components/quiz/QuizGame";

export const metadata: Metadata = {
  title: "イントロ歌詞当て | 深海探査レベル測定",
  description: "歌い出しの歌詞から曲名を当てるクイズ。",
};

export default function LyricsIntroPage() {
  return <QuizGame mode="lyrics-intro" />;
}
