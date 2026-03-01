"use client";

import type { CultQuiz } from "@/types/quiz";

interface CultQuizQuestionProps {
  quiz: CultQuiz;
}

export default function CultQuizQuestion({ quiz }: CultQuizQuestionProps) {
  return (
    <div className="w-full mb-8">
      <span
        className="inline-block text-xs px-2 py-1 rounded-full mb-4"
        style={{
          backgroundColor: "rgba(0, 212, 255, 0.1)",
          color: "var(--accent)",
          border: "1px solid rgba(0, 212, 255, 0.2)",
        }}
      >
        {quiz.category}
      </span>
      <p
        className="text-lg md:text-xl font-medium leading-relaxed"
        style={{ color: "var(--text-main)" }}
      >
        {quiz.question}
      </p>
    </div>
  );
}
