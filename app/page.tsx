import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { Manifesto } from "@/components/sections/Manifesto";
import { FeatureExplorer } from "@/components/sections/FeatureExplorer";
import { World } from "@/components/sections/World";
import { Factions } from "@/components/sections/Factions";
import { Community } from "@/components/sections/Community";
import { NewsPreview } from "@/components/sections/NewsPreview";
import { Faq } from "@/components/sections/Faq";
import { Join } from "@/components/sections/Join";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <main id="contenu">
      <Hero />
      <Manifesto />

      <section
        id="fonctionnalites"
        className="section features on-dark"
        aria-labelledby="features-title"
      >
        <div className="wrap">
          <div className="features-intro">
            <h2 id="features-title" className="h2">
              Tout part de votre appareil.
            </h2>
            <p className="lead">
              Six pièces composent le quotidien du serveur. Aucune n’est décorative.
            </p>
          </div>
          <FeatureExplorer />
        </div>
      </section>

      <World />
      <Factions />
      <Community />
      <NewsPreview />
      <Faq />
      <Join />
    </main>
  );
}
