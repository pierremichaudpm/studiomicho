"use client";

import React from "react";
import { useTranslation } from "@/lib/i18n";

const LanguageToggle: React.FC = () => {
  const { locale, setLocale } = useTranslation();

  return (
    <button
      onClick={() => setLocale(locale === "fr" ? "en" : "fr")}
      aria-label={locale === "fr" ? "Switch to English" : "Passer en français"}
      style={{
        position: "fixed",
        top: "1.5rem",
        right: "1.5rem",
        zIndex: 3000,
        background: "rgba(255, 255, 255, 0.08)",
        border: "2px solid rgba(255, 255, 255, 0.2)",
        borderRadius: "0.5rem",
        padding: "0.4rem 0.8rem",
        color: "var(--white)",
        fontSize: "0.8rem",
        fontWeight: 700,
        letterSpacing: "0.1em",
        cursor: "pointer",
        transition: "all 0.3s ease",
        fontFamily: "'Inter', sans-serif",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "#4A90E2";
        e.currentTarget.style.color = "#4A90E2";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)";
        e.currentTarget.style.color = "var(--white)";
      }}
    >
      {locale === "fr" ? "EN" : "FR"}
    </button>
  );
};

export default LanguageToggle;
