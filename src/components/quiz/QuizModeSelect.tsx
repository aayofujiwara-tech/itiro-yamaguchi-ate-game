"use client";

import Link from "next/link";
import Footer from "./Footer";
import imageData from "@/data/quizzes.json";
import cultData from "@/data/cult-quiz.json";
import lyricsFillData from "@/data/lyrics-fill.json";
import lyricsIntroData from "@/data/lyrics-intro.json";
import quotesData from "@/data/ichiro-quotes.json";
import archiveData from "@/data/archive-quiz.json";

const randomModes = [
  {
    key: "easy",
    title: "深海探査（表層：マイワシ級）",
    icon: "🎲",
    description: "表層からランダム10問",
    path: "/quiz/random/easy",
  },
  {
    key: "medium",
    title: "深海探査（漸深層：ダイオウイカ級）",
    icon: "🎲",
    description: "漸深層からランダム10問",
    path: "/quiz/random/medium",
  },
  {
    key: "hard",
    title: "深海探査（深海層：シンカイクサウオ級）",
    icon: "🎲",
    description: "深海層からランダム10問",
    path: "/quiz/random/hard",
  },
];

const individualModes = [
  {
    key: "image",
    title: "配信画像当て",
    icon: "🖼️",
    description: "配信画像を見てどの回か当てよう",
    path: "/quiz/image",
    questionCount: imageData.length,
  },
  {
    key: "cult",
    title: "カルトクイズ",
    icon: "🧠",
    description: "マニアック知識に挑戦",
    path: "/quiz/cult",
    questionCount: cultData.length,
  },
  {
    key: "lyrics-fill",
    title: "歌詞穴埋め",
    icon: "📝",
    description: "歌詞の空欄を埋めよう",
    path: "/quiz/lyrics-fill",
    questionCount: lyricsFillData.length,
  },
  {
    key: "lyrics-intro",
    title: "イントロ歌詞当て",
    icon: "🎵",
    description: "歌い出しから曲名を当てよう",
    path: "/quiz/lyrics-intro",
    questionCount: lyricsIntroData.length,
  },
  {
    key: "quotes",
    title: "一郎語録当て",
    icon: "💬",
    description: "名言の場面を当てよう",
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
            🐟 深海探査レベル測定
          </h1>
          <p className="text-base" style={{ color: "var(--text-sub)" }}>
            あなたの深海探査レベルは？
          </p>
        </div>

        {/* 遡行型遡上 - 最上部に単独配置 */}
        <div className="mb-8">
          <Link
            href="/quiz/archive"
            className="mode-card block w-full rounded-xl p-6 transition-all duration-200"
            style={{
              backgroundColor: "var(--bg-card)",
              border: "1px solid rgba(0, 212, 255, 0.3)",
              boxShadow: "0 0 15px rgba(0, 212, 255, 0.08)",
            }}
          >
            <div className="text-2xl">🔄</div>
            <h3
              className="text-lg font-bold mt-2"
              style={{ color: "var(--text-main)" }}
            >
              遡行型遡上
            </h3>
            <p
              className="text-sm mt-1"
              style={{ color: "var(--text-sub)" }}
            >
              アーカイブ配信から出題
            </p>
            <span
              className="inline-block mt-3 text-xs px-2 py-0.5 rounded-full"
              style={{
                backgroundColor: "rgba(0, 212, 255, 0.1)",
                color: "var(--accent)",
                border: "1px solid rgba(0, 212, 255, 0.2)",
                fontFamily: "Inter, monospace",
              }}
            >
              {archiveData.length}問
            </span>
          </Link>
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
          {/* PC: flex row equal width / Mobile: horizontal scroll */}
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-2 px-2 scrollbar-hide md:overflow-x-visible md:mx-0 md:px-0 md:pb-0">
            {individualModes.map((m) => (
              <Link
                key={m.key}
                href={m.path}
                className="mode-card block rounded-lg p-3 transition-all duration-200 flex-shrink-0 w-32 md:flex-1 md:w-auto md:min-w-0 snap-start"
                style={{
                  backgroundColor: "var(--bg-card)",
                  border: "1px solid var(--border)",
                }}
              >
                <div className="text-lg">{m.icon}</div>
                <h3
                  className="text-xs font-bold mt-1.5 truncate"
                  style={{ color: "var(--text-main)" }}
                >
                  {m.title}
                </h3>
                <p
                  className="mt-0.5 truncate"
                  style={{
                    color: "var(--text-sub)",
                    fontSize: "10px",
                    lineHeight: "1.4",
                  }}
                >
                  {m.description}
                </p>
                <span
                  className="inline-block mt-2 px-1.5 py-0.5 rounded-full"
                  style={{
                    fontSize: "10px",
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

        <div className="text-center mt-8 mb-4">
          <Link
            href="/intro/1"
            className="text-sm transition-colors duration-200"
            style={{ color: "#9ca3af" }}
            onMouseOver={(e) => {
              e.currentTarget.style.color = "var(--accent)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.color = "#9ca3af";
            }}
          >
            このサイトの原点を読み直す
          </Link>
        </div>
      </div>
    </div>
    <Footer />
    </div>
  );
}
