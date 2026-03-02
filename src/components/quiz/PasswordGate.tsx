"use client";

import { useRef, useState } from "react";
import Footer from "./Footer";

const STORAGE_KEY = "quiz_authenticated";

interface PasswordGateProps {
  children: React.ReactNode;
}

export function useAuth() {
  const [authenticated, setAuthenticated] = useState(() => {
    if (typeof window === "undefined") return false;
    return sessionStorage.getItem(STORAGE_KEY) === "true";
  });

  const authenticate = () => {
    sessionStorage.setItem(STORAGE_KEY, "true");
    setAuthenticated(true);
  };

  return { authenticated, authenticate };
}

export default function PasswordGate({ children }: PasswordGateProps) {
  const { authenticated, authenticate } = useAuth();
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  if (authenticated) {
    return <>{children}</>;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === process.env.NEXT_PUBLIC_QUIZ_PASSWORD) {
      authenticate();
    } else {
      setError(true);
      setPassword("");
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "var(--bg-primary)" }}
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex-1 flex items-center justify-center px-4">
      <div className="w-full max-w-sm animate-fade-in">
        <div className="text-center mb-8">
          <h1
            className="text-3xl sm:text-4xl font-bold mb-1"
            style={{ color: "var(--text-main)" }}
          >
            🐟 深海探査レベル測定
          </h1>
          <p className="text-sm" style={{ color: "var(--text-sub)" }}>
            参加にはパスワードが必要です
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              ref={inputRef}
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              placeholder="パスワードを入力"
              autoFocus
              className={`w-full px-4 py-3 rounded-lg text-sm${error ? " border-error" : ""}`}
              style={{
                backgroundColor: "var(--bg-card)",
                color: "var(--text-main)",
              }}
            />
          </div>

          {error && (
            <p
              className="text-sm mb-4 animate-fade-in"
              style={{ color: "var(--incorrect)" }}
            >
              パスワードが違います
            </p>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer"
            style={{
              backgroundColor: "transparent",
              color: "var(--accent)",
              border: "1px solid var(--accent)",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor =
                "rgba(0, 212, 255, 0.1)";
              e.currentTarget.style.boxShadow =
                "0 0 15px rgba(0, 212, 255, 0.2)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            入場する
          </button>
        </form>
      </div>
      </div>
      <Footer />
    </div>
  );
}
