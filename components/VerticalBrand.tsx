import React from "react";

const VerticalBrand: React.FC = () => {
  return (
    <>
      <a
        href="#"
        className="brand vertical-brand"
        style={{
          position: "fixed",
          left: "2rem",
          top: "2rem",
          transform: "rotate(180deg)",
          fontSize: "2.5rem",
          fontWeight: 900,
          color: "var(--white)",
          zIndex: 1000,
          textDecoration: "none",
          writingMode: "vertical-rl",
          letterSpacing: "0.3rem",
          transition: "color 0.3s ease",
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
      <style jsx>{`
        .vertical-brand {
          display: none;
        }
        @media (min-width: 969px) {
          .vertical-brand {
            display: block !important;
          }
        }
      `}</style>
    </>
  );
};

export default VerticalBrand;
