"use client";

import React from "react";
import { useTranslation } from "@/lib/i18n";

const Advantage: React.FC = () => {
  const { t } = useTranslation();

  const advantages = [
    {
      title: t("advantage.1.title"),
      description: t("advantage.1.desc"),
    },
    {
      title: t("advantage.2.title"),
      description: t("advantage.2.desc"),
    },
    {
      title: t("advantage.3.title"),
      description: t("advantage.3.desc"),
    },
    {
      title: t("advantage.4.title"),
      description: t("advantage.4.desc"),
    },
    {
      title: t("advantage.5.title"),
      description: t("advantage.5.desc"),
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
          {t("advantage.title1")}
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
            {t("advantage.title2")}
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
