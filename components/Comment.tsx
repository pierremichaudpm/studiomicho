"use client";

import React from "react";

const Comment: React.FC = () => {
  return (
    <section
      className="sauce-section"
      style={{
        background:
          "linear-gradient(135deg, var(--bg-dark) 0%, var(--deep-blue) 100%)",
        flexDirection: "column",
        position: "relative",
      }}
    >
      {/* Floating shapes */}
      <div
        style={{
          position: "absolute",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: "var(--orange)",
          opacity: 0.15,
          right: "-5%",
          top: "10%",
          animation: "float 8s ease-in-out infinite",
          zIndex: 1,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "250px",
          height: "250px",
          background: "var(--cyan)",
          opacity: 0.15,
          left: "-3%",
          bottom: "5%",
          transform: "rotate(45deg)",
          animation: "float 11s ease-in-out infinite reverse",
          zIndex: 1,
        }}
      />

      <div
        className="sauce-container"
        style={{
          maxWidth: "1600px",
          width: "100%",
          position: "relative",
          zIndex: 10,
        }}
      >
        <h2
          className="sauce-header"
          style={{
            fontSize: "clamp(4rem, 12vw, 15rem)",
            fontWeight: 900,
            marginBottom: "6rem",
            textAlign: "center",
            lineHeight: 0.9,
          }}
        >
          <span className="gradient-text">Comment</span>
        </h2>

        <div
          className="flow"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "clamp(1rem, 3vw, 2rem)",
            position: "relative",
            flexWrap: "wrap",
          }}
        >
          {/* Flow Item 01 */}
          <div
            className="flow-item"
            style={{
              flex: "1 1 250px",
              minWidth: "250px",
              maxWidth: "400px",
              textAlign: "center",
              position: "relative",
            }}
          >
            <div
              className="flow-number"
              style={{
                fontSize: "clamp(8rem, 20vw, 20rem)",
                fontWeight: 900,
                lineHeight: 0.8,
                opacity: 0.3,
                marginBottom: "1rem",
                color: "var(--cyan)",
              }}
            >
              01
            </div>
            <div
              className="flow-title"
              style={{
                fontSize: "clamp(2rem, 5vw, 4rem)",
                fontWeight: 900,
                marginBottom: "1rem",
                textTransform: "uppercase",
                color: "var(--cyan)",
              }}
            >
              Expérience
            </div>
            <div
              className="flow-desc"
              style={{
                fontSize: "clamp(1.1rem, 2vw, 1.5rem)",
                color: "var(--white)",
                fontWeight: 600,
              }}
            >
              25 ans Radio-Canada: journaliste, chef de produit numérique, Jeux
              olympiques.
            </div>
          </div>

          {/* Arrow */}
          <div
            className="flow-arrow"
            style={{
              fontSize: "clamp(3rem, 8vw, 8rem)",
              color: "var(--orange)",
              opacity: 0.5,
              flexShrink: 0,
            }}
          >
            →
          </div>

          {/* Flow Item 02 */}
          <div
            className="flow-item"
            style={{
              flex: "1 1 250px",
              minWidth: "250px",
              maxWidth: "400px",
              textAlign: "center",
              position: "relative",
            }}
          >
            <div
              className="flow-number"
              style={{
                fontSize: "clamp(8rem, 20vw, 20rem)",
                fontWeight: 900,
                lineHeight: 0.8,
                opacity: 0.3,
                marginBottom: "1rem",
                color: "var(--magenta)",
              }}
            >
              02
            </div>
            <div
              className="flow-title"
              style={{
                fontSize: "clamp(2rem, 5vw, 4rem)",
                fontWeight: 900,
                marginBottom: "1rem",
                textTransform: "uppercase",
                color: "var(--magenta)",
              }}
            >
              Vélocité
            </div>
            <div
              className="flow-desc"
              style={{
                fontSize: "clamp(1.1rem, 2vw, 1.5rem)",
                color: "var(--white)",
                fontWeight: 600,
              }}
            >
              Outils IA (Claude, ChatGPT, Cursor). Vitesse multipliée 5-10x.
            </div>
          </div>

          {/* Arrow */}
          <div
            className="flow-arrow"
            style={{
              fontSize: "clamp(3rem, 8vw, 8rem)",
              color: "var(--orange)",
              opacity: 0.5,
              flexShrink: 0,
            }}
          >
            →
          </div>

          {/* Flow Item 03 */}
          <div
            className="flow-item"
            style={{
              flex: "1 1 250px",
              minWidth: "250px",
              maxWidth: "400px",
              textAlign: "center",
              position: "relative",
            }}
          >
            <div
              className="flow-number"
              style={{
                fontSize: "clamp(8rem, 20vw, 20rem)",
                fontWeight: 900,
                lineHeight: 0.8,
                opacity: 0.3,
                marginBottom: "1rem",
                color: "var(--yellow)",
              }}
            >
              03
            </div>
            <div
              className="flow-title"
              style={{
                fontSize: "clamp(2rem, 5vw, 4rem)",
                fontWeight: 900,
                marginBottom: "1rem",
                textTransform: "uppercase",
                color: "var(--yellow)",
              }}
            >
              Exécution
            </div>
            <div
              className="flow-desc"
              style={{
                fontSize: "clamp(1.1rem, 2vw, 1.5rem)",
                color: "var(--white)",
                fontWeight: 600,
              }}
            >
              Produit déployé. Pas un plan. Une solution qui marche.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Comment;
