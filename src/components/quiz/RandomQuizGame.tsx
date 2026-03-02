"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import type { RandomQuizType, RandomDifficulty, RandomQuizItem, CategoryScore } from "@/types/quiz";
import PasswordGate from "./PasswordGate";
import QuizOptions from "./QuizOptions";
import QuizResult from "./QuizResult";
import RandomQuizSummary from "./RandomQuizSummary";
import CultQuizQuestion from "./CultQuizQuestion";
import LyricsFillQuestion from "./LyricsFillQuestion";
import LyricsIntroQuestion from "./LyricsIntroQuestion";
import QuoteQuestion from "./QuoteQuestion";
import SpotifyLink from "./SpotifyLink";
import Footer from "./Footer";

import cultData from "@/data/cult-quiz.json";
import lyricsFillData from "@/data/lyrics-fill.json";
import lyricsIntroData from "@/data/lyrics-intro.json";
import quotesData from "@/data/ichiro-quotes.json";

const QUIZ_TYPE_LABELS: Record<RandomQuizType, { icon: string; label: string }> = {
  cult: { icon: "🧠", label: "カルトクイズ" },
  "lyrics-fill": { icon: "📝", label: "歌詞穴埋め" },
  "lyrics-intro": { icon: "🎵", label: "イントロ歌詞当て" },
  quotes: { icon: "💬", label: "一郎語録当て" },
};

const DIFFICULTY_LABELS: Record<RandomDifficulty, string> = {
  easy: "浅瀬",
  medium: "中層",
  hard: "深海",
};

const MAX_QUESTIONS = 10;

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function loadRandomQuizItems(difficulty: RandomDifficulty): RandomQuizItem[] {
  const items: RandomQuizItem[] = [];

  for (const q of cultData) {
    if (q.difficulty === difficulty) {
      items.push({
        quizType: "cult",
        id: q.id,
        answer: q.answer,
        options: q.options,
        raw: q as unknown as Record<string, unknown>,
      });
    }
  }

  for (const q of lyricsFillData) {
    if (q.difficulty === difficulty) {
      items.push({
        quizType: "lyrics-fill",
        id: q.id,
        answer: q.blank,
        options: q.options,
        raw: q as unknown as Record<string, unknown>,
      });
    }
  }

  for (const q of lyricsIntroData) {
    if (q.difficulty === difficulty) {
      items.push({
        quizType: "lyrics-intro",
        id: q.id,
        answer: q.answer,
        options: q.options,
        raw: q as unknown as Record<string, unknown>,
      });
    }
  }

  for (const q of quotesData) {
    if (q.difficulty === difficulty) {
      items.push({
        quizType: "quotes",
        id: q.id,
        answer: q.answer,
        options: q.options,
        raw: q as unknown as Record<string, unknown>,
      });
    }
  }

  const shuffled = shuffleArray(items);
  return shuffled.slice(0, MAX_QUESTIONS);
}

interface RandomQuizGameProps {
  difficulty: RandomDifficulty;
}

