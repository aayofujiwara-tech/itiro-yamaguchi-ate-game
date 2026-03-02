"use client";

import Link from "next/link";
import type { ModeConfig } from "@/types/quiz";
import Footer from "./Footer";
import imageData from "@/data/quizzes.json";
import cultData from "@/data/cult-quiz.json";
import lyricsFillData from "@/data/lyrics-fill.json";
import lyricsIntroData from "@/data/lyrics-intro.json";
import quotesData from "@/data/ichiro-quotes.json";

const randomModes = [
  {
    key: "easy",
    title: "深海探査（浅瀬）",
    icon: "🎲",
    description: "浅瀬エリアからランダム10問",
    path: "/quiz/random/easy",
  },
  {
    key: "medium",
    title: "深海探査（中層）",
    icon: "🎲",
    description: "中層エリアからランダム10問",
    path: "/quiz/random/medium",
  },
  {
    key: "hard",
    title: "深海探査（深海）",
    icon: "🎲",
    description: "深海エリアからランダム10問",
    path: "/quiz/random/hard",
  },
];

const modes: ModeConfig[] = [
  {
    mode: "image",
    title: "配信画像当て",
    icon: "🖼️",
    description: "配信画像を見てどの回か当てよう",
    path: "/quiz/image",
    questionCount: imageData.length,
  },
  {
    mode: "cult",
    title: "カルトクイズ",
    icon: "🧠",
    description: "サカナクションのマニアック知識に挑戦",
    path: "/quiz/cult",
    questionCount: cultData.length,
  },
  {
    mode: "lyrics-fill",
    title: "歌詞穴埋め",
    icon: "📝",
    description: "歌詞の空欄を埋めよう",
    path: "/quiz/lyrics-fill",
    questionCount: lyricsFillData.length,
  },
  {
    mode: "lyrics-intro",
    title: "イントロ歌詞当て",
    icon: "🎵",
    description: "歌い出しから曲名を当てよう",
    path: "/quiz/lyrics-intro",
    questionCount: lyricsIntroData.length,
  },
  {
    mode: "quotes",
    title: "一郎語録当て",
    icon: "💬",
    description: "山口一郎の名言の場面を当てよう",
    path: "/quiz/quotes",
    questionCount: quotesData.length,
  },
];

export default function QuizModeSelect() {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
    <div className="flex-1 flex flex-col items-center px-4 py-12 md:py-16">
      <div className="w-full max-w-3xl animate-fade-in">
        <div className="text-center mb-10">
          <h1
            className="text-3xl sm:text-4xl font-bold mb-1"
            style={{ color: "var(--text-main)" }}
          >
            🐟 NF Depth
          </h1>
          <p
            className="text-lg sm:text-xl mb-3"
            style={{ color: "#9ca3af" }}
          >
            深海探査レベル測定
          </p>
          <p className="text-base" style={{ color: "var(--text-sub)" }}>
            あなたの深海探査レベルは？
          </p>
        </div>

        {/* 深海探査 */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <h2
              className="text-sm font-bold tracking-wider"
              style={{ color: "var(--accent)" }}
            >
              深海探査
            </h2>
            <div
              className="flex-1 h-px"
              style={{ backgroundColor: "rgba(0, 212, 255, 0.3)" }}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {randomModes.map((m) => (
              <Link
                key={m.key}
                href={m.path}
                className="mode-card block rounded-xl p-6 transition-all duration-200"
                style={{
                  backgroundColor: "var(--bg-card)",
                  border: "1px solid rgba(0, 212, 255, 0.3)",
                }}
              >
                <div className="text-3xl mb-3">{m.icon}</div>
                <h3
                  className="text-base font-bold mb-1"
                  style={{ color: "var(--text-main)" }}
                >
                  {m.title}
                </h3>
                <p
                  className="text-sm"
                  style={{ color: "var(--text-sub)" }}
                >
                  {m.description}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* 個別モード */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <h2
              className="text-sm font-bold tracking-wider"
              style={{ color: "var(--accent)" }}
            >
              個別モード
            </h2>
            <div
              className="flex-1 h-px"
              style={{ backgroundColor: "rgba(0, 212, 255, 0.3)" }}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {modes.map((m) => (
              <Link
                key={m.mode}
                href={m.path}
                className="mode-card block rounded-xl p-6 transition-all duration-200"
                style={{
                  backgroundColor: "var(--bg-card)",
                  border: "1px solid var(--border)",
                }}
              >
                <div className="text-3xl mb-3">{m.icon}</div>
                <h3
                  className="text-lg font-bold mb-1"
                  style={{ color: "var(--text-main)" }}
                >
                  {m.title}
                </h3>
                <p
                  className="text-sm mb-3"
                  style={{ color: "var(--text-sub)" }}
                >
                  {m.description}
                </p>
                <span
                  className="inline-block text-xs px-2 py-1 rounded-full"
                  style={{
                    backgroundColor: "rgba(0, 212, 255, 0.1)",
                    color: "var(--accent)",
                    border: "1px solid rgba(0, 212, 255, 0.2)",
                    fontFamily: "Inter, monospace",
                  }}
                >
                  {m.questionCount}問
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </div>
  );
}
