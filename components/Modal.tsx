"use client";

import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "@/lib/i18n";

interface Project {
  id: string;
  name: string;
  description: string;
  tags: string[];
  color: string;
  imageUrl?: string;
  mobileImageUrl?: string;
  url?: string;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProjectId?: string;
}

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

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, initialProjectId }) => {
  const [isMobile, setIsMobile] = useState(false);
  const { t } = useTranslation();
  const contentRef = useRef<HTMLDivElement>(null);

  const projects: Project[] = [
    // Featured projects (from Portfolio)
    {
      id: "op2",
      name: "OP2",
      description: t("portfolio.op2.desc"),
      tags: [t("portfolio.op2.tag1"), t("portfolio.op2.tag2"), t("portfolio.op2.tag3")],
      color: "#4A90E2",
      imageUrl: "/images/op2-screenshot.jpg",
      mobileImageUrl: "/images/m-op2-screenshot.jpg",
      url: "https://www.op2na.com/",
    },
    {
      id: "tonic",
      name: "GROUPE TONIC",
      description: t("portfolio.tonic.desc"),
      tags: [t("portfolio.tonic.tag1"), t("portfolio.tonic.tag2"), t("portfolio.tonic.tag3")],
      color: "#9B59B6",
      imageUrl: "/images/tonic-screenshot.jpg",
      mobileImageUrl: "/images/m-tonic-screenshot.jpg",
      url: "https://www.groupetonic.ca",
    },
    {
      id: "gestion",
      name: t("portfolio.gestion.name"),
      description: t("portfolio.gestion.desc"),
      tags: [t("portfolio.gestion.tag1"), t("portfolio.gestion.tag2"), t("portfolio.gestion.tag3")],
      color: "#F39C12",
      imageUrl: "/images/gestion-screenshot.jpg",
      mobileImageUrl: "/images/m-gestion-screenshot.jpg",
      url: "/dashboards/",
    },
    // Additional projects
    {
      id: "aurea",
      name: "Auréa RH Conseil",
      description: t("modal.aurea.desc"),
      tags: [t("modal.aurea.tag1"), t("modal.aurea.tag2"), t("modal.aurea.tag3")],
      color: "#4A90E2",
      imageUrl: "/images/aurea-screenshot.jpg",
      mobileImageUrl: "/images/m-aurea-screenshot.jpg",
      url: "https://aurearhconseil.ca/",
    },
    {
      id: "intexto",
      name: "InTexto",
      description: t("modal.intexto.desc"),
      tags: [t("modal.intexto.tag1"), t("modal.intexto.tag2"), t("modal.intexto.tag3")],
      color: "#4A90E2",
      imageUrl: "/images/intexto-screenshot.jpg",
      mobileImageUrl: "/images/m-intexto-screenshot.jpg",
      url: "https://intexto.ca",
    },
    {
      id: "estimateur",
      name: t("portfolio.demo4.name"),
      description: t("portfolio.demo4.desc"),
      tags: [t("portfolio.demo4.sector"), "Estimateur"],
      color: "#E74C3C",
      imageUrl: "/images/estimateur-screenshot.jpg",
      mobileImageUrl: "/images/m-estimateur-screenshot.jpg",
      url: "https://estimateurdemo.netlify.app/",
    },
    {
      id: "gpc",
      name: "Grands Prix Cyclistes",
      description: t("modal.gpc.desc"),
      tags: [t("modal.gpc.tag1"), t("modal.gpc.tag2")],
      color: "#9B59B6",
      imageUrl: "/images/grandsprixcyclistes-screenshot.jpg",
      mobileImageUrl: "/images/m-grandsprixcyclistes-screenshot.jpg",
      url: "https://www.gpcqm-mtl.ca/",
    },
    {
      id: "organisme",
      name: t("modal.organisme.name"),
      description: t("modal.organisme.desc"),
      tags: [t("modal.organisme.tag1"), t("modal.organisme.tag2")],
      color: "#4A90E2",
      imageUrl: "/images/aide-screenshot.jpg",
      mobileImageUrl: "/images/m-aide-screenshot.jpg",
      url: "https://aideanonyme.netlify.app/",
    },
    {
      id: "cathfrancois",
      name: "Catherine François",
      description: t("modal.cathfrancois.desc"),
      tags: [t("modal.cathfrancois.tag1"), t("modal.cathfrancois.tag2")],
      color: "#4A90E2",
      imageUrl: "/images/cathfrancois-screenshot.jpg",
      mobileImageUrl: "/images/m-cathfrancois-screenshot.jpg",
      url: "https://cathfrancois.com/",
    },
    {
      id: "jeanharvey",
      name: "Jean Harvey",
      description: t("modal.jeanharvey.desc"),
      tags: [t("modal.jeanharvey.tag1"), t("modal.jeanharvey.tag2")],
      color: "#4A90E2",
      imageUrl: "/images/jeanharvey-screenshot.jpg",
      mobileImageUrl: "/images/m-jeanharvey-screenshot.jpg",
      url: "https://jeanharvey.ca/",
    },
    {
      id: "studio76",
      name: "Studio 76",
      description: t("modal.studio76.desc"),
      tags: [t("modal.studio76.tag1"), t("modal.studio76.tag2")],
      color: "#9B59B6",
      imageUrl: "/images/studio76-screenshot.jpg",
      mobileImageUrl: "/images/m-studio76-screenshot.jpg",
      url: "https://www.studio-76.ca/",
    },
  ];

  // Dashboard demo projects mapped to their mosaic IDs
  const dashboardProjects: Project[] = [
    {
      id: "dashboard-finance",
      name: t("portfolio.demo2.name"),
      description: t("portfolio.demo2.desc"),
      tags: ["Dashboard", "Finance"],
      color: "#9B59B6",
      imageUrl: "/images/finance-screenshot.jpg",
      mobileImageUrl: "/images/m-finance-screenshot.jpg",
      url: "https://demodashboardfinance.netlify.app/",
    },
    {
      id: "dashboard-comptable",
      name: t("portfolio.demo3.name"),
      description: t("portfolio.demo3.desc"),
      tags: ["Dashboard", t("portfolio.demo3.sector")],
      color: "#F39C12",
      imageUrl: "/images/compta-screenshot.jpg",
      mobileImageUrl: "/images/m-compta-screenshot.jpg",
      url: "https://comptablepro.netlify.app/",
    },
  ];

  const allProjects = [...projects, ...dashboardProjects];

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleEscape);
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 968);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // Scroll to targeted project when modal opens
  useEffect(() => {
    if (isOpen && initialProjectId) {
      const timer = setTimeout(() => {
        const el = document.querySelector(`[data-project="${initialProjectId}"]`);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 600); // After modal animation
      return () => clearTimeout(timer);
    }
  }, [isOpen, initialProjectId]);

  if (!isOpen) return null;

  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="modal active"
      onClick={handleBackgroundClick}
      style={{
        display: "flex",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(10, 18, 34, 0.98)",
        zIndex: 2000,
        overflowY: "auto",
        padding: "5rem 2rem 3rem 2rem",
        alignItems: "flex-start",
        justifyContent: "center",
      }}
    >
      <button
        className="modal-close"
        onClick={onClose}
        style={{
          position: "fixed",
          top: "calc(2rem + 25px)",
          right: "2rem",
          fontSize: "4rem",
          color: "#4A90E2",
          background: "none",
          border: "none",
          cursor: "pointer",
          fontWeight: 900,
          zIndex: 2001,
          transition: "all 0.3s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = "#9B59B6";
          e.currentTarget.style.transform = "rotate(90deg)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = "#4A90E2";
          e.currentTarget.style.transform = "rotate(0deg)";
        }}
      >
        ×
      </button>

      <div
        ref={contentRef}
        className="modal-content"
        style={{
          maxWidth: "1400px",
          width: "100%",
          position: "relative",
          animation: "modalSlideIn 0.5s ease-out",
          marginTop: "25px",
        }}
      >
        <h2
          className="modal-header"
          style={{
            fontSize: "clamp(3rem, 8vw, 8rem)",
            fontWeight: 900,
            marginBottom: "3rem",
            textAlign: "center",
            background: "linear-gradient(90deg, #4A90E2, #9B59B6, #F39C12)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {t("modal.title")}
        </h2>

        <div
          className="projects-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "3rem",
            maxWidth: "1200px",
            margin: "0 auto",
            paddingTop: "0",
          }}
        >
          {allProjects.map((project, index) => (
            <div
              key={index}
              className="modal-browser"
              data-project={project.id}
              style={{
                position: "relative",
              }}
            >
              <div
                className="browser-window"
                style={{
                  background: "rgba(20, 20, 20, 0.9)",
                  border: `3px solid ${project.color}`,
                  borderRadius: "1rem",
                  overflow: "hidden",
                  boxShadow: `0 0 60px ${project.color}80`,
                  position: "relative",
                  height: "360px",
                }}
              >
                <div
                  className="browser-bar"
                  style={{
                    height: "25px",
                    background: "rgba(40, 40, 40, 0.95)",
                    display: "flex",
                    alignItems: "center",
                    padding: "0 0.8rem",
                    gap: "0.4rem",
                  }}
                >
                  <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#FF5F56" }} />
                  <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#FFBD2E" }} />
                  <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#27C93F" }} />
                </div>
                <a
                  href={project.url || "#"}
                  target={project.url ? "_blank" : undefined}
                  rel={project.url ? "noopener noreferrer" : undefined}
                  className="browser-content"
                  style={{
                    height: isMobile ? "500px" : "335px",
                    background:
                      (project.mobileImageUrl && isMobile) || project.imageUrl
                        ? `linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 60%, rgba(0, 0, 0, 0.7) 100%), url(${project.mobileImageUrl && isMobile ? project.mobileImageUrl : project.imageUrl}) center/cover no-repeat`
                        : `linear-gradient(135deg, ${project.color}26, transparent)`,
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "flex-end",
                    padding: "1.5rem",
                    position: "relative",
                    cursor: project.url ? "pointer" : "default",
                    textDecoration: "none",
                  }}
                >
                  {!project.imageUrl &&
                    !(project.mobileImageUrl && isMobile) && (
                      <div
                        style={{
                          position: "absolute",
                          fontSize: "2rem",
                          fontWeight: 900,
                          opacity: 0.15,
                        }}
                      >
                        SCREENSHOT
                      </div>
                    )}
                  {project.url && project.imageUrl && (
                    <div
                      style={{
                        background: "rgba(0, 0, 0, 0.85)",
                        color: "var(--white)",
                        padding: "0.5rem 1rem",
                        borderRadius: "0.4rem",
                        fontSize: "0.8rem",
                        fontWeight: 700,
                        border: `1px solid ${project.color}`,
                        zIndex: 10,
                      }}
                    >
                      {t("portfolio.cta.default")} →
                    </div>
                  )}
                </a>
              </div>

              <div
                className="browser-info"
                style={{
                  position: "static",
                  textAlign: "left",
                  marginTop: "1.5rem",
                }}
              >
                <div
                  className="browser-name"
                  style={{
                    fontSize: "clamp(2rem, 4vw, 3rem)",
                    fontWeight: 900,
                    lineHeight: 0.9,
                    marginBottom: "0.8rem",
                    color: project.color,
                  }}
                >
                  {project.name}
                </div>
                <div
                  className="browser-desc"
                  style={{
                    fontSize: "1rem",
                    color: "var(--gray)",
                    marginBottom: "1rem",
                    lineHeight: 1.4,
                  }}
                >
                  {project.description}
                </div>
                <div
                  className="browser-tags"
                  style={{
                    display: "flex",
                    gap: "0.6rem",
                    justifyContent: "flex-start",
                    flexWrap: "wrap",
                  }}
                >
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="browser-tag"
                      style={{
                        background: "rgba(255, 255, 255, 0.1)",
                        border: "2px solid var(--white)",
                        padding: "0.5rem 1.5rem",
                        fontWeight: 900,
                        fontSize: "0.9rem",
                        textTransform: "uppercase",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Modal;
