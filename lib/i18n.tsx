"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

export type Locale = "fr" | "en";

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const translations: Record<Locale, Record<string, string>> = {
  fr: {
    // Navigation
    "nav.services": "Services",
    "nav.projects": "Projets",
    "nav.advantage": "Avantage",
    "nav.method": "Méthode",
    "nav.contact": "Contact",

    // Hero
    "hero.line1": '> J\'imagine, construis et optimise des <span class="gradient-text">produits</span> <span class="gradient-text">numériques</span>',
    "hero.line2": ">",
    "hero.line3": '> <span class="gradient-text">Développement</span>. Contenu. <span class="gradient-text">Marketing</span>. Analytics.',
    "hero.line4": '> Du concept aux <span class="gradient-text">résultats</span> à vélocité IA.',

    // Services
    "services.title": "Ce que je",
    "services.titleHighlight": "fais",
    "services.1.title": "Sites & Applis",
    "services.1.desc": "Sites optimisés SEO. Applications (PWA). Prototypes rapides. Construction complète vélocité IA.",
    "services.2.title": "Contenu & SEO",
    "services.2.desc": "Stratégie éditoriale. SEO technique. Optimisation contenu. Trafic organique.",
    "services.3.title": "Publicités & Analytique",
    "services.3.desc": "Google Ads. Facebook/Meta. Suivi conversions. Optimisation ROI.",
    "services.4.title": "Transformation",
    "services.4.desc": "Audit complet. Plan stratégique. Implantation CRM. Soutien continu.",

    // Portfolio
    "portfolio.title": "Projets",
    "portfolio.titleHighlight": "livrés",
    "portfolio.subtitle": "Sites, apps et stratégies déployés. Résultats mesurables.",
    "portfolio.cta.default": "Voir le projet",
    "portfolio.cta.projects": "Voir les projets",
    "portfolio.more": "Plus de projets",
    "portfolio.screenshot": "SCREENSHOT ICI",
    "portfolio.op2.desc": "Firme d'ingénierie — Site vitrine corporatif. 5 semaines, conception à déploiement.",
    "portfolio.op2.tag1": "Solo",
    "portfolio.op2.tag2": "Corporate",
    "portfolio.op2.tag3": "5 Semaines",
    "portfolio.tonic.desc": "Site corporatif complet. CMS custom. Construction solo avec IA. Livraison express en temps record. 3 semaines.",
    "portfolio.tonic.tag1": "Corporate",
    "portfolio.tonic.tag2": "CMS",
    "portfolio.tonic.tag3": "3 Semaines",
    "portfolio.gestion.desc": "Dashboards financiers. Prototypes d'outils de gestion sur mesure.",
    "portfolio.gestion.tag1": "Prototype",
    "portfolio.gestion.tag2": "Dashboards",

    // Modal
    "modal.title": "Autres projets",
    "modal.screenshot": "SCREENSHOT",
    "modal.intexto.desc": "Site de nouvelles. Vidéo et audio. Conçu en quelques jours.",
    "modal.intexto.tag1": "Solo",
    "modal.intexto.tag2": "Site de nouvelles",
    "modal.intexto.tag3": "Testé",
    "modal.gpc.desc": "PWA spectateurs",
    "modal.gpc.tag1": "PWA",
    "modal.gpc.tag2": "3 semaines",
    "modal.jaxa.desc": "Site corporatif production immersive. Design audacieux.",
    "modal.jaxa.tag1": "En construction",
    "modal.jaxa.tag2": "Bold Design",
    "modal.jaxa.tag3": "Immersif",
    "modal.organisme.name": "Organisme communautaire",
    "modal.organisme.desc": "Gestion d'organisme",
    "modal.organisme.tag1": "En construction",
    "modal.organisme.tag2": "Prototype",
    "modal.cathfrancois.desc": "Peintre",
    "modal.cathfrancois.tag1": "Portfolio",
    "modal.cathfrancois.tag2": "Site Gallerie",
    "modal.jaxagomme.desc": "Contenus immersifs",
    "modal.jaxagomme.tag1": "Immersif",
    "modal.jaxagomme.tag2": "Prototype",
    "modal.jeanharvey.desc": "Page comédien",
    "modal.jeanharvey.tag1": "Portfolio",
    "modal.jeanharvey.tag2": "Site vitrine",
    "modal.studio76.desc": "Production télé",
    "modal.studio76.tag1": "Corporate",
    "modal.studio76.tag2": "Production TV",
    "modal.maisonleroy.desc": "Location Provence",
    "modal.maisonleroy.tag1": "Tourisme",

    // Advantage
    "advantage.title1": "L'",
    "advantage.title2": "avantage",
    "advantage.1.title": "Contact direct",
    "advantage.1.desc": "Pas d'intermédiaires. Vous travaillez directement avec moi, du concept au déploiement.",
    "advantage.2.title": "Écoute personnalisée",
    "advantage.2.desc": "Chaque projet commence par comprendre VOS besoins réels. Approche humaine, aux petits soins.",
    "advantage.3.title": "Rapidité d'exécution",
    "advantage.3.desc": "3-4 semaines du brief au produit en ligne. Campagnes marketing lancées rapidement.",
    "advantage.4.title": "Expertise 360°",
    "advantage.4.desc": "25 ans expérience contenu et produit (Radio-Canada - Olympiques) + maîtrise IA (Claude Code) + marketing numérique. Construction + Marketing sous un toit.",
    "advantage.5.title": "Tarifs boutique",
    "advantage.5.desc": "Budget adapté à votre réalité. Qualité entreprise sans les frais d'agence.",

    // Comment (Method)
    "method.title": "Ma",
    "method.titleHighlight": "méthode",
    "method.subtitle": "Vibe coding. Je décris la vision, l'IA construit. Je pilote, je valide, je livre.",
    "method.1.title": "Écoute & Stratégie",
    "method.1.desc": "Comprendre vos objectifs business. Définir plan produit + marketing intégré.",
    "method.2.title": "Construction Rapide",
    "method.2.desc": "IA comme co-pilote. Développement + mise en marché en 3-4 semaines.",
    "method.3.title": "Zéro malentendu",
    "method.3.desc": "Même personne qui écoute, conçoit et construit. Votre vision reste intacte.",

    // Pitch
    "pitch.line1": "JE CONÇOIS.",
    "pitch.line2": "JE CONSTRUIS.",
    "pitch.line3": "JE LANCE.",
    "pitch.line4": "JE MESURE.",
    "pitch.cta": "Parlons-en",

    // Metadata
    "meta.title": "Studio Micho - Produits numériques à vélocité IA",
    "meta.description": "J'imagine et construis des produits numériques à vélocité IA. Produits qui fonctionnent, pas juste des plans.",
  },
  en: {
    // Navigation
    "nav.services": "Services",
    "nav.projects": "Projects",
    "nav.advantage": "Advantage",
    "nav.method": "Method",
    "nav.contact": "Contact",

    // Hero
    "hero.line1": '> I imagine, build and optimize <span class="gradient-text">digital</span> <span class="gradient-text">products</span>',
    "hero.line2": ">",
    "hero.line3": '> <span class="gradient-text">Development</span>. Content. <span class="gradient-text">Marketing</span>. Analytics.',
    "hero.line4": '> From concept to <span class="gradient-text">results</span> at AI velocity.',

    // Services
    "services.title": "What I",
    "services.titleHighlight": "do",
    "services.1.title": "Sites & Apps",
    "services.1.desc": "SEO-optimized sites. Applications (PWA). Rapid prototypes. Full build at AI velocity.",
    "services.2.title": "Content & SEO",
    "services.2.desc": "Editorial strategy. Technical SEO. Content optimization. Organic traffic.",
    "services.3.title": "Ads & Analytics",
    "services.3.desc": "Google Ads. Facebook/Meta. Conversion tracking. ROI optimization.",
    "services.4.title": "Transformation",
    "services.4.desc": "Full audit. Strategic plan. CRM implementation. Ongoing support.",

    // Portfolio
    "portfolio.title": "Delivered",
    "portfolio.titleHighlight": "projects",
    "portfolio.subtitle": "Sites, apps and strategies deployed. Measurable results.",
    "portfolio.cta.default": "View project",
    "portfolio.cta.projects": "View projects",
    "portfolio.more": "More projects",
    "portfolio.screenshot": "SCREENSHOT HERE",
    "portfolio.op2.desc": "Engineering firm — Corporate showcase site. 5 weeks, from design to deployment.",
    "portfolio.op2.tag1": "Solo",
    "portfolio.op2.tag2": "Corporate",
    "portfolio.op2.tag3": "5 Weeks",
    "portfolio.tonic.desc": "Full corporate site. Custom CMS. Solo build with AI. Express delivery in record time. 3 weeks.",
    "portfolio.tonic.tag1": "Corporate",
    "portfolio.tonic.tag2": "CMS",
    "portfolio.tonic.tag3": "3 Weeks",
    "portfolio.gestion.desc": "Financial dashboards. Custom management tool prototypes.",
    "portfolio.gestion.tag1": "Prototype",
    "portfolio.gestion.tag2": "Dashboards",

    // Modal
    "modal.title": "Other projects",
    "modal.screenshot": "SCREENSHOT",
    "modal.intexto.desc": "News site. Video and audio. Built in a few days.",
    "modal.intexto.tag1": "Solo",
    "modal.intexto.tag2": "News site",
    "modal.intexto.tag3": "Tested",
    "modal.gpc.desc": "Spectator PWA",
    "modal.gpc.tag1": "PWA",
    "modal.gpc.tag2": "3 weeks",
    "modal.jaxa.desc": "Immersive production corporate site. Bold design.",
    "modal.jaxa.tag1": "In progress",
    "modal.jaxa.tag2": "Bold Design",
    "modal.jaxa.tag3": "Immersive",
    "modal.organisme.name": "Community organization",
    "modal.organisme.desc": "Organization management",
    "modal.organisme.tag1": "In progress",
    "modal.organisme.tag2": "Prototype",
    "modal.cathfrancois.desc": "Painter",
    "modal.cathfrancois.tag1": "Portfolio",
    "modal.cathfrancois.tag2": "Gallery site",
    "modal.jaxagomme.desc": "Immersive content",
    "modal.jaxagomme.tag1": "Immersive",
    "modal.jaxagomme.tag2": "Prototype",
    "modal.jeanharvey.desc": "Actor page",
    "modal.jeanharvey.tag1": "Portfolio",
    "modal.jeanharvey.tag2": "Showcase site",
    "modal.studio76.desc": "TV production",
    "modal.studio76.tag1": "Corporate",
    "modal.studio76.tag2": "TV Production",
    "modal.maisonleroy.desc": "Provence rental",
    "modal.maisonleroy.tag1": "Tourism",

    // Advantage
    "advantage.title1": "The",
    "advantage.title2": "advantage",
    "advantage.1.title": "Direct contact",
    "advantage.1.desc": "No middlemen. You work directly with me, from concept to deployment.",
    "advantage.2.title": "Personalized attention",
    "advantage.2.desc": "Every project starts by understanding YOUR real needs. Human approach, attentive care.",
    "advantage.3.title": "Speed of execution",
    "advantage.3.desc": "3-4 weeks from brief to live product. Marketing campaigns launched quickly.",
    "advantage.4.title": "360° Expertise",
    "advantage.4.desc": "25 years content & product experience (CBC/Radio-Canada - Olympics) + AI mastery (Claude Code) + digital marketing. Build + Marketing under one roof.",
    "advantage.5.title": "Boutique rates",
    "advantage.5.desc": "Budget tailored to your reality. Enterprise quality without agency fees.",

    // Comment (Method)
    "method.title": "My",
    "method.titleHighlight": "method",
    "method.subtitle": "Vibe coding. I describe the vision, AI builds it. I steer, I validate, I deliver.",
    "method.1.title": "Listen & Strategize",
    "method.1.desc": "Understand your business objectives. Define product plan + integrated marketing.",
    "method.2.title": "Rapid Build",
    "method.2.desc": "AI as co-pilot. Development + go-to-market in 3-4 weeks.",
    "method.3.title": "Zero miscommunication",
    "method.3.desc": "Same person who listens, designs and builds. Your vision stays intact.",

    // Pitch
    "pitch.line1": "I DESIGN.",
    "pitch.line2": "I BUILD.",
    "pitch.line3": "I LAUNCH.",
    "pitch.line4": "I MEASURE.",
    "pitch.cta": "Let's talk",

    // Metadata
    "meta.title": "Studio Micho - Digital products at AI velocity",
    "meta.description": "I imagine and build digital products at AI velocity. Products that work, not just plans.",
  },
};

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocaleState] = useState<Locale>("fr");

  useEffect(() => {
    const saved = localStorage.getItem("locale") as Locale;
    if (saved === "en" || saved === "fr") {
      setLocaleState(saved);
    }
  }, []);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem("locale", newLocale);
    document.documentElement.lang = newLocale;
  }, []);

  const t = useCallback((key: string): string => {
    return translations[locale][key] || key;
  }, [locale]);

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useTranslation = (): I18nContextType => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useTranslation must be used within I18nProvider");
  }
  return context;
};
