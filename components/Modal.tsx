"use client";

import React, { useEffect, useState } from "react";
import { useTranslation } from "@/lib/i18n";

interface Project {
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
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [isMobile, setIsMobile] = useState(false);
  const { t } = useTranslation();

  const projects: Project[] = [
    {
      name: "InTexto",
      description: t("modal.intexto.desc"),
      tags: [t("modal.intexto.tag1"), t("modal.intexto.tag2"), t("modal.intexto.tag3")],
      color: "#4A90E2",
      imageUrl: "/images/intexto-screenshot.jpg",
      mobileImageUrl: "/images/m-intexto-screenshot.jpg",
      url: "https://intexto.ca",
    },
    {
      name: "Grands Prix Cyclistes",
      description: t("modal.gpc.desc"),
      tags: [t("modal.gpc.tag1"), t("modal.gpc.tag2")],
      color: "#9B59B6",
      imageUrl: "/images/grandsprixcyclistes-screenshot.jpg",
      mobileImageUrl: "/images/m-grandsprixcyclistes-screenshot.jpg",
      url: "https://www.gpcqm-mtl.ca/",
    },
    {
      name: "Jaxa Production",
      description: t("modal.jaxa.desc"),
      tags: [t("modal.jaxa.tag1"), t("modal.jaxa.tag2"), t("modal.jaxa.tag3")],
      color: "#F39C12",
      imageUrl: "/images/jaxa-screenshot.jpg",
      mobileImageUrl: "/images/m-jaxa-screenshot.jpg",
      url: "https://jaxanew.netlify.app/",
    },
    {
      name: t("modal.organisme.name"),
      description: t("modal.organisme.desc"),
      tags: [t("modal.organisme.tag1"), t("modal.organisme.tag2")],
      color: "#4A90E2",
      imageUrl: "/images/aide-screenshot.jpg",
      mobileImageUrl: "/images/m-aide-screenshot.jpg",
      url: "https://aideanonyme.netlify.app/",
    },
    {
      name: "Catherine François",
      description: t("modal.cathfrancois.desc"),
      tags: [t("modal.cathfrancois.tag1"), t("modal.cathfrancois.tag2")],
      color: "#4A90E2",
      imageUrl: "/images/cathfrancois-screenshot.jpg",
      mobileImageUrl: "/images/m-cathfrancois-screenshot.jpg",
      url: "https://cathfrancois.com/",
    },
    {
      name: "Jaxa Gomme Balloune",
      description: t("modal.jaxagomme.desc"),
      tags: [t("modal.jaxagomme.tag1"), t("modal.jaxagomme.tag2")],
      color: "#F39C12",
      imageUrl: "/images/jaxagomme-screenshot.jpg",
      mobileImageUrl: "/images/m-jaxagomme-screenshot.jpg",
      url: "https://jaxaprod.netlify.app/",
    },
    {
      name: "Jean Harvey",
      description: t("modal.jeanharvey.desc"),
      tags: [t("modal.jeanharvey.tag1"), t("modal.jeanharvey.tag2")],
      color: "#4A90E2",
      imageUrl: "/images/jeanharvey-screenshot.jpg",
      mobileImageUrl: "/images/m-jeanharvey-screenshot.jpg",
      url: "https://jeanharvey.ca/",
    },
    {
      name: "Studio 76",
      description: t("modal.studio76.desc"),
      tags: [t("modal.studio76.tag1"), t("modal.studio76.tag2")],
      color: "#9B59B6",
      imageUrl: "/images/studio76-screenshot.jpg",
      mobileImageUrl: "/images/m-studio76-screenshot.jpg",
      url: "https://www.studio-76.ca/",
    },
    {
      name: "La Maison LeRoy",
      description: t("modal.maisonleroy.desc"),
      tags: [t("modal.maisonleroy.tag1")],
      color: "#F39C12",
      imageUrl: "/images/maisonleroy-screenshot.jpg",
      mobileImageUrl: "/images/m-maisonleroy-screenshot.jpg",
      url: "https://maisonleroy.info/",
    },
  ];

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
        background: "rgba(0, 0, 0, 0.95)",
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
          {projects.map((project, index) => (
            <div
              key={index}
              className="modal-browser"
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
                  <div
                    className="browser-dot dot-red"
                    style={{
                      width: "10px",
                      height: "10px",
                      borderRadius: "50%",
                      background: "#FF5F56",
                    }}
                  />
                  <div
                    className="browser-dot dot-yellow"
                    style={{
                      width: "10px",
                      height: "10px",
                      borderRadius: "50%",
                      background: "#FFBD2E",
                    }}
                  />
                  <div
                    className="browser-dot dot-green"
                    style={{
                      width: "10px",
                      height: "10px",
                      borderRadius: "50%",
                      background: "#27C93F",
                    }}
                  />
                </div>
                <a
                  href={project.url || "#"}
                  target={project.url ? "_blank" : undefined}
                  rel={project.url ? "noopener noreferrer" : undefined}
                  className="browser-content"
                  style={{
                    height: "335px",
                    background:
                      (project.mobileImageUrl && isMobile) || project.imageUrl
                        ? `linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 60%, rgba(0, 0, 0, 0.7) 100%), url(${project.mobileImageUrl && isMobile ? project.mobileImageUrl : project.imageUrl}) center/cover no-repeat`
                        : project.color === "#4A90E2"
                          ? "linear-gradient(135deg, rgba(0, 245, 255, 0.15), transparent)"
                          : project.color === "#9B59B6"
                            ? "linear-gradient(135deg, rgba(255, 0, 255, 0.15), transparent)"
                            : "linear-gradient(135deg, rgba(255, 255, 0, 0.15), transparent)",
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
