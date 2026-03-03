"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface IntroGateProps {
  children: React.ReactNode;
}

export default function IntroGate({ children }: IntroGateProps) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const hasRead = document.cookie.includes("intro_read=1");
    if (!hasRead) {
      router.replace("/intro/1");
    } else {
      setReady(true);
    }
  }, [router]);

  if (!ready) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: "var(--bg-primary)" }} />
    );
  }

  return <>{children}</>;
}
