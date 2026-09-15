"use client";

import Image from "next/image";
import { useTranslation } from "@/lib/i18n";
import "./Projects.css";

const PROJECTS = [
  { id: "cari", name: "CARI St-Laurent", mobileName: "CARI", image: "/images/cari-screenshot-v2.jpg", mobileImage: "/images/m-cari-screenshot.jpg" },
  { id: "lilimallette", name: "Lili Mallette", image: "/images/lilimallette-screenshot.jpg", mobileImage: "/images/m-lilimallette-screenshot.jpg" },
  { id: "aurea", name: "Auréa RH Conseil", image: "/images/aurea-screenshot.jpg", mobileImage: "/images/m-aurea-screenshot.jpg" },
  { id: "intexto", name: "InTexto", image: "/images/intexto-screenshot.jpg", mobileImage: "/images/m-intexto-screenshot.jpg" },
  { id: "dashboard-finance", name: "Dashboard Financier", englishName: "Finance Dashboard", mobileName: "Finance", image: "/images/finance-screenshot.jpg", mobileImage: "/images/m-finance-screenshot.jpg" },
  { id: "dashboard-comptable", name: "Dashboard Comptabilité", englishName: "Accounting Dashboard", mobileName: "Comptabilité", englishMobileName: "Accounting", image: "/images/compta-screenshot.jpg", mobileImage: "/images/m-compta-screenshot.jpg" },
];

export default function Projects({ onOpenModal }: { onOpenModal: (projectId: string) => void }) {
  const { t, locale } = useTranslation();
  const english = locale === "en";

  return <section id="projets" className="projects-section" aria-labelledby="projects-title">
    <div className="projects-bubbles" aria-hidden="true">
      <span className="projects-bubble projects-bubble-blue" />
      <span className="projects-bubble projects-bubble-violet" />
      <span className="projects-bubble projects-bubble-amber" />
    </div>
    <div className="projects-content">
      <h2 id="projects-title"><span className="gradient-text">{t("nav.projects")}</span></h2>
      <div className="mosaic-grid">
        {PROJECTS.map((project) => {
          const name = english && project.englishName ? project.englishName : project.name;
          const mobileName = english && project.englishMobileName ? project.englishMobileName : project.mobileName || name;
          return <button key={project.id} type="button" className="mosaic-cell" onClick={() => onOpenModal(project.id)} aria-label={english ? `View project: ${name}` : `Voir le projet : ${name}`}>
            <span className="mosaic-item">
              <span className="mosaic-bar" aria-hidden="true">
                <span className="mosaic-dot" style={{ background: "#FF5F56" }} />
                <span className="mosaic-dot" style={{ background: "#FFBD2E" }} />
                <span className="mosaic-dot" style={{ background: "#27C93F" }} />
              </span>
              <picture>
                <source media="(max-width: 968px)" srcSet={project.mobileImage} />
                <Image src={project.image} alt="" fill sizes="(max-width: 968px) 45vw, 30vw" />
              </picture>
            </span>
            <span className="mosaic-label mosaic-desktop-name">{name}</span>
            <span className="mosaic-label mosaic-mobile-name">{mobileName}</span>
          </button>;
        })}
      </div>
      <button type="button" className="projects-all-button" onClick={() => onOpenModal("")}>
        {t("portfolio.more")}
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" /></svg>
      </button>
    </div>
  </section>;
}
