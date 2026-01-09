"use client";

import React, { useEffect, useRef, useState } from "react";

// Hook to detect mobile screen
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
}) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  // Use mobile image if available
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
      { threshold: 0.1 },
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
        animation: isRevealed ? "smoothReveal 2s ease-out forwards" : "none",
      }}
    >
      <div
        className="browser-window"
        style={{
          background: "rgba(20, 20, 20, 0.9)",
          border: `3px solid ${borderColor}`,
          borderRadius: "1rem",
          overflow: "hidden",
          boxShadow: `0 30px 80px ${borderColor}4D`,
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
          }}
        >
          <div
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              background: "#FF5F56",
            }}
          />
          <div
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              background: "#FFBD2E",
            }}
          />
          <div
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              background: "#27C93F",
            }}
          />
        </div>

        <a
          href={projectUrl || "#"}
          target={projectUrl ? "_blank" : undefined}
          rel={projectUrl ? "noopener noreferrer" : undefined}
          className="browser-content"
          style={{
            height: "560px",
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
            overflow: "hidden",
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
              SCREENSHOT ICI
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
              Voir le projet →
            </div>
          )}
        </a>
      </div>

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
          className="browser-name"
          style={{
            fontSize: "clamp(3rem, 8vw, 8rem)",
            fontWeight: 900,
            lineHeight: 0.9,
            marginBottom: "1rem",
            color: borderColor,
          }}
        >
          {name}
        </div>
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

interface PortfolioProps {
  onOpenModal: () => void;
}

const Portfolio: React.FC<PortfolioProps> = ({ onOpenModal }) => {
  return (
    <section
      className="proof-section"
      style={{
        background: "var(--bg-dark)",
        flexDirection: "column",
        position: "relative",
        paddingTop: "8rem",
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
          opacity: 0.2,
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
          background: "#4A90E2",
          opacity: 0.15,
          left: "3%",
          bottom: "15%",
          transform: "rotate(45deg)",
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
            fontSize: "clamp(4rem, 12vw, 15rem)",
            fontWeight: 900,
            marginBottom: "6rem",
            textAlign: "center",
            lineHeight: 0.9,
          }}
        >
          <span className="gradient-text">Portfolio</span>
        </h2>

        <div
          className="browsers"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "6rem",
          }}
        >
          <Browser
            name="OP2"
            description="Firme d'ingénierie — Site vitrine corporatif. 5 semaines, conception à déploiement."
            tags={["Solo", "Corporate", "5 Semaines"]}
            color="cyan"
            skew={-1}
            delay={0}
            imageUrl="/images/op2-screenshot.png"
            projectUrl="https://www.op2na.com/"
          />

          <Browser
            name="GROUPE TONIC"
            description="Site corporatif complet. CMS custom. Construction solo avec IA. Livraison express en temps record. 3 semaines."
            tags={["Corporate", "CMS", "3 Semaines"]}
            color="magenta"
            skew={1}
            delay={300}
            imageUrl="/images/tonic-screenshot.png"
            projectUrl="https://www.groupetonic.ca"
          />

          <Browser
            name="JAXA PRODUCTION"
            description="Site corporatif production immersive. Design audacieux."
            tags={["En construction", "Bold Design", "Immersif"]}
            color="yellow"
            skew={-1}
            delay={600}
            imageUrl="/images/jaxa-screenshot.png"
            projectUrl="https://jaxanew.netlify.app/"
          />
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
          Plus de projets
        </button>
      </div>
    </section>
  );
};

export default Portfolio;
