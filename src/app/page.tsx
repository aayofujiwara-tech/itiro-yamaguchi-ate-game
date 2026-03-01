import Link from "next/link";

export default function Home() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      <div className="text-center max-w-lg animate-fade-in">
        <h1
          className="text-4xl md:text-5xl font-bold mb-4 tracking-tight"
          style={{ color: "var(--text-main)" }}
        >
          配信画像当てクイズ
        </h1>
        <p className="text-lg mb-2" style={{ color: "var(--text-sub)" }}>
          山口一郎の配信画像から
        </p>
        <p className="text-lg mb-10" style={{ color: "var(--text-sub)" }}>
          どの回か当てよう
        </p>
        <Link href="/quiz" className="start-button">
          クイズを始める
        </Link>
      </div>
    </div>
  );
}
