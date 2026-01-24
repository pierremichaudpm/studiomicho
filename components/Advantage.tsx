"use client";

import React from "react";

const Advantage: React.FC = () => {
  const advantages = [
    {
      title: "Contact direct",
      description:
        "Pas d'intermédiaires. Vous travaillez directement avec moi, du concept au déploiement.",
    },
    {
      title: "Écoute personnalisée",
      description:
        "Chaque projet commence par comprendre VOS besoins réels. Approche humaine, aux petits soins.",
    },
    {
      title: "Rapidité d'exécution",
      description:
        "3-4 semaines du brief au produit en ligne. Campagnes marketing lancées rapidement.",
    },
    {
      title: "Expertise 360°",
      description:
        "25 ans expérience contenu et produit (Radio-Canada - Olympiques) + maîtrise IA + marketing numérique. Construction + Marketing sous un toit.",
    },
    {
      title: "Tarifs boutique",
      description:
        "Budget adapté à votre réalité. Qualité entreprise sans les frais d'agence.",
    },
  ];

  return (
    <section
      className="advantage-section"
      style={{
        background:
          "linear-gradient(135deg, var(--deep-blue) 0%, var(--bg-dark) 100%)",
        flexDirection: "column",
        position: "relative",
      }}
    >
      {/* Floating shapes - matching site style */}
      <div
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
        className="advantage-container"
        style={{
          maxWidth: "1200px",
          width: "100%",
          position: "relative",
          zIndex: 10,
        }}
      >
        <h2
          className="advantage-header"
          style={{
            fontSize: "clamp(3rem, 9vw, 11.25rem)",
            fontWeight: 900,
            marginBottom: "6rem",
            textAlign: "center",
            lineHeight: 0.9,
          }}
        >
          L&apos;
          <br />
          <span
            className="gradient-text"
            style={{
              background: "linear-gradient(90deg, #4A90E2, #9B59B6, #F39C12)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: "gradientShift 5s linear infinite",
            }}
          >
            avantage
          </span>
        </h2>

        <div
          className="advantages-list"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "4rem",
            position: "relative",
          }}
        >
          {advantages.map((advantage, index) => (
            <div
              key={index}
              className="advantage-item"
              style={{
                position: "relative",
                paddingLeft: "0",
              }}
            >
              <div
                className="advantage-title"
                style={{
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  fontWeight: 900,
                  marginBottom: "1rem",
                  color: "#4A90E2",
                  lineHeight: 1.2,
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  wordWrap: "break-word",
                  overflowWrap: "break-word",
                }}
              >
                {advantage.title}
                <span className="advantage-cursor">▮</span>
              </div>

              <div
                className="advantage-description"
                style={{
                  fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)",
                  color: "var(--white)",
                  lineHeight: 1.6,
                  fontWeight: 400,
                  opacity: 0.9,
                  maxWidth: "900px",
                }}
              >
                {advantage.description}
              </div>

              {/* Subtle animated underline on hover */}
              <div
                style={{
                  position: "absolute",
                  bottom: "-1rem",
                  left: "0",
                  width: "100px",
                  height: "2px",
                  background: "linear-gradient(90deg, #4A90E2, transparent)",
                  opacity: 0,
                  transition: "opacity 0.3s ease, width 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = "1";
                  e.currentTarget.style.width = "200px";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = "0";
                  e.currentTarget.style.width = "100px";
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Advantage;
