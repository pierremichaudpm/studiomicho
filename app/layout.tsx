import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Studio Micho - Produits numériques à vélocité IA",
  description:
    "J'imagine et construis des produits numériques à vélocité IA. Produits qui fonctionnent, pas juste des plans.",
  openGraph: {
    title: "Studio Micho - Produits numériques à vélocité IA",
    description:
      "J'imagine et construis des produits numériques à vélocité IA. Produits qui fonctionnent, pas juste des plans.",
    type: "website",
    locale: "fr_FR",
    url: "https://studiomicho.com",
    siteName: "Studio Micho",
  },
  twitter: {
    card: "summary_large_image",
    title: "Studio Micho - Produits numériques à vélocité IA",
    description:
      "J'imagine et construis des produits numériques à vélocité IA. Produits qui fonctionnent, pas juste des plans.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