export default function RandomQuizGame({ difficulty }: RandomQuizGameProps) {
  const [quizzes, setQuizzes] = useState<RandomQuizItem[]>([]);
  const [shuffledOptions, setShuffledOptions] = useState<string[][]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [finished, setFinished] = useState(false);
  const [fadeKey, setFadeKey] = useState(0);
  const [results, setResults] = useState<{ quizType: RandomQuizType; correct: boolean }[]>([]);

  const initializeGame = useCallback(() => {
    const items = loadRandomQuizItems(difficulty);
    const options = items.map((q) => shuffleArray(q.options));
    setQuizzes(items);
    setShuffledOptions(options);
    setCurrentIndex(0);
    setAnswered(false);
    setSelectedOption(null);
    setIsCorrect(null);
    setFinished(false);
    setFadeKey((k) => k + 1);
    setResults([]);
  }, [difficulty]);

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  const handleSelect = (option: string) => {
    if (answered) return;
    const correct = option === quizzes[currentIndex].answer;
    setSelectedOption(option);
    setIsCorrect(correct);
    setAnswered(true);
    setResults((prev) => [
      ...prev,
      { quizType: quizzes[currentIndex].quizType, correct },
    ]);
  };

  const handleNext = () => {
    if (currentIndex + 1 >= quizzes.length) {
      setFinished(true);
      return;
    }
    setCurrentIndex((i) => i + 1);
    setAnswered(false);
    setSelectedOption(null);
    setIsCorrect(null);
    setFadeKey((k) => k + 1);
  };

  if (quizzes.length === 0) {
    return (
      <PasswordGate>
        <div
          className="min-h-screen flex flex-col"
          style={{ backgroundColor: "var(--bg-primary)" }}
        >
          <div className="flex-1 flex items-center justify-center">
            <div className="skeleton-loader w-16 h-16 rounded-full" />
          </div>
          <Footer />
        </div>
      </PasswordGate>
    );
  }

  if (finished) {
    const categoryScores: CategoryScore[] = [];
    const typeMap = new Map<RandomQuizType, { correct: number; total: number }>();
    for (const r of results) {
      const entry = typeMap.get(r.quizType) || { correct: 0, total: 0 };
      entry.total += 1;
      if (r.correct) entry.correct += 1;
      typeMap.set(r.quizType, entry);
    }
    for (const [quizType, counts] of typeMap) {
      categoryScores.push({ quizType, ...counts });
    }

    const totalCorrect = results.filter((r) => r.correct).length;

    return (
      <PasswordGate>
        <RandomQuizSummary
          score={totalCorrect}
          total={quizzes.length}
          categoryScores={categoryScores}
          difficulty={difficulty}
          onRestart={initializeGame}
        />
      </PasswordGate>
    );
  }

  const currentQuiz = quizzes[currentIndex];
  const currentOptions = shuffledOptions[currentIndex] || currentQuiz.options;
  const raw = currentQuiz.raw;
  const typeInfo = QUIZ_TYPE_LABELS[currentQuiz.quizType];

  const renderQuestion = () => {
    switch (currentQuiz.quizType) {
      case "cult":
        return (
          <CultQuizQuestion
            quiz={{
              id: raw.id as number,
              question: raw.question as string,
              answer: raw.answer as string,
              options: raw.options as string[],
              category: raw.category as string,
              difficulty: raw.difficulty as string,
              explanation: raw.explanation as string,
            }}
          />
        );
      case "lyrics-fill":
        return (
          <LyricsFillQuestion
            quiz={{
              id: raw.id as number,
              songTitle: raw.songTitle as string,
              lyricBefore: raw.lyricBefore as string,
              blank: raw.blank as string,
              lyricAfter: raw.lyricAfter as string,
              options: raw.options as string[],
              difficulty: raw.difficulty as string,
            }}
            answered={answered}
            isCorrect={isCorrect}
          />
        );
      case "lyrics-intro":
        return (
          <LyricsIntroQuestion
            quiz={{
              id: raw.id as number,
              lyricsHint: raw.lyricsHint as string,
              answer: raw.answer as string,
              options: raw.options as string[],
              hintLength: raw.hintLength as number,
              difficulty: raw.difficulty as string,
            }}
            answered={answered}
          />
        );
      case "quotes":
        return (
          <QuoteQuestion
            quiz={{
              id: raw.id as number,
              quote: raw.quote as string,
              answer: raw.answer as string,
              options: raw.options as string[],
              source: raw.source as string,
              category: raw.category as string,
              difficulty: raw.difficulty as string,
              explanation: raw.explanation as string,
            }}
            answered={answered}
          />
        );
    }
  };

  const renderSourceLink = () => {
    const sourceUrl = raw.sourceUrl as string | undefined;
    const sourceLabel = raw.sourceLabel as string | undefined;
    if (!sourceUrl || !sourceLabel) return null;
    return (
      <p className="text-xs text-center">
        <a
          href={sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors duration-200"
          style={{ color: "#9ca3af" }}
          onMouseOver={(e) => { e.currentTarget.style.color = "var(--accent)"; }}
          onMouseOut={(e) => { e.currentTarget.style.color = "#9ca3af"; }}
        >
          📖 出典: {sourceLabel}
        </a>
      </p>
    );
  };

  const renderPostAnswerContent = () => {
    const relatedSong = raw.relatedSong as string | null | undefined;
    const contributor = raw.contributor as string | null | undefined;
    const explanation = raw.explanation as string | undefined;
    const quizType = currentQuiz.quizType;

    // Determine Spotify song title based on quiz type
    let spotifySong: string | null = null;
    if (quizType === "lyrics-fill") {
      spotifySong = raw.songTitle as string;
    } else if (quizType === "lyrics-intro") {
      spotifySong = raw.answer as string;
    } else if (relatedSong) {
      spotifySong = relatedSong;
    }

    return (
      <div className="space-y-3 animate-fade-in">
        {/* 1. 解説 */}
        {explanation && (
          <div
            className="text-sm px-4 py-3 rounded-md"
            style={{
              backgroundColor: "rgba(0, 212, 255, 0.05)",
              border: "1px solid rgba(0, 212, 255, 0.15)",
              color: "var(--text-sub)",
            }}
          >
            <span style={{ color: "var(--accent)" }} className="font-medium">解説: </span>
            {explanation}
          </div>
        )}

        {/* 2. Spotify */}
        {spotifySong && (
          <div className="flex justify-center">
            <SpotifyLink songTitle={spotifySong} />
          </div>
        )}

        {/* 3. 出典 */}
        {renderSourceLink()}

        {/* 4. 問題提供者 */}
        {contributor && (
          <p className="text-xs text-center" style={{ color: "var(--text-sub)", opacity: 0.7 }}>
            📸 問題提供: {contributor}
          </p>
        )}
      </div>
    );
  };

  return (
    <PasswordGate>
      <div
        className="min-h-screen flex flex-col"
        style={{ backgroundColor: "var(--bg-primary)" }}
      >
      <div className="flex-1 flex flex-col items-center px-4 py-8 md:py-12">
        <div className="w-full max-w-2xl" key={fadeKey}>
          {/* Header */}
          <div className="flex items-center justify-between mb-6 animate-fade-in">
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="text-sm transition-colors duration-200"
                style={{ color: "var(--text-sub)" }}
                onMouseOver={(e) => {
                  e.currentTarget.style.color = "var(--accent)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.color = "var(--text-sub)";
                }}
              >
                ← 戻る
              </Link>
              <h1
                className="text-lg md:text-xl font-bold"
                style={{ color: "var(--text-main)" }}
              >
                🎲 深海探査（{DIFFICULTY_LABELS[difficulty]}）
              </h1>
            </div>
            <div
              className="text-sm"
              style={{
                color: "var(--text-sub)",
                fontFamily: "Inter, monospace",
              }}
            >
              {currentIndex + 1} / {quizzes.length}
            </div>
          </div>

          {/* Progress bar */}
          <div
            className="w-full h-1 rounded-full mb-6 animate-fade-in"
            style={{ backgroundColor: "var(--border)" }}
          >
            <div
              className="h-full rounded-full transition-all duration-500 ease-out"
              style={{
                width: `${((currentIndex + 1) / quizzes.length) * 100}%`,
                backgroundColor: "var(--accent)",
                boxShadow: "0 0 8px rgba(0, 212, 255, 0.4)",
              }}
            />
          </div>

          {/* Category tag */}
          <div className="mb-4 animate-fade-in">
            <span
              className="inline-block text-xs px-3 py-1 rounded-full"
              style={{
                backgroundColor: "rgba(0, 212, 255, 0.1)",
                color: "var(--accent)",
                border: "1px solid rgba(0, 212, 255, 0.2)",
              }}
            >
              {typeInfo.icon} {typeInfo.label}
            </span>
          </div>

          {/* Question area */}
          <div className="animate-fade-in">
            {renderQuestion()}
          </div>

          {/* Options */}
          <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <QuizOptions
              options={currentOptions}
              selectedOption={selectedOption}
              correctAnswer={currentQuiz.answer}
              answered={answered}
              onSelect={handleSelect}
            />
          </div>

          {/* Result */}
          {answered && isCorrect !== null && (
            <QuizResult
              isCorrect={isCorrect}
              correctAnswer={currentQuiz.answer}
              onNext={handleNext}
              isLast={currentIndex + 1 >= quizzes.length}
            >
              {renderPostAnswerContent()}
            </QuizResult>
          )}
        </div>
      </div>
      <Footer />
      </div>
    </PasswordGate>
  );
}
