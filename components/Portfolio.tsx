"use client";

import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "@/lib/i18n";

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 968);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile;
};

interface BrowserProps {
  name: string;
  description: string;
  tags: string[];
  color: "cyan" | "magenta" | "yellow";
  skew: number;
  delay: number;
  imageUrl?: string;
  projectUrl?: string;
  ctaLabel?: string;
  stat?: string;
}

const Browser: React.FC<BrowserProps> = ({
  name,
  description,
  tags,
  color,
  skew,
  delay,
  imageUrl,
  projectUrl,
  ctaLabel,
  stat,
}) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const { t } = useTranslation();

  const finalImageUrl =
    isMobile && imageUrl ? imageUrl.replace(/\/([^/]+)\./, "/m-$1.") : imageUrl;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsRevealed(true);
          }, delay);
          observer.unobserve(element);
        }
      },
      { threshold: 0.05 },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [delay]);

  const colorMap = {
    cyan: "#4A90E2",
    magenta: "#9B59B6",
    yellow: "#F39C12",
  };

  const borderColor = colorMap[color];

  return (
    <div
      ref={ref}
      className={`browser ${isRevealed ? "reveal" : ""}`}
      style={{
        position: "relative",
        width: "100%",
        maxWidth: "1000px",
        margin: "0 auto",
        transform: `skewY(${skew}deg)`,
        opacity: isRevealed ? 1 : 0,
        animation: isRevealed ? "smoothReveal 0.8s ease-out forwards" : "none",
        filter: `drop-shadow(0 0 60px ${borderColor}80)`,
      }}
    >
      {/* Title above screenshot */}
      <div
        className="browser-name"
        style={{
          fontSize: "clamp(3rem, 8vw, 8rem)",
          fontWeight: 900,
          lineHeight: 0.9,
          marginBottom: "2rem",
          paddingLeft: "2rem",
          color: borderColor,
        }}
      >
        {name}
      </div>

      {/* Screenshot */}
      <div
        className="browser-window"
        style={{
          background: "rgba(20, 20, 20, 0.9)",
          border: `3px solid ${borderColor}`,
          borderRadius: "1rem",
          position: "relative",
        }}
      >
        {isRevealed && (
          <div
            style={{
              content: "",
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "3px",
              background: `linear-gradient(90deg, transparent, ${borderColor}, transparent)`,
              boxShadow: `0 0 20px ${borderColor}`,
              animation: "scanLine 2s ease-out",
              zIndex: 10,
            }}
          />
        )}

        <div
          className="browser-bar"
          style={{
            height: "40px",
            background: "rgba(40, 40, 40, 0.95)",
            display: "flex",
            alignItems: "center",
            padding: "0 1rem",
            gap: "0.5rem",
            borderRadius: "1rem 1rem 0 0",
          }}
        >
          <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#FF5F56" }} />
          <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#FFBD2E" }} />
          <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#27C93F" }} />
        </div>

        <a
          href={projectUrl || "#"}
          target={projectUrl ? "_blank" : undefined}
          rel={projectUrl ? "noopener noreferrer" : undefined}
          className="browser-content"
          style={{
            height: "560px",
            overflow: "hidden",
            borderRadius: "0 0 1rem 1rem",
            background: finalImageUrl
              ? `linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 60%, rgba(0, 0, 0, 0.7) 100%), url(${finalImageUrl}) center/cover no-repeat`
              : color === "cyan"
                ? "linear-gradient(135deg, rgba(0, 245, 255, 0.15), transparent)"
                : color === "magenta"
                  ? "linear-gradient(135deg, rgba(255, 0, 255, 0.15), transparent)"
                  : "linear-gradient(135deg, rgba(255, 255, 0, 0.15), transparent)",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "flex-end",
            padding: "2rem",
            position: "relative",
            cursor: projectUrl ? "pointer" : "default",
            transition: "transform 0.3s ease",
            textDecoration: "none",
          }}
          onMouseEnter={(e) => {
            if (projectUrl) {
              e.currentTarget.style.transform = "scale(1.02)";
            }
          }}
          onMouseLeave={(e) => {
            if (projectUrl) {
              e.currentTarget.style.transform = "scale(1)";
            }
          }}
        >
          {!finalImageUrl && (
            <div
              style={{
                position: "absolute",
                fontSize: "3rem",
                fontWeight: 900,
                opacity: 0.2,
                color: "var(--white)",
              }}
            >
              {t("portfolio.screenshot")}
            </div>
          )}
          {projectUrl && finalImageUrl && (
            <div
              style={{
                background: "rgba(0, 0, 0, 0.9)",
                color: "var(--white)",
                padding: "0.75rem 1.5rem",
                borderRadius: "0.5rem",
                fontSize: "1rem",
                fontWeight: 700,
                border: `2px solid ${borderColor}`,
                transition: "all 0.3s ease",
                zIndex: 10,
              }}
            >
              {ctaLabel || t("portfolio.cta.default")} →
            </div>
          )}
        </a>
      </div>

      {/* Info below screenshot */}
      <div
        className="browser-info"
        style={{
          position: "relative",
          marginTop: "3rem",
          paddingRight: "2rem",
          textAlign: "right",
        }}
      >
        <div
          className="browser-desc"
          style={{
            fontSize: "1.3rem",
            color: "var(--white)",
            maxWidth: "600px",
            marginBottom: "1rem",
            lineHeight: "1.6",
          }}
        >
          {description}
        </div>
        {stat && (
          <div
            style={{
              fontSize: "1rem",
              color: borderColor,
              fontFamily: "'JetBrains Mono', monospace",
              letterSpacing: "0.05em",
              marginBottom: "1rem",
              opacity: 0.9,
            }}
          >
            {stat}
          </div>
        )}
        <div
          className="browser-tags"
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "flex-end",
            flexWrap: "wrap",
          }}
        >
          {tags.map((tag, index) => (
            <span
              key={index}
              className="browser-tag"
              style={{
                background: "rgba(255, 255, 255, 0.1)",
                border: "2px solid var(--white)",
                padding: "0.5rem 1.5rem",
                fontWeight: 900,
                fontSize: "1rem",
                textTransform: "uppercase",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ─── Demo Card ─── */
interface DemoCardProps {
  name: string;
  sector: string;
  description: string;
  url: string;
  color: string;
  ctaLabel: string;
}

const DemoCard: React.FC<DemoCardProps> = ({ name, sector, description, url, color, ctaLabel }) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="demo-card"
      style={{
        background: "rgba(20, 20, 20, 0.8)",
        border: "2px solid rgba(255,255,255,0.1)",
        borderRadius: "1rem",
        padding: "clamp(1.5rem, 2vw, 2rem)",
        transition: "all 0.3s ease",
        position: "relative",
        overflow: "hidden",
        textDecoration: "none",
        display: "block",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = color;
        e.currentTarget.style.boxShadow = `0 20px 60px ${color}33`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Top gradient line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "3px",
          background: `linear-gradient(90deg, ${color}, transparent)`,
        }}
      />
      <h4
        style={{
          fontSize: "clamp(1.2rem, 1.5vw, 1.5rem)",
          fontWeight: 900,
          marginBottom: "0.3rem",
          color: "var(--white)",
        }}
      >
        {name}
      </h4>
      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "11px",
          textTransform: "uppercase",
          letterSpacing: "0.15em",
          color: color,
          marginBottom: "1.2rem",
        }}
      >
        {sector}
      </div>
      <p
        style={{
          fontSize: "14px",
          color: "var(--gray)",
          lineHeight: 1.6,
          marginBottom: "1.5rem",
        }}
      >
        {description}
      </p>
      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "12px",
          textTransform: "uppercase",
          letterSpacing: "0.12em",
          color: color,
        }}
      >
        {ctaLabel} →
      </div>
    </a>
  );
};

