import { ArrowUpRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";

export function Factions() {
  return (
    <section className="section factions on-dark" aria-labelledby="factions-title">
      <div className="wrap factions-grid">
        <div className="factions-copy">
          <h2 id="factions-title" className="h2">
            Le ciel n’appartient à personne.
          </h2>
          <p>
            Des factions s’affrontent pour le contrôle des airs. Un appareil ne sert pas seulement à
            voir le monde : il sert à y tenir une place.
          </p>
          <p className="factions-note">Territoire · Conflit · Contrôle</p>
          <div className="factions-actions">
            <ButtonLink href="/#rejoindre" variant="primary">
              Rejoindre
              <ArrowUpRight aria-hidden="true" />
            </ButtonLink>
          </div>
        </div>

        <div className="factions-map" aria-hidden="true">
          <svg viewBox="0 0 640 620" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g stroke="rgba(79,225,234,0.42)" strokeWidth="1">
              <path d="M320 34c128 0 232 104 232 232s-104 232-232 232S88 394 88 266 192 34 320 34Z" />
              <path d="M320 78c104 0 188 84 188 188s-84 188-188 188S132 370 132 266 216 78 320 78Z" opacity=".72" />
              <path d="M320 124c78 0 142 64 142 142s-64 142-142 142-142-64-142-142 64-142 142-142Z" opacity=".55" />
              <path d="M320 174c51 0 92 41 92 92s-41 92-92 92-92-41-92-92 41-92 92-92Z" opacity=".4" />
            </g>
            <path
              d="M44 356c86-54 128-31 176-4s94 49 154 6 81-83 148-63 65 72 108 62"
              stroke="rgba(79,225,234,0.7)"
              strokeWidth="1.25"
              strokeDasharray="5 8"
            />
            <path
              d="M92 160c56 24 78 63 118 67s63-28 118-27 80 45 123 38 65-38 108-38"
              stroke="rgba(237,247,248,0.26)"
              strokeWidth="1"
              strokeDasharray="2 9"
            />
            <g stroke="rgba(79,225,234,0.8)" strokeWidth="1.2">
              <path d="M320 244v44M298 266h44" />
              <circle cx="320" cy="266" r="5.5" fill="rgba(79,225,234,0.18)" />
              <path d="M504 356v28M490 370h28" opacity=".75" />
              <path d="M176 212v28M162 226h28" opacity=".6" />
            </g>
          </svg>
          <div className="factions-map-caption">
            <span className="mono">Espace aérien</span>
            <span className="mono">Contrôle disputé</span>
          </div>
          <div className="factions-map-labels">
            <span>Territoire</span>
            <span>Conflit</span>
          </div>
        </div>
      </div>
    </section>
  );
}
