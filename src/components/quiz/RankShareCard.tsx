"use client";

import { useState } from "react";
import { getRank } from "@/data/ranks";

interface RankShareCardProps {
  scorePercent: number;
}

function isMobileDevice(): boolean {
  if (typeof window === "undefined") return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  ) || (navigator.maxTouchPoints > 0 && window.innerWidth < 768);
}

export default function RankShareCard({ scorePercent }: RankShareCardProps) {
  const rank = getRank(scorePercent);
  const [copied, setCopied] = useState(false);
  const [canNativeShare] = useState(() =>
    typeof navigator !== "undefined" && !!navigator.share && isMobileDevice()
  );

  const shareText = `🐟 深海探査レベル測定の結果\n\n${rank.emoji} ${rank.title}（${rank.depth}）\n${rank.description}\n\n正答率: ${scorePercent}%\n\n#深海探査レベル測定 #サカナクション`;

  const copyText = `🐟 深海探査レベル測定の結果\n\n${rank.emoji} ${rank.title}（${rank.depth}）\n${rank.description}\n\n正答率: ${scorePercent}%`;

  const handleNativeShare = async () => {
    try {
      await navigator.share({
        title: "深海探査レベル測定",
        text: shareText,
      });
    } catch {
      // User cancelled or share failed — ignore
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(copyText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API not available — ignore
    }
  };

  const handleTwitterShare = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
    window.open(twitterUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="mb-6">
      {/* Rank Card */}
      <div
        className="rounded-xl p-6 mb-4 text-center"
        style={{
          backgroundColor: "var(--bg-card)",
          border: "1px solid rgba(0, 212, 255, 0.4)",
        }}
      >
        <div className="text-4xl mb-2">{rank.emoji}</div>
        <div
          className="text-2xl font-bold mb-1"
          style={{ color: "var(--accent)" }}
        >
          {rank.title}
        </div>
        <div
          className="text-sm mb-2"
          style={{ color: "#9ca3af" }}
        >
          {rank.depth}（水深 {rank.depthRange}）
        </div>
        <p
          className="text-base italic"
          style={{ color: "#d1d5db" }}
        >
          {rank.description}
        </p>
      </div>

      {/* Share Buttons */}
      {canNativeShare ? (
        <button
          onClick={handleNativeShare}
          className="w-full py-3 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
          style={{
            backgroundColor: "var(--accent)",
            color: "#000",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
            <polyline points="16 6 12 2 8 6" />
            <line x1="12" y1="2" x2="12" y2="15" />
          </svg>
          シェアする
        </button>
      ) : (
        <div className="flex gap-3">
          <button
            onClick={handleTwitterShare}
            className="flex-1 py-3 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
            style={{
              backgroundColor: "#000",
              color: "#fff",
              border: "1px solid #333",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = "#1a1a1a";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "#000";
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            Xでシェア
          </button>
          <button
            onClick={handleCopy}
            className="flex-1 py-3 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
            style={{
              backgroundColor: "transparent",
              color: "var(--accent)",
              border: "1px solid var(--accent)",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(0, 212, 255, 0.1)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
            }}
          >
            {copied ? (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                コピーしました！
              </>
            ) : (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
                結果をコピー
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
