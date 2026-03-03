"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { introPages } from "@/data/intro-content";

const TOTAL_PAGES = 4;

function setIntroRead() {
  document.cookie = "intro_read=1; path=/; max-age=31536000";
}

export default function IntroPage() {
  const router = useRouter();
  const params = useParams();
  const pageNum = Number(params.page);
  const [visibleParagraphs, setVisibleParagraphs] = useState<number[]>([]);
  const [fadeOut, setFadeOut] = useState(false);

  const isValid = pageNum >= 1 && pageNum <= TOTAL_PAGES && !isNaN(pageNum);
  const currentPage = isValid ? introPages[pageNum - 1] : null;
  const isLastPage = pageNum === TOTAL_PAGES;

  useEffect(() => {
    if (!isValid) {
      router.replace("/intro/1");
      return;
    }

    setVisibleParagraphs([]);
    setFadeOut(false);

    const timers: ReturnType<typeof setTimeout>[] = [];
    currentPage!.paragraphs.forEach((_, index) => {
      timers.push(
        setTimeout(() => {
          setVisibleParagraphs((prev) => [...prev, index]);
        }, 300 * (index + 1))
      );
    });

    return () => timers.forEach(clearTimeout);
  }, [pageNum, isValid]);

  const navigateWithFade = useCallback(
    (to: string) => {
      setFadeOut(true);
      setTimeout(() => router.push(to), 400);
    },
    [router]
  );

  const handleNext = useCallback(() => {
    if (isLastPage) {
      setIntroRead();
      navigateWithFade("/");
    } else {
      navigateWithFade(`/intro/${pageNum + 1}`);
    }
  }, [isLastPage, pageNum, navigateWithFade]);

  const handleSkip = useCallback(() => {
    setIntroRead();
    navigateWithFade("/");
  }, [navigateWithFade]);

  if (!isValid || !currentPage) {
    return null;
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 py-12"
      style={{ backgroundColor: "#000" }}
    >
      <div
        className={`max-w-md w-full transition-opacity duration-400 ${
          fadeOut ? "opacity-0" : "opacity-100"
        }`}
      >
        {/* Page number */}
        <p className="text-xs mb-8" style={{ color: "#6b7280" }}>
          {pageNum} / {TOTAL_PAGES}
        </p>

        {/* Paragraphs */}
        <div className="space-y-6 mb-12">
          {currentPage.paragraphs.map((paragraph, index) => (
            <p
              key={`${pageNum}-${index}`}
              className="text-base leading-loose whitespace-pre-line transition-opacity duration-700"
              style={{
                color:
                  pageNum === 4 && index === 4
                    ? "var(--accent)"
                    : "#e5e7eb",
                fontWeight: pageNum === 4 && index === 4 ? 500 : 400,
                opacity: visibleParagraphs.includes(index) ? 1 : 0,
              }}
            >
              {paragraph}
            </p>
          ))}
        </div>

        {/* Buttons */}
        <div className="space-y-4">
          <button
            onClick={handleNext}
            className="w-full py-3 rounded-lg font-bold transition-colors duration-200 cursor-pointer"
            style={{
              backgroundColor: "var(--accent)",
              color: "#000",
            }}
          >
            {isLastPage ? "クイズへ進む \u2192" : "次へ \u2192"}
          </button>

          {!isLastPage && (
            <button
              onClick={handleSkip}
              className="w-full py-2 text-xs transition-colors duration-200 cursor-pointer"
              style={{
                color: "#6b7280",
                backgroundColor: "transparent",
                border: "none",
              }}
            >
              導入をスキップしてクイズへ
            </button>
          )}
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {[1, 2, 3, 4].map((n) => (
            <div
              key={n}
              className="w-2 h-2 rounded-full"
              style={{
                backgroundColor:
                  n === pageNum ? "var(--accent)" : "#4b5563",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
