"use client";

import React, { useEffect, useState } from "react";
import { useTypewriter } from "@/hooks/useTypewriter";
import { useTranslation } from "@/lib/i18n";

interface MosaicProject {
  id: string;
  name: string;
  mobileName?: string;
  imageUrl: string;
  mobileImageUrl?: string;
}

const PROJECTS: MosaicProject[] = [
  { id: "op2", name: "OP2", imageUrl: "/images/op2-screenshot.jpg", mobileImageUrl: "/images/m-op2-screenshot.jpg" },
  { id: "tonic", name: "Groupe Tonic", imageUrl: "/images/tonic-screenshot.jpg", mobileImageUrl: "/images/m-tonic-screenshot.jpg" },
  { id: "aurea", name: "Auréa RH Conseil", imageUrl: "/images/aurea-screenshot.jpg", mobileImageUrl: "/images/m-aurea-screenshot.jpg" },
  { id: "intexto", name: "InTexto", imageUrl: "/images/intexto-screenshot.jpg", mobileImageUrl: "/images/m-intexto-screenshot.jpg" },
  { id: "dashboard-finance", name: "Dashboard Financier", mobileName: "Finance", imageUrl: "/images/finance-screenshot.jpg", mobileImageUrl: "/images/m-finance-screenshot.jpg" },
  { id: "dashboard-comptable", name: "Dashboard Comptabilité", mobileName: "Comptabilité", imageUrl: "/images/compta-screenshot.jpg", mobileImageUrl: "/images/m-compta-screenshot.jpg" },
];

// Desktop: all 6, Mobile: 4 with real mobile screenshots
const MOBILE_IDS = ["op2", "tonic", "dashboard-finance", "dashboard-comptable"];

interface HeroProps {
  onOpenModal: (projectId: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onOpenModal }) => {
  const { t } = useTranslation();
  const [showMosaic, setShowMosaic] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 968);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const line1 = useTypewriter({
    text: t("hero.line1"),
    speed: 25,
    delay: 500,
    showCursor: true,
    permanentCursor: false,
  });

  const line2 = useTypewriter({
    text: t("hero.line2"),
    speed: 25,
    delay: 500,
    showCursor: true,
    permanentCursor: false,
    enabled: line1.isComplete,
  });

  const line3 = useTypewriter({
    text: t("hero.line3"),
    speed: 23,
    delay: 400,
    showCursor: true,
    permanentCursor: false,
    enabled: line2.isComplete,
  });

  const line4 = useTypewriter({
    text: t("hero.line4"),
    speed: 23,
    delay: 200,
    showCursor: true,
    permanentCursor: true,
    enabled: line3.isComplete,
  });

  // Trigger mosaic after typewriter finishes
  useEffect(() => {
    if (line4.isComplete) {
      const timer = setTimeout(() => setShowMosaic(true), 1500);
      return () => clearTimeout(timer);
    }
  }, [line4.isComplete]);

  const visibleProjects = isMobile
    ? PROJECTS.filter((p) => MOBILE_IDS.includes(p.id))
    : PROJECTS;

  return (
    <section
      className="hero"
      style={{
        background:
          "linear-gradient(135deg, #0f1a2e 0%, #162544 100%)",
        position: "relative",
        flexDirection: "column",
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
          opacity: 0.12,
          left: "-5%",
          bottom: "10%",
          animation: "float 12s ease-in-out infinite",
          zIndex: 1,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "250px",
          height: "250px",
          borderRadius: "50%",
          background: "#9B59B6",
          opacity: 0.1,
          right: "5%",
          top: "15%",
          animation: "float 10s ease-in-out infinite reverse",
          zIndex: 1,
        }}
      />

      {/* Terminal */}
      <h1
        className="terminal"
        style={{
          maxWidth: "900px",
          width: "100%",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "1.8rem",
          lineHeight: "1.8",
          position: "relative",
          zIndex: 10,
          opacity: showMosaic ? 0 : 1,
          transition: "opacity 0.8s ease",
          pointerEvents: showMosaic ? "none" : "auto",
          fontWeight: 400,
          margin: 0,
        }}
      >
        <div
          style={{
            fontSize: "0.75rem",
            color: "rgba(255,255,255,0.25)",
            marginBottom: "1.5rem",
            letterSpacing: "0.05em",
          }}
        >
          ~/studio-micho $
        </div>
        <div
          className="terminal-line"
          style={{ minHeight: "2.7rem", marginBottom: "1.2rem" }}
          dangerouslySetInnerHTML={{ __html: line1.displayedText }}
        />
        <div
          className="terminal-line"
          style={{ minHeight: "2.7rem", marginBottom: "1.2rem" }}
          dangerouslySetInnerHTML={{ __html: line2.displayedText }}
        />
        <div
          className="terminal-line"
          style={{ minHeight: "2.7rem" }}
          dangerouslySetInnerHTML={{ __html: line3.displayedText }}
        />
        <div
          className="terminal-line"
          style={{ minHeight: "2.7rem" }}
          dangerouslySetInnerHTML={{ __html: line4.displayedText }}
        />
      </h1>

      {/* Mosaic */}
      {showMosaic && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
            padding: isMobile ? "calc(4.5rem + 30px) 1.5rem 5rem" : "calc(4rem + 40px) 4rem 4rem",
          }}
        >
          <div className="mosaic-grid">
            {visibleProjects.map((project, index) => (
              <div
                key={project.id}
                className="mosaic-cell"
                onClick={() => onOpenModal(project.id)}
                style={{
                  animation: `mosaicFadeIn 0.6s ease-out ${index * 100}ms both`,
                  cursor: "pointer",
                }}
              >
                <div className="mosaic-item">
                  <div className="mosaic-bar">
                    <div className="mosaic-dot" style={{ background: "#FF5F56" }} />
                    <div className="mosaic-dot" style={{ background: "#FFBD2E" }} />
                    <div className="mosaic-dot" style={{ background: "#27C93F" }} />
                  </div>
                  <img
                    src={isMobile && project.mobileImageUrl ? project.mobileImageUrl : project.imageUrl}
                    alt={project.name}
                    loading="eager"
                    style={{ paddingTop: "20px" }}
                  />
                </div>
                <div className="mosaic-label">{isMobile && project.mobileName ? project.mobileName : project.name}</div>
              </div>
            ))}
          </div>

          {/* Plus de projets button */}
          <button
            onClick={() => onOpenModal("")}
            style={{
              marginTop: isMobile ? "calc(0.8rem + 12px)" : "2.5rem",
              padding: isMobile ? "0.5rem 1.5rem" : "1rem 3rem",
              background: "transparent",
              border: isMobile ? "1px solid #4A90E2" : "2px solid #4A90E2",
              color: "#4A90E2",
              fontSize: isMobile ? "0.65rem" : "1rem",
              fontWeight: 700,
              letterSpacing: "1px",
              cursor: "pointer",
              transition: "all 0.3s ease",
              animation: `mosaicFadeIn 0.6s ease-out ${visibleProjects.length * 100}ms both`,
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
      )}

    </section>
  );
};

export default Hero;
