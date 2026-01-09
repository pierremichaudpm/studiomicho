"use client";

import React from "react";

const Pitch: React.FC = () => {
  return (
    <section
      className="pitch-section"
      style={{
        background: "var(--bg-dark)",
        flexDirection: "column",
        textAlign: "center",
        position: "relative",
      }}
    >
      {/* Floating shapes */}
      <div
        style={{
          position: "absolute",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "#9B59B6",
          opacity: 0.15,
          left: "-10%",
          top: "50%",
          animation: "float 10s ease-in-out infinite",
          zIndex: 1,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "300px",
          height: "300px",
          background: "#4A90E2",
          opacity: 0.15,
          right: "-5%",
          top: "20%",
          transform: "rotate(45deg)",
          animation: "float 12s ease-in-out infinite reverse",
          zIndex: 1,
        }}
      />

      <div
        className="pitch-container"
        style={{
          maxWidth: "1200px",
          position: "relative",
          zIndex: 10,
        }}
      >
        <h1
          className="pitch-statement"
          style={{
            fontSize: "clamp(3rem, 10vw, 10rem)",
            fontWeight: 900,
            lineHeight: 1.2,
            marginBottom: "4rem",
            background:
              "linear-gradient(90deg, #4A90E2, #9B59B6, #F39C12, #4A90E2)",
            backgroundSize: "200% auto",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
            animation: "gradientShift 5s linear infinite",
          }}
        >
          JE CONÇOIS.
          <br />
          JE CONSTRUIS.
          <br />
          JE LIVRE.
        </h1>

        <p
          className="pitch-sub"
          style={{
            fontSize: "clamp(1.3rem, 2.5vw, 2rem)",
            color: "var(--gray)",
            marginBottom: "4rem",
          }}
        >
          Produits numériques qui livrent. Pas de transferts. Pas de délais.
          Juste des résultats.
        </p>

        <a
          href="mailto:pmicho@pm.me"
          className="pitch-cta"
          style={{
            display: "inline-block",
            background: "#4A90E2",
            color: "var(--bg-dark)",
            padding: "2rem 5rem",
            fontSize: "clamp(1.3rem, 2.5vw, 2rem)",
            fontWeight: 900,
            textDecoration: "none",
            textTransform: "uppercase",
            letterSpacing: "3px",
            transition: "all 0.3s ease",
            position: "relative",
            overflow: "hidden",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
            e.currentTarget.style.boxShadow =
              "0 20px 60px rgba(255, 0, 255, 0.5)";
            const before = e.currentTarget.querySelector(
              ".cta-before",
            ) as HTMLDivElement;
            if (before) before.style.left = "0";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "none";
            const before = e.currentTarget.querySelector(
              ".cta-before",
            ) as HTMLDivElement;
            if (before) before.style.left = "-100%";
          }}
        >
          <div
            className="cta-before"
            style={{
              content: "",
              position: "absolute",
              top: 0,
              left: "-100%",
              width: "100%",
              height: "100%",
              background: "#9B59B6",
              transition: "left 0.3s ease",
              zIndex: -1,
            }}
          />
          Parlons-en
        </a>
      </div>
    </section>
  );
};

export default Pitch;
