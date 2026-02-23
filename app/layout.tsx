import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://studiomicho.com"),
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
    images: [
      {
        url: "/studio-micho-logo-1200.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Studio Micho - Produits numériques à vélocité IA",
    description:
      "J'imagine et construis des produits numériques à vélocité IA. Produits qui fonctionnent, pas juste des plans.",
    images: ["/studio-micho-logo-1200.png"],
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
