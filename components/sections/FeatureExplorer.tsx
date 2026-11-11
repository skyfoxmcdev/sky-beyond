"use client";

import { useState, type KeyboardEvent } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowUpRight,
  Cog,
  Compass,
  Hammer,
  Map,
  ShieldAlert,
  Swords,
  type LucideIcon,
} from "lucide-react";

type Feature = {
  id: string;
  title: string;
  description: string;
  tag: string;
  image: string;
  imageAlt: string;
  icon: LucideIcon;
};

const features: Feature[] = [
  {
    id: "create-aeronautics",
    title: "Create Aeronautics",
    description:
      "L’aéronautique du serveur repose sur Create Aeronautics. C’est le socle sur lequel chaque appareil prend forme.",
    tag: "Socle aéronautique",
    image: "/images/airship.webp",
    imageAlt:
      "Illustration d’un quai d’envol avec un appareil volant au-dessus d’une île.",
    icon: Cog,
  },
  {
    id: "construction",
    title: "Construction d’appareils",
    description:
      "Vous concevez votre appareil pour qu’il vous ressemble et vous emmène plus loin. Le ciel commence au hangar.",
    tag: "Votre appareil",
    image: "/images/cover-dawn.webp",
    imageAlt:
      "Illustration d’une île flottante éclairée à l’aube, avec ses bâtiments et ses arbres.",
    icon: Hammer,
  },
  {
    id: "exploration",
    title: "Exploration aérienne",
    description:
      "L’archipel se découvre depuis le ciel. Les distances, les détours et les points de vue font partie du voyage.",
    tag: "Horizon ouvert",
    image: "/images/archipelago-wide.webp",
    imageAlt:
      "Illustration panoramique de plusieurs îles flottantes séparées par le vide.",
    icon: Compass,
  },
  {
    id: "iles-ressources",
    title: "Îles & ressources",
    description:
      "Les îles portent de quoi construire, réparer et repartir. Elles ne sont pas un décor : elles sont la matière du monde.",
    tag: "Matière du monde",
    image: "/images/islands.webp",
    imageAlt:
      "Illustration d’une île suspendue avec une maison, des arbres et deux personnages.",
    icon: Map,
  },
  {
    id: "pnj-armes",
    title: "PNJ armés",
    description:
      "Certaines îles sont gardées. Les PNJ qui les occupent sont armés et défendent leur territoire.",
    tag: "Territoires gardés",
    image: "/images/npcs.webp",
    imageAlt:
      "Illustration d’une île avec des personnages et des bâtiments, au-dessus des nuages.",
    icon: ShieldAlert,
  },
  {
    id: "factions",
    title: "Guerre de factions",
    description:
      "Des factions s’affrontent pour le contrôle. Un ciel calme n’est qu’une trêve.",
    tag: "Contrôle du ciel",
    image: "/images/cover-night.webp",
    imageAlt: "Illustration d’une île flottante dans un ciel nocturne.",
    icon: Swords,
  },
];

export function FeatureExplorer() {
  const [activeId, setActiveId] = useState(features[0].id);
  const active = features.find((feature) => feature.id === activeId) ?? features[0];
  const reduceMotion = useReducedMotion();

  function onTabKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const currentIndex = features.findIndex((feature) => feature.id === activeId);
    let nextIndex: number | null = null;

    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      nextIndex = (currentIndex + 1) % features.length;
    } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      nextIndex = (currentIndex - 1 + features.length) % features.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = features.length - 1;
    }

    if (nextIndex === null) return;
    event.preventDefault();
    const nextFeature = features[nextIndex];
    setActiveId(nextFeature.id);
    document.getElementById(`feature-tab-${nextFeature.id}`)?.focus();
  }

  return (
    <div className="feature-shell">
      <div
        className="feature-list"
        role="tablist"
        aria-label="Fonctionnalités du serveur"
        aria-orientation="vertical"
        onKeyDown={onTabKeyDown}
      >
        {features.map((feature, index) => {
          const Icon = feature.icon;
          const selected = feature.id === activeId;
          return (
            <button
              key={feature.id}
              id={`feature-tab-${feature.id}`}
              type="button"
              role="tab"
              className="feature-tab"
              aria-selected={selected}
              aria-controls="feature-panel"
              tabIndex={selected ? 0 : -1}
              onClick={() => setActiveId(feature.id)}
            >
              <span className="feature-num" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="feature-name">
                <Icon aria-hidden="true" />
                {feature.title}
              </span>
              <ArrowUpRight className="feature-arrow" aria-hidden="true" />
            </button>
          );
        })}
      </div>

      <div
        id="feature-panel"
        className="feature-panel"
        role="tabpanel"
        aria-labelledby={`feature-tab-${active.id}`}
        tabIndex={0}
      >
        <div className="feature-visual">
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={active.id}
              style={{ position: "absolute", inset: 0 }}
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.32, ease: [0.16, 1, 0.3, 1] }}
            >
              <Image
                src={active.image}
                alt={active.imageAlt}
                fill
                sizes="(max-width: 960px) 100vw, 55vw"
                className="object-cover"
              />
            </motion.div>
          </AnimatePresence>
          <span className="feature-visual-label">Illustration</span>
        </div>

        <div className="feature-content">
          <div key={active.id} className="feature-copy">
            <h3>{active.title}</h3>
            <p>{active.description}</p>
          </div>
          <span className="feature-tag">{active.tag}</span>
        </div>
      </div>
    </div>
  );
}
