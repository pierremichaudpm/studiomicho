"use client";

import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "@/lib/i18n";

const SECTION_COLORS: Record<string, string> = {
  hero: "#0f1a2e",
  equipe: "#030712",
  services: "#0a1128",
  demos: "#030712",
  projets: "#030712",
  avantage: "#0a1128",
  methode: "#030712",
  contact: "#030712",
};

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [headerBg, setHeaderBg] = useState("rgba(3, 7, 18, 0.98)");
  const headerRef = useRef<HTMLElement>(null);
  const { t, locale, setLocale } = useTranslation();

  useEffect(() => {
    if (typeof window === "undefined" || window.innerWidth >= 968) return;

    const update = () => {
      const sections = document.querySelectorAll("section[id], .hero");
      const headerBottom = 70;
      let current = "#030712";

      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= headerBottom && rect.bottom > headerBottom) {
          const id = section.id || (section.classList.contains("hero") ? "hero" : "");
          current = SECTION_COLORS[id] || "#030712";
          break;
        }
      }
      setHeaderBg(current);
    };

    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  const menuItems = [
    { label: t("nav.team"), href: "#equipe" },
    { label: t("nav.services"), href: "#services" },
    { label: t("nav.projects"), href: "#projets" },
    { label: t("nav.advantage"), href: "#avantage" },
    { label: t("nav.method"), href: "#methode" },
    { label: t("nav.contact"), href: "#contact" },
    { label: "JAXA", href: "https://jaxa.ca", external: true },
  ];

  const handleClick = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Mobile Header Bar */}
      <header
        ref={headerRef}
        className="mobile-header"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "70px",
          background: isOpen ? "rgba(3, 7, 18, 0.98)" : headerBg,
          backdropFilter: "blur(10px)",
          zIndex: 2001,
          display: "none",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 1.2rem",
          transition: "background 0.4s ease",
        }}
      >
        {/* Left: Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
            padding: "0.5rem",
            flexShrink: 0,
          }}
          className="mobile-menu-btn"
        >
          <div
            style={{
              width: "24px",
              height: "2px",
              background: "var(--white)",
              marginBottom: "6px",
              transition: "all 0.3s ease",
            }}
          />
          <div
            style={{
              width: "24px",
              height: "2px",
              background: "var(--white)",
              marginBottom: "6px",
              transition: "all 0.3s ease",
            }}
          />
          <div
            style={{
              width: "24px",
              height: "2px",
              background: "var(--white)",
              transition: "all 0.3s ease",
            }}
          />
        </button>

        {/* Center: Title + Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <a
            href="#"
            style={{
              fontSize: "1.3rem",
              fontWeight: 900,
              color: "var(--white)",
              textDecoration: "none",
              letterSpacing: "0.15rem",
              transition: "color 0.3s ease",
              whiteSpace: "nowrap",
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
          <a href="#" style={{ lineHeight: 0, flexShrink: 0 }}>
            <img
              src="/studio-micho-icon.png"
              alt="Studio Micho"
              style={{
                width: "30px",
                height: "30px",
                borderRadius: "50%",
              }}
            />
          </a>
        </div>

        {/* Right: Language Toggle */}
        <button
          onClick={() => setLocale(locale === "fr" ? "en" : "fr")}
          aria-label={locale === "fr" ? "Switch to English" : "Passer en français"}
          style={{
            background: "transparent",
            border: "none",
            padding: "0.4rem 0.5rem",
            color: "var(--white)",
            fontSize: "0.8rem",
            fontWeight: 700,
            letterSpacing: "0.1em",
            cursor: "pointer",
            fontFamily: "'Inter', sans-serif",
            flexShrink: 0,
          }}
        >
          {locale === "fr" ? "EN" : "FR"}
        </button>
      </header>

      {/* Mobile Menu */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          width: "100%",
          height: "100vh",
          background: "rgba(3, 7, 18, 0.98)",
          zIndex: 2000,
          display: isOpen ? "flex" : "none",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "3rem",
        }}
        className="mobile-menu"
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
              fontSize: "2rem",
              fontWeight: 400,
              letterSpacing: "1px",
              transition: "all 0.3s ease",
              textTransform: "lowercase",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#4A90E2";
              e.currentTarget.style.transform = "translateX(-10px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--white)";
              e.currentTarget.style.transform = "translateX(0)";
            }}
          >
            {item.label}
          </a>
        ))}
      </div>

      {/* Responsive Styles */}
      <style jsx>{`
        @media (max-width: 968px) {
          .mobile-header {
            display: flex !important;
          }
        }
        @media (min-width: 969px) {
          .mobile-header {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
};

export default Navigation;
