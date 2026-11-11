import Image from "next/image";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { LiveStatus } from "@/components/status/LiveStatus";

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-media">
        <Image
          src="/images/hero-archipelago.webp"
          alt="Illustration d’un archipel flottant au crépuscule, avec un appareil volant au-dessus d’une île éclairée."
          fill
          priority
          sizes="100vw"
          className="hero-image"
        />
      </div>
      <div className="hero-grade" aria-hidden="true" />
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-reticle" aria-hidden="true">
        <span className="hero-reticle-mark" />
      </div>
      <p className="hero-rail mono" aria-hidden="true">
        Au-delà du connu
      </p>

      <div className="wrap hero-inner">
        <div className="hero-copy">
          <p className="hero-kicker mono">
            Serveur Minecraft · Exploration aérienne · Guerre de factions
          </p>
          <h1 id="hero-title" className="hero-title">
            <span className="hero-title-line">Sky</span>
            <span className="hero-title-line">
              <span className="hero-amp">&amp;</span> Beyond
            </span>
          </h1>
          <p className="hero-tagline mono">“Where the known end.”</p>
          <p className="hero-lead">
            Construisez votre appareil. Traversez un archipel d’îles. Disputez le contrôle du ciel.
          </p>
          <div className="hero-actions">
            <ButtonLink href="/#rejoindre" variant="primary">
              Rejoindre
              <ArrowUpRight aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href="/#decouvrir" variant="secondary">
              Découvrir le serveur
              <ArrowUpRight aria-hidden="true" />
            </ButtonLink>
          </div>
        </div>

        <aside className="hero-aside" aria-label="Repères du serveur">
          <div className="hero-aside-head">
            <span className="mono">Dossier de vol</span>
            <span className="mono">SB</span>
          </div>
          <div className="hero-aside-status">
            <LiveStatus variant="panel" />
          </div>
          <dl>
            <div className="hero-aside-row">
              <dt className="mono">Monde</dt>
              <dd>Archipel d’îles</dd>
            </div>
            <div className="hero-aside-row">
              <dt className="mono">Appareils</dt>
              <dd>Create Aeronautics</dd>
            </div>
            <div className="hero-aside-row">
              <dt className="mono">Conflit</dt>
              <dd>Guerre de factions</dd>
            </div>
          </dl>
        </aside>
      </div>

      <div className="hero-foot">
        <div className="wrap hero-foot-inner">
          <div className="hero-foot-mobile-status">
            <LiveStatus />
          </div>
          <div className="hero-facts">
            <span className="hero-fact">Aéronautique</span>
            <span className="hero-fact">Îles &amp; ressources</span>
            <span className="hero-fact">Guerre de factions</span>
          </div>
          <a
            className="scroll-cue"
            href="#decouvrir"
            aria-label="Descendre vers la découverte du serveur"
          >
            <span>Descendre</span>
            <ArrowDown aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
