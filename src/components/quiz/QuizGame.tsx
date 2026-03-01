"use client";

import { useState, useEffect, useCallback } from "react";
import type { Quiz } from "@/types/quiz";
import quizData from "@/data/quizzes.json";
import QuizImage from "./QuizImage";
import QuizOptions from "./QuizOptions";
import QuizHint from "./QuizHint";
import QuizResult from "./QuizResult";
import QuizSummary from "./QuizSummary";

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function QuizGame() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
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
    const shuffledQuizzes = shuffleArray(quizData as Quiz[]);
    const options = shuffledQuizzes.map((q) => shuffleArray(q.options));
    setQuizzes(shuffledQuizzes);
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
  }, []);

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
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "var(--bg-primary)" }}
      >
        <div className="skeleton-loader w-16 h-16 rounded-full" />
      </div>
    );
  }

  if (finished) {
    return (
      <QuizSummary
        score={score}
        total={quizzes.length}
        hintUsedCount={hintUsedCount}
        onRestart={initializeGame}
      />
    );
  }

  const currentQuiz = quizzes[currentIndex];
  const currentOptions = shuffledOptions[currentIndex] || currentQuiz.options;

  return (
    <div
      className="min-h-screen flex flex-col items-center px-4 py-8 md:py-12"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      <div className="w-full max-w-2xl" key={fadeKey}>
        {/* Header */}
        <div className="flex items-center justify-between mb-6 animate-fade-in">
          <h1
            className="text-lg md:text-xl font-bold"
            style={{ color: "var(--text-main)" }}
          >
            配信画像当てクイズ
          </h1>
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

        {/* Quiz image */}
        <div className="animate-fade-in">
          <QuizImage
            imageUrl={currentQuiz.imageUrl}
            questionNumber={currentIndex + 1}
          />
        </div>

        {/* Hint */}
        <div className="animate-fade-in">
          <QuizHint
            hint={currentQuiz.hint}
            showHint={showHint}
            hintUsed={hintUsed}
            answered={answered}
            onShowHint={handleShowHint}
          />
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
          />
        )}
      </div>
    </div>
  );
}
