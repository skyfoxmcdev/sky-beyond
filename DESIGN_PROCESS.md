# DESIGN_PROCESS — Sky & Beyond

**Projet :** site officiel de Sky & Beyond, serveur Minecraft francophone.
**Date de livraison locale :** 11 novembre 2026.
**Statut :** implémenté, vérifié et **non déployé**. Aucun domaine acheté, aucun projet Vercel créé.

Ce document consigne le processus réellement suivi : audit, installation des skills, direction
créative, préparation des assets, implémentation, trois passes de revue visuelle et audit final.
Les résultats de test sont ceux des commandes exécutées localement, pas des estimations.

---

## 1. Audit initial

### Environnement

- Next.js vierge créé dans `web/`, Node.js 20.20.2, npm 10.8.2, Chrome disponible pour les revues.
- Aucun framework CSS ou CMS préexistant à préserver dans ce dossier.
- Ancien site PHP voisin (`../website`) inspecté uniquement pour retrouver les assets du projet.

### Assets trouvés

- Illustrations voxel originales : `hero-archipelago.webp`, `archipelago-wide.webp`, `islands.webp`,
  `cover-dawn.webp`, `cover-night.webp`, `npcs.webp`, `airship.webp`.
- Le fichier `CREDITS.md` de l'ancien site confirme que ces images sont des **illustrations
  originales**, et non des captures de jeu.
- **Aucun logo officiel d'avion sur fond cyan n'a été fourni.** Les recherches dans le projet
  existant n'ont trouvé qu'un favicon d'île sans rapport avec la marque décrite. Il n'a pas été
  utilisé et aucun logo n'a été généré.
- **Aucune capture officielle du serveur** n'a été fournie. Aucune image de stock, aucun faux
  screenshot et aucun HUD inventé n'ont été ajoutés.
- La référence Figma communautaire n'a renvoyé que son titre, sans contenu exploitable. La direction
  visuelle a donc été construite à partir du brief, des skills et du matériel graphique existant.

### Décision de départ

Construire un site éditorial et cinématographique, avec une identité reconnaissable, plutôt qu'une
landing page de serveur Minecraft. Le contenu factuel du brief est la seule source de vérité :
Create Aeronautics, construction d'appareils, exploration aérienne, îles et ressources, PNJ armés
sur certaines îles, factions. Aucun système, chiffre, témoignage ou avantage supplémentaires.

---

## 2. Skills installés et utilisés

### Sources et installation

Les skills sont gérés par le CLI `skills` et copiés dans `.agents/skills/`. Les sources et empreintes
sont enregistrées dans [`skills-lock.json`](./skills-lock.json).

| Skill | Source officielle | Commande utilisée |
| --- | --- | --- |
| Taste Skill (`design-taste-frontend`) | `Leonxlnx/taste-skill` | `npx skills add https://github.com/Leonxlnx/taste-skill --skill design-taste-frontend -y` |
| Impeccable | `pbakaus/impeccable` | `npx skills add https://github.com/pbakaus/impeccable --skill impeccable` |
| UI/UX Pro Max | `nextlevelbuilder/ui-ux-pro-max-skill` | `npx skills add https://github.com/nextlevelbuilder/ui-ux-pro-max-skill --skill ui-ux-pro-max` |
| Vercel React Best Practices | `vercel-labs/agent-skills` | `npx skills add vercel-labs/agent-skills --skill vercel-react-best-practices --yes` |

### Vérification

- Les quatre fichiers `SKILL.md` sont présents et lisibles :
  - `.agents/skills/design-taste-frontend/SKILL.md` (tasteskill 2.5.1) ;
  - `.agents/skills/impeccable/SKILL.md` (v4.8.2) ;
  - `.agents/skills/ui-ux-pro-max/SKILL.md` ;
  - `.agents/skills/vercel-react-best-practices/SKILL.md` (v1.0.0, MIT).
- Les entrées correspondantes de `skills-lock.json` contiennent les hashes de contenu.
- Les instructions ont été lues directement dans ces dossiers. Les fichiers vendored ont
  volontairement été exclus d'ESLint (`eslint.config.mjs`) pour que la qualité du site ne soit pas
  noyée dans les scripts des skills.
- La documentation Next.js 16 fournie dans `node_modules/next/dist/docs/` a complété le skill
  framework pour les comportements propres à cette version (`cacheComponents`, `connection`,
  frontière server/client, `next/font`, `next/image`, métadonnées).

