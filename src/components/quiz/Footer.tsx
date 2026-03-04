"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer
      className="w-full py-4 md:py-6 px-4 text-center"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <div className="max-w-2xl mx-auto space-y-1.5 md:space-y-3">
        <p className="text-[10px] md:text-xs" style={{ color: "var(--text-sub)" }}>
          ⚠️ 非公式ファンプロジェクト｜非営利・無広告
        </p>
        <p className="text-[10px] md:text-xs leading-relaxed" style={{ color: "var(--text-sub)" }}>
          本ゲームはサカナクション / Hip Land Music / NF / Victor Entertainment
          とは一切関係がありません。
          <br />
          広告・課金・アフィリエイト等を含む一切の収益化を行いません。
          <br />
          権利者様からの要請があった場合、速やかに公開を停止します。
        </p>
        <div
          className="flex items-center justify-center gap-4 text-[10px] md:text-xs flex-wrap"
        >
          <Link
            href="/quiz/disclaimer"
            className="footer-link transition-colors duration-200"
            style={{ color: "#9ca3af" }}
          >
            免責事項
          </Link>
          <a
            href="https://sakanaction.jp"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link transition-colors duration-200"
            style={{ color: "#9ca3af" }}
          >
            サカナクション公式
          </a>
        </div>
      </div>
    </footer>
  );
}
