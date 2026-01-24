"use client";

import React from "react";
import { useTypewriter } from "@/hooks/useTypewriter";

const Hero: React.FC = () => {
  const line1 = useTypewriter({
    text: '> J\'imagine, construis et optimise des <span class="gradient-text">produits</span> <span class="gradient-text">numériques</span>',
    speed: 25,
    delay: 500,
    showCursor: true,
    permanentCursor: false,
  });

  const line2 = useTypewriter({
    text: ">",
    speed: 60,
    delay: 2000,
    showCursor: true,
    permanentCursor: false,
  });

  const line3 = useTypewriter({
    text: '> <span class="gradient-text">Développement</span>. Contenu. <span class="gradient-text">Marketing</span>. Analytics.',
    speed: 23,
    delay: 3000,
    showCursor: true,
    permanentCursor: false,
  });

  const line4 = useTypewriter({
    text: '> Du concept aux <span class="gradient-text">résultats</span> à vélocité IA.',
    speed: 23,
    delay: 5500,
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
