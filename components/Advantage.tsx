"use client";

import React from "react";

const Advantage: React.FC = () => {
  const advantages = [
    {
      title: "Contact direct avec le créateur",
      description:
        "Vous travaillez directement avec moi, du concept au déploiement. Pas d'intermédiaires, pas de téléphone arabe.",
    },
    {
      title: "Écoute personnalisée",
      description:
        "Chaque projet commence par comprendre VOS besoins réels. Approche humaine, aux petits soins.",
    },
    {
      title: "Rapidité d'exécution",
      description:
        "3-4 semaines du brief au produit en ligne. Itérations rapides, ajustements en temps réel.",
    },
    {
      title: "Expertise complète",
      description:
        "25 ans d'expérience produit (Radio-Canada Olympics) + maîtrise des outils IA modernes. Le meilleur des deux mondes.",
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
            fontSize: "clamp(4rem, 12vw, 15rem)",
            fontWeight: 900,
            marginBottom: "6rem",
            textAlign: "center",
            lineHeight: 0.9,
          }}
        >
          L'
          <br />
          <span className="gradient-text">avantage</span>
        </h2>

        <div
          className="advantages-grid"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "3rem",
            position: "relative",
          }}
        >
          {advantages.map((advantage, index) => (
            <div
              key={index}
              className="advantage-item"
              style={{
                background: "rgba(20, 20, 20, 0.7)",
                border: "2px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "1rem",
                padding: "2.5rem",
                position: "relative",
                overflow: "hidden",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.borderColor = "#4A90E2";
                e.currentTarget.style.boxShadow =
                  "0 20px 60px rgba(0, 245, 255, 0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div
                className="advantage-title"
                style={{
                  fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
                  fontWeight: 900,
                  marginBottom: "1rem",
                  color: "#4A90E2",
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                {advantage.title}
                <span
                  style={{
                    color: "#4A90E2",
                    animation: "blink 1s infinite",
                    fontSize: "1.5rem",
                  }}
                >
                  ▮
                </span>
              </div>
              <div
                className="advantage-description"
                style={{
                  fontSize: "clamp(1.1rem, 1.8vw, 1.5rem)",
                  color: "var(--white)",
                  lineHeight: 1.6,
                }}
              >
                {advantage.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Advantage;
