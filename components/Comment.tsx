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
        padding: "10rem 2rem",
      }}
    >
      {/* Floating shapes */}
      <div
        style={{
          position: "absolute",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: "#E74C3C",
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
          background: "#4A90E2",
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
            fontSize: "clamp(3rem, 9vw, 11.25rem)",
            fontWeight: 900,
            marginBottom: "8rem",
            textAlign: "center",
            lineHeight: 0.9,
          }}
        >
          Ma <span className="gradient-text">méthode</span>
        </h2>

        <div
          className="flow"
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: "clamp(1.5rem, 3vw, 3rem)",
            position: "relative",
            flexWrap: "nowrap",
          }}
        >
          {/* Flow Item 01 */}
          <div
            className="flow-item"
            style={{
              flex: "1",
              minWidth: "0",
              textAlign: "center",
              position: "relative",
            }}
          >
            <div
              className="flow-number"
              style={{
                fontSize: "clamp(6rem, 12vw, 15rem)",
                fontWeight: 900,
                lineHeight: 0.8,
                opacity: 0.3,
                marginBottom: "2rem",
                color: "#4A90E2",
              }}
            >
              01
            </div>
            <div
              className="flow-title"
              style={{
                fontSize: "clamp(1.5rem, 3vw, 3rem)",
                fontWeight: 900,
                marginBottom: "1.5rem",
                textTransform: "uppercase",
                color: "#4A90E2",
                lineHeight: 1.1,
              }}
            >
              Écoute & Stratégie
            </div>
            <div
              className="flow-desc"
              style={{
                fontSize: "clamp(1rem, 1.8vw, 1.3rem)",
                color: "var(--white)",
                fontWeight: 400,
                lineHeight: 1.5,
              }}
            >
              Comprendre vos objectifs business. Définir plan produit +
              marketing intégré.
            </div>
          </div>

          {/* Arrow */}
          <div
            className="flow-arrow"
            style={{
              fontSize: "clamp(3rem, 6vw, 8rem)",
              color: "#E74C3C",
              opacity: 0.6,
              flexShrink: 0,
              fontWeight: 300,
              alignSelf: "center",
            }}
          >
            →
          </div>

          {/* Flow Item 02 */}
          <div
            className="flow-item"
            style={{
              flex: "1",
              minWidth: "0",
              textAlign: "center",
              position: "relative",
            }}
          >
            <div
              className="flow-number"
              style={{
                fontSize: "clamp(6rem, 12vw, 15rem)",
                fontWeight: 900,
                lineHeight: 0.8,
                opacity: 0.3,
                marginBottom: "2rem",
                color: "#9B59B6",
              }}
            >
              02
            </div>
            <div
              className="flow-title"
              style={{
                fontSize: "clamp(1.5rem, 3vw, 3rem)",
                fontWeight: 900,
                marginBottom: "1.5rem",
                textTransform: "uppercase",
                color: "#9B59B6",
                lineHeight: 1.1,
              }}
            >
              Construction Rapide
            </div>
            <div
              className="flow-desc"
              style={{
                fontSize: "clamp(1rem, 1.8vw, 1.3rem)",
                color: "var(--white)",
                fontWeight: 400,
                lineHeight: 1.5,
              }}
            >
              IA comme co-pilote. Développement + mise en marché en 3-4
              semaines.
            </div>
          </div>

          {/* Arrow */}
          <div
            className="flow-arrow"
            style={{
              fontSize: "clamp(3rem, 8vw, 8rem)",
              color: "#E74C3C",
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
              flex: "1",
              minWidth: "0",
              textAlign: "center",
              position: "relative",
            }}
          >
            <div
              className="flow-number"
              style={{
                fontSize: "clamp(6rem, 12vw, 15rem)",
                fontWeight: 900,
                lineHeight: 0.8,
                opacity: 0.3,
                marginBottom: "2rem",
                color: "#F39C12",
              }}
            >
              03
            </div>
            <div
              className="flow-title"
              style={{
                fontSize: "clamp(1.5rem, 3vw, 3rem)",
                fontWeight: 900,
                marginBottom: "1.5rem",
                textTransform: "uppercase",
                color: "#F39C12",
                lineHeight: 1.1,
              }}
            >
              Zéro malentendu
            </div>
            <div
              className="flow-desc"
              style={{
                fontSize: "clamp(1rem, 1.8vw, 1.3rem)",
                color: "var(--white)",
                fontWeight: 400,
                lineHeight: 1.5,
              }}
            >
              Même personne qui écoute, conçoit et construit. Votre vision reste
              intacte.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Comment;
