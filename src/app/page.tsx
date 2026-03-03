import type { Metadata } from "next";
import IntroGate from "@/components/quiz/IntroGate";
import PasswordGate from "@/components/quiz/PasswordGate";
import QuizModeSelect from "@/components/quiz/QuizModeSelect";

export const metadata: Metadata = {
  title: "深海探査レベル測定",
  description:
    "サカナクションに関する5つのクイズモードに挑戦しよう。配信画像当て、カルトクイズ、歌詞穴埋め、イントロ歌詞当て、一郎語録当て。",
  openGraph: {
    title: "深海探査レベル測定",
    description: "あなたの深海探査レベルは？",
    type: "website",
  },
};

export default function Home() {
  return (
    <IntroGate>
      <PasswordGate>
        <QuizModeSelect />
      </PasswordGate>
    </IntroGate>
  );
}
