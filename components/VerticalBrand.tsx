import React from "react";

const VerticalBrand: React.FC = () => {
  return (
    <>
      <div
        className="brand vertical-brand"
        style={{
          position: "fixed",
          left: "2rem",
          top: "2rem",
          zIndex: 1000,
          display: "none",
          flexDirection: "column",
          alignItems: "center",
          gap: "clamp(0.5rem, 1vh, 1rem)",
        }}
      >
        <a href="#" style={{ lineHeight: 0 }}>
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
        <a
          href="#"
          style={{
            transform: "rotate(180deg)",
            fontSize: "clamp(1.8rem, 3vh, 2.5rem)",
            fontWeight: 900,
            color: "var(--white)",
            textDecoration: "none",
            writingMode: "vertical-rl",
            letterSpacing: "clamp(0.15rem, 0.3vh, 0.3rem)",
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
