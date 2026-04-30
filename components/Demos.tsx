"use client";

import React, { useEffect, useState } from "react";
import { useTranslation } from "@/lib/i18n";

interface DemoCardProps {
  name: string;
  sector: string;
  url: string;
  color: string;
  ctaLabel: string;
  imageUrl: string;
  mobileImageUrl: string;
  isMobile: boolean;
}

const DemoCard: React.FC<DemoCardProps> = ({ name, sector, url, color, ctaLabel, imageUrl, mobileImageUrl, isMobile }) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="demo-card"
      style={{
        textDecoration: "none",
        display: "block",
        transition: "transform 0.3s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {/* Browser frame with screenshot */}
      <div
        style={{
          background: "rgba(20, 20, 20, 0.9)",
          border: `2px solid rgba(255,255,255,0.1)`,
          borderRadius: "0.6rem",
          overflow: "hidden",
          position: "relative",
          transition: "border-color 0.3s ease, box-shadow 0.3s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = color;
          e.currentTarget.style.boxShadow = `0 15px 40px ${color}25`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        {/* Browser bar */}
        <div
          style={{
            height: "20px",
            background: "rgba(40, 40, 40, 0.95)",
            display: "flex",
            alignItems: "center",
            padding: "0 0.5rem",
            gap: "0.3rem",
          }}
        >
          <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#FF5F56" }} />
          <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#FFBD2E" }} />
          <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#27C93F" }} />
        </div>
        {/* Screenshot */}
        <div style={{ aspectRatio: isMobile ? "9 / 16" : "16 / 10", overflow: "hidden" }}>
          <img
            src={isMobile ? mobileImageUrl : imageUrl}
            alt={name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        </div>
      </div>

      {/* Info below */}
      <div style={{ padding: "0.8rem 0.2rem 0" }}>
        <div style={{ fontSize: "clamp(1rem, 1.3vw, 1.2rem)", fontWeight: 900, color: "var(--white)", marginBottom: "0.2rem" }}>
          {name}
        </div>
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "10px",
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            color: color,
          }}
        >
          {sector} · {ctaLabel} →
        </div>
      </div>
    </a>
  );
};

interface DemosProps {
  onOpenModal: () => void;
}

const Demos: React.FC<DemosProps> = ({ onOpenModal }) => {
  const { t } = useTranslation();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 968);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section
      style={{
        background: "linear-gradient(180deg, #0f1a2e 0%, #0c1626 100%)",
        flexDirection: "column",
        position: "relative",
      }}
    >
      <div style={{ maxWidth: "1200px", width: "100%", zIndex: 10 }}>
        <h2
          style={{
            fontSize: "clamp(2.5rem, 5vw, 5rem)",
            fontWeight: 900,
            textAlign: "center",
            marginBottom: "1rem",
          }}
        >
          {t("portfolio.demos.title").split(" ").map((word, i) => (
            <span key={i}>
              {i === 0 ? <span style={{ color: "var(--white)" }}>{word}</span> : <span className="gradient-text">{word}</span>}
              {" "}
            </span>
          ))}
        </h2>
        <p
          style={{
            fontSize: "clamp(1rem, 1.5vw, 1.3rem)",
            textAlign: "center",
            color: "var(--gray)",
            maxWidth: "600px",
            margin: "0 auto 3rem",
          }}
        >
          {t("portfolio.demos.subtitle")}
        </p>

        <div
          className="demos-grid"
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(3, 1fr)",
            gap: "1.5rem",
            margin: "0 auto",
          }}
        >
          <DemoCard
            name={t("portfolio.demo1.name")}
            sector={t("portfolio.demo1.sector")}
            url="https://accueildemo.netlify.app/"
            color="#4A90E2"
            ctaLabel={t("portfolio.cta.demo")}
            imageUrl="/images/gestion-screenshot.jpg"
            mobileImageUrl="/images/m-gestion-screenshot.jpg"
            isMobile={isMobile}
          />
          <DemoCard
            name={t("portfolio.demo2.name")}
            sector={t("portfolio.demo2.sector")}
            url="https://demodashboardfinance.netlify.app/"
            color="#9B59B6"
            ctaLabel={t("portfolio.cta.demo")}
            imageUrl="/images/finance-screenshot.jpg"
            mobileImageUrl="/images/m-finance-screenshot.jpg"
            isMobile={isMobile}
          />
          <DemoCard
            name={t("portfolio.demo3.name")}
            sector={t("portfolio.demo3.sector")}
            url="https://comptablepro.netlify.app/"
            color="#F39C12"
            ctaLabel={t("portfolio.cta.demo")}
            imageUrl="/images/compta-screenshot.jpg"
            mobileImageUrl="/images/m-compta-screenshot.jpg"
            isMobile={isMobile}
          />
        </div>
        <p
          style={{
            textAlign: "center",
            fontSize: "13px",
            color: "var(--gray)",
            fontStyle: "italic",
            marginTop: "1.5rem",
            opacity: 0.7,
          }}
        >
          {t("portfolio.demos.disclaimer")}
        </p>

        <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
          <button
            onClick={onOpenModal}
            style={{
              padding: "1rem 3rem",
              background: "transparent",
              border: "2px solid #4A90E2",
              color: "#4A90E2",
              fontSize: "1rem",
              fontWeight: 700,
              letterSpacing: "1px",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#4A90E2";
              e.currentTarget.style.color = "#4A90E2";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.25)";
              e.currentTarget.style.color = "rgba(255, 255, 255, 0.7)";
            }}
          >
            {t("portfolio.more")}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Demos;
