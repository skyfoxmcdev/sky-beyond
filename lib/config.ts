const DEFAULT_SITE_URL = "https://skyandbeyond.example";

function read(value: string | undefined): string {
  return value?.trim() ?? "";
}

function normalizeSiteUrl(value: string): string {
  try {
    const url = new URL(value);
    return `${url.origin}${url.pathname}`.replace(/\/+$/, "");
  } catch {
    return DEFAULT_SITE_URL;
  }
}

function readDiscordUrl(value: string | undefined): string {
  const candidate = read(value);
  if (!candidate) return "";

  try {
    const url = new URL(candidate);
    const allowedHosts = new Set(["discord.gg", "www.discord.gg", "discord.com", "www.discord.com"]);
    if (url.protocol !== "https:" || !allowedHosts.has(url.hostname)) return "";
    return url.toString();
  } catch {
    return "";
  }
}

function readLogoSrc(value: string | undefined): string {
  const candidate = read(value);
  return candidate.startsWith("/") ? candidate : "";
}

function readDimension(value: string | undefined, fallback: number): number {
  const parsed = Number.parseInt(read(value), 10);
  return Number.isFinite(parsed) && parsed > 0 && parsed <= 1200 ? parsed : fallback;
}

const discordUrl = readDiscordUrl(process.env.NEXT_PUBLIC_DISCORD_URL);
const siteUrl = normalizeSiteUrl(read(process.env.NEXT_PUBLIC_SITE_URL) || DEFAULT_SITE_URL);

export const siteConfig = {
  name: "Sky & Beyond",
  tagline: "Where the known end.",
  description:
    "Sky & Beyond est un serveur Minecraft d'exploration aérienne et de guerre de factions. Construisez votre appareil, traversez un archipel d'îles et disputez le contrôle du ciel.",
  url: siteUrl,
  locale: "fr_FR",
  ogImageAlt: "Sky & Beyond, serveur Minecraft d'exploration aérienne et de guerre de factions.",
  discordUrl,
  logo: {
    src: readLogoSrc(process.env.NEXT_PUBLIC_LOGO_SRC),
    width: readDimension(process.env.NEXT_PUBLIC_LOGO_WIDTH, 184),
    height: readDimension(process.env.NEXT_PUBLIC_LOGO_HEIGHT, 48),
  },
  minecraft: {
    address: read(process.env.NEXT_PUBLIC_MC_SERVER_ADDRESS),
    version: read(process.env.NEXT_PUBLIC_MC_VERSION),
  },
} as const;

export const hasDiscord = siteConfig.discordUrl.length > 0;
export const hasServerAddress = siteConfig.minecraft.address.length > 0;
export const hasServerVersion = siteConfig.minecraft.version.length > 0;
export const joinHref = "/#rejoindre";

export type NavItem = {
  label: string;
  href: string;
  external: boolean;
};

export const navItems: NavItem[] = [
  { label: "Accueil", href: "/", external: false },
  { label: "Découvrir", href: "/#decouvrir", external: false },
  { label: "Fonctionnalités", href: "/#fonctionnalites", external: false },
  { label: "Actualités", href: "/actualites", external: false },
  { label: "FAQ", href: "/#faq", external: false },
  {
    label: "Discord",
    href: hasDiscord ? siteConfig.discordUrl : "/#communaute",
    external: hasDiscord,
  },
];
