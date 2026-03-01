"use client";

import Link from "next/link";

interface QuizSummaryProps {
  score: number;
  total: number;
  hintUsedCount: number;
  onRestart: () => void;
  backHref?: string;
}

export default function QuizSummary({
  score,
  total,
  hintUsedCount,
  onRestart,
  backHref,
}: QuizSummaryProps) {
  const percentage = Math.round((score / total) * 100);

  const getMessage = () => {
    if (percentage === 100) return "パーフェクト！完璧です！";
    if (percentage >= 80) return "素晴らしい！よく知っていますね！";
    if (percentage >= 60) return "なかなかの結果です！";
    if (percentage >= 40) return "もう少し頑張りましょう！";
    return "次はきっとうまくいきます！";
  };

  const getScoreColor = () => {
    if (percentage >= 80) return "var(--correct)";
    if (percentage >= 50) return "var(--accent)";
    return "var(--incorrect)";
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      <div className="max-w-md w-full text-center animate-fade-in">
        <h2
          className="text-3xl font-bold mb-8"
          style={{ color: "var(--text-main)" }}
        >
          クイズ結果
        </h2>

        <div
          className="rounded-xl p-8 mb-8"
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
            正答率 {percentage}%
          </div>
          {hintUsedCount > 0 && (
            <div
              className="text-sm mb-4"
              style={{ color: "var(--text-sub)" }}
            >
              ヒント使用: {hintUsedCount}回
            </div>
          )}
          <p
            className="text-base"
            style={{ color: "var(--text-main)" }}
          >
            {getMessage()}
          </p>
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

          {backHref && (
            <Link
              href={backHref}
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
          )}
        </div>
      </div>
    </div>
  );
}
