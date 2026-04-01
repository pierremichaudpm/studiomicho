"use client";

import React from "react";
import { useTranslation } from "@/lib/i18n";

const Pitch: React.FC = () => {
  const { t } = useTranslation();
  return (
    <section
      className="pitch-section"
      style={{
        background: "linear-gradient(135deg, #030712 0%, #060e1c 100%)",
        flexDirection: "column",
        textAlign: "center",
        position: "relative",
      }}
    >
      {/* Floating shapes */}
      <div
        style={{
          position: "absolute",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "#9B59B6",
          opacity: 0.15,
          left: "-10%",
          top: "50%",
          animation: "float 10s ease-in-out infinite",
          zIndex: 1,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: "#4A90E2",
          opacity: 0.15,
          right: "-5%",
          top: "20%",
          animation: "float 12s ease-in-out infinite reverse",
          zIndex: 1,
        }}
      />

      <div
        className="pitch-container"
        style={{
          maxWidth: "1200px",
          position: "relative",
          zIndex: 10,
        }}
      >
        <h1
          className="pitch-statement"
          style={{
            fontSize: "clamp(1.8rem, 4vw, 4rem)",
            fontWeight: 900,
            lineHeight: 1.5,
            marginBottom: "2.5rem",
            color: "var(--white)",
          }}
        >
          {t("pitch.line1")},{" "}
          <span className="gradient-text">{t("pitch.line2")}</span>,{" "}
          <span className="gradient-text">{t("pitch.line3")}</span>{" "}
          {t("pitch.line4")}
        </h1>

        <p
          style={{
            fontSize: "clamp(0.95rem, 1.2vw, 1.1rem)",
            color: "var(--gray)",
            marginBottom: "3rem",
            lineHeight: 1.6,
          }}
        >
          {t("pitch.subcta")}
        </p>

        {/* CTA button */}
        <a
          href="mailto:pierre@studiomicho.com"
          className="pitch-cta"
          style={{
            display: "inline-block",
            background: "#4A90E2",
            color: "var(--bg-dark)",
            padding: "1.5rem 4rem",
            fontSize: "clamp(1rem, 1.5vw, 1.3rem)",
            fontWeight: 900,
            textDecoration: "none",
            textTransform: "uppercase",
            letterSpacing: "3px",
            transition: "all 0.3s ease",
            position: "relative",
            overflow: "hidden",
            marginBottom: "4rem",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
            e.currentTarget.style.boxShadow =
              "0 20px 60px rgba(255, 0, 255, 0.5)";
            const before = e.currentTarget.querySelector(
              ".cta-before",
            ) as HTMLDivElement;
            if (before) before.style.left = "0";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "none";
            const before = e.currentTarget.querySelector(
              ".cta-before",
            ) as HTMLDivElement;
            if (before) before.style.left = "-100%";
          }}
        >
          <div
            className="cta-before"
            style={{
              content: "",
              position: "absolute",
              top: 0,
              left: "-100%",
              width: "100%",
              height: "100%",
              background: "#9B59B6",
              transition: "left 0.3s ease",
              zIndex: -1,
            }}
          />
          {t("pitch.cta")}
        </a>

        {/* Dual contact cards */}
        <div
          className="pitch-contacts"
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "3rem",
            flexWrap: "wrap",
            marginBottom: "4rem",
          }}
        >
          {/* Pierre */}
          <div
            style={{
              textAlign: "center",
              padding: "2rem",
              background: "rgba(20, 20, 20, 0.8)",
              border: "2px solid rgba(255,255,255,0.1)",
              borderRadius: "1rem",
              flex: "1 1 0",
              minWidth: "260px",
              maxWidth: "380px",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#4A90E2";
              e.currentTarget.style.boxShadow = "0 10px 40px rgba(74, 144, 226, 0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <h4 style={{ fontSize: "1.3rem", fontWeight: 900, marginBottom: "0.3rem" }}>
              {t("team.pierre.name")}
            </h4>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "11px",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: "#4A90E2",
                marginBottom: "1rem",
              }}
            >
              {t("pitch.pierre.role")}
            </div>
            <a
              href="mailto:pierre@studiomicho.com"
              style={{ color: "var(--gray)", textDecoration: "none", fontSize: "0.95rem", display: "block", marginBottom: "0.3rem", transition: "color 0.3s" }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "#4A90E2"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "var(--gray)"; }}
            >
              pierre@studiomicho.com
            </a>
            <a
              href="tel:+15149159370"
              style={{ color: "var(--gray)", textDecoration: "none", fontSize: "0.95rem", transition: "color 0.3s" }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "#4A90E2"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "var(--gray)"; }}
            >
              514 915-9370
            </a>
          </div>

          {/* Virginie */}
          <div
            style={{
              textAlign: "center",
              padding: "2rem",
              background: "rgba(20, 20, 20, 0.8)",
              border: "2px solid rgba(255,255,255,0.1)",
              borderRadius: "1rem",
              flex: "1 1 0",
              minWidth: "260px",
              maxWidth: "380px",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#9B59B6";
              e.currentTarget.style.boxShadow = "0 10px 40px rgba(155, 89, 182, 0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <h4 style={{ fontSize: "1.3rem", fontWeight: 900, marginBottom: "0.3rem" }}>
              {t("team.virginie.name")}
            </h4>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "11px",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: "#9B59B6",
                marginBottom: "1rem",
              }}
            >
              {t("pitch.virginie.role")}
            </div>
            <a
              href="mailto:virginiejaffredo@jaxa.ca"
              style={{ color: "var(--gray)", textDecoration: "none", fontSize: "0.95rem", display: "block", marginBottom: "0.3rem", transition: "color 0.3s" }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "#9B59B6"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "var(--gray)"; }}
            >
              virginiejaffredo@jaxa.ca
            </a>
            <a
              href="tel:+15145789989"
              style={{ color: "var(--gray)", textDecoration: "none", fontSize: "0.95rem", transition: "color 0.3s" }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "#9B59B6"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "var(--gray)"; }}
            >
              514 578-9989
            </a>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "12px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--gray)",
            opacity: 0.5,
            lineHeight: 1.8,
          }}
        >
          <div>Studio Micho {t("pitch.footerBy")}{" "}
            <a
              href="https://jaxa.ca"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "var(--gray)",
                textDecoration: "none",
                transition: "color 0.3s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "#4A90E2"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "var(--gray)"; }}
            >
              JAXA Production
            </a>
          </div>
          <div>Montréal</div>
        </div>
      </div>
    </section>
  );
};

export default Pitch;
