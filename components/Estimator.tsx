"use client";

import React from "react";
import { useTranslation } from "@/lib/i18n";

const Estimator: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section
      style={{
        background: "linear-gradient(135deg, var(--deep-blue) 0%, var(--bg-dark) 100%)",
        padding: "6rem 2rem",
        textAlign: "center",
        position: "relative",
      }}
    >
      <div style={{ maxWidth: "700px", margin: "0 auto", position: "relative", zIndex: 10 }}>
        <p
          style={{
            fontSize: "clamp(0.9rem, 1.2vw, 1.1rem)",
            color: "var(--gray)",
            marginBottom: "2rem",
            lineHeight: 1.6,
          }}
        >
          {t("estimator.subtitle")}
        </p>
        <a
          href="mailto:pierre@studiomicho.com?subject=Estimation%20projet"
          style={{
            display: "inline-block",
            padding: "1.5rem 4rem",
            background: "transparent",
            border: "3px solid #F39C12",
            color: "#F39C12",
            fontSize: "clamp(1.1rem, 1.8vw, 1.5rem)",
            fontWeight: 900,
            textDecoration: "none",
            textTransform: "uppercase",
            letterSpacing: "2px",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#F39C12";
            e.currentTarget.style.color = "var(--bg-dark)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = "#F39C12";
          }}
        >
          {t("estimator.cta")}
        </a>
      </div>
    </section>
  );
};

export default Estimator;
