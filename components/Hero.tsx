"use client";

import React from "react";
import { useTypewriter } from "@/hooks/useTypewriter";

const Hero: React.FC = () => {
  // Line 1: 99 chars (with HTML) × 25ms = 2475ms, ends at 2975ms
  const line1 = useTypewriter({
    text: '> On imagine et construit des produits numériques à <span class="gradient-text">vélocité IA</span>.',
    speed: 25,
    delay: 500,
    showCursor: true,
    permanentCursor: false,
  });

  // Line 2: 94 chars (with HTML) × 18ms = 1692ms, starts 2975 + 375 = 3350ms, ends 5042ms
  const line2 = useTypewriter({
    text: '> Approche personnalisée. Contact direct. Livraison <span class="gradient-text">rapide</span>.',
    speed: 18,
    delay: 3350,
    showCursor: true,
    permanentCursor: false,
  });

  // Line 3: 1 char × 60ms = 60ms, starts 5042 + 350 = 5392ms, ends 5452ms
  const line3 = useTypewriter({
    text: ">",
    speed: 60,
    delay: 5392,
    showCursor: true,
    permanentCursor: false,
  });

  // Line 4: 76 chars (with HTML) × 23ms = 1748ms, starts 5452 + 500 = 5952ms
  const line4 = useTypewriter({
    text: '> Des produits qui <span class="gradient-text">fonctionnent vraiment</span>.',
    speed: 23,
    delay: 5952,
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
