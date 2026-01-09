"use client";

import React from "react";
import { useTypewriter } from "@/hooks/useTypewriter";

const Hero: React.FC = () => {
  const line1 = useTypewriter({
    text: '> J\'imagine et construis des produits numériques à <span class="gradient-text">vélocité IA</span>',
    speed: 30,
    delay: 500,
    showCursor: true,
    permanentCursor: false,
  });

  const line2 = useTypewriter({
    text: '> Approche personnalisée. <span class="gradient-text">Contact direct</span>. Livraison rapide.',
    speed: 30,
    delay: 2000,
    showCursor: true,
    permanentCursor: false,
  });

  const line3 = useTypewriter({
    text: ">",
    speed: 30,
    delay: 3500,
    showCursor: true,
    permanentCursor: false,
  });

  const line4 = useTypewriter({
    text: '> Des produits qui <span class="gradient-text">fonctionnent vraiment</span>.',
    speed: 30,
    delay: 5000,
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
