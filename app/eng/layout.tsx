import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Studio Micho — Montreal Web Agency | Custom Sites, Apps & Dashboards",
  description:
    "Montreal web agency. Custom websites, web apps, dashboards and management tools for SMBs, nonprofits and cultural organizations. Delivered in 3-4 weeks with AI velocity. Studio Micho by JAXA Production.",
  keywords: [
    "web agency Montreal",
    "custom web development Montreal",
    "web application Montreal",
    "custom dashboard SMB Quebec",
    "digital consultant Montreal",
    "nonprofit website Montreal",
    "AI development Montreal",
    "React Montreal",
    "agence web Montréal",
    "développement web Montréal",
  ],
  alternates: {
    canonical: "https://studiomicho.com/eng",
    languages: {
      fr: "https://studiomicho.com",
      en: "https://studiomicho.com/eng",
      "x-default": "https://studiomicho.com",
    },
  },
  openGraph: {
    title:
      "Studio Micho — Montreal Web Agency | Custom Sites, Apps & Dashboards",
    description:
      "Custom web development for SMBs and nonprofits in Montreal. Sites, apps, dashboards and AI integrations delivered in 3-4 weeks by a team of two.",
    type: "website",
    locale: "en_CA",
    alternateLocale: ["fr_CA"],
    url: "https://studiomicho.com/eng",
    siteName: "Studio Micho",
    images: [
      {
        url: "/studio-micho-og-en.png",
        width: 1200,
        height: 630,
        alt: "Studio Micho — Montreal Web Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Studio Micho — Montreal Web Agency",
    description:
      "Custom sites, apps, dashboards and management tools. Delivered in 3-4 weeks with AI velocity.",
    images: ["/studio-micho-og-en.png"],
  },
};

export default function EngLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
