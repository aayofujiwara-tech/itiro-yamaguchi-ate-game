"use client";

import type { IchiroQuote } from "@/types/quiz";

interface QuoteQuestionProps {
  quiz: IchiroQuote;
  answered: boolean;
}

export default function QuoteQuestion({ quiz, answered }: QuoteQuestionProps) {
  return (
    <div className="w-full mb-8">
      <p
        className="text-sm mb-6 text-center"
        style={{ color: "var(--text-sub)" }}
      >
        この発言はどの場面？
      </p>
      <blockquote
        className="text-lg md:text-xl font-medium leading-relaxed text-center px-4 py-6 rounded-lg mb-4"
        style={{
          color: "var(--text-main)",
          backgroundColor: "var(--bg-card)",
          border: "1px solid var(--border)",
          borderLeft: "3px solid var(--accent)",
        }}
      >
        &ldquo;{quiz.quote}&rdquo;
      </blockquote>
      {answered && (
        <p
          className="text-xs text-center animate-fade-in"
          style={{ color: "var(--text-sub)" }}
        >
          出典: {quiz.source}
        </p>
      )}
    </div>
  );
}
