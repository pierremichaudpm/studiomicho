"use client";

import React from "react";
import { useTranslation } from "@/lib/i18n";

const Comment: React.FC = () => {
  const { t } = useTranslation();

  const steps = [
    { number: "01", title: t("method.1.title"), desc: t("method.1.desc"), color: "#4A90E2" },
    { number: "02", title: t("method.2.title"), desc: t("method.2.desc"), color: "#9B59B6" },
    { number: "03", title: t("method.3.title"), desc: t("method.3.desc"), color: "#F39C12" },
    { number: "04", title: t("method.4.title"), desc: t("method.4.desc"), color: "#E74C3C" },
    { number: "05", title: t("method.5.title"), desc: t("method.5.desc"), color: "#2ECC71" },
  ];

  return (
    <section
      className="sauce-section"
      style={{
        background:
          "linear-gradient(180deg, #0a1222 0%, #081020 100%)",
        flexDirection: "column",
        position: "relative",
      }}
    >
      {/* Floating shapes */}
      <div
        style={{
          position: "absolute",
          width: "320px",
          height: "320px",
          borderRadius: "50%",
          background: "#4A90E2",
          opacity: 0.15,
          bottom: "10%",
          left: "65%",
          animation: "float 10s ease-in-out infinite",
          zIndex: 1,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "250px",
          height: "250px",
          borderRadius: "50%",
          background: "#E74C3C",
          opacity: 0.15,
          right: "-3%",
          top: "10%",
          animation: "float 8s ease-in-out infinite reverse",
          zIndex: 1,
        }}
      />

      <div
        className="sauce-container"
        style={{
          maxWidth: "1000px",
          width: "100%",
          position: "relative",
          zIndex: 10,
        }}
      >
        <h2
          style={{
            fontSize: "clamp(2.5rem, 5vw, 5rem)",
            fontWeight: 900,
            marginBottom: "2rem",
            textAlign: "center",
            lineHeight: 0.9,
          }}
        >
          {t("method.title")}{" "}
          <span className="gradient-text">{t("method.titleHighlight")}</span>
        </h2>

        <p
          style={{
            fontSize: "clamp(1rem, 1.3vw, 1.2rem)",
            color: "var(--gray)",
            textAlign: "center",
            maxWidth: "700px",
            margin: "0 auto 4rem",
            lineHeight: 1.6,
          }}
        >
          {t("method.subtitle")}
        </p>

        {/* 4 steps grid */}
        <div
          className="method-steps"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: "clamp(1.5rem, 2.5vw, 2.5rem)",
          }}
        >
          {steps.map((step) => (
            <div
              key={step.number}
              className="method-step"
              style={{
                paddingTop: "2rem",
                borderTop: `2px solid rgba(255,255,255,0.1)`,
                transition: "border-color 0.3s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = step.color;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.1)";
              }}
            >
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "clamp(2rem, 2.5vw, 2.5rem)",
                  fontWeight: 700,
                  opacity: 0.7,
                  color: step.color,
                  marginBottom: "1rem",
                }}
              >
                {step.number}
              </div>
              <h4
                style={{
                  fontSize: "clamp(1rem, 1.2vw, 1.2rem)",
                  fontWeight: 900,
                  marginBottom: "1rem",
                  color: "var(--white)",
                }}
              >
                {step.title}
              </h4>
              <p
                style={{
                  fontSize: "clamp(0.85rem, 1vw, 1rem)",
                  color: "var(--gray)",
                  lineHeight: 1.7,
                  maxWidth: "300px",
                }}
              >
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Responsive */}
      <style jsx>{`
        @media (max-width: 1100px) {
          .method-steps {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
        @media (max-width: 768px) {
          .method-steps {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 580px) {
          .method-steps {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Comment;
