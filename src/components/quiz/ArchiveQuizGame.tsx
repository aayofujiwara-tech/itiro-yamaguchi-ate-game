"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import type { ArchiveQuizQuestion, ArchiveQuestionType } from "@/types/archive-quiz";
import PasswordGate from "./PasswordGate";
import QuizImage from "./QuizImage";
import QuizOptions from "./QuizOptions";
import QuizResult from "./QuizResult";
import QuizSummary from "./QuizSummary";
import OfficialLink from "./OfficialLink";
import Footer from "./Footer";

import archiveData from "@/data/archive-quiz.json";

const allQuestions = archiveData as ArchiveQuizQuestion[];

const DEFAULT_QUESTIONS: Record<ArchiveQuestionType, string> = {
  image: "この画像はどの配信回のものでしょう？",
  quote: "この発言があった配信回はどれでしょう？",
  description: "この内容の配信回はどれでしょう？",
  reverse: "この配信回で行われた内容はどれでしょう？",
};

const TYPE_LABELS: Record<ArchiveQuestionType, string> = {
  image: "📸 画像当て",
  quote: "💬 発言当て",
  description: "📝 説明文当て",
  reverse: "🔄 逆引き",
};

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function getQuestionCountOptions(total: number): number[] {
  const options = [5, 10, 15, 20].filter((n) => n < total);
  options.push(total);
  return [...new Set(options)];
}