Aucun skill n'est revendiqué sans avoir été installé et lu.

### Principes retenus et application concrète

#### Taste Skill

Principes retenus : éviter les interfaces génériques, choisir une direction artistique, faire porter
la composition par la typographie et le sujet, éviter les grilles de cartes répétitives, garder les
moments rares, préférer des compositions intentionnelles à des effets décoratifs.

Application :

- hero asymétrique, titre monumental à gauche et **panneau de vol** à droite, au lieu d'un hero
  centré sur un dégradé ;
- une seule image de key art en plein écran, puis des sections qui changent de composition
  (manifeste éditorial, explorateur indexé, image pleine largeur, diagramme d'espace aérien, bande
  cyan, liste de notes, carte d'embarquement) ;
- pas de carrousel automatique, pas de particules, pas de cartes « icône + texte » en série ;
- rejet du vocabulaire visuel de template Minecraft.

Écart assumé : Taste déconseille les légendes sous les images. Le brief impose de ne pas faire passer
les illustrations pour des captures. La mention discrète « Illustration originale » a donc été
conservée. C'est une contrainte de vérité, pas un oubli.

#### Impeccable

Principes retenus : regarder le rendu réel, défendre une hiérarchie claire, enlever les tics
génériques, traiter les détails de craft (filets, densité, transitions, focus) et finir le travail
sans laisser de section provisoire.

Application :

- rayon global de **2 px**, filets de 1 px, numérotation d'instrument : le site ne ressemble pas à
  une pile de cartes arrondies ;
- rythme clair/sombre volontaire et vérifié section par section ;
- trois passes visuelles distinctes, avec inspection des captures aux largeurs de livraison ;
- correction des détails qui ne tenaient pas au zoom : ponctuation de la tagline, métadonnées de
  notes, lisibilité de l'en-tête sur fond clair, état actif de navigation ;
- audit final d'accessibilité et de contraste après la mesure Lighthouse.

#### UI/UX Pro Max

Principes retenus : établir un système de design avant les pages, prioriser l'accessibilité, les
cibles tactiles et le responsive, utiliser des icônes SVG plutôt que des emojis, respecter
`prefers-reduced-motion`, vérifier la hiérarchie et les états.

Application :

- génération d'un premier master de design system, puis **override explicite** : la proposition
  générique (Outfit/Work Sans, bleu corporate, cartes arrondies) ne correspondait pas à la marque
  cyan/navy décrite. Le fichier effectif est
  [`design-system/sky-beyond/MASTER.md`](./design-system/sky-beyond/MASTER.md) ;
- palette et tokens centralisés dans `app/globals.css` ; Archivo + Martian Mono, 2 px de rayon ;
- navigation mobile avec état ARIA, restitution du focus, fermeture Échap et blocage du scroll ;
- skip link, outline cyan de 2 px, zones tactiles, FAQ native `<details>`, statut `aria-live` ;
- structure responsive pensée à 1440, 1024, 768 et 390 px, pas un simple écrasement du desktop.

#### Vercel React Best Practices

Principes retenus : limiter le JavaScript client, privilégier les Server Components, dédupliquer les
lectures avec `React.cache`, écouter le scroll en `passive`, réserver la frontière client aux
interactions réelles, optimiser images et polices, et éviter les appels réseau répétés.

Application :

- `lib/news.ts` lit les Markdown côté serveur avec `cache()` ; les pages d'actualités sont
  statiquement générées ;
- la seule route dynamique est `/api/status`, qui met en cache la réponse MCSrvStat 5 minutes ;
- `StatusProvider` ne charge le statut qu'une fois par page et expose une actualisation manuelle ;
- `SiteHeader` n'écoute le scroll qu'en mode passif et ne rend côté client que ce qui doit l'être ;
- images locales via `next/image`, polices via `next/font`, pas de librairie lourde ajoutée ;
- composants clients limités à : navigation/menu, explorateur de fonctionnalités, statut, copie et
  animations.
- L'audit a mené aux corrections finales de contraste et de nom accessible du lien « Descendre »,
  puis à un Lighthouse Accessibilité de 100.

---

## 3. Direction créative

### Concept

**« Un carnet de vol pour un archipel. »** Le site emprunte au vocabulaire des instruments de
navigation (coordonnées, filets, index, statut, carte d'embarquement) et à l'édition de voyage
(grande typographie, compositions asymétriques, papier clair). Le ciel n'est pas un décor : c'est
l'espace de liberté, d'ingénierie et de conflit décrit par le brief.

### Identité

- Nom : **Sky & Beyond**
- Tagline exacte : **“Where the known end.”**
- Couleur : cyan `#4fe1ea` comme accent, navy `#040e19` comme profondeur, papier `#f3f7f7` pour les
  respirations éditoriales, blanc cassé et gris bleutés pour la lecture.
- Typographie : **Archivo** pour la voix et les titres, **Martian Mono** pour les libellés
  d'instrument, dates, statuts et chiffres.
- Géométrie : 2 px, filets, pas de pilules, pas de grands rayons. Les bords sont francs.
- Mouvement : entrée du hero, transitions de liens, révélation de quelques blocs, parallaxe
  discrète. Rien qui bloque le contenu ou tourne en permanence.

Le détail complet des tokens, composants, règles de motion et anti-patterns est dans
`design-system/sky-beyond/MASTER.md`.

### Structure finale

1. Navigation fixe, logo/wordmark, CTA « Rejoindre », statut discret.
2. Hero plein écran avec key art, double CTA, panneau « dossier de vol », faits du serveur.
3. Manifeste clair : « Le connu s'arrête ici. »
4. Fonctionnalités : six pièces, explorateur indexé et image.
5. Monde : image pleine largeur, îles/chapitres.
6. Factions : schéma d'espace aérien abstrait, territoire/conflit/contrôle.
7. Communauté : bande cyan, invitation Discord honnête, état d'attente si non configurée.
8. Carnet de vol : note à la une + liste éditoriale, pages articles complètes.
9. FAQ : accordéon natif accessible.
10. Rejoindre : étapes, carte d'embarquement, copie d'adresse, statut live.
11. Footer : marque, tagline, navigation, mentions légales, non-affiliation.

### Contenus et intégrité

- Aucune mécanique, statistique, adresse, version, invitation Discord ou date de lancement inventée.
- Les valeurs non fournies sont explicites : « À confirmer », « invitation à venir », « statut
  indisponible ».
- Les articles sont éditoriaux, factuels et datés ; les visuels sont annoncés comme des
  illustrations.
- Le serveur est présenté comme un serveur Minecraft d'exploration aérienne ; aucun autre mode
  de jeu n'est évoqué.

---

## 4. Préparation des assets

- Les illustrations voxel existantes ont été copiées dans `public/images/` et utilisées comme key
  art, images de monde et couvertures d'actualités.
- Aucune retouche trompeuse : pas de faux HUD, pas de faux joueurs, pas de faux screenshots.
- Les visuels sont marqués par une micro-légende « Illustration originale » là où leur statut
  pourrait être ambigu.
- Aucun logo officiel reçu : le header, le footer et la carte utilisent le wordmark typographique.
  `NEXT_PUBLIC_LOGO_SRC` permet de brancher l'original dès qu'il est fourni.
- Les images sont optimisées via `next/image` (AVIF/WebP, variantes responsives, lazy loading).
- Les crédits et limites sont documentés dans `public/images/README.md` et
  `public/brand/README.md`.

---

## 5. Implémentation

- Next.js 16.4.6 App Router, TypeScript strict, React 19.
- CSS art-directed centralisé dans `app/globals.css` (tokens, primitives, sections, responsive,
  reduced motion) + Tailwind v4 importé pour les utilitaires.
- Composants de section séparés de la configuration ; `lib/config.ts` est la source unique des
  valeurs publiques.
- Le statut passe par un contexte client et une route serveur (`app/api/status/route.ts`) qui appelle
  MCSrvStat v3, valide l'adresse, met en cache et dégrade en `unknown`.
- Les actualités sont des Markdown Git : `gray-matter`, `react-markdown`, `remark-gfm`, pages
  générées statiquement, métadonnées SEO et article suivant.
- SEO : titres, descriptions, canonical, Open Graph, sitemap, robots, JSON-LD, image OG générée.
- Accessibilité : skip link, structure sémantique, focus, libellés ARIA, `<details>`, `aria-live`,
  reduced motion, contrastes vérifiés.
- Les variables `NEXT_PUBLIC_*` sont documentées dans `.env.example` et figées au build.

### Décisions importantes

- Pas de CMS factice : le workflow Git/Markdown est réel, testé et documenté.
- Pas de backend permanent : uniquement la fonction `/api/status` sur Vercel.
- Pas de fausse invitation Discord : les liens sont désactivés tant que l'URL n'est pas configurée.
- Pas de bouton de copie inutile : il n'apparaît qu'avec une adresse configurée.
- Le premier item de la FAQ est ouvert par défaut ; l'accordéon reste entièrement natif.
- La page de mentions légales ne déclare aucune société ni adresse inexistante.

---

## 6. Trois passes de revue visuelle

Les captures sont dans `.tools/shots/`. La revue a été faite sur le rendu réel, pas seulement sur le
code.

### Passe 1 — composition, hiérarchie, rythme

Largeurs : 1440 et 1024 px, sections une par une + page complète.

Constats et corrections :

- le hero et le panneau de vol devaient rester lisibles sans surcharger la composition ; le panneau
  a été vérifié dans le DOM et dans le rendu final (`display:block`, opacité 1, 300 × 325) ;
- l'en-tête transparent manquait de lisibilité au-dessus des sections claires et des pages
  intérieures : header plein navy sur ces contextes, transparence conservée sur le hero ;
- l'état actif du scrollspy devait être déterministe sur une page éditoriale longue ;
- la ponctuation de la tagline du footer était trop décorative : remplacée par la phrase exacte ;
- les métadonnées des notes se chevauchaient dans certaines rangées : passage en pile lisible ;
- les images du monde ont reçu un alt et un traitement sémantique corrects (illustrations).

Un premier harnais QA bloquait sur `networkidle0` : il a été remplacé par un chargement
`domcontentloaded`, un amorçage du scroll et une attente explicite des images. Les premières captures
avec images vides étaient des artefacts de lazy loading, pas des erreurs de contenu.

### Passe 2 — espacements, couleurs, responsive, interactions

Largeurs : 768 et 390 px, plus états interactifs.

Constats et corrections :

- composition mobile reconstruite (image en tête, contenu éditorial, CTA pleine largeur), pas un
  simple rétrécissement du desktop ;
- menu mobile plein écran : `aria-expanded`, focus, Échap, blocage du scroll et restitution du focus
  vérifiés ;
- FAQ native testée au clic et au clavier ; skip link focus visible en cyan ;
- statuts testés sans adresse (inconnu), avec adresse temporaire (hors ligne) et avec une réponse
  simulée (en ligne + joueurs) ;
- défaut de copie découvert : quand `navigator.clipboard.writeText` existait mais était refusé, le
  code ne tentait pas le fallback. Correction : tentative Clipboard API → fallback contrôlé →
  état d'échec seulement si les deux échouent. Test final : presse-papiers contient bien l'adresse,
  `data-copied="true"`, annonce accessible « Adresse copiée dans le presse-papiers. » ;
- vérification à 390 px : aucun overflow, images après scroll complet 8/8 chargées.

### Passe 3 — micro-détails, cohérence, polish et accessibilité mesurée

Pages : accueil, index des notes, article, mentions légales ; largeurs 1440 et 390, plus captures
tablette.

Constats et corrections :

- article et index de notes relus pour la hiérarchie, les métadonnées, la couverture, le lien de
  retour et la note suivante ;
- page 404, sitemap, robots, Open Graph et routes d'articles vérifiés ;
- Lighthouse initial : Performance 94, Accessibilité 94, Best Practices 100, SEO 100 ;
- deux familles de défauts d'accessibilité corrigées :
  - contrastes insuffisants sur les micro-libellés des sections claires, la note communauté et les
    métadonnées de la carte d'embarquement → tokens d'encre sur papier plus sombres ;
  - lien « Descendre » sans nom accessible à 390 px → `aria-label` explicite ;
- ces corrections ne changent pas la direction visuelle : elles renforcent seulement la lisibilité
  des micro-textes.
- **Bug de build introduit par la documentation** : le `README.md` des actualités était lu comme un
  article. Le lecteur de contenu exclut désormais les fichiers `README.md` et les fichiers
  commençant par `_`.
- **ESLint** lintait les scripts vendored des skills ; les dossiers `.agents`, `.tools`,
  `.design-system` et `public` sont désormais ignorés. `npm run lint` est propre.
- Un processus `next dev` orphelin et un ancien serveur de production pouvaient servir un `.next`
  différent du build : ils ont été arrêtés par PID exact, puis un build unique et propre a été
  relancé avant l'audit final. C'était un incident d'outillage local, pas un défaut du code livré.

---

## 7. Audit final

### Commandes et résultats

| Vérification | Résultat |
| --- | --- |
| `npm run build` | **0** — 14 pages générées, `/api/status` dynamique (`ƒ`) |
| `npm run typecheck` | **0** |
| `npm run lint` | **0** (aucun avertissement/erreur) |
| QA navigateur (Puppeteer) | **0** — console et page errors vides |
| Débordement horizontal | Aucun à 1440, 1024, 768, 390, index et article |
| Images après défilement complet | **8/8** chargées |
| Routes demandées | Toutes 200 ; route inconnue → 404 personnalisée |
| Liens internes | 7 chemins uniques crawlés, 0 cassé |
| Menu mobile | Ouverture, `aria-expanded`, focus, Échap, fermeture, focus rendu au bouton |
| FAQ | `<details>` natif, ouverture au clic, premier item ouvert |
| Skip link | Premier focus, outline cyan 2 px visible |
| Copie d'adresse | Absente sans configuration ; testée avec succès via variable temporaire |
| Statut inconnu | Sans adresse : `configured:false`, état « Statut indisponible » |
| Statut hors ligne | Adresse temporaire configurée : état « Hors ligne », sans joueurs inventés |
| Statut en ligne | API simulée avec 42 joueurs : « En ligne » et compteur rendus |
| Lighthouse (local, mobile) | **Performance 94** (95 sur une passe précédente) **· Accessibilité 100 · Best Practices 100 · SEO 100** |

Le rapport Lighthouse final est enregistré dans `.tools/lighthouse-final.json`. Le QA complet et les
captures finales sont dans `.tools/shots/` (`report.json`).

### Statut live : précision

MCSrvStat a été effectivement contacté. L'API a répondu avec des états variables selon l'adresse
testée (certains serveurs publics renvoient `online:false` via leur ping, d'autres répondent). Le
chemin « en ligne » de l'interface a donc été validé avec une réponse API simulée, plutôt qu'en
affirmant un faux compteur en production. Le site réel, sans adresse configurée, affiche
volontairement « Statut indisponible » et n'invente rien.

### Non couvert

- Aucun test réel de charge, de Vercel Preview ou de domaine.
- Aucun Lighthouse sur un appareil physique ou sur chaque page.
- La référence Figma n'a pas pu être inspectée au-delà de son titre.
- Aucun logo officiel ni capture de serveur n'était disponible pour un contrôle visuel final.

---

## 8. Limites et éléments à fournir

1. **Logo officiel** : à déposer dans `public/brand/`, puis renseigner `NEXT_PUBLIC_LOGO_SRC`,
   `NEXT_PUBLIC_LOGO_WIDTH` et `NEXT_PUBLIC_LOGO_HEIGHT`. Le wordmark actuel est un fallback, pas
   une réinterprétation du logo.
2. **Captures du serveur** : à fournir si le propriétaire souhaite remplacer les illustrations.
   Ne pas présenter les visuels actuels comme des captures.
3. **Adresse Minecraft, version et Discord** : actuellement non configurés. Les états d'attente sont
   volontaires. Aucun lien Discord fictif n'est actif.
4. **Déploiement** : préparé, mais **non exécuté**. Voir `DEPLOYMENT.md`.
5. **Figma** : contenu inaccessible ; la direction vient du brief, des illustrations existantes et
   des skills.
6. **MCSrvStat** : service tiers, cache de 5 minutes, disponibilité non garantie. La page reste
   fonctionnelle si l'API tombe.
7. **Lighthouse** : mesure locale unique ; les scores peuvent varier selon la machine, le réseau et
   le moment. Aucun score n'est extrapolé à une autre page.

---

## 9. Fichiers de référence

- Direction et tokens : `design-system/sky-beyond/MASTER.md`
- Configuration : `lib/config.ts`, `.env.example`
- Contenu : `content/actualites/README.md`
- Assets et crédits : `public/images/README.md`, `public/brand/README.md`
- Déploiement : `DEPLOYMENT.md`
- QA : `.tools/qa.mjs`, `.tools/image-audit.mjs`, `.tools/shots/report.json`
- Mesure : `.tools/lighthouse-final.json`

---

## 10. Conclusion

Le site a été conçu pour ressembler à une présence officielle de projet, pas à une fiche de
serveur. La direction éditoriale, le rythme clair/sombre, le motif de carnet de vol et la précision
des micro-textes portent l'identité. Les limites restantes sont des **assets et informations à
fournir**, ou le déploiement futur — pas des sections inachevées ni des données inventées.
