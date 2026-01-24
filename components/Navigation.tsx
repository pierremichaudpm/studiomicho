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
          top: "calc(26rem + 14px)",
          left: "calc(2rem + 11px)",
          zIndex: 2000,
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
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
              fontSize: "0.8rem",
              fontWeight: 600,
              letterSpacing: "0.2rem",
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
          background:
            "linear-gradient(180deg, rgba(3, 7, 18, 0.95) 0%, rgba(3, 7, 18, 0.7) 70%, rgba(3, 7, 18, 0) 100%)",
          backdropFilter: "blur(10px)",
          zIndex: 2000,
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
            zIndex: 2001,
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
              transform: isOpen ? "rotate(45deg) translateY(8px)" : "none",
            }}
          />
          <div
            style={{
              width: "24px",
              height: "2px",
              background: "var(--white)",
              marginBottom: "6px",
              transition: "all 0.3s ease",
              opacity: isOpen ? 0 : 1,
            }}
          />
          <div
            style={{
              width: "24px",
              height: "2px",
              background: "var(--white)",
              transition: "all 0.3s ease",
              transform: isOpen ? "rotate(-45deg) translateY(-8px)" : "none",
            }}
          />
        </button>

        {/* Studio Micho Title */}
        <a
          href="#"
          style={{
            fontSize: "1.5rem",
            fontWeight: 900,
            color: "var(--white)",
            textDecoration: "none",
            letterSpacing: "0.2rem",
            transition: "color 0.3s ease",
            marginLeft: "25px",
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
          .mobile-header {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
};

export default Navigation;