export default function ArchiveQuizGame() {
  const [questionCount, setQuestionCount] = useState<number | null>(null);
  const [quizzes, setQuizzes] = useState<ArchiveQuizQuestion[]>([]);
  const [shuffledOptions, setShuffledOptions] = useState<string[][]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [finished, setFinished] = useState(false);
  const [fadeKey, setFadeKey] = useState(0);

  const totalQuestions = allQuestions.length;

  // Empty data handling
  if (totalQuestions === 0) {
    return (
      <PasswordGate>
        <div
          className="min-h-screen flex flex-col"
          style={{ backgroundColor: "var(--bg-primary)" }}
        >
          <div className="flex-1 flex flex-col items-center justify-center px-6">
            <p className="text-lg mb-2" style={{ color: "var(--text-sub)" }}>
              🔄 遡行型遡上
            </p>
            <p className="text-sm text-center mb-8" style={{ color: "#6b7280" }}>
              現在準備中です。問題が追加されるまでお待ちください。
            </p>
            <Link
              href="/"
              className="text-sm transition-colors duration-200"
              style={{ color: "var(--accent)" }}
            >
              ← モード選択に戻る
            </Link>
          </div>
          <Footer />
        </div>
      </PasswordGate>
    );
  }

  useEffect(() => {
    if (totalQuestions <= 5) {
      setQuestionCount(totalQuestions);
    }
  }, [totalQuestions]);

  const startGame = useCallback(
    (count: number) => {
      const shuffledItems = shuffleArray(allQuestions).slice(0, count);
      const options = shuffledItems.map((q) => shuffleArray(q.options));
      setQuizzes(shuffledItems);
      setShuffledOptions(options);
      setCurrentIndex(0);
      setScore(0);
      setAnswered(false);
      setSelectedOption(null);
      setIsCorrect(null);
      setFinished(false);
      setFadeKey((k) => k + 1);
    },
    [],
  );

  useEffect(() => {
    if (questionCount !== null) {
      startGame(questionCount);
    }
  }, [questionCount, startGame]);

  const initializeGame = useCallback(() => {
    if (questionCount !== null) {
      startGame(questionCount);
    }
  }, [questionCount, startGame]);

  const handleBackToSelect = () => {
    setQuestionCount(null);
    setQuizzes([]);
    setFinished(false);
  };

  const handleSelect = (option: string) => {
    if (answered) return;
    const correct = option === quizzes[currentIndex].answer;
    setSelectedOption(option);
    setIsCorrect(correct);
    setAnswered(true);
    if (correct) {
      setScore((s) => s + 1);
    }
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

  // Question count selection screen
  if (questionCount === null) {
    const countOptions = getQuestionCountOptions(totalQuestions);
    return (
      <PasswordGate>
        <div
          className="min-h-screen flex flex-col"
          style={{ backgroundColor: "var(--bg-primary)" }}
        >
          <div className="flex-1 flex flex-col items-center justify-center px-4 md:px-6">
            <div className="w-full max-w-sm md:max-w-lg text-center animate-fade-in">
              <div className="text-4xl mb-4">🔄</div>
              <h1
                className="text-2xl md:text-3xl font-bold mb-3"
                style={{ color: "var(--text-main)" }}
              >
                遡行型遡上
              </h1>
              <p
                className="text-sm md:text-base mb-8"
                style={{ color: "var(--text-sub)" }}
              >
                全{totalQuestions}問中、何問挑戦する？
              </p>
              <div className="grid grid-cols-2 gap-2.5 md:flex md:flex-wrap md:gap-3 md:justify-center mb-8">
                {countOptions.map((count, idx) => {
                  const isAll = idx === countOptions.length - 1;
                  const label = isAll ? `全${count}問` : `${count}問`;
                  return (
                    <button
                      key={count}
                      onClick={() => setQuestionCount(count)}
                      className="px-4 py-3.5 md:px-6 md:py-4 rounded-xl text-sm md:text-base font-medium transition-all duration-200 cursor-pointer min-h-[44px]"
                      style={{
                        backgroundColor: "var(--bg-card)",
                        color: "var(--text-main)",
                        border: "1px solid var(--border)",
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.borderColor = "var(--accent)";
                        e.currentTarget.style.boxShadow =
                          "0 0 12px rgba(0, 212, 255, 0.2)";
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.borderColor = "var(--border)";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
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
                ← モード選択に戻る
              </Link>
            </div>
          </div>
          <Footer />
        </div>
      </PasswordGate>
    );
  }

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
          hintUsedCount={0}
          onRestart={initializeGame}
          backHref="/"
          onBackToSelect={totalQuestions > 5 ? handleBackToSelect : undefined}
        />
      </PasswordGate>
    );
  }

  const currentQuiz = quizzes[currentIndex];
  const currentOptions = shuffledOptions[currentIndex] || currentQuiz.options;
  const questionText =
    currentQuiz.question || DEFAULT_QUESTIONS[currentQuiz.questionType];

  const renderQuestionContent = () => {
    return (
      <div className="mb-6">
        {/* Type tag */}
        <span
          className="inline-block text-xs px-3 py-1 rounded-full mb-4"
          style={{
            backgroundColor: "rgba(0, 212, 255, 0.1)",
            color: "var(--accent)",
            border: "1px solid rgba(0, 212, 255, 0.2)",
          }}
        >
          {TYPE_LABELS[currentQuiz.questionType]}
        </span>

        {/* Question text */}
        <p
          className="text-lg mb-4"
          style={{ color: "var(--text-main)" }}
        >
          {questionText}
        </p>

        {/* Type-specific content */}
        {currentQuiz.questionType === "image" && currentQuiz.imageKey && (
          <QuizImage
            imageId={currentQuiz.imageKey}
            questionNumber={currentIndex + 1}
          />
        )}

        {currentQuiz.questionType === "quote" && currentQuiz.quoteText && (
          <blockquote
            className="pl-4 py-2 mb-4 italic"
            style={{
              borderLeft: "2px solid var(--accent)",
              color: "#d1d5db",
            }}
          >
            「{currentQuiz.quoteText}」
          </blockquote>
        )}

        {currentQuiz.questionType === "description" &&
          currentQuiz.descriptionText && (
            <div
              className="rounded-lg p-4 mb-4 text-sm leading-relaxed"
              style={{
                backgroundColor: "var(--bg-card)",
                border: "1px solid var(--border)",
                color: "#d1d5db",
              }}
            >
              {currentQuiz.descriptionText}
            </div>
          )}

        {currentQuiz.questionType === "reverse" &&
          currentQuiz.reverseTitle && (
            <div
              className="rounded-lg p-4 mb-4 text-center"
              style={{
                backgroundColor: "var(--bg-card)",
                border: "1px solid var(--border)",
              }}
            >
              <p
                className="text-lg font-bold"
                style={{ color: "var(--accent)" }}
              >
                {currentQuiz.reverseTitle}
              </p>
              {currentQuiz.streamDate && (
                <p className="text-xs mt-1" style={{ color: "#6b7280" }}>
                  {currentQuiz.streamDate}
                </p>
              )}
            </div>
          )}
      </div>
    );
  };

  const renderPostAnswerContent = () => {
    return (
      <div className="space-y-3 animate-fade-in">
        {/* Explanation */}
        {currentQuiz.explanation && (
          <div
            className="text-sm px-4 py-3 rounded-md"
            style={{
              backgroundColor: "rgba(0, 212, 255, 0.05)",
              border: "1px solid rgba(0, 212, 255, 0.15)",
              color: "var(--text-sub)",
            }}
          >
            <span style={{ color: "var(--accent)" }} className="font-medium">
              解説:{" "}
            </span>
            {currentQuiz.explanation}
          </div>
        )}

        {/* YouTube archive link */}
        <a
          href={currentQuiz.youtubeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-xs md:text-sm px-4 py-3 rounded-md transition-colors duration-200 min-h-[44px]"
          style={{
            backgroundColor: "rgba(255, 0, 0, 0.05)",
            border: "1px solid rgba(255, 0, 0, 0.15)",
            color: "#f87171",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(255, 0, 0, 0.1)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(255, 0, 0, 0.05)";
          }}
        >
          📺 {currentQuiz.youtubeLabel || currentQuiz.streamTitle}
          {currentQuiz.streamDate && (
            <span className="text-xs" style={{ color: "#6b7280" }}>
              ({currentQuiz.streamDate})
            </span>
          )}
        </a>

        {/* Highlight comment */}
        {currentQuiz.highlight && (
          <div
            className="rounded-lg p-3"
            style={{
              backgroundColor: "var(--bg-card)",
              border: "1px solid var(--border)",
            }}
          >
            <p className="text-xs mb-1" style={{ color: "#6b7280" }}>
              💡 見どころ
            </p>
            <p className="text-sm" style={{ color: "#d1d5db" }}>
              {currentQuiz.highlight}
            </p>
          </div>
        )}

        {/* Official link */}
        <div className="flex justify-center">
          <OfficialLink
            href="https://sakanaction.jp"
            label="🐟 サカナクション公式"
          />
        </div>
      </div>
    );
  };

  return (
    <PasswordGate>
      <div
        className="min-h-screen flex flex-col"
        style={{ backgroundColor: "var(--bg-primary)" }}
      >
        <div className="flex-1 flex flex-col items-center px-4 py-6 md:px-6 md:py-8">
          <div className="w-full max-w-sm md:max-w-lg" key={fadeKey}>
            {/* Header */}
            <div className="flex items-center justify-between mb-4 md:mb-6 animate-fade-in">
              <div className="flex items-center gap-2 md:gap-3">
                <Link
                  href="/"
                  className="text-xs md:text-sm transition-colors duration-200 min-h-[44px] flex items-center"
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
                  className="text-base md:text-xl font-bold"
                  style={{ color: "var(--text-main)" }}
                >
                  遡行型遡上
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
              className="w-full h-1 rounded-full mb-4 md:mb-6 animate-fade-in"
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
            <div className="animate-fade-in">{renderQuestionContent()}</div>

            {/* Options */}
            <div
              className="animate-fade-in"
              style={{ animationDelay: "0.1s" }}
            >
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
