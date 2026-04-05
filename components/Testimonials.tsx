"use client";

import React from "react";
import { useTranslation } from "@/lib/i18n";

const testimonials = [
  { key: "catherine", color: "#4A90E2", projectId: "tonic" },
  { key: "thierry", color: "#9B59B6", projectId: "op2" },
  { key: "leesa", color: "#F39C12" },
  { key: "said", color: "#4A90E2" },
  { key: "hugues", color: "#9B59B6", projectId: "aurea" },
];

interface TestimonialsProps {
  onOpenModal: (projectId: string) => void;
}

const Testimonials: React.FC<TestimonialsProps> = ({ onOpenModal }) => {
  const { t } = useTranslation();

  return (
    <section
      style={{
        background: "linear-gradient(180deg, #0a1222 0%, #0d1830 100%)",
        flexDirection: "column",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: "#9B59B6",
          opacity: 0.1,
          right: "-5%",
          top: "15%",
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
          background: "#4A90E2",
          opacity: 0.1,
          left: "-5%",
          bottom: "20%",
          animation: "float 12s ease-in-out infinite reverse",
          zIndex: 1,
        }}
      />

      <div
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
          {t("testimonials.title")}{" "}
          <span className="gradient-text">
            {t("testimonials.titleHighlight")}
          </span>
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
          {t("testimonials.subtitle")}
        </p>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
          }}
        >
          {testimonials.map(({ key, color, projectId }) => (
            <div
              key={key}
              style={{
                borderLeft: `3px solid ${color}`,
                padding: "1.5rem 2rem",
                background: "rgba(255,255,255,0.03)",
                borderRadius: "0 0.5rem 0.5rem 0",
              }}
            >
              <p
                style={{
                  fontSize: "clamp(0.95rem, 1.2vw, 1.1rem)",
                  color: "var(--white)",
                  lineHeight: 1.7,
                  fontStyle: "italic",
                  marginBottom: "1rem",
                  opacity: 0.9,
                }}
              >
                &ldquo;{t(`testimonials.${key}.quote`)}&rdquo;
              </p>
              <div>
                <span
                  style={{
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    color,
                  }}
                >
                  {t(`testimonials.${key}.name`)}
                </span>
                {projectId ? (
                  <button
                    onClick={() => onOpenModal(projectId)}
                    style={{
                      color: "var(--gray)",
                      fontSize: "0.85rem",
                      marginLeft: "0.75rem",
                      textDecoration: "underline",
                      textDecorationColor: "rgba(156,163,175,0.4)",
                      textUnderlineOffset: "2px",
                      cursor: "pointer",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = color)}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--gray)")}
                  >
                    {t(`testimonials.${key}.role`)} ↗
                  </button>
                ) : (
                  <span
                    style={{
                      color: "var(--gray)",
                      fontSize: "0.85rem",
                      marginLeft: "0.75rem",
                    }}
                  >
                    {t(`testimonials.${key}.role`)}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
