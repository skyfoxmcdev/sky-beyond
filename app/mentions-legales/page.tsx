import type { Metadata } from "next";
import { hasDiscord, siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Mentions légales",
  description:
    "Mentions légales du site officiel Sky & Beyond : édition, hébergement, propriété intellectuelle et données.",
  alternates: { canonical: "/mentions-legales" },
  robots: { index: true, follow: true },
};

export default function LegalPage() {
  return (
    <main id="contenu" className="legal-page">
      <div className="wrap">
        <header className="legal-head">
          <h1>Mentions légales</h1>
          <p>
            Informations relatives au site officiel de Sky &amp; Beyond. Ce site présente un serveur
            Minecraft et ne fournit aucun service de paiement ni compte utilisateur.
          </p>
        </header>

        <div className="legal-prose">
          <h2>Édition du site</h2>
          <p>
            Le site est édité par le projet <strong>Sky &amp; Beyond</strong>, qui en assure la
            direction artistique et la publication. Aucune société commerciale n’est déclarée à ce
            stade.
          </p>
          <p>
            Contact :{" "}
            {hasDiscord ? (
              <a href={siteConfig.discordUrl} target="_blank" rel="noopener noreferrer">
                le Discord officiel de Sky &amp; Beyond
              </a>
            ) : (
              "les coordonnées seront publiées avec l’ouverture officielle du serveur."
            )}
          </p>

          <h2>Hébergement</h2>
          <p>
            Lors de sa mise en ligne, le site est hébergé par Vercel Inc. (États-Unis), dans le cadre
            de son offre gratuite. Le site ne dépend d’aucune base de données ni d’un serveur
            applicatif maintenu en permanence.
          </p>

          <h2>Propriété intellectuelle</h2>
          <p>
            Les textes, le code, la direction artistique et les éléments de marque originaux sont la
            propriété du projet Sky &amp; Beyond. Les illustrations du monde sont des créations
            originales ; elles ne représentent pas des captures de jeu.
          </p>
          <p>
            Les polices Archivo et Martian Mono sont utilisées sous licence SIL Open Font License.
            Les marques Minecraft, Mojang Studios et Microsoft appartiennent à leurs propriétaires
            respectifs.
          </p>

          <h2>Données et cookies</h2>
          <p>
            Le site ne dépose aucun cookie de mesure d’audience et ne propose aucun formulaire de
            collecte de données personnelles. Le statut du serveur est consulté côté serveur auprès
            de l’API publique MCSrvStat.us ; aucune adresse IP de visiteur n’est transmise à ce
            service par le navigateur.
          </p>
          <p>
            Les liens vers Discord sont des liens externes. Leur utilisation est soumise aux
            conditions et à la politique de confidentialité de Discord.
          </p>

          <h2>Statut des informations</h2>
          <p>
            L’adresse de connexion, la version Minecraft, l’invitation Discord et le statut du
            serveur sont des informations configurables. Lorsqu’une valeur n’est pas confirmée, le
            site l’indique explicitement et n’affiche aucune valeur de remplacement. Aucune
            statistique de joueurs, aucun classement et aucun avantage ne sont inventés.
          </p>

          <h2>Non-affiliation</h2>
          <p>
            Sky &amp; Beyond est un projet indépendant. Le site n’est ni approuvé ni sponsorisé par
            Mojang Studios ou Microsoft.
          </p>
        </div>
      </div>
    </main>
  );
}
