"use client";

import type { LyricsFill } from "@/types/quiz";

interface LyricsFillQuestionProps {
  quiz: LyricsFill;
  answered: boolean;
  isCorrect: boolean | null;
}

export default function LyricsFillQuestion({
  quiz,
  answered,
  isCorrect,
}: LyricsFillQuestionProps) {
  return (
    <div className="w-full mb-8">
      <p
        className="text-xs mb-6 tracking-wider uppercase"
        style={{
          color: "var(--text-sub)",
          fontFamily: "Inter, monospace",
        }}
      >
        {quiz.songTitle}
      </p>
      <p
        className="text-xl md:text-2xl font-medium leading-relaxed text-center"
        style={{ color: "var(--text-main)" }}
      >
        {quiz.lyricBefore}
        {answered && isCorrect !== null ? (
          <span
            className="mx-1 font-bold"
            style={{ color: isCorrect ? "var(--correct)" : "var(--accent)" }}
          >
            {quiz.blank}
          </span>
        ) : (
          <span
            className="mx-1 inline-block min-w-[4em] border-b-2 pb-1"
            style={{ borderColor: "var(--accent)" }}
          >
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </span>
        )}
        {quiz.lyricAfter}
      </p>
    </div>
  );
}
