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
    "nav.demos": "Démos",
    "nav.team": "Équipe",
    "nav.advantage": "Avantage",
    "nav.method": "Méthode",
    "nav.contact": "Contact",

    // Hero (unchanged)
    "hero.line1": '<span style="color:#4A90E2">></span> Votre site date, vos <span class="gradient-text">outils</span> ne suivent plus.',
    "hero.line2": '<span style="color:#4A90E2">></span> On règle ça en <span class="gradient-text">quelques semaines</span>.',
    "hero.line3": '<span style="color:#4A90E2">></span> Du <span class="gradient-text">sur-mesure</span> propulsé par l\'IA.',
    "hero.line4": '<span style="color:#4A90E2">></span> Simple, du premier appel au <span class="gradient-text">produit final</span>.',

    // Team Duo
    "team.subtitle": "Qui nous sommes",
    "team.title": "Deux expertises.",
    "team.titleHighlight": "Une seule équipe.",
    "team.pierre.name": "Pierre Michaud",
    "team.pierre.role": "Consultant numérique · Développeur IA",
    "team.pierre.point1": "25 ans d'expérience — Radio-Canada, Olympiques",
    "team.pierre.point2": "Spécialiste vibe coding (Claude Code)",
    "team.pierre.point3": "Conception, construction et déploiement",
    "team.pierre.point4": "Sites web, applications, dashboards sur mesure",
    "team.virginie.name": "Virginie Jaffredo",
    "team.virginie.role": "Stratégie opérationnelle · Gestion de comptes",
    "team.virginie.point1": "Comprend vos processus avant qu'on code quoi que ce soit",
    "team.virginie.point2": "Administration, facturation, suivi de projets",
    "team.virginie.point3": "Interface client principale — votre point de contact",
    "team.virginie.point4": "Expérience en production numérique et XR",
    "team.stat1.value": "3–4",
    "team.stat1.label": "semaines de livraison",
    "team.stat2.value": "100%",
    "team.stat2.label": "sur mesure",
    "team.stat3.value": "0",
    "team.stat3.label": "intermédiaire",

    // Services
    "services.title": "Ce que nous",
    "services.titleHighlight": "faisons",
    "services.1.title": "Sites & Applis",
    "services.1.desc": "Votre vieux WordPress vous donne des maux de tête. Nous construisons des sites vitrines ou plus complexes, applications, prototypes — en ligne en 3 semaines. Optimisés, rapides, construits avec l'IA.",
    "services.2.title": "Contenu & Marketing",
    "services.2.desc": "Personne ne vous trouve sur Google? Vos pubs coûtent cher sans résultat clair. On prend le relais — SEO, contenu, pubs, conversions.",
    "services.3.title": "Outils de gestion",
    "services.3.desc": "Vos données sont dans 4 fichiers Excel et la tête de quelqu'un. On vous construit un dashboard sur mesure — vos KPIs, en temps réel, exportables.",
    "services.4.title": "Transformation",
    "services.4.desc": "Vous savez que ça pourrait être mieux mais vous savez pas par où commencer. Audit, plan, CRM, exécution — on vous accompagne.",

    // Portfolio
    "portfolio.title": "Projets",
    "portfolio.titleHighlight": "livrés",
    "portfolio.subtitle": "Sites, apps, outils et stratégies déployés. Résultats mesurables.",
    "portfolio.cta.default": "Voir le projet",
    "portfolio.cta.projects": "Voir les projets",
    "portfolio.cta.demo": "Essayer la démo",
    "portfolio.more": "Tous nos projets",
    "portfolio.screenshot": "SCREENSHOT ICI",
    // CARI
    "portfolio.cari.name": "CARI SAINT-LAURENT",
    "portfolio.cari.desc": "Site multilingue 12 langues, chatbot IA, système de rendez-vous, calendrier d'activités.",
    "portfolio.cari.tag1": "Communautaire",
    "portfolio.cari.tag2": "12 langues",
    "portfolio.cari.tag3": "4 semaines",
    "portfolio.cari.stat": "12 langues · Chatbot · Calendrier · 4 semaines",
    // OP2
    "portfolio.op2.desc": "Firme d'ingénierie internationale. Nouveau site bilingue pour le marché nord-américain, livré en 5 semaines.",
    "portfolio.op2.tag1": "Ingénierie",
    "portfolio.op2.tag2": "Bilingue",
    "portfolio.op2.tag3": "5 semaines",
    // Tonic
    "portfolio.tonic.desc": "Organisateur d'événements sportifs et production audiovisuelle. Nouveau site corporatif avec CMS sur mesure, livré en 3 semaines.",
    "portfolio.tonic.tag1": "Événementiel",
    "portfolio.tonic.tag2": "CMS",
    "portfolio.tonic.tag3": "3 semaines",
    // Auréa
    "portfolio.aurea.name": "AURÉA RH CONSEIL",
    "portfolio.aurea.desc": "Conseil en ressources humaines. Site bilingue complet. Négocié et livré à 1 250$.",
    "portfolio.aurea.tag1": "RH",
    "portfolio.aurea.tag2": "Bilingue",
    "portfolio.aurea.tag3": "1 250$",
    // Demos section
    "portfolio.demos.title": "Essayez nos démos",
    "portfolio.demos.subtitle": "Trois outils livrés, trois réalités différentes.",
    "portfolio.demos.disclaimer": "Données fictives — Démos interactives en ligne",
    "portfolio.demo1.name": "Dashboard Accueil",
    "portfolio.demo1.sector": "Secteur communautaire",
    "portfolio.demo1.desc": "Suivi opérationnel en temps réel. Données terrain et visualisation. KPIs, tendances, répartition des ressources.",
    "portfolio.demo2.name": "Dashboard Financier",
    "portfolio.demo2.sector": "Firme de services",
    "portfolio.demo2.desc": "Revenus et marges par client. Comptes recevables et cash flow. Projections de trésorerie.",
    "portfolio.demo3.name": "Dashboard Comptabilité",
    "portfolio.demo3.sector": "Cabinet comptable",
    "portfolio.demo3.desc": "Gestion des dossiers clients. Échéances fiscales automatisées. Productivité de l'équipe.",
    "portfolio.demo4.name": "Estimateur de tournée",
    "portfolio.demo4.sector": "Galerie Nomade",
    "portfolio.demo4.desc": "Budgétisation rapide pour la location et l'installation d'œuvres d'art en itinérance.",
    // Gestion (legacy kept for modal)
    "portfolio.gestion.name": "OUTILS DE GESTION",
    "portfolio.gestion.desc": "Ce que votre ERP devrait faire mais ne fait pas. Dashboards opérationnels et financiers, construits sur mesure en quelques semaines.",
    "portfolio.gestion.tag1": "Prototype",
    "portfolio.gestion.tag2": "Dashboards",
    "portfolio.gestion.tag3": "Sur mesure",

    // Comparison table
    "compare.title": "Pourquoi",
    "compare.titleHighlight": "nous",
    "compare.subtitle": "Ce qu'une agence livre en 3 mois, nous le livrons en 3 semaines.",
    "compare.col.agency": "Agence",
    "compare.col.freelance": "Freelance",
    "compare.col.studio": "Studio Micho",
    "compare.row1.label": "Délai",
    "compare.row1.agency": "3–4 mois",
    "compare.row1.freelance": "6–8 semaines",
    "compare.row1.studio": "3–4 semaines",
    "compare.row2.label": "Interlocuteurs",
    "compare.row2.agency": "4–5 personnes",
    "compare.row2.freelance": "1 (débordé)",
    "compare.row2.studio": "2 (stratégie + build)",
    "compare.row3.label": "Budget typique",
    "compare.row3.agency": "15–25K",
    "compare.row3.freelance": "5–8K",
    "compare.row3.studio": "~5K",
    "compare.row4.label": "Qui comprend votre business",
    "compare.row4.agency": "Le vendeur (pas le dev)",
    "compare.row4.freelance": "Le dev (pas le stratège)",
    "compare.row4.studio": "Les mêmes qui écoutent, conçoivent et construisent",
    "compare.row5.label": "Gamme de services",
    "compare.row5.agency": "Large mais fragmentée",
    "compare.row5.freelance": "Spécialisé une chose",
    "compare.row5.studio": "Site + app + outils + marketing sous un toit",
    "compare.row6.label": "Après livraison",
    "compare.row6.agency": "Ticket de support",
    "compare.row6.freelance": "\"Rappelle-moi lundi\"",
    "compare.row6.studio": "Documentation complète + plan de suivi actif",

    // Testimonials
    "testimonials.title": "Ce qu'ils",
    "testimonials.titleHighlight": "en disent",
    "testimonials.subtitle": "Des clients, des vrais. Pas des logos.",
    "testimonials.catherine.quote": "Pierre s'est illustré par sa compréhension fine des enjeux numériques et sa capacité d'exécution. Il a livré des produits numériques innovants, performants, fiables et très aboutis.",
    "testimonials.catherine.name": "Catherine Dupont",
    "testimonials.catherine.role": "Groupe Tonic",
    "testimonials.thierry.quote": "Un projet de site web livré dans les temps et le budget, grâce à une approche immersive et collaborative qui a vraiment fait la différence.",
    "testimonials.thierry.name": "Thierry Bosom",
    "testimonials.thierry.role": "OP2",
    "testimonials.leesa.quote": "De la compréhension du mandat jusqu'à la mise en place des recommandations, Pierre a été présent dans l'accompagnement de l'équipe de façon soutenue et adaptée à notre réalité.",
    "testimonials.leesa.name": "Leesa Hodgson",
    "testimonials.leesa.role": "Excellence industrielle de Saint-Laurent",
    "testimonials.said.quote": "Un profil atypique qui sait écouter, co-construire et saisir rapidement les besoins et les enjeux.",
    "testimonials.said.name": "Said Khalil",
    "testimonials.said.role": "CARI Saint-Laurent",
    "testimonials.hugues.quote": "Il a conçu le site avec une qualité, une rigueur et une rapidité absolument remarquables. Sa capacité à transformer des idées en une plateforme claire et fonctionnelle a fait toute la différence.",
    "testimonials.hugues.name": "Hugues Thibault",
    "testimonials.hugues.role": "Auréa RH Conseil",

    // Method (4 steps)
    "method.title": "Notre",
    "method.titleHighlight": "méthode",
    "method.subtitle": "Du brief au produit. Sans détour.",
    "method.1.title": "Écoute",
    "method.1.desc": "On s'assoit avec vous. On comprend vos irritants, vos processus, vos vrais besoins. Pas un cahier de charges — une conversation.",
    "method.2.title": "Prototype",
    "method.2.desc": "En quelques jours, un premier prototype fonctionnel avec vos données. Vous voyez, vous touchez, vous validez.",
    "method.3.title": "Construction",
    "method.3.desc": "Développement avec l'IA comme copilote. La même personne qui a écouté est celle qui construit. Zéro perte en traduction.",
    "method.4.title": "Livraison",
    "method.4.desc": "Déploiement, formation, ajustements. Vous êtes autonomes. On reste disponibles.",
    "method.5.title": "Suivi",
    "method.5.desc": "Votre site est livré avec une documentation technique complète, un guide de continuité et un plan de suivi. Monitoring, ajustements, évolution — on reste dans le portrait.",

    // Built to last
    "lasting.title": "Construit pour durer",
    "lasting.titleHighlight": "— pas juste pour lancer.",
    "lasting.desc": "Chaque projet est livré avec sa documentation technique, son guide de continuité et un plan de maintenance. Votre site ne dépend pas d'une seule personne. Il est construit pour que n'importe quel développeur puisse le reprendre, le comprendre et le faire évoluer.",

    // Pitch
    "pitch.line1": "Nous concevons",
    "pitch.line2": "construisons",
    "pitch.line3": "lançons",
    "pitch.line4": "et mesurons.",
    "pitch.cta": "On en jase?",
    "pitch.subcta": "Dites-nous ce qui vous ralentit au quotidien.",
    "pitch.footer": "Studio Micho × JAXA Production · Montréal",
    "pitch.footerBy": "par",
    "pitch.pierre.role": "Consultant · Développeur",
    "pitch.virginie.role": "Opérations · Gestion de comptes",

    // Estimator
    "estimator.cta": "Estimez votre projet →",
    "estimator.subtitle": "En 2 minutes, une idée de budget et de délai.",

    // Modal
    "modal.title": "Tous nos projets",
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
    "modal.aurea.desc": "Conseil en ressources humaines. Design épuré, responsive.",
    "modal.aurea.tag1": "De A à Z",
    "modal.aurea.tag2": "Site vitrine",
    "modal.aurea.tag3": "2 semaines",
    "modal.jeanharvey.desc": "Page comédien",
    "modal.jeanharvey.tag1": "Portfolio",
    "modal.jeanharvey.tag2": "Site vitrine",
    "modal.studio76.desc": "Production télé",
    "modal.studio76.tag1": "Corporate",
    "modal.studio76.tag2": "Production TV",
    "modal.maisonleroy.desc": "Location Provence",
    "modal.maisonleroy.tag1": "Tourisme",

    // Metadata
    "meta.title": "Studio Micho - Produits numériques à vélocité IA",
    "meta.description": "Produits numériques à vélocité IA. Sites, apps, dashboards et marketing — livrés en 3-4 semaines par une équipe de deux. Studio Micho × JAXA Production, Montréal.",
  },
  en: {
    // Navigation
    "nav.services": "Services",
    "nav.projects": "Projects",
    "nav.demos": "Demos",
    "nav.team": "Team",
    "nav.advantage": "Advantage",
    "nav.method": "Method",
    "nav.contact": "Contact",

    // Hero
    "hero.line1": '<span style="color:#4A90E2">></span> Your site is dated, your <span class="gradient-text">tools</span> can\'t keep up.',
    "hero.line2": '<span style="color:#4A90E2">></span> We fix that in <span class="gradient-text">a few weeks</span>.',
    "hero.line3": '<span style="color:#4A90E2">></span> <span class="gradient-text">Custom-built</span>, AI-powered.',
    "hero.line4": '<span style="color:#4A90E2">></span> Simple: from first call to <span class="gradient-text">final product</span>.',

    // Team Duo
    "team.subtitle": "Who we are",
    "team.title": "Two expertises.",
    "team.titleHighlight": "One team.",
    "team.pierre.name": "Pierre Michaud",
    "team.pierre.role": "Digital Consultant · AI Developer",
    "team.pierre.point1": "25 years experience — CBC/Radio-Canada, Olympics",
    "team.pierre.point2": "Vibe coding specialist (Claude Code)",
    "team.pierre.point3": "Design, build and deploy",
    "team.pierre.point4": "Websites, applications, custom dashboards",
    "team.virginie.name": "Virginie Jaffredo",
    "team.virginie.role": "Operations Strategy · Account Management",
    "team.virginie.point1": "Understands your processes before we code anything",
    "team.virginie.point2": "Administration, invoicing, project tracking",
    "team.virginie.point3": "Main client interface — your point of contact",
    "team.virginie.point4": "Experience in digital and XR production",
    "team.stat1.value": "3–4",
    "team.stat1.label": "weeks to delivery",
    "team.stat2.value": "100%",
    "team.stat2.label": "custom-built",
    "team.stat3.value": "0",
    "team.stat3.label": "middlemen",

    // Services
    "services.title": "What we",
    "services.titleHighlight": "do",
    "services.1.title": "Sites & Apps",
    "services.1.desc": "Your old WordPress is giving you headaches. We build showcase or complex sites, applications, prototypes — online in 3 weeks. Optimized, fast, AI-built.",
    "services.2.title": "Content & Marketing",
    "services.2.desc": "Nobody finds you on Google. Your ads cost a fortune with no clear results. We take over — SEO, content, ads, conversions.",
    "services.3.title": "Management Tools",
    "services.3.desc": "Your data lives in 4 Excel files and someone's head. We build you a custom dashboard — your KPIs, real-time, exportable.",
    "services.4.title": "Transformation",
    "services.4.desc": "You know it could be better but don't know where to start. Audit, plan, CRM, execution — we walk you through it.",

    // Portfolio
    "portfolio.title": "Delivered",
    "portfolio.titleHighlight": "projects",
    "portfolio.subtitle": "Sites, apps, tools and strategies deployed. Measurable results.",
    "portfolio.cta.default": "View project",
    "portfolio.cta.projects": "View projects",
    "portfolio.cta.demo": "Try the demo",
    "portfolio.more": "All our projects",
    "portfolio.screenshot": "SCREENSHOT HERE",
    // CARI
    "portfolio.cari.name": "CARI SAINT-LAURENT",
    "portfolio.cari.desc": "Multilingual site in 12 languages, AI chatbot, appointment system, activity calendar.",
    "portfolio.cari.tag1": "Community",
    "portfolio.cari.tag2": "12 languages",
    "portfolio.cari.tag3": "4 weeks",
    "portfolio.cari.stat": "12 languages · Chatbot · Calendar · 4 weeks",
    // OP2
    "portfolio.op2.desc": "International engineering firm. New bilingual site for the North American market, delivered in 5 weeks.",
    "portfolio.op2.tag1": "Engineering",
    "portfolio.op2.tag2": "Bilingual",
    "portfolio.op2.tag3": "5 weeks",
    // Tonic
    "portfolio.tonic.desc": "Sports event organizer and audiovisual production. New corporate site with custom CMS, delivered in 3 weeks.",
    "portfolio.tonic.tag1": "Events",
    "portfolio.tonic.tag2": "CMS",
    "portfolio.tonic.tag3": "3 weeks",
    // Auréa
    "portfolio.aurea.name": "AURÉA RH CONSEIL",
    "portfolio.aurea.desc": "HR consulting. Full bilingual site. Negotiated and delivered at $1,250.",
    "portfolio.aurea.tag1": "HR",
    "portfolio.aurea.tag2": "Bilingual",
    "portfolio.aurea.tag3": "$1,250",
    // Demos section
    "portfolio.demos.title": "Try our demos",
    "portfolio.demos.subtitle": "Three tools delivered, three different realities.",
    "portfolio.demos.disclaimer": "Fictional data — Interactive online demos",
    "portfolio.demo1.name": "Reception Dashboard",
    "portfolio.demo1.sector": "Community sector",
    "portfolio.demo1.desc": "Real-time operational tracking. Field data and visualization. KPIs, trends, resource allocation.",
    "portfolio.demo2.name": "Financial Dashboard",
    "portfolio.demo2.sector": "Service firm",
    "portfolio.demo2.desc": "Revenue and margins by client. Receivables and cash flow. Treasury projections.",
    "portfolio.demo3.name": "Accounting Dashboard",
    "portfolio.demo3.sector": "Accounting firm",
    "portfolio.demo3.desc": "Client file management. Automated tax deadlines. Team productivity.",
    "portfolio.demo4.name": "Tour Cost Estimator",
    "portfolio.demo4.sector": "Galerie Nomade",
    "portfolio.demo4.desc": "Quick budgeting for touring art exhibitions. Select a work, destination and season for a detailed cost estimate.",
    // Gestion (legacy)
    "portfolio.gestion.name": "MANAGEMENT TOOLS",
    "portfolio.gestion.desc": "What your ERP should do but doesn't. Operational and financial dashboards, custom-built in a few weeks.",
    "portfolio.gestion.tag1": "Prototype",
    "portfolio.gestion.tag2": "Dashboards",
    "portfolio.gestion.tag3": "Custom",

    // Comparison table
    "compare.title": "Why",
    "compare.titleHighlight": "us",
    "compare.subtitle": "What an agency delivers in 3 months, we deliver in 3 weeks.",
    "compare.col.agency": "Agency",
    "compare.col.freelance": "Freelance",
    "compare.col.studio": "Studio Micho",
    "compare.row1.label": "Timeline",
    "compare.row1.agency": "3–4 months",
    "compare.row1.freelance": "6–8 weeks",
    "compare.row1.studio": "3–4 weeks",
    "compare.row2.label": "Contacts",
    "compare.row2.agency": "4–5 people",
    "compare.row2.freelance": "1 (overwhelmed)",
    "compare.row2.studio": "2 (strategy + build)",
    "compare.row3.label": "Typical budget",
    "compare.row3.agency": "$15–25K",
    "compare.row3.freelance": "$5–8K",
    "compare.row3.studio": "~$5K",
    "compare.row4.label": "Who gets your business",
    "compare.row4.agency": "The salesperson (not the dev)",
    "compare.row4.freelance": "The dev (not the strategist)",
    "compare.row4.studio": "The same people who listen, design and build",
    "compare.row5.label": "Service range",
    "compare.row5.agency": "Wide but fragmented",
    "compare.row5.freelance": "Specialized in one thing",
    "compare.row5.studio": "Site + app + tools + marketing under one roof",
    "compare.row6.label": "After delivery",
    "compare.row6.agency": "Support ticket",
    "compare.row6.freelance": "\"Call me Monday\"",
    "compare.row6.studio": "Full documentation + active follow-up plan",

    // Testimonials
    "testimonials.title": "What they",
    "testimonials.titleHighlight": "say",
    "testimonials.subtitle": "Real clients. Not logos.",
    "testimonials.catherine.quote": "Pierre stood out for his deep understanding of digital challenges and his ability to execute. He delivered innovative, high-performing, reliable and polished digital products.",
    "testimonials.catherine.name": "Catherine Dupont",
    "testimonials.catherine.role": "Groupe Tonic",
    "testimonials.thierry.quote": "A web project delivered on time and on budget, thanks to an immersive and collaborative approach that truly made the difference.",
    "testimonials.thierry.name": "Thierry Bosom",
    "testimonials.thierry.role": "OP2",
    "testimonials.leesa.quote": "From understanding the mandate to implementing recommendations, Pierre was present throughout, supporting the team in a sustained way adapted to our reality.",
    "testimonials.leesa.name": "Leesa Hodgson",
    "testimonials.leesa.role": "Excellence industrielle de Saint-Laurent",
    "testimonials.said.quote": "An atypical profile who knows how to listen, co-build and quickly grasp needs and challenges.",
    "testimonials.said.name": "Said Khalil",
    "testimonials.said.role": "CARI Saint-Laurent",
    "testimonials.hugues.quote": "He designed the site with remarkable quality, rigor and speed. His ability to transform ideas into a clear, functional platform made all the difference.",
    "testimonials.hugues.name": "Hugues Thibault",
    "testimonials.hugues.role": "Auréa RH Conseil",

    // Method (4 steps)
    "method.title": "Our",
    "method.titleHighlight": "method",
    "method.subtitle": "From brief to product. No detours.",
    "method.1.title": "Listen",
    "method.1.desc": "We sit down with you. We understand your pain points, your processes, your real needs. Not a spec doc — a conversation.",
    "method.2.title": "Prototype",
    "method.2.desc": "In a few days, a first working prototype with your data. You see it, you touch it, you validate it.",
    "method.3.title": "Build",
    "method.3.desc": "Development with AI as copilot. The same person who listened is the one who builds. Zero lost in translation.",
    "method.4.title": "Deliver",
    "method.4.desc": "Deployment, training, adjustments. You're autonomous. We stay available.",
    "method.5.title": "Follow-up",
    "method.5.desc": "Your site ships with full technical documentation, a continuity guide and a follow-up plan. Monitoring, adjustments, evolution — we stay in the picture.",

    // Built to last
    "lasting.title": "Built to last",
    "lasting.titleHighlight": "— not just to launch.",
    "lasting.desc": "Every project ships with its technical documentation, continuity guide and maintenance plan. Your site doesn't depend on one person. It's built so any developer can pick it up, understand it and evolve it.",

    // Pitch
    "pitch.line1": "We design",
    "pitch.line2": "build",
    "pitch.line3": "launch",
    "pitch.line4": "and measure.",
    "pitch.cta": "Let's chat?",
    "pitch.subcta": "Tell us what's slowing you down.",
    "pitch.footer": "Studio Micho × JAXA Production · Montréal",
    "pitch.footerBy": "by",
    "pitch.pierre.role": "Consultant · Developer",
    "pitch.virginie.role": "Operations · Account Management",

    // Estimator
    "estimator.cta": "Estimate your project →",
    "estimator.subtitle": "In 2 minutes, get a budget and timeline idea.",

    // Modal
    "modal.title": "All our projects",
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
    "modal.aurea.desc": "Human resources consulting. Clean design, responsive.",
    "modal.aurea.tag1": "A to Z",
    "modal.aurea.tag2": "Showcase",
    "modal.aurea.tag3": "2 weeks",
    "modal.jeanharvey.desc": "Actor page",
    "modal.jeanharvey.tag1": "Portfolio",
    "modal.jeanharvey.tag2": "Showcase site",
    "modal.studio76.desc": "TV production",
    "modal.studio76.tag1": "Corporate",
    "modal.studio76.tag2": "TV Production",
    "modal.maisonleroy.desc": "Provence rental",
    "modal.maisonleroy.tag1": "Tourism",

    // Metadata
    "meta.title": "Studio Micho - Digital products at AI velocity",
    "meta.description": "Digital products at AI velocity. Sites, apps, dashboards and marketing — delivered in 3-4 weeks by a team of two. Studio Micho × JAXA Production, Montréal.",
  },
};

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const I18nProvider: React.FC<{ children: React.ReactNode; initialLocale?: Locale }> = ({ children, initialLocale }) => {
  const [locale, setLocaleState] = useState<Locale>(initialLocale || "fr");

  useEffect(() => {
    if (initialLocale) {
      document.documentElement.lang = initialLocale;
      return;
    }
    const saved = localStorage.getItem("locale") as Locale;
    if (saved === "en" || saved === "fr") {
      setLocaleState(saved);
    }
  }, [initialLocale]);

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
