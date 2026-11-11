import Link from "next/link";
import { ArrowUpRight, MessagesSquare } from "lucide-react";
import { hasDiscord, siteConfig } from "@/lib/config";
import { ButtonLink } from "@/components/ui/Button";

const bars = [18, 34, 52, 24, 44, 62, 30, 50, 22, 40, 58, 26, 46, 36, 54, 20, 44, 30, 60, 38, 48, 24, 42, 56];

export function Community() {
  return (
    <section id="communaute" className="section community" aria-labelledby="community-title">
      <div className="wrap community-grid">
        <div>
          <h2 id="community-title" className="h2">
            Un ciel, plusieurs équipages.
          </h2>
          <p className="lead">
            Les équipages ne se croisent pas seulement en vol. La communauté se retrouve pour suivre
            le projet, partager ses constructions et préparer les prochains départs.
          </p>
          <div className="community-actions">
            {hasDiscord ? (
              <ButtonLink href={siteConfig.discordUrl} variant="ink" external>
                Rejoindre le Discord
                <ArrowUpRight aria-hidden="true" />
              </ButtonLink>
            ) : (
              <ButtonLink href="/#rejoindre" variant="ink">
                Rejoindre le serveur
                <ArrowUpRight aria-hidden="true" />
              </ButtonLink>
            )}
            <Link className="arrow-link" href="/#faq">
              Lire la FAQ
              <ArrowUpRight aria-hidden="true" />
            </Link>
          </div>
          {!hasDiscord ? (
            <p className="community-note">
              L’invitation Discord officielle n’est pas encore publiée. Le site n’affichera aucun
              lien provisoire.
            </p>
          ) : null}
        </div>

        <div className="discord-panel">
          <div className="discord-head">
            <div className="discord-head-main">
              <MessagesSquare aria-hidden="true" />
              <span className="mono">Discord officiel</span>
            </div>
            <span className="discord-channel mono">{hasDiscord ? "Invitation ouverte" : "En attente"}</span>
          </div>
          <h3>{hasDiscord ? "Le salon est ouvert." : "Le salon ouvre bientôt."}</h3>
          <p>
            {hasDiscord
              ? "Rejoignez la communauté officielle pour suivre les annonces et rencontrer les équipages."
              : "L’invitation officielle sera publiée ici dès qu’elle sera configurée."}
          </p>
          <div className="frequency" aria-hidden="true">
            {bars.map((height, index) => (
              <span key={`${height}-${index}`} style={{ height: `${height}%` }} />
            ))}
          </div>
          <div className="discord-panel-foot mono">
            <span>Sky &amp; Beyond</span>
            <span>{hasDiscord ? "Canal communautaire" : "Invitation à venir"}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
