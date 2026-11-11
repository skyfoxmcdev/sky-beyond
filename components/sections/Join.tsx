import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import {
  hasDiscord,
  hasServerAddress,
  hasServerVersion,
  siteConfig,
} from "@/lib/config";
import { ButtonLink } from "@/components/ui/Button";
import { CopyAddress } from "@/components/ui/CopyAddress";
import { LiveStatus } from "@/components/status/LiveStatus";
import { Logo } from "@/components/layout/Logo";

export function Join() {
  const missingInformation = !hasServerAddress || !hasServerVersion || !hasDiscord;

  return (
    <section id="rejoindre" className="section join on-dark" aria-labelledby="join-title">
      <div className="wrap join-grid">
        <div className="join-copy">
          <h2 id="join-title" className="h2">
            Votre place est dans le ciel.
          </h2>
          <p className="lead">
            Le serveur est un archipel. Votre appareil est la seule façon d’en voir la suite.
          </p>

          <ol className="steps">
            <li className="step">
              <span className="step-num" aria-hidden="true">
                01
              </span>
              <div>
                <h3>Rejoignez la communauté</h3>
                <p>
                  {hasDiscord
                    ? "Le Discord officiel rassemble les annonces et la communauté du serveur."
                    : "L’invitation officielle sera publiée ici et dans les notes du carnet de vol."}
                </p>
              </div>
            </li>
            <li className="step">
              <span className="step-num" aria-hidden="true">
                02
              </span>
              <div>
                <h3>Notez l’adresse et la version</h3>
                <p>
                  {hasServerAddress
                    ? "Elles sont affichées dans la carte d’embarquement, prêtes à être copiées."
                    : "Elles apparaîtront dans la carte d’embarquement dès leur publication officielle."}
                </p>
              </div>
            </li>
            <li className="step">
              <span className="step-num" aria-hidden="true">
                03
              </span>
              <div>
                <h3>Construisez votre appareil</h3>
                <p>
                  Sky &amp; Beyond s’appuie sur Create Aeronautics. Votre appareil est la première
                  étape du voyage.
                </p>
              </div>
            </li>
          </ol>

          {hasDiscord ? (
            <div className="hero-actions">
              <ButtonLink href={siteConfig.discordUrl} variant="primary" external>
                Rejoindre le Discord
                <ArrowUpRight aria-hidden="true" />
              </ButtonLink>
            </div>
          ) : (
            <p className="join-pending">
              Les informations de connexion seront publiées dès qu’elles seront confirmées.
            </p>
          )}
        </div>

        <aside className="ticket" aria-label="Carte d’embarquement et informations de connexion">
          <div className="ticket-head">
            <Logo />
            <span className="mono">
              Carte d’embarquement
              <br />
              Accès au monde
            </span>
          </div>

          <div className="ticket-route">
            <span>Le connu</span>
            <ArrowRight aria-hidden="true" />
            <span>Au-delà</span>
          </div>

          <dl className="ticket-fields">
            <div className="ticket-field">
              <dt>Adresse</dt>
              <dd className={hasServerAddress ? undefined : "is-pending"}>
                {hasServerAddress ? (
                  <>
                    <span>{siteConfig.minecraft.address}</span>
                    <CopyAddress value={siteConfig.minecraft.address} />
                  </>
                ) : (
                  "À confirmer"
                )}
              </dd>
            </div>
            <div className="ticket-field">
              <dt>Version</dt>
              <dd className={hasServerVersion ? undefined : "is-pending"}>
                {hasServerVersion ? siteConfig.minecraft.version : "À confirmer"}
              </dd>
            </div>
            <div className="ticket-field">
              <dt>Discord</dt>
              <dd className={hasDiscord ? undefined : "is-pending"}>
                {hasDiscord ? (
                  <a href={siteConfig.discordUrl} target="_blank" rel="noopener noreferrer">
                    Invitation officielle
                  </a>
                ) : (
                  "À confirmer"
                )}
              </dd>
            </div>
          </dl>

          <div className="ticket-status">
            <span className="mono">État du serveur</span>
            <LiveStatus variant="panel" />
          </div>

          <div className="ticket-lines" aria-hidden="true">
            {Array.from({ length: 56 }).map((_, index) => (
              <span key={index} style={{ width: index % 3 === 0 ? 3 : 1 }} />
            ))}
          </div>

          <div className="ticket-foot mono">
            <span>Sky &amp; Beyond</span>
            <span>Accès au monde</span>
          </div>

          {missingInformation ? (
            <p className="ticket-note">
              Une partie des informations officielles n’est pas encore publiée. Ce site n’affiche
              que des valeurs configurées.{" "}
              <Link href="/#faq">Consulter la FAQ</Link>.
            </p>
          ) : null}
        </aside>
      </div>
    </section>
  );
}
