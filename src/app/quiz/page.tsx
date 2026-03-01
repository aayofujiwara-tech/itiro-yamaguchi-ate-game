import type { Metadata } from "next";
import QuizGame from "@/components/quiz/QuizGame";

export const metadata: Metadata = {
  title: "配信画像当てクイズ | 山口一郎",
  description:
    "山口一郎さんの配信画像を見て、どの配信回のものかを当てるクイズゲームです。",
  openGraph: {
    title: "配信画像当てクイズ",
    description: "山口一郎さんの配信画像を当てよう！",
    type: "website",
  },
};

export default function QuizPage() {
  return <QuizGame />;
}
