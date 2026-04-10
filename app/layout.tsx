import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://studiomicho.com"),
  title:
    "Studio Micho — Agence web Montréal | Sites, apps et dashboards sur mesure",
  description:
    "Agence web à Montréal. Développement de sites, applications web, dashboards et outils de gestion sur mesure pour PME, OBNL et organisations culturelles. Livraison en 3-4 semaines à vélocité IA. Studio Micho par JAXA Production.",
  keywords: [
    "agence web Montréal",
    "développement web Montréal",
    "application web sur mesure Montréal",
    "dashboard sur mesure PME Québec",
    "consultant numérique Montréal",
    "site web OBNL Montréal",
    "développement IA Montréal",
    "React Montréal",
    "web agency Montreal",
    "custom web development Montreal",
  ],
  alternates: {
    canonical: "https://studiomicho.com",
    languages: {
      fr: "https://studiomicho.com",
      en: "https://studiomicho.com",
      "x-default": "https://studiomicho.com",
    },
  },
  openGraph: {
    title:
      "Studio Micho — Agence web Montréal | Sites, apps et dashboards sur mesure",
    description:
      "Développement web sur mesure pour PME et OBNL à Montréal. Sites, applications, dashboards et intégrations IA livrés en 3-4 semaines par une équipe de deux.",
    type: "website",
    locale: "fr_CA",
    alternateLocale: ["en_CA"],
    url: "https://studiomicho.com",
    siteName: "Studio Micho",
    images: [
      {
        url: "/og-fr-v3.png",
        width: 1200,
        height: 630,
        alt: "Studio Micho — Agence web Montréal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Studio Micho — Agence web Montréal",
    description:
      "Sites, apps, dashboards et outils de gestion sur mesure. Livraison en 3-4 semaines à vélocité IA.",
    images: ["/og-fr-v3.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [
      { url: "/android-icon-192.png", sizes: "192x192", type: "image/png" },
    ],
  },
  manifest: "/manifest.webmanifest",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Studio Micho",
  url: "https://studiomicho.com",
  telephone: "+15149159370",
  email: "pierre@studiomicho.com",
  description:
    "Agence web à Montréal spécialisée en développement de sites, applications web, dashboards et outils de gestion sur mesure pour PME, OBNL et organisations culturelles.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Montréal",
    addressRegion: "QC",
    addressCountry: "CA",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 45.5017,
    longitude: -73.5673,
  },
  areaServed: [
    { "@type": "City", name: "Montréal" },
    { "@type": "AdministrativeArea", name: "Québec" },
  ],
  founder: [
    { "@type": "Person", name: "Pierre Michaud", jobTitle: "Consultant numérique et développeur" },
    { "@type": "Person", name: "Virginie Jaffredo", jobTitle: "Stratégie opérationnelle et gestion de comptes" },
  ],
  knowsAbout: [
    "développement web",
    "applications sur mesure",
    "dashboards",
    "intelligence artificielle",
    "React",
    "Supabase",
    "Next.js",
    "transformation numérique",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Services Studio Micho",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Sites web et applications sur mesure",
          description: "Développement de sites vitrines et applications web sur mesure avec React et Next.js",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Dashboards et outils de gestion",
          description: "Tableaux de bord opérationnels et financiers sur mesure pour PME",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Transformation numérique PME",
          description: "Audit, plan et exécution de la transformation numérique pour PME et OBNL",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Intégration IA et agents intelligents",
          description: "Agents email, chatbots et automatisations propulsés par l'intelligence artificielle",
        },
      },
    ],
  },
  priceRange: "$$",
  image: "https://studiomicho.com/studio-micho-logo-1200.png",
  sameAs: [],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
