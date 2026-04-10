"use client";

import React from "react";
import { useTranslation } from "@/lib/i18n";

const Lasting: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section
      style={{
        background: "linear-gradient(180deg, #0a1222 0%, #091020 100%)",
        padding: "clamp(3rem, 6vw, 5rem) clamp(1.5rem, 5vw, 3rem)",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          maxWidth: "800px",
          width: "100%",
          borderLeft: "3px solid #4A90E2",
          padding: "clamp(1.5rem, 3vw, 2.5rem) clamp(1.5rem, 3vw, 2.5rem)",
          background: "rgba(74, 144, 226, 0.05)",
          borderRadius: "0 0.75rem 0.75rem 0",
        }}
      >
        <h3
          style={{
            fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
            fontWeight: 900,
            color: "var(--white)",
            marginBottom: "1.2rem",
            lineHeight: 1.2,
          }}
        >
          {t("lasting.title")}{" "}
          <span style={{ color: "var(--gray)" }}>{t("lasting.titleHighlight")}</span>
        </h3>
        <p
          style={{
            fontSize: "clamp(0.95rem, 1.2vw, 1.1rem)",
            color: "var(--gray)",
            lineHeight: 1.8,
          }}
        >
          {t("lasting.desc")}
        </p>
      </div>
    </section>
  );
};

export default Lasting;