/* ─── Portfolio Section ─── */
interface PortfolioProps {
  onOpenModal: () => void;
}

const Portfolio: React.FC<PortfolioProps> = ({ onOpenModal }) => {
  const { t } = useTranslation();

  return (
    <section
      className="proof-section"
      style={{
        background: "var(--bg-dark)",
        flexDirection: "column",
        position: "relative",
      }}
    >
      {/* Floating shapes */}
      <div
        style={{
          position: "absolute",
          width: "250px",
          height: "250px",
          borderRadius: "50%",
          background: "#E74C3C",
          opacity: 0.09,
          right: "5%",
          top: "10%",
          animation: "float 7s ease-in-out infinite",
          zIndex: 2,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: "#4A90E2",
          opacity: 0.09,
          left: "3%",
          bottom: "15%",
          animation: "float 9s ease-in-out infinite reverse",
          zIndex: 2,
        }}
      />

      <div
        className="proof-container"
        style={{
          maxWidth: "1800px",
          width: "100%",
          position: "relative",
          zIndex: 10,
        }}
      >
        <h2
          className="proof-header"
          style={{
            fontSize: "clamp(3rem, 9vw, 11.25rem)",
            fontWeight: 900,
            marginBottom: "2rem",
            textAlign: "center",
            lineHeight: 0.9,
          }}
        >
          {t("portfolio.title")}{" "}
          <span className="gradient-text">{t("portfolio.titleHighlight")}</span>
        </h2>
        <p
          className="proof-subtitle"
          style={{
            fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)",
            textAlign: "center",
            color: "var(--gray)",
            marginBottom: "6rem",
            maxWidth: "800px",
            margin: "0 auto 6rem",
          }}
        >
          {t("portfolio.subtitle")}
        </p>

        <div
          className="browsers"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10rem",
          }}
        >
          <Browser
            name="OP2"
            description={t("portfolio.op2.desc")}
            tags={[t("portfolio.op2.tag1"), t("portfolio.op2.tag2"), t("portfolio.op2.tag3")]}
            color="cyan"
            skew={-1}
            delay={0}
            imageUrl="/images/op2-screenshot.jpg"
            projectUrl="https://www.op2na.com/"
          />

          <Browser
            name="GROUPE TONIC"
            description={t("portfolio.tonic.desc")}
            tags={[t("portfolio.tonic.tag1"), t("portfolio.tonic.tag2"), t("portfolio.tonic.tag3")]}
            color="magenta"
            skew={1}
            delay={150}
            imageUrl="/images/tonic-screenshot.jpg"
            projectUrl="https://www.groupetonic.ca"
          />

          <Browser
            name={t("portfolio.gestion.name")}
            description={t("portfolio.gestion.desc")}
            tags={[t("portfolio.gestion.tag1"), t("portfolio.gestion.tag2"), t("portfolio.gestion.tag3")]}
            color="yellow"
            skew={-1}
            delay={300}
            imageUrl="/images/gestion-screenshot.jpg"
          />
        </div>

        {/* ─── Demos Section ─── */}
        <div id="demos" style={{ marginTop: "12rem" }}>
          <h3
            style={{
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              fontWeight: 900,
              textAlign: "center",
              marginBottom: "1rem",
            }}
          >
            <span className="gradient-text">{t("portfolio.demos.title")}</span>
          </h3>
          <p
            style={{
              fontSize: "clamp(1rem, 1.5vw, 1.3rem)",
              textAlign: "center",
              color: "var(--gray)",
              marginBottom: "3rem",
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
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "1.5rem",
              maxWidth: "1200px",
              margin: "0 auto",
            }}
          >
            <DemoCard
              name={t("portfolio.demo1.name")}
              sector={t("portfolio.demo1.sector")}
              description={t("portfolio.demo1.desc")}
              url="https://accueildemo.netlify.app/"
              color="#4A90E2"
              ctaLabel={t("portfolio.cta.demo")}
            />
            <DemoCard
              name={t("portfolio.demo2.name")}
              sector={t("portfolio.demo2.sector")}
              description={t("portfolio.demo2.desc")}
              url="https://demodashboardfinance.netlify.app/"
              color="#9B59B6"
              ctaLabel={t("portfolio.cta.demo")}
            />
            <DemoCard
              name={t("portfolio.demo3.name")}
              sector={t("portfolio.demo3.sector")}
              description={t("portfolio.demo3.desc")}
              url="https://comptablepro.netlify.app/"
              color="#F39C12"
              ctaLabel={t("portfolio.cta.demo")}
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
            Données fictives — Démos interactives en ligne
          </p>
        </div>

        <button
          className="more-projects-btn"
          onClick={onOpenModal}
          style={{
            marginTop: "6rem",
            padding: "1.5rem 4rem",
            background: "transparent",
            border: "3px solid #4A90E2",
            color: "#4A90E2",
            fontSize: "1.5rem",
            fontWeight: 900,
            textTransform: "uppercase",
            letterSpacing: "2px",
            cursor: "pointer",
            transition: "all 0.3s ease",
            position: "relative",
            overflow: "hidden",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "var(--bg-dark)";
            const before = e.currentTarget.querySelector(
              ".btn-before",
            ) as HTMLDivElement;
            if (before) before.style.left = "0";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "#4A90E2";
            const before = e.currentTarget.querySelector(
              ".btn-before",
            ) as HTMLDivElement;
            if (before) before.style.left = "-100%";
          }}
        >
          <div
            className="btn-before"
            style={{
              content: "",
              position: "absolute",
              top: 0,
              left: "-100%",
              width: "100%",
              height: "100%",
              background: "#4A90E2",
              transition: "left 0.3s ease",
              zIndex: -1,
            }}
          />
          {t("portfolio.more")}
        </button>
      </div>

      {/* Responsive */}
      <style jsx>{`
        @media (max-width: 768px) {
          .demos-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Portfolio;
