"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import type { QuizMode } from "@/types/quiz";
import PasswordGate from "./PasswordGate";
import QuizImage from "./QuizImage";
import QuizOptions from "./QuizOptions";
import QuizHint from "./QuizHint";
import QuizResult from "./QuizResult";
import QuizSummary from "./QuizSummary";
import CultQuizQuestion from "./CultQuizQuestion";
import LyricsFillQuestion from "./LyricsFillQuestion";
import LyricsIntroQuestion from "./LyricsIntroQuestion";
import QuoteQuestion from "./QuoteQuestion";
import SpotifyLink from "./SpotifyLink";
import OfficialLink from "./OfficialLink";
import Footer from "./Footer";

import imageData from "@/data/quizzes.json";
import cultData from "@/data/cult-quiz.json";
import lyricsFillData from "@/data/lyrics-fill.json";
import lyricsIntroData from "@/data/lyrics-intro.json";
import quotesData from "@/data/ichiro-quotes.json";

interface QuizItem {
  id: number;
  answer: string;
  options: string[];
  hint?: string;
  raw: Record<string, unknown>;
}

const MODE_TITLES: Record<QuizMode, string> = {
  image: "配信画像当て",
  cult: "カルトクイズ",
  "lyrics-fill": "歌詞穴埋め",
  "lyrics-intro": "イントロ歌詞当て",
  quotes: "一郎語録当て",
};

