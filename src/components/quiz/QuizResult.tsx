"use client";

interface QuizResultProps {
  isCorrect: boolean;
  correctAnswer: string;
  onNext: () => void;
  isLast: boolean;
  children?: React.ReactNode;
}

export default function QuizResult({
  isCorrect,
  correctAnswer,
  onNext,
  isLast,
  children,
}: QuizResultProps) {
  return (
    <div className="w-full animate-fade-in">
      <div
        className="text-center py-4 mb-4 rounded-lg"
        style={{
          backgroundColor: isCorrect
            ? "rgba(0, 255, 136, 0.08)"
            : "rgba(255, 68, 68, 0.08)",
          border: `1px solid ${isCorrect ? "rgba(0, 255, 136, 0.2)" : "rgba(255, 68, 68, 0.2)"}`,
        }}
      >
        <p
          className="text-2xl font-bold mb-1"
          style={{ color: isCorrect ? "var(--correct)" : "var(--incorrect)" }}
        >
          {isCorrect ? "正解！" : "残念！"}
        </p>
        {!isCorrect && (
          <p className="text-sm" style={{ color: "var(--text-sub)" }}>
            正解は{" "}
            <span style={{ color: "var(--correct)" }}>{correctAnswer}</span>
          </p>
        )}
      </div>

      {children && <div className="mb-4">{children}</div>}

      <button
        onClick={onNext}
        className="w-full py-3 rounded-lg text-base font-medium transition-all duration-200 cursor-pointer"
        style={{
          backgroundColor: "transparent",
          color: "var(--accent)",
          border: "1px solid var(--accent)",
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = "rgba(0, 212, 255, 0.1)";
          e.currentTarget.style.boxShadow = "0 0 15px rgba(0, 212, 255, 0.2)";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = "transparent";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        {isLast ? "結果を見る" : "次の問題へ"}
      </button>
    </div>
  );
}
