"use client";

import { useState, useEffect } from "react";
import type { LyricsIntro } from "@/types/quiz";

interface LyricsIntroQuestionProps {
  quiz: LyricsIntro;
  answered: boolean;
}

export default function LyricsIntroQuestion({ quiz, answered }: LyricsIntroQuestionProps) {
  const [visibleChars, setVisibleChars] = useState(0);
  const chars = Array.from(quiz.lyricsHint);

  useEffect(() => {
    setVisibleChars(0);
    const timer = setInterval(() => {
      setVisibleChars((v) => {
        if (v >= chars.length) {
          clearInterval(timer);
          return v;
        }
        return v + 1;
      });
    }, 200);
    return () => clearInterval(timer);
  }, [quiz.id, chars.length]);

  return (
    <div className="w-full mb-8 text-center">
      <p
        className="text-sm mb-6"
        style={{ color: "var(--text-sub)" }}
      >
        {answered ? "この曲の歌い出しでした" : "この歌い出しの曲は？"}
      </p>
      <p
        className="text-3xl md:text-4xl font-bold tracking-wide"
        style={{
          color: "var(--text-main)",
          fontFamily: "'Noto Sans JP', sans-serif",
          minHeight: "3rem",
        }}
      >
        {chars.map((char, i) => (
          <span
            key={`${quiz.id}-${i}`}
            className="inline-block transition-opacity duration-300"
            style={{
              opacity: i < visibleChars ? 1 : 0,
              transform: i < visibleChars ? "translateY(0)" : "translateY(8px)",
              transition: "opacity 0.3s ease, transform 0.3s ease",
            }}
          >
            {char}
          </span>
        ))}
      </p>
    </div>
  );
}
