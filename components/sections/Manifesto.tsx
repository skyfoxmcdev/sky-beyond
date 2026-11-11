import Image from "next/image";

export function Manifesto() {
  return (
    <section id="decouvrir" className="section section-paper manifesto" aria-labelledby="manifesto-title">
      <div className="wrap manifesto-grid">
        <figure className="manifesto-media scroll-rise">
          <div className="manifesto-frame">
            <Image
              src="/images/islands.webp"
              alt="Illustration d’une île suspendue avec une maison, des arbres et deux personnages."
              fill
              sizes="(max-width: 900px) 100vw, 40vw"
            />
          </div>
          <figcaption>
            <span>Illustration originale</span>
            <span className="mono">Monde suspendu</span>
          </figcaption>
        </figure>

        <div className="manifesto-copy">
          <h2 id="manifesto-title" className="h2">
            Le connu s’arrête ici.
          </h2>
          <p className="manifesto-standfirst">
            Sky &amp; Beyond est un archipel Minecraft fait d’îles, de vide et d’appareils volants.
          </p>
          <p>
            On ne traverse pas cet archipel à pied. On le construit, on le pilote, on se le dispute.
            Les îles portent des ressources ; certaines sont gardées. Entre deux horizons, il y a
            assez d’espace pour décider de la suite.
          </p>
          <p>
            Le serveur ne promet pas un monde sans fin. Il promet un monde qui recule à mesure que
            vous prenez de la hauteur.
          </p>

          <dl className="manifest">
            <div className="manifest-row">
              <dt>Monde</dt>
              <dd>Un archipel d’îles posées dans le vide</dd>
            </div>
            <div className="manifest-row">
              <dt>Appareils</dt>
              <dd>Construits avec Create Aeronautics</dd>
            </div>
            <div className="manifest-row">
              <dt>Tensions</dt>
              <dd>Une guerre de factions pour le contrôle</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
