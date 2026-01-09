"use client";

import React from "react";
import { useTypewriter } from "@/hooks/useTypewriter";

const Hero: React.FC = () => {
  // Line 1: 63 chars × 40ms = 2520ms, ends at 3020ms
  const line1 = useTypewriter({
    text: '> J\'imagine et construis des produits numériques à <span class="gradient-text">vélocité IA</span>.',
    speed: 40,
    delay: 500,
    showCursor: true,
    permanentCursor: false,
  });

  // Line 2: 59 chars × 35ms = 2065ms, starts 3020 + 200 = 3220ms, ends 5285ms
  const line2 = useTypewriter({
    text: '> Approche personnalisée. Contact direct. Livraison <span class="gradient-text">rapide</span>.',
    speed: 35,
    delay: 3220,
    showCursor: true,
    permanentCursor: false,
  });

  // Line 3: 1 char × 50ms = 50ms, starts 5285 + 200 = 5485ms, ends 5535ms
  const line3 = useTypewriter({
    text: ">",
    speed: 50,
    delay: 5485,
    showCursor: true,
    permanentCursor: false,
  });

  // Line 4: 41 chars × 45ms = 1845ms, starts 5535 + 400 = 5935ms
  const line4 = useTypewriter({
    text: '> Des produits qui <span class="gradient-text">fonctionnent vraiment</span>.',
    speed: 45,
    delay: 5935,
    showCursor: true,
    permanentCursor: true,
  });

  return (
    <section
      className="hero"
      style={{
        background:
          "linear-gradient(135deg, var(--bg-dark) 0%, var(--deep-blue) 100%)",
        position: "relative",
      }}
    >
      <div
        className="terminal"
        style={{
          maxWidth: "900px",
          width: "100%",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "1.8rem",
          lineHeight: "1.8",
          position: "relative",
          zIndex: 10,
        }}
      >
        <div
          className="terminal-line"
          style={{ minHeight: "2.7rem" }}
          dangerouslySetInnerHTML={{ __html: line1.displayedText }}
        />
        <div
          className="terminal-line"
          style={{ minHeight: "2.7rem" }}
          dangerouslySetInnerHTML={{ __html: line2.displayedText }}
        />
        <div
          className="terminal-line"
          style={{ minHeight: "2.7rem" }}
          dangerouslySetInnerHTML={{ __html: line3.displayedText }}
        />
        <div
          className="terminal-line"
          style={{ minHeight: "2.7rem" }}
          dangerouslySetInnerHTML={{ __html: line4.displayedText }}
        />
      </div>
      <div
        className="scroll-indicator"
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          fontSize: "3rem",
          color: "#4A90E2",
          animation: "bounce 2s infinite",
          zIndex: 10,
        }}
      >
        ↓
      </div>
    </section>
  );
};

export default Hero;
