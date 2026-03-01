"use client";

import { useState } from "react";

interface QuizImageProps {
  imageUrl: string;
  questionNumber: number;
}

export default function QuizImage({ imageUrl, questionNumber }: QuizImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className="w-full flex justify-center mb-8">
      <div
        className="relative w-full overflow-hidden rounded-lg"
        style={{
          maxHeight: "60vh",
          backgroundColor: "var(--bg-card)",
          border: "1px solid var(--border)",
        }}
      >
        {!loaded && !error && (
          <div
            className="skeleton-loader w-full"
            style={{ aspectRatio: "16/9" }}
          />
        )}

        {error ? (
          <div
            className="flex flex-col items-center justify-center w-full"
            style={{
              aspectRatio: "16/9",
              backgroundColor: "var(--bg-card)",
              color: "var(--text-sub)",
            }}
          >
            <svg
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="mb-4 opacity-40"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
            <p className="text-sm">画像を読み込めませんでした</p>
            <p className="text-xs mt-1 opacity-60">Question {questionNumber}</p>
          </div>
        ) : (
          <img
            src={imageUrl}
            alt={`クイズ問題 ${questionNumber}`}
            className="w-full h-auto object-contain transition-opacity duration-300"
            style={{
              maxHeight: "60vh",
              opacity: loaded ? 1 : 0,
            }}
            onLoad={() => setLoaded(true)}
            onError={() => {
              setError(true);
              setLoaded(true);
            }}
          />
        )}
      </div>
    </div>
  );
}
