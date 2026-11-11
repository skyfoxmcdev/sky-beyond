import Image from "next/image";

const plates = [
  {
    title: "Des terres à atteindre",
    description: "Chaque relief est une étape. Aucun n’est posé là pour décorer.",
    label: "Îles",
    index: "01",
    image: "/images/islands.webp",
    alt: "Illustration d’une île suspendue avec une maison et des arbres.",
  },
  {
    title: "Des ressources à rapporter",
    description: "De la matière pour construire, réparer et pousser plus loin.",
    label: "Ressources",
    index: "02",
    image: "/images/cover-dawn.webp",
    alt: "Illustration d’une île avec des bâtiments à l’aube.",
  },
  {
    title: "Des gardiens sur la route",
    description: "Certaines îles sont tenues par des PNJ armés.",
    label: "Présences",
    index: "03",
    image: "/images/npcs.webp",
    alt: "Illustration d’une île avec des bâtiments et des personnages.",
  },
];

export function World() {
  return (
    <section id="monde" className="world" aria-labelledby="world-title">
      <div className="world-band">
        <div className="world-band-media">
          <Image
            src="/images/archipelago-wide.webp"
            alt="Illustration panoramique de plusieurs îles flottantes séparées par le vide."
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="wrap world-band-content">
          <h2 id="world-title" className="h2">
            L’archipel ne tient pas sur une carte.
          </h2>
          <p>
            Des îles séparées par le vide, un horizon qui recule à mesure qu’on avance. Le monde de
            Sky &amp; Beyond se lit en vol.
          </p>
        </div>
        <span className="world-credit mono">Illustration originale</span>
      </div>

      <div className="world-body">
        <div className="wrap world-grid">
          <div className="world-intro">
            <h3 className="h3">Le vide n’est pas une frontière.</h3>
            <p>
              Il donne l’échelle. Entre deux îles, il y a assez d’espace pour construire un
              appareil, choisir une route et changer d’avis.
            </p>
          </div>

          <div className="world-plates">
            {plates.map((plate) => (
              <figure key={plate.title} className="world-plate">
                <div className="world-plate-frame">
                  <Image src={plate.image} alt={plate.alt} fill sizes="(max-width: 680px) 100vw, (max-width: 900px) 45vw, 26vw" />
                </div>
                <div className="world-plate-meta">
                  <span>
                    {plate.index} / {plate.label}
                  </span>
                  <span>Illustration</span>
                </div>
                <h4>{plate.title}</h4>
                <p>{plate.description}</p>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
