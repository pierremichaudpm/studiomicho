"use client";

import React, { useState } from "react";

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: "Services", href: "#services" },
    { label: "Projets", href: "#projets" },
    { label: "Avantage", href: "#avantage" },
    { label: "Méthode", href: "#methode" },
    { label: "Contact", href: "#contact" },
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
      {/* Desktop Menu */}
      <nav
        style={{
          position: "fixed",
          top: "clamp(14rem, 26rem, 26rem + 14px)",
          left: "calc(2rem + 11px)",
          zIndex: 2000,
          display: "none",
          flexDirection: "column",
          gap: "clamp(1rem, 2vh, 2rem)",
          maxHeight: "calc(100vh - 14rem - 2rem)",
          justifyContent: "center",
        }}
        className="desktop-nav"
      >
        {menuItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            onClick={(e) => {
              e.preventDefault();
              handleClick(item.href);
            }}
            style={{
              color: "var(--white)",
              textDecoration: "none",
              fontSize: "clamp(0.65rem, 0.8vw, 0.8rem)",
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

      {/* Mobile Header Bar */}
      <header
        className="mobile-header"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "70px",
          background: isOpen
            ? "rgba(3, 7, 18, 0.98)"
            : "linear-gradient(180deg, rgba(3, 7, 18, 0.95) 0%, rgba(3, 7, 18, 0.7) 70%, rgba(3, 7, 18, 0) 100%)",
          backdropFilter: "blur(10px)",
          zIndex: 2001,
          display: "none",
          alignItems: "center",
          justifyContent: "flex-start",
          padding: "0 2rem",
          gap: "1.5rem",
        }}
      >
        {/* Mobile Menu Button */}
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

        {/* Studio Micho Title */}
        <a
          href="#"
          style={{
            fontSize: "clamp(1rem, 3.5vw, 1.5rem)",
            fontWeight: 900,
            color: "var(--white)",
            textDecoration: "none",
            letterSpacing: "0.2rem",
            transition: "color 0.3s ease",
            marginLeft: "50px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
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
            onClick={(e) => {
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
          .desktop-nav {
            display: none !important;
          }
          .mobile-header {
            display: flex !important;
          }
        }
        @media (min-width: 969px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-header {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
};

export default Navigation;
