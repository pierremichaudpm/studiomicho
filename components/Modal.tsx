"use client";

import React, { useEffect } from "react";

interface Project {
  name: string;
  description: string;
  tags: string[];
  color: string;
  imageUrl?: string;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const projects: Project[] = [
  {
    name: "OP2",
    description:
      "Firme d'ingénierie — Site corporatif avec gestion RFP IA. 3 semaines, conception à déploiement.",
    tags: ["Solo", "IA", "3 Semaines"],
    color: "#4A90E2",
    imageUrl: "/images/op2-screenshot.png",
  },
  {
    name: "GPCQM",
    description:
      "PWA Grands Prix Cyclistes. Application spectateurs live. Milliers d'usagers en temps réel.",
    tags: ["PWA", "Live", "Production"],
    color: "#9B59B6",
    imageUrl: "/images/gpcqm-screenshot.png",
  },
  {
    name: "GROUPE TONIC",
    description:
      "Site corporatif complet. Construction solo avec IA. Livraison express en temps record.",
    tags: ["Corporate", "Express", "Déployé"],
    color: "#F39C12",
    imageUrl: "/images/groupe-tonic-screenshot.png",
  },
];

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
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
        padding: "4rem 2rem",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <button
        className="modal-close"
        onClick={onClose}
        style={{
          position: "fixed",
          top: "2rem",
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
        }}
      >
        <h2
          className="modal-header"
          style={{
            fontSize: "clamp(3rem, 8vw, 8rem)",
            fontWeight: 900,
            marginBottom: "4rem",
            textAlign: "center",
            background: "linear-gradient(90deg, #4A90E2, #9B59B6, #F39C12)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Autres projets
        </h2>

        <div
          className="projects-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "3rem",
            maxWidth: "1200px",
            margin: "0 auto",
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
                  boxShadow: `0 25px 80px ${project.color.replace(")", ", 0.4)").replace("rgb", "rgba")}`,
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
                <div
                  className="browser-content"
                  style={{
                    height: "335px",
                    background: project.imageUrl
                      ? `linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 60%, rgba(0, 0, 0, 0.7) 100%), url(${project.imageUrl}) center/cover no-repeat`
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
                  }}
                >
                  {!project.imageUrl && (
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
                </div>
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
