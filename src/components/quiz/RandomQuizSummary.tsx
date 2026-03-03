"use client";

import Link from "next/link";
import type { RandomQuizType, RandomDifficulty, CategoryScore } from "@/types/quiz";
import Footer from "./Footer";
import RankShareCard from "./RankShareCard";

const QUIZ_TYPE_LABELS: Record<RandomQuizType, { icon: string; label: string }> = {
  cult: { icon: "🧠", label: "カルトクイズ" },
  "lyrics-fill": { icon: "📝", label: "歌詞穴埋め" },
  "lyrics-intro": { icon: "🎵", label: "イントロ歌詞当て" },
  quotes: { icon: "💬", label: "一郎語録" },
  archive: { icon: "🔄", label: "遡行型遡上" },
};

const DIFFICULTY_LABELS: Record<RandomDifficulty, string> = {
  easy: "表層：マイワシ級",
  medium: "漸深層：ダイオウイカ級",
  hard: "深海層：シンカイクサウオ級",
};

interface RandomQuizSummaryProps {
  score: number;
  total: number;
  categoryScores: CategoryScore[];
  difficulty: RandomDifficulty;
  onRestart: () => void;
}

export default function RandomQuizSummary({
  score,
  total,
  categoryScores,
  difficulty,
  onRestart,
}: RandomQuizSummaryProps) {
  const percentage = total > 0 ? score / total : 0;

  const getMessage = () => {
    const pct = Math.round(percentage * 100);
    if (pct === 100) return "パーフェクト！完璧です！";
    if (pct >= 80) return "素晴らしい！よく知っていますね！";
    if (pct >= 60) return "なかなかの結果です！";
    if (pct >= 40) return "もう少し頑張りましょう！";
    return "次はきっとうまくいきます！";
  };

  const getScoreColor = () => {
    const pct = Math.round(percentage * 100);
    if (pct >= 80) return "var(--correct)";
    if (pct >= 50) return "var(--accent)";
    return "var(--incorrect)";
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="max-w-md w-full text-center animate-fade-in">
          <h2
            className="text-3xl font-bold mb-8"
            style={{ color: "var(--text-main)" }}
          >
            🎲 探査結果（{DIFFICULTY_LABELS[difficulty]}）
          </h2>

          <div
            className="rounded-xl p-8 mb-6"
            style={{
              backgroundColor: "var(--bg-card)",
              border: "1px solid var(--border)",
            }}
          >
            <div
              className="text-6xl font-bold mb-2"
              style={{
                color: getScoreColor(),
                fontFamily: "Inter, monospace",
              }}
            >
              {score}
              <span className="text-2xl" style={{ color: "var(--text-sub)" }}>
                /{total}
              </span>
            </div>
            <div
              className="text-lg mb-4"
              style={{
                color: "var(--text-sub)",
                fontFamily: "Inter, monospace",
              }}
            >
              正答率 {Math.round(percentage * 100)}%
            </div>
            <p
              className="text-base"
              style={{ color: "var(--text-main)" }}
            >
              {getMessage()}
            </p>
          </div>

          <RankShareCard scorePercent={Math.round(percentage * 100)} />

          {/* カテゴリ別成績 */}
          <div
            className="rounded-xl p-6 mb-8 text-left"
            style={{
              backgroundColor: "var(--bg-card)",
              border: "1px solid var(--border)",
            }}
          >
            <p
              className="text-sm font-bold mb-4"
              style={{ color: "var(--text-main)" }}
            >
              📊 カテゴリ別成績
            </p>
            <div className="space-y-3">
              {categoryScores.map((cs) => {
                const info = QUIZ_TYPE_LABELS[cs.quizType];
                return (
                  <div
                    key={cs.quizType}
                    className="flex items-center justify-between"
                  >
                    <span
                      className="text-sm"
                      style={{ color: "var(--text-sub)" }}
                    >
                      {info.icon} {info.label}
                    </span>
                    <span
                      className="text-sm font-medium"
                      style={{
                        color: "var(--text-main)",
                        fontFamily: "Inter, monospace",
                      }}
                    >
                      {cs.correct}/{cs.total}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={onRestart}
              className="w-full py-4 rounded-lg text-lg font-medium transition-all duration-200 cursor-pointer"
              style={{
                backgroundColor: "transparent",
                color: "var(--accent)",
                border: "1px solid var(--accent)",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(0, 212, 255, 0.1)";
                e.currentTarget.style.boxShadow =
                  "0 0 20px rgba(0, 212, 255, 0.3)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              もう一度挑戦する
            </button>

            <Link
              href="/"
              className="block w-full py-3 rounded-lg text-sm font-medium text-center transition-all duration-200"
              style={{
                color: "var(--text-sub)",
                border: "1px solid var(--border)",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.color = "var(--text-main)";
                e.currentTarget.style.borderColor = "var(--text-sub)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.color = "var(--text-sub)";
                e.currentTarget.style.borderColor = "var(--border)";
              }}
            >
              モード選択に戻る
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
