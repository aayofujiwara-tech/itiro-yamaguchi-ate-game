import type { Metadata } from "next";
import ArchiveQuizGame from "@/components/quiz/ArchiveQuizGame";

export const metadata: Metadata = {
  title: "遡行型遡上 | 深海探査レベル測定",
  description: "山口一郎YouTubeアーカイブから出題。4つの形式で配信知識を試そう。",
};

export default function ArchiveQuizPage() {
  return <ArchiveQuizGame />;
}
