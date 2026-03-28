"use client";

import React from "react";
import { useTranslation } from "@/lib/i18n";

interface VerticalBrandProps {
  onNavigate?: () => void;
}

const VerticalBrand: React.FC<VerticalBrandProps> = ({ onNavigate }) => {
  const { t } = useTranslation();

  const menuItems = [
    { label: t("nav.services"), href: "#services" },
    { label: t("nav.projects"), href: "#projets" },
    { label: t("nav.advantage"), href: "#avantage" },
    { label: t("nav.contact"), href: "#contact" },
    { label: "JAXA", href: "https://jaxa.ca", external: true },
  ];

  const handleClick = (href: string) => {
    if (onNavigate) onNavigate();
    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      <div
        className="brand vertical-brand"
        style={{
          position: "fixed",
          left: "2rem",
          top: "2rem",
          bottom: "2rem",
          zIndex: 2100,
          display: "none",
          flexDirection: "column",
          alignItems: "center",
          gap: "clamp(0.5rem, 1vh, 1rem)",
        }}
      >
        {/* Logo */}
        <a href="#" onClick={(e) => { e.preventDefault(); handleClick("#"); }} style={{ lineHeight: 0, flexShrink: 0 }}>
          <img
            src="/studio-micho-icon.png"
            alt="Studio Micho"
            style={{
              width: "clamp(36px, 5vh, 48px)",
              height: "clamp(36px, 5vh, 48px)",
              borderRadius: "50%",
            }}
          />
        </a>

        {/* Title */}
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); handleClick("#"); }}
          style={{
            transform: "rotate(180deg)",
            fontSize: "clamp(1.8rem, 3vh, 2.5rem)",
            fontWeight: 900,
            color: "var(--white)",
            textDecoration: "none",
            writingMode: "vertical-rl",
            letterSpacing: "clamp(0.15rem, 0.3vh, 0.3rem)",
            transition: "color 0.3s ease",
            flexShrink: 0,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#4A90E2";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "var(--white)";
          }}
        >
          STUDIO MICHO
        </a>

        {/* Spacer */}
        <div style={{ flex: "0 0 clamp(0.5rem, 2vh, 2rem)" }} />

        {/* Desktop Nav */}
        <nav
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "clamp(0.6rem, 1.5vh, 2rem)",
          }}
        >
          {menuItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              onClick={item.external ? undefined : (e) => {
                e.preventDefault();
                handleClick(item.href);
              }}
              style={{
                color: "var(--white)",
                textDecoration: "none",
                fontSize: "clamp(0.55rem, 0.8vw, 0.8rem)",
                fontWeight: 600,
                letterSpacing: "clamp(0.1rem, 0.2vw, 0.2rem)",
                transition: "all 0.3s ease",
                textTransform: "lowercase",
                opacity: 0.7,
                writingMode: "vertical-rl",
                transform: "rotate(180deg)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#4A90E2";
                e.currentTarget.style.opacity = "1";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--white)";
                e.currentTarget.style.opacity = "0.5";
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
      <style jsx>{`
        @media (min-width: 969px) {
          .vertical-brand {
            display: flex !important;
          }
        }
      `}</style>
    </>
  );
};

export default VerticalBrand;
