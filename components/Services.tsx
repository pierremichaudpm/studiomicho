"use client";

import React from "react";

const Services: React.FC = () => {
  const services = [
    {
      number: "01",
      title: "Sites & Applis",
      description:
        "Sites optimisés SEO. Applications (PWA). Prototypes rapides. Construction complète vélocité IA.",
      color: "#4A90E2",
    },
    {
      number: "02",
      title: "Contenu & SEO",
      description:
        "Stratégie éditoriale. SEO technique. Optimisation contenu. Trafic organique.",
      color: "#9B59B6",
    },
    {
      number: "03",
      title: "Publicités & Analytique",
      description:
        "Google Ads. Facebook/Meta. Suivi conversions. Optimisation ROI.",
      color: "#F39C12",
    },
    {
      number: "04",
      title: "Transformation",
      description:
        "Audit complet. Plan stratégique. Implantation CRM. Soutien continu.",
      color: "#E74C3C",
    },
  ];

  return (
    <section
      className="services-section"
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, var(--deep-blue) 0%, var(--bg-dark) 100%)",
        flexDirection: "column",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Floating shapes */}
      <div
        style={{
          position: "absolute",
          width: "350px",
          height: "350px",
          borderRadius: "50%",
          background: "#4A90E2",
          opacity: 0.15,
          right: "-8%",
          top: "15%",
          animation: "float 9s ease-in-out infinite",
          zIndex: 1,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "280px",
          height: "280px",
          background: "#9B59B6",
          opacity: 0.15,
          left: "-5%",
          bottom: "20%",
          transform: "rotate(45deg)",
          animation: "float 11s ease-in-out infinite reverse",
          zIndex: 1,
        }}
      />

      <div
        className="services-container"
        style={{
          maxWidth: "1600px",
          width: "100%",
          position: "relative",
          zIndex: 10,
        }}
      >
        <h2
          className="services-header"
          style={{
            fontSize: "clamp(3rem, 9vw, 11.25rem)",
            textAlign: "center",
            marginBottom: "8rem",
            fontWeight: 900,
            lineHeight: 0.9,
          }}
        >
          Ce que je <span className="gradient-text">fais</span>
        </h2>

        <div
          className="services-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "clamp(4rem, 6vw, 8rem)",
            alignItems: "start",
          }}
        >
          <style jsx>{`
            @media (max-width: 968px) {
              .services-grid {
                grid-template-columns: 1fr !important;
              }
            }
          `}</style>
          {services.map((service, index) => (
            <div
              key={index}
              className="service-item"
              style={{
                position: "relative",
                textAlign: "center",
              }}
            >
              {/* Giant number */}
              <div
                className="service-number"
                style={{
                  fontSize: "clamp(6.4rem, 12vw, 14.4rem)",
                  fontWeight: 900,
                  lineHeight: 0.8,
                  opacity: 0.3,
                  color: service.color,
                  marginBottom: "1.6rem",
                }}
              >
                {service.number}
              </div>

              {/* Content */}
              <div className="service-content">
                <h3
                  className="service-title"
                  style={{
                    fontSize: "clamp(1.6rem, 2.8vw, 3.2rem)",
                    fontWeight: 900,
                    marginBottom: "1.2rem",
                    textTransform: "uppercase",
                    color: service.color,
                    letterSpacing: "1px",
                    lineHeight: 1.1,
                  }}
                >
                  {service.title}
                </h3>
                <p
                  className="service-desc"
                  style={{
                    fontSize: "clamp(0.8rem, 1.2vw, 1.12rem)",
                    color: "var(--white)",
                    lineHeight: 1.5,
                    fontWeight: 400,
                    opacity: 0.9,
                  }}
                >
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
