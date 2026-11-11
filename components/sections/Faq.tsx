import { ArrowUpRight, Plus } from "lucide-react";
import {
  hasDiscord,
  hasServerAddress,
  hasServerVersion,
  siteConfig,
} from "@/lib/config";

export function Faq() {
  const joinAnswer = hasServerAddress ? (
    <>
      L’adresse officielle est <strong>{siteConfig.minecraft.address}</strong>
      {hasServerVersion ? `, en version ${siteConfig.minecraft.version}` : ""}. Vous pouvez la
      copier depuis la section « Rejoindre ».
    </>
  ) : (
    <>
      L’adresse et la version officielles ne sont pas encore publiées. Ce site n’en affiche aucune
      valeur inventée : elles apparaîtront ici dès leur configuration.
    </>
  );

  const discordAnswer = hasDiscord ? (
    <>
      L’invitation officielle est disponible sur{" "}
      <a href={siteConfig.discordUrl} target="_blank" rel="noopener noreferrer">
        le Discord de Sky &amp; Beyond
      </a>
      . Elle est aussi accessible depuis la section communauté.
    </>
  ) : (
    <>
      L’invitation officielle n’est pas encore publiée. Aucun lien provisoire n’est utilisé à sa
      place.
    </>
  );

  const faqs = [
    {
      question: "Qu’est-ce que Sky & Beyond ?",
      answer: (
        <p>
          Un serveur Minecraft construit autour de l’exploration aérienne, de la construction
          d’appareils et de la guerre de factions.
        </p>
      ),
    },
    {
      question: "Quel est le principe du serveur ?",
      answer: (
        <p>
          Construire son appareil, explorer un archipel d’îles, récolter des ressources et
          s’affronter entre factions pour le contrôle.
        </p>
      ),
    },
    {
      question: "Comment rejoindre le serveur ?",
      answer: <p>{joinAnswer}</p>,
    },
    {
      question: "Comment fonctionne la construction des appareils ?",
      answer: (
        <p>
          La construction s’appuie sur Create Aeronautics. Le serveur est pensé autour de cette
          mécanique ; le détail des constructions se découvre en jeu.
        </p>
      ),
    },
    {
      question: "Qu’est-ce que Create Aeronautics ?",
      answer: (
        <p>
          Le mod d’aéronautique sur lequel repose Sky &amp; Beyond. Les appareils volants du serveur
          sont construits avec lui.
        </p>
      ),
    },
    {
      question: "Que sont les factions ?",
      answer: (
        <p>
          Des groupes qui s’affrontent pour le contrôle du ciel. La compétition entre factions fait
          partie du serveur et de son monde.
        </p>
      ),
    },
    {
      question: "Comment accéder au Discord ?",
      answer: <p>{discordAnswer}</p>,
    },
  ];

  return (
    <section id="faq" className="section faq" aria-labelledby="faq-title">
      <div className="wrap faq-grid">
        <div className="faq-intro">
          <h2 id="faq-title" className="h2">
            Questions de départ.
          </h2>
          <p>
            Les réponses utiles avant de prendre votre premier envol. Le reste s’apprend en vol.
          </p>
          <a className="arrow-link" href={hasDiscord ? siteConfig.discordUrl : "/#rejoindre"}>
            {hasDiscord ? "Poser une question sur Discord" : "Voir la section d’accès"}
            <ArrowUpRight aria-hidden="true" />
          </a>
        </div>

        <div className="faq-list">
          {faqs.map((item, index) => (
            <details key={item.question} className="faq-item" open={index === 0}>
              <summary>
                <span>{item.question}</span>
                <Plus className="faq-icon" aria-hidden="true" />
              </summary>
              <div className="faq-answer">{item.answer}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
