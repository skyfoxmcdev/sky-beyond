import type { Metadata, Viewport } from "next";
import { Archivo, Martian_Mono } from "next/font/google";
import { siteConfig } from "@/lib/config";
import { StatusProvider } from "@/components/status/StatusProvider";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-archivo",
  display: "swap",
});

const martianMono = Martian_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-martian",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Sky & Beyond — Serveur Minecraft d'exploration aérienne",
    template: "%s · Sky & Beyond",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  keywords: [
    "Sky & Beyond",
    "serveur Minecraft",
    "Minecraft",
    "Create Aeronautics",
    "exploration aérienne",
    "guerre de factions",
    "archipel",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "/",
    siteName: siteConfig.name,
    title: "Sky & Beyond — Construire. Explorer. Tenir.",
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Sky & Beyond — Construire. Explorer. Tenir.",
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#040e19",
  colorScheme: "dark",
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
      url: siteConfig.url,
      name: siteConfig.name,
      description: siteConfig.description,
      inLanguage: "fr-FR",
    },
    {
      "@type": "VideoGame",
      "@id": `${siteConfig.url}/#game`,
      name: siteConfig.name,
      description: siteConfig.description,
      inLanguage: "fr-FR",
      genre: ["Exploration", "Construction", "Guerre de factions"],
      gamePlatform: "PC",
      playMode: "MultiPlayer",
      url: siteConfig.url,
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${archivo.variable} ${martianMono.variable}`}>
      <body>
        <a className="skip-link" href="#contenu">
          Aller au contenu
        </a>
        <StatusProvider>
          <SiteHeader />
          {children}
          <SiteFooter />
        </StatusProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}
