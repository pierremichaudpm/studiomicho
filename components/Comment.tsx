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
                color: "#4A90E2",
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
                color: "#4A90E2",
              }}
            >
              IA comme co-pilote
            </div>
            <div
              className="flow-desc"
              style={{
                fontSize: "clamp(1.1rem, 2vw, 1.5rem)",
                color: "var(--white)",
                fontWeight: 600,
              }}
            >
              Claude, ChatGPT, Cursor. IA intégrée à chaque étape du processus.
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
                color: "#9B59B6",
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
                color: "#9B59B6",
              }}
            >
              Itérations rapides
            </div>
            <div
              className="flow-desc"
              style={{
                fontSize: "clamp(1.1rem, 2vw, 1.5rem)",
                color: "var(--white)",
                fontWeight: 600,
              }}
            >
              Ajustements en temps réel. Feedback intégré immédiatement.
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
                color: "#F39C12",
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
                color: "#F39C12",
              }}
            >
              Zéro handoff
            </div>
            <div
              className="flow-desc"
              style={{
                fontSize: "clamp(1.1rem, 2vw, 1.5rem)",
                color: "var(--white)",
                fontWeight: 600,
              }}
            >
              Une personne = zéro friction. Du concept au déploiement sans
              transfert.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Comment;
