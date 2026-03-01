import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/quiz/Footer";

export const metadata: Metadata = {
  title: "免責事項 | サカナクション検定",
  description: "サカナクション検定の免責事項ページです。",
};

export default function DisclaimerPage() {
  const contactEmail =
    process.env.NEXT_PUBLIC_CONTACT_EMAIL || "未設定";

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      <div className="flex-1 px-4 py-12 md:py-16">
        <div className="max-w-2xl mx-auto animate-fade-in">
          <h1
            className="text-2xl md:text-3xl font-bold mb-10"
            style={{ color: "var(--text-main)" }}
          >
            サカナクション検定 — 免責事項
          </h1>

          <section className="mb-8">
            <h2
              className="text-base font-bold mb-3"
              style={{ color: "var(--accent)" }}
            >
              ■ 本サイトについて
            </h2>
            <div
              className="text-sm leading-relaxed space-y-2"
              style={{ color: "#d1d5db" }}
            >
              <p>
                本サイト「サカナクション検定」は、ファンが個人で制作した非公式・非営利のクイズゲームです。
              </p>
              <p>以下の団体・企業とは一切の関係がありません:</p>
              <ul className="list-disc list-inside pl-2 space-y-1" style={{ color: "var(--text-sub)" }}>
                <li>サカナクション</li>
                <li>Hip Land Music Corporation</li>
                <li>NF LLC</li>
                <li>株式会社JVCケンウッド・ビクターエンタテインメント</li>
                <li>TOKYO FM / SCHOOL OF LOCK!</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2
              className="text-base font-bold mb-3"
              style={{ color: "var(--accent)" }}
            >
              ■ 収益化について
            </h2>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "#d1d5db" }}
            >
              本サイトでは広告の掲載、課金、アフィリエイトリンク等を含む一切の収益化を行っておらず、今後も行う予定はありません。
            </p>
          </section>

          <section className="mb-8">
            <h2
              className="text-base font-bold mb-3"
              style={{ color: "var(--accent)" }}
            >
              ■ 著作権・肖像権について
            </h2>
            <div
              className="text-sm leading-relaxed space-y-2"
              style={{ color: "#d1d5db" }}
            >
              <p>
                本サイトで使用している画像・テキスト情報に関する著作権・肖像権は、それぞれの権利者に帰属します。
              </p>
              <p>
                ファン活動の一環として公式コンテンツへの送客を目的としており、権利者の利益を損なう意図はありません。
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2
              className="text-base font-bold mb-3"
              style={{ color: "var(--accent)" }}
            >
              ■ 歌詞の取り扱いについて
            </h2>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "#d1d5db" }}
            >
              クイズのヒントとしてごく短いフレーズ（数文字程度）のみを使用しており、歌詞全文の掲載は一切行っておりません。
            </p>
          </section>

          <section className="mb-12">
            <h2
              className="text-base font-bold mb-3"
              style={{ color: "var(--accent)" }}
            >
              ■ 権利者様へ
            </h2>
            <div
              className="text-sm leading-relaxed space-y-2"
              style={{ color: "#d1d5db" }}
            >
              <p>
                権利者様からのご要請があった場合、速やかに該当コンテンツの削除または本サイト全体の公開停止を行います。
              </p>
              <p>
                ご連絡先:{" "}
                <span style={{ color: "var(--accent)" }}>{contactEmail}</span>
              </p>
            </div>
          </section>

          <Link
            href="/"
            className="footer-link inline-block text-sm transition-colors duration-200"
            style={{ color: "var(--text-sub)" }}
          >
            ← クイズに戻る
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
