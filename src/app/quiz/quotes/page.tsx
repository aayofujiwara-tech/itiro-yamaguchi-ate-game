import type { Metadata } from "next";
import QuizGame from "@/components/quiz/QuizGame";

export const metadata: Metadata = {
  title: "一郎語録当て | NF Depth",
  description: "山口一郎の名言がどの場面で言われたか当てるクイズ。",
};

export default function QuotesPage() {
  return <QuizGame mode="quotes" />;
}