function loadQuizItems(mode: QuizMode): QuizItem[] {
  switch (mode) {
    case "image":
      return imageData.map((q) => ({
        id: q.id,
        answer: q.answer,
        options: q.options,
        hint: q.hint,
        raw: q as unknown as Record<string, unknown>,
      }));
    case "cult":
      return cultData.map((q) => ({
        id: q.id,
        answer: q.answer,
        options: q.options,
        raw: q as unknown as Record<string, unknown>,
      }));
    case "lyrics-fill":
      return lyricsFillData.map((q) => ({
        id: q.id,
        answer: q.blank,
        options: q.options,
        raw: q as unknown as Record<string, unknown>,
      }));
    case "lyrics-intro":
      return lyricsIntroData.map((q) => ({
        id: q.id,
        answer: q.answer,
        options: q.options,
        raw: q as unknown as Record<string, unknown>,
      }));
    case "quotes":
      return quotesData.map((q) => ({
        id: q.id,
        answer: q.answer,
        options: q.options,
        raw: q as unknown as Record<string, unknown>,
      }));
  }
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

interface QuizGameProps {
  mode: QuizMode;
}

export default function QuizGame({ mode }: QuizGameProps) {
  const [quizzes, setQuizzes] = useState<QuizItem[]>([]);
  const [shuffledOptions, setShuffledOptions] = useState<string[][]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [hintUsedCount, setHintUsedCount] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [hintUsed, setHintUsed] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [finished, setFinished] = useState(false);
  const [fadeKey, setFadeKey] = useState(0);

  const initializeGame = useCallback(() => {
    const items = loadQuizItems(mode);
    const shuffledItems = shuffleArray(items);
    const options = shuffledItems.map((q) => shuffleArray(q.options));
    setQuizzes(shuffledItems);
    setShuffledOptions(options);
    setCurrentIndex(0);
    setScore(0);
    setHintUsedCount(0);
    setAnswered(false);
    setSelectedOption(null);
    setIsCorrect(null);
    setHintUsed(false);
    setShowHint(false);
    setFinished(false);
    setFadeKey((k) => k + 1);
  }, [mode]);

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  const handleSelect = (option: string) => {
    if (answered) return;
    const correct = option === quizzes[currentIndex].answer;
    setSelectedOption(option);
    setIsCorrect(correct);
    setAnswered(true);
    if (correct) {
      setScore((s) => s + (hintUsed ? 0.5 : 1));
    }
  };

  const handleShowHint = () => {
    if (hintUsed || answered) return;
    setShowHint(true);
    setHintUsed(true);
    setHintUsedCount((c) => c + 1);
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
    setHintUsed(false);
    setShowHint(false);
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
    return (
      <PasswordGate>
        <QuizSummary
          score={score}
          total={quizzes.length}
          hintUsedCount={hintUsedCount}
          onRestart={initializeGame}
          backHref="/quiz"
        />
      </PasswordGate>
    );
  }

  const currentQuiz = quizzes[currentIndex];
  const currentOptions = shuffledOptions[currentIndex] || currentQuiz.options;
  const title = MODE_TITLES[mode];
  const hasHint = mode === "image" && currentQuiz.hint;
  const raw = currentQuiz.raw;

  const renderQuestion = () => {
    switch (mode) {
      case "image":
        return (
          <QuizImage
            imageUrl={raw.imageUrl as string}
            questionNumber={currentIndex + 1}
          />
        );
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
    const archiveUrl = raw.archiveUrl as string | undefined;

    switch (mode) {
      case "image":
        return (
          <div className="flex flex-wrap gap-2 justify-center animate-fade-in">
            {archiveUrl && (
              <OfficialLink href={archiveUrl} label="📺 この配信を観る" />
            )}
            <OfficialLink href="https://sakanaction.jp" label="🐟 サカナクション公式" />
          </div>
        );
      case "cult":
        return (
          <div className="space-y-3 animate-fade-in">
            <div
              className="text-sm px-4 py-3 rounded-md"
              style={{
                backgroundColor: "rgba(0, 212, 255, 0.05)",
                border: "1px solid rgba(0, 212, 255, 0.15)",
                color: "var(--text-sub)",
              }}
            >
              <span style={{ color: "var(--accent)" }} className="font-medium">解説: </span>
              {raw.explanation as string}
            </div>
            {renderSourceLink()}
            <div className="flex justify-center">
              <OfficialLink href="https://sakanaction.jp" label="🐟 サカナクション公式" />
            </div>
          </div>
        );
      case "lyrics-fill":
        return (
          <div className="flex flex-wrap gap-2 justify-center animate-fade-in">
            <SpotifyLink songTitle={raw.songTitle as string} />
            <OfficialLink href="https://sakanaction.jp" label="🐟 サカナクション公式" />
          </div>
        );
      case "lyrics-intro":
        return (
          <div className="text-center space-y-3 animate-fade-in">
            <p
              className="text-xl font-bold"
              style={{ color: "var(--text-main)" }}
            >
              {raw.answer as string}
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              <SpotifyLink songTitle={raw.answer as string} />
              <OfficialLink href="https://sakanaction.jp" label="🐟 サカナクション公式" />
            </div>
          </div>
        );
      case "quotes": {
        const category = raw.category as string;
        return (
          <div className="space-y-3 animate-fade-in">
            <div
              className="text-sm px-4 py-3 rounded-md"
              style={{
                backgroundColor: "rgba(0, 212, 255, 0.05)",
                border: "1px solid rgba(0, 212, 255, 0.15)",
                color: "var(--text-sub)",
              }}
            >
              <span style={{ color: "var(--accent)" }} className="font-medium">解説: </span>
              {raw.explanation as string}
            </div>
            <p
              className="text-xs text-center"
              style={{ color: "var(--text-sub)" }}
            >
              出典: {raw.source as string}
            </p>
            {renderSourceLink()}
            <div className="flex flex-wrap gap-2 justify-center">
              {category === "サカナLOCKS!" && (
                <OfficialLink href="https://www.tfm.co.jp/lock/sakana/" label="📻 サカナLOCKS!" />
              )}
            </div>
          </div>
        );
      }
      default:
        return null;
    }
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
                href="/quiz"
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
                {title}
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
            className="w-full h-1 rounded-full mb-8 animate-fade-in"
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

          {/* Question area */}
          <div className="animate-fade-in">
            {renderQuestion()}
          </div>

          {/* Hint (image mode only) */}
          {hasHint && (
            <div className="animate-fade-in">
              <QuizHint
                hint={currentQuiz.hint!}
                showHint={showHint}
                hintUsed={hintUsed}
                answered={answered}
                onShowHint={handleShowHint}
              />
            </div>
          )}

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
