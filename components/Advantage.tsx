"use client";

import React from "react";
import { useTranslation } from "@/lib/i18n";

const Advantage: React.FC = () => {
  const { t } = useTranslation();

  const rows = [
    { label: t("compare.row1.label"), agency: t("compare.row1.agency"), freelance: t("compare.row1.freelance"), studio: t("compare.row1.studio") },
    { label: t("compare.row2.label"), agency: t("compare.row2.agency"), freelance: t("compare.row2.freelance"), studio: t("compare.row2.studio") },
    { label: t("compare.row3.label"), agency: t("compare.row3.agency"), freelance: t("compare.row3.freelance"), studio: t("compare.row3.studio") },
    { label: t("compare.row4.label"), agency: t("compare.row4.agency"), freelance: t("compare.row4.freelance"), studio: t("compare.row4.studio") },
    { label: t("compare.row5.label"), agency: t("compare.row5.agency"), freelance: t("compare.row5.freelance"), studio: t("compare.row5.studio") },
    { label: t("compare.row6.label"), agency: t("compare.row6.agency"), freelance: t("compare.row6.freelance"), studio: t("compare.row6.studio") },
  ];

  const cellBase: React.CSSProperties = {
    padding: "clamp(0.8rem, 1.5vw, 1.2rem) clamp(0.6rem, 1vw, 1rem)",
    fontSize: "clamp(0.8rem, 1.1vw, 1rem)",
    lineHeight: 1.5,
    borderBottom: "1px solid rgba(255,255,255,0.08)",
  };

  return (
    <section
      className="advantage-section"
      style={{
        background:
          "linear-gradient(135deg, #060e1c 0%, #0a1222 100%)",
        flexDirection: "column",
        position: "relative",
      }}
    >
      {/* Floating shapes */}
      <div
        style={{
          position: "absolute",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "#4A90E2",
          opacity: 0.15,
          left: "-10%",
          top: "20%",
          animation: "float 8s ease-in-out infinite",
          zIndex: 1,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "350px",
          height: "350px",
          borderRadius: "50%",
          background: "#9B59B6",
          opacity: 0.15,
          right: "-5%",
          bottom: "10%",
          animation: "float 10s ease-in-out infinite reverse",
          zIndex: 1,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "220px",
          height: "220px",
          borderRadius: "50%",
          background: "#F39C12",
          opacity: 0.12,
          left: "40%",
          top: "5%",
          animation: "float 12s ease-in-out infinite",
          zIndex: 1,
        }}
      />

      <div
        className="advantage-container"
        style={{
          maxWidth: "1000px",
          width: "100%",
          position: "relative",
          zIndex: 10,
        }}
      >
        <h2
          style={{
            fontSize: "clamp(2.5rem, 5vw, 5rem)",
            fontWeight: 900,
            marginBottom: "2rem",
            textAlign: "center",
            lineHeight: 0.9,
          }}
        >
          {t("compare.title")}{" "}
          <span className="gradient-text">{t("compare.titleHighlight")}</span>
        </h2>

        <p
          style={{
            fontSize: "clamp(1rem, 1.3vw, 1.2rem)",
            color: "var(--gray)",
            textAlign: "center",
            maxWidth: "700px",
            margin: "0 auto 4rem",
            lineHeight: 1.6,
          }}
        >
          {t("compare.subtitle")}
        </p>

        {/* Desktop: Table */}
        <div className="compare-desktop">
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr>
                <th style={{ ...cellBase, color: "var(--gray)", fontWeight: 400, textAlign: "left", width: "22%" }}></th>
                <th style={{ ...cellBase, color: "var(--gray)", fontWeight: 700, textAlign: "center", width: "22%", fontSize: "clamp(0.9rem, 1.2vw, 1.1rem)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                  {t("compare.col.agency")}
                </th>
                <th style={{ ...cellBase, color: "var(--gray)", fontWeight: 700, textAlign: "center", width: "22%", fontSize: "clamp(0.9rem, 1.2vw, 1.1rem)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                  {t("compare.col.freelance")}
                </th>
                <th
                  style={{
                    ...cellBase,
                    fontWeight: 900,
                    textAlign: "center",
                    width: "34%",
                    fontSize: "clamp(0.9rem, 1.2vw, 1.1rem)",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    color: "#4A90E2",
                    background: "rgba(74, 144, 226, 0.08)",
                    borderRadius: "0.5rem 0.5rem 0 0",
                  }}
                >
                  {t("compare.col.studio")}
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i}>
                  <td
                    style={{
                      ...cellBase,
                      color: "var(--white)",
                      fontWeight: 700,
                      textAlign: "left",
                      fontSize: "clamp(0.8rem, 1vw, 0.95rem)",
                    }}
                  >
                    {row.label}
                  </td>
                  <td style={{ ...cellBase, color: "var(--gray)", textAlign: "center" }}>
                    {row.agency}
                  </td>
                  <td style={{ ...cellBase, color: "var(--gray)", textAlign: "center" }}>
                    {row.freelance}
                  </td>
                  <td
                    style={{
                      ...cellBase,
                      color: "var(--white)",
                      textAlign: "center",
                      fontWeight: 600,
                      background: "rgba(74, 144, 226, 0.08)",
                      borderRadius: i === rows.length - 1 ? "0 0 0.5rem 0.5rem" : undefined,
                    }}
                  >
                    {row.studio}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile: 3-column grid like desktop but sized for mobile */}
        <div className="compare-mobile">
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr>
                <th style={{ padding: "0.6rem 0.4rem", color: "var(--gray)", fontWeight: 400, textAlign: "left", width: "28%", fontSize: "0.7rem", borderBottom: "1px solid rgba(255,255,255,0.08)" }}></th>
                <th style={{ padding: "0.6rem 0.4rem", color: "var(--gray)", fontWeight: 700, textAlign: "center", width: "22%", fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.05em", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                  {t("compare.col.agency")}
                </th>
                <th style={{ padding: "0.6rem 0.4rem", color: "var(--gray)", fontWeight: 700, textAlign: "center", width: "22%", fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.05em", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                  {t("compare.col.freelance")}
                </th>
                <th style={{ padding: "0.6rem 0.4rem", fontWeight: 900, textAlign: "center", width: "28%", fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "#4A90E2", background: "rgba(74, 144, 226, 0.08)", borderRadius: "0.5rem 0.5rem 0 0", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                  {t("compare.col.studio")}
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i}>
                  <td style={{ padding: "0.6rem 0.4rem", color: "var(--white)", fontWeight: 700, textAlign: "left", fontSize: "0.75rem", borderBottom: "1px solid rgba(255,255,255,0.06)", lineHeight: 1.3 }}>
                    {row.label}
                  </td>
                  <td style={{ padding: "0.6rem 0.4rem", color: "var(--gray)", textAlign: "center", fontSize: "0.75rem", borderBottom: "1px solid rgba(255,255,255,0.06)", lineHeight: 1.3 }}>
                    {row.agency}
                  </td>
                  <td style={{ padding: "0.6rem 0.4rem", color: "var(--gray)", textAlign: "center", fontSize: "0.75rem", borderBottom: "1px solid rgba(255,255,255,0.06)", lineHeight: 1.3 }}>
                    {row.freelance}
                  </td>
                  <td style={{ padding: "0.6rem 0.4rem", color: "var(--white)", textAlign: "center", fontWeight: 600, fontSize: "0.75rem", background: "rgba(74, 144, 226, 0.08)", borderBottom: "1px solid rgba(255,255,255,0.06)", lineHeight: 1.3, borderRadius: i === rows.length - 1 ? "0 0 0.5rem 0.5rem" : undefined }}>
                    {row.studio}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <style jsx>{`
        .compare-mobile {
          display: none;
        }
        @media (max-width: 968px) {
          .compare-desktop {
            display: none !important;
          }
          .compare-mobile {
            display: block !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Advantage;
