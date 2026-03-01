"use client";

interface QuizHintProps {
  hint: string;
  showHint: boolean;
  hintUsed: boolean;
  answered: boolean;
  onShowHint: () => void;
}

export default function QuizHint({
  hint,
  showHint,
  hintUsed,
  answered,
  onShowHint,
}: QuizHintProps) {
  if (answered && !showHint) return null;

  return (
    <div className="w-full mb-6">
      {!showHint ? (
        <button
          onClick={onShowHint}
          disabled={hintUsed || answered}
          className="text-sm px-4 py-2 rounded-md transition-all duration-200"
          style={{
            color: hintUsed ? "var(--text-sub)" : "var(--accent)",
            backgroundColor: "transparent",
            border: `1px solid ${hintUsed ? "var(--border)" : "rgba(0, 212, 255, 0.3)"}`,
            cursor: hintUsed ? "default" : "pointer",
            opacity: hintUsed ? 0.5 : 1,
          }}
        >
          {hintUsed ? "ヒント使用済み" : "ヒントを見る（スコア半減）"}
        </button>
      ) : (
        <div
          className="animate-fade-in px-4 py-3 rounded-md text-sm"
          style={{
            backgroundColor: "rgba(0, 212, 255, 0.05)",
            border: "1px solid rgba(0, 212, 255, 0.2)",
            color: "var(--accent)",
          }}
        >
          <span className="font-medium mr-2">💡 ヒント:</span>
          {hint}
        </div>
      )}
    </div>
  );
}
