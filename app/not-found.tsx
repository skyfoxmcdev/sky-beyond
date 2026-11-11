import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Hors de la carte",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main id="contenu" className="not-found">
      <div className="wrap">
        <p className="not-found-code">Erreur 404</p>
        <h1>Hors de la carte.</h1>
        <p>
          Cette page n’existe pas, ou elle a quitté l’archipel. Revenez au point de départ pour
          reprendre le vol.
        </p>
        <div className="not-found-actions">
          <ButtonLink href="/" variant="primary">
            Retour à l’accueil
            <ArrowUpRight aria-hidden="true" />
          </ButtonLink>
          <ButtonLink href="/actualites" variant="secondary">
            Lire le carnet de vol
            <ArrowUpRight aria-hidden="true" />
          </ButtonLink>
        </div>
      </div>
    </main>
  );
}
