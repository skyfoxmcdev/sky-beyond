import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { hasDiscord, navItems, siteConfig } from "@/lib/config";
import { Logo } from "@/components/layout/Logo";

export function SiteFooter() {
  return (
    <footer className="footer" aria-labelledby="footer-title">
      <div className="wrap">
        <div className="footer-top">
          <div className="footer-brand">
            <h2 id="footer-title" className="sr-only">
              {siteConfig.name}
            </h2>
            <Link href="/" aria-label={`${siteConfig.name}, retour à l’accueil`}>
              <Logo />
            </Link>
            <p className="footer-tagline mono">{siteConfig.tagline}</p>
          </div>
          <p className="footer-intro">
            Construire son appareil, explorer un archipel, disputer le contrôle du ciel. Sky &amp;
            Beyond est un serveur Minecraft pensé pour ceux qui regardent plus loin que la carte.
          </p>
        </div>

        <div className="footer-cols">
          <div className="footer-col">
            <h2>Explorer</h2>
            <ul>
              <li>
                <Link href="/">Accueil</Link>
              </li>
              <li>
                <Link href="/#decouvrir">Découvrir</Link>
              </li>
              <li>
                <Link href="/#fonctionnalites">Fonctionnalités</Link>
              </li>
              <li>
                <Link href="/#monde">Le monde</Link>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h2>Le serveur</h2>
            <ul>
              <li>
                <Link href="/actualites">Carnet de vol</Link>
              </li>
              <li>
                <Link href="/#faq">FAQ</Link>
              </li>
              <li>
                <Link href="/#rejoindre">Rejoindre</Link>
              </li>
              <li>
                <Link href="/mentions-legales">Mentions légales</Link>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h2>Communauté</h2>
            <ul>
              {hasDiscord ? (
                <li>
                  <a href={siteConfig.discordUrl} target="_blank" rel="noopener noreferrer">
                    Discord officiel <ArrowUpRight size={13} aria-hidden="true" />
                  </a>
                </li>
              ) : (
                <li>
                  <span>Discord — invitation à venir</span>
                </li>
              )}
              <li>
                <Link href="/#communaute">Le salon</Link>
              </li>
              <li>
                <Link href="/actualites">Les notes de vol</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div>
            <p>
              © {siteConfig.name}. Tous droits réservés.
            </p>
            <p className="footer-note">
              Illustrations originales de direction artistique, non contractuelles. Site non
              affilié à Mojang Studios ou Microsoft.
            </p>
          </div>
          <div className="footer-legal">
            <Link href="/mentions-legales">Mentions légales</Link>
            <Link href="/#rejoindre">Rejoindre</Link>
            {navItems
              .filter((item) => item.external)
              .map((item) => (
                <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer">
                  {item.label}
                </a>
              ))}
            <a href="#contenu">Haut de page</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
