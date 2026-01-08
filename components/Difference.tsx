"use client";

import React from "react";

const Difference: React.FC = () => {
  return (
    <section
      className="comparison-section"
      style={{
        background:
          "linear-gradient(135deg, var(--deep-blue) 0%, var(--bg-dark) 100%)",
        flexDirection: "column",
        position: "relative",
      }}
    >
      {/* Floating shapes */}
      <div
        className="shape-circle"
        style={{
          position: "absolute",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "#4A90E2",
          opacity: 0.2,
          left: "-10%",
          top: "20%",
          animation: "float 8s ease-in-out infinite",
          zIndex: 1,
        }}
      />
      <div
        className="shape-square"
        style={{
          position: "absolute",
          width: "350px",
          height: "350px",
          background: "#9B59B6",
          opacity: 0.2,
          right: "-5%",
          bottom: "10%",
          transform: "rotate(45deg)",
          animation: "float 10s ease-in-out infinite reverse",
          zIndex: 1,
        }}
      />

      <div
        className="comparison-container"
        style={{
          maxWidth: "1400px",
          width: "100%",
          position: "relative",
          zIndex: 10,
        }}
      >
        <h2
          className="comparison-header"
          style={{
            fontSize: "clamp(4rem, 12vw, 15rem)",
            fontWeight: 900,
            marginBottom: "6rem",
            textAlign: "center",
            lineHeight: 0.9,
          }}
        >
          La
          <br />
          <span className="gradient-text">différence</span>
        </h2>

        <div
          className="vs-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "4rem",
            position: "relative",
          }}
        >
          {/* LEFT COLUMN - Them */}
          <div className="vs-column vs-them">
            <div
              className="vs-label"
              style={{
                fontSize: "clamp(2rem, 5vw, 4rem)",
                fontWeight: 900,
                marginBottom: "3rem",
                textTransform: "uppercase",
                color: "var(--gray)",
                textDecoration: "line-through",
              }}
            >
              Agence
            </div>
            <div
              className="vs-item"
              style={{
                fontSize: "clamp(1.3rem, 2.5vw, 2rem)",
                fontWeight: 700,
                padding: "2rem 0",
                borderBottom: "2px solid rgba(255, 255, 255, 0.1)",
                position: "relative",
                color: "var(--gray)",
                opacity: 0.5,
              }}
            >
              Échéancier 3-6 mois
            </div>
            <div
              className="vs-item"
              style={{
                fontSize: "clamp(1.3rem, 2.5vw, 2rem)",
                fontWeight: 700,
                padding: "2rem 0",
                borderBottom: "2px solid rgba(255, 255, 255, 0.1)",
                position: "relative",
                color: "var(--gray)",
                opacity: 0.5,
              }}
            >
              Budget 20-40K$+
            </div>
            <div
              className="vs-item"
              style={{
                fontSize: "clamp(1.3rem, 2.5vw, 2rem)",
                fontWeight: 700,
                padding: "2rem 0",
                borderBottom: "2px solid rgba(255, 255, 255, 0.1)",
                position: "relative",
                color: "var(--gray)",
                opacity: 0.5,
              }}
            >
              Équipe de 5 personnes
            </div>
            <div
              className="vs-item"
              style={{
                fontSize: "clamp(1.3rem, 2.5vw, 2rem)",
                fontWeight: 700,
                padding: "2rem 0",
                borderBottom: "2px solid rgba(255, 255, 255, 0.1)",
                position: "relative",
                color: "var(--gray)",
                opacity: 0.5,
              }}
            >
              Deck stratégique
            </div>
            <div
              className="vs-item"
              style={{
                fontSize: "clamp(1.3rem, 2.5vw, 2rem)",
                fontWeight: 700,
                padding: "2rem 0",
                borderBottom: "2px solid rgba(255, 255, 255, 0.1)",
                position: "relative",
                color: "var(--gray)",
                opacity: 0.5,
              }}
            >
              Références de fournisseurs
            </div>
          </div>

          {/* RIGHT COLUMN - Studio Micho */}
          <div className="vs-column vs-you">
            <div
              className="vs-label"
              style={{
                fontSize: "clamp(2rem, 5vw, 4rem)",
                fontWeight: 900,
                marginBottom: "3rem",
                textTransform: "uppercase",
                background:
                  "linear-gradient(135deg, #4A90E2, #9B59B6)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Studio Micho
            </div>
            <div
              className="vs-item"
              style={{
                fontSize: "clamp(1.3rem, 2.5vw, 2rem)",
                fontWeight: 700,
                padding: "2rem 0",
                borderBottom: "2px solid rgba(255, 255, 255, 0.1)",
                position: "relative",
                color: "var(--white)",
              }}
            >
              3-4 semaines
              <span
                style={{
                  color: "#4A90E2",
                  animation: "blink 1s infinite",
                }}
              >
                {" "}
                ▮
              </span>
            </div>
            <div
              className="vs-item"
              style={{
                fontSize: "clamp(1.3rem, 2.5vw, 2rem)",
                fontWeight: 700,
                padding: "2rem 0",
                borderBottom: "2px solid rgba(255, 255, 255, 0.1)",
                position: "relative",
                color: "var(--white)",
              }}
            >
              Tarifs boutique
              <span
                style={{
                  color: "#4A90E2",
                  animation: "blink 1s infinite",
                }}
              >
                {" "}
                ▮
              </span>
            </div>
            <div
              className="vs-item"
              style={{
                fontSize: "clamp(1.3rem, 2.5vw, 2rem)",
                fontWeight: 700,
                padding: "2rem 0",
                borderBottom: "2px solid rgba(255, 255, 255, 0.1)",
                position: "relative",
                color: "var(--white)",
              }}
            >
              Un expert (25+ ans)
              <span
                style={{
                  color: "#4A90E2",
                  animation: "blink 1s infinite",
                }}
              >
                {" "}
                ▮
              </span>
            </div>
            <div
              className="vs-item"
              style={{
                fontSize: "clamp(1.3rem, 2.5vw, 2rem)",
                fontWeight: 700,
                padding: "2rem 0",
                borderBottom: "2px solid rgba(255, 255, 255, 0.1)",
                position: "relative",
                color: "var(--white)",
              }}
            >
              Produit fonctionnel
              <span
                style={{
                  color: "#4A90E2",
                  animation: "blink 1s infinite",
                }}
              >
                {" "}
                ▮
              </span>
            </div>
            <div
              className="vs-item"
              style={{
                fontSize: "clamp(1.3rem, 2.5vw, 2rem)",
                fontWeight: 700,
                padding: "2rem 0",
                borderBottom: "2px solid rgba(255, 255, 255, 0.1)",
                position: "relative",
                color: "var(--white)",
              }}
            >
              Déployé & en ligne
              <span
                style={{
                  color: "#4A90E2",
                  animation: "blink 1s infinite",
                }}
              >
                {" "}
                ▮
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Difference;
