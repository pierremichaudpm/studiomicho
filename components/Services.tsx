"use client";

import React from "react";
import { useTranslation } from "@/lib/i18n";

const Services: React.FC = () => {
  const { t } = useTranslation();

  const services = [
    {
      title: t("services.1.title"),
      description: t("services.1.desc"),
      color: "#4A90E2",
    },
    {
      title: t("services.2.title"),
      description: t("services.2.desc"),
      color: "#9B59B6",
    },
    {
      title: t("services.3.title"),
      description: t("services.3.desc"),
      color: "#F39C12",
    },
    {
      title: t("services.4.title"),
      description: t("services.4.desc"),
      color: "#E74C3C",
    },
  ];

  return (
    <section
      className="services-section"
      style={{
        background:
          "linear-gradient(180deg, #122040 0%, #0f1a2e 100%)",
        flexDirection: "column",
        position: "relative",
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
          borderRadius: "50%",
          background: "#9B59B6",
          opacity: 0.15,
          left: "-5%",
          bottom: "20%",
          animation: "float 11s ease-in-out infinite reverse",
          zIndex: 1,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          background: "#F39C12",
          opacity: 0.12,
          right: "30%",
          top: "60%",
          animation: "float 13s ease-in-out infinite",
          zIndex: 1,
        }}
      />

      <div
        style={{
          maxWidth: "900px",
          width: "100%",
          position: "relative",
          zIndex: 10,
          margin: "0 auto",
        }}
      >
        <h2
          style={{
            fontSize: "clamp(2.5rem, 5vw, 5rem)",
            fontWeight: 900,
            lineHeight: 0.9,
            marginBottom: "4rem",
            textAlign: "center",
          }}
        >
          {t("services.title")}{" "}
          <span className="gradient-text">{t("services.titleHighlight")}</span>
        </h2>

        <ul
          className="services-list"
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
          }}
        >
          {services.map((service, index) => (
            <li
              key={index}
              className="service-row"
              style={{
                display: "grid",
                gridTemplateColumns: "200px 1fr",
                gap: "2rem",
                alignItems: "baseline",
                padding: "2rem 0",
                borderBottom: "1px solid rgba(255,255,255,0.1)",
                transition: "border-color 0.3s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLLIElement).style.borderColor = `${service.color}50`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLLIElement).style.borderColor = "rgba(255,255,255,0.1)";
              }}
            >
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "12px",
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  color: service.color,
                }}
              >
                {service.title}
              </span>
              <span
                style={{
                  fontSize: "clamp(0.9rem, 1.1vw, 1rem)",
                  color: "var(--gray)",
                  lineHeight: 1.7,
                }}
              >
                {service.description}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Responsive */}
      <style jsx>{`
        @media (max-width: 768px) {
          .service-row {
            grid-template-columns: 1fr !important;
            gap: 0.5rem !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Services;
