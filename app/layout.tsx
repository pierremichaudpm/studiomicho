import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Studio Micho — Produits Numériques Qui Livrent",
  description:
    "J'imagine et construis des produits numériques à vélocité IA. Produits qui fonctionnent, pas juste des plans.",
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
