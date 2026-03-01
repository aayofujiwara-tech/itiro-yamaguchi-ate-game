import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "サカナクション検定",
  description: "あなたのサカナクション偏差値は？ 5つのクイズモードに挑戦しよう。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
