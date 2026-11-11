# Sky & Beyond — système de design effectif

> **Statut : autoritaire.** Ce document remplace la proposition générique initialement produite par
> l'outil UI/UX Pro Max (palette bleu corporate, Outfit/Work Sans, cartes arrondies). Le brief de
> marque est prioritaire : cyan, blanc, navy profond, panneaux nets, typographie éditoriale.
>
> **Direction :** « carnet de vol d'un archipel » — un instrument de navigation précis rencontre un
> magazine d'exploration aérienne. Aucun template Minecraft, aucun glow gratuit.

## Dials

| Paramètre | Valeur | Effet |
| --- | --- | --- |
| Variance | 8/10 | Compositions asymétriques, pleines largeurs, pas de grille de trois cartes. |
| Motion | 4/10 | Entrées sobres, hovers nets, aucun défilement spectaculaire. |
| Densité | 4/10 | Aéré sur desktop, compact mais lisible sur mobile. |
| Éditorial | 9/10 | La typographie porte la hiérarchie, pas les cartes. |

## Couleurs

| Rôle | Token | Valeur | Usage |
| --- | --- | --- | --- |
| Fond principal | `--navy-950` | `#040e19` | Hero, sections sombres, footer |
| Fond profond | `--navy-925` | `#061425` | Alternance de bandes |
| Surface sombre | `--navy-900` | `#071a2b` | Panneaux, carte d'embarquement |
| Bordure haute | `--navy-800` | `#0e2a44` | Détails d'instrument |
| Accent | `--cyan` | `#4fe1ea` | CTA, liens actifs, statut, repères |
| Accent vif | `--cyan-bright` | `#7cedf3` | Hover, micro-détails |
| Accent profond | `--cyan-deep` | `#08717d` | Diagrammes, traits |
| Papier | `--paper` | `#f3f7f7` | Sections éditoriales claires |
| Papier 2 | `--paper-2` | `#e7eff0` | FAQ, variation claire |
| Encre claire | `--ink` | `#edf7f8` | Texte sur navy |
| Encre secondaire | `--ink-muted` | `#9db2bc` | Texte courant sur navy |
| Encre sur papier | `--ink-on-paper` | `#061826` | Texte sur clair |
| Encre secondaire papier | `--ink-muted-on-paper` | `#4d6572` | Texte courant sur clair |
| Ligne sombre | `--line-dark` | `rgba(237,247,248,.15)` | Séparateurs sur navy |
| Ligne claire | `--line-ink` | `rgba(6,24,38,.16)` | Séparateurs sur papier |

**Règles :** le cyan est un accent, jamais un fond décoratif généralisé. Pas de dégradés arc-en-ciel,
pas de violet, pas de glow diffus. Les aplats cyan pleins sont réservés à la section communauté et
aux actions principales.

## Typographie

| Rôle | Police | Réglages |
| --- | --- | --- |
| Voix / titres | **Archivo** 400–600 | `Letter-spacing` serré, `line-height` 0.92–1.04, `text-wrap: balance` |
| Instrument / méta | **Martian Mono** 400–500 | 11 px, majuscules, tracking 0.12em, chiffres tabulaires |
| Hero | Archivo 500 | `clamp`, deux lignes fortes, `&` cyan |
| H1 page article | Archivo 500 | Très grande taille, une idée par ligne |
| Corps | Archivo 400 | 16 px de base, interlignage 1.6, largeur max 64ch |

Interdits : combinaisons Geist/Inter génériques, titre décoratif serif hors propos, texte < 12 px
hors micro-labels, italique décoratif.

## Espace et géométrie

- Largeur maximale : **1440 px** ; gouttière fluide `clamp(20px, 4vw, 64px)`.
- Hauteur d'en-tête : **80 px**.
- Sections : `clamp(80px, 9.5vw, 148px)` de padding vertical.
- Rayon : **2 px** maximum. Les cartes ne sont pas des blobs arrondis.
- Filets de 1 px, repères d'instrument, numérotation `01–06`, ticker vertical.
- Les bords des blocs s'alignent sur `.wrap` ; les compositions pleine largeur restent des choix
  éditoriaux explicites (hero, monde, communauté).
- Aucun élément ne doit créer de défilement horizontal à 390, 768, 1024 ou 1440 px.

## Rythme des sections

1. **Hero** — sombre, plein écran, key art, titre monumental, panneau de vol à droite.
2. **Manifeste** — papier clair, grande phrase, image verticale, trois lignes de faits.
3. **Fonctionnalités** — navy, intro éditoriale, explorateur à onglets, image technique.
4. **Monde** — image pleine largeur, puis chapitres numérotés sur fond clair.
5. **Factions** — navy, schéma d'espace aérien abstrait, composition en deux colonnes.
6. **Communauté** — bande cyan, rupture chromatique, invitation Discord honnête.
7. **Carnet de vol** — papier, liste éditoriale, une note mise en avant.
8. **FAQ** — papier 2, accordéon à deux colonnes.
9. **Rejoindre** — navy, carte d'embarquement claire, étapes d'accès.
10. **Footer** — navy, wordmark ou logo, navigation, crédits.

Alternance clair/sombre volontaire : aucune section ne répète exactement la précédente.

## Composants

- **Navigation** : transparente sur le hero, navy pleine dès le scroll ou sur les pages intérieures ;
  lien actif souligné cyan ; menu mobile plein écran, focus piégé visuellement, `aria-expanded`,
  fermeture Échap et restitution du focus.
- **Boutons** : primaire cyan/encre, secondaire contour ; 2 px de rayon ; flèche en exposant ;
  hover par déplacement d'1 px et inversion de contraste ; focus visible 2 px cyan.
- **Statut** : pastille + libellé, `data-state` (`loading`, `online`, `offline`, `unknown`) ;
  `role="status"` et `aria-live="polite"` ; nombre de joueurs uniquement si fourni par l'API.
- **Explorateur de fonctionnalités** : indexée à gauche, détail et image à droite ; sur mobile,
  liste compacte et panneau empilé, sans carrousel.
- **Accordéon** : `<details>/<summary>` natif, icône Plus qui pivote, premier item ouvert, clavier
  natif, pas de JS nécessaire pour l'ouverture.
- **Carte d'embarquement** : papier, filets, champs en deux colonnes, bouton de copie uniquement
  quand une adresse est configurée, état de copie annoncé aux lecteurs d'écran.
- **Actualités** : couverture locale, date/catégorie/temps de lecture, liste éditoriale, article
  lisible, note suivante, liens de retour.
- **Footer** : wordmark/logo, tagline exacte, trois colonnes, mentions légales, non-affiliation.

## Motion

- Entrée du hero une seule fois (`.hero-rise`), parallaxe légère désactivée en reduced motion.
- Révélations d'image par masque/opacité, jamais un fade-in sur chaque section.
- Hovers de liens et de boutons : 150–250 ms, pas de tilt, pas de scale de layout.
- Aucun particule, aucun objet flottant aléatoire, aucun scroll-jacking.
- `prefers-reduced-motion: reduce` : vitesse quasi nulle, contenu final immédiatement visible ;
  aucune information ne dépend d'une animation.
- Pas de `backdrop-filter` massif ni de canvas permanent.

## Accessibilité

- Skip link en premier dans le DOM, visible au focus.
- Contraste 4.5:1 minimum pour le texte courant ; le cyan sur navy est réservé aux accents et aux
  libellés assez grands ou gras.
- Focus visible cyan 2 px, jamais supprimé.
- Toutes les images ont un alt utile ; les visuels décoratifs sont `aria-hidden`.
- Boutons icon-only avec `aria-label` ; boutons de copie avec label explicite.
- Ordre de titres cohérent ; un seul `h1` par page.
- Navigation clavier complète, `Échap` pour le menu, restitution du focus.
- Statut annoncé, pas seulement coloré.
- Liens externes ouverts avec `rel="noopener noreferrer"` ; lien Discord absent tant qu'il n'est
  pas configuré.
- Contenu lisible sans JavaScript (le statut affiche alors un état de chargement/indisponible, le
  reste est rendu serveur).

## Contenu et intégrité

- Aucune statistique, aucun témoignage, aucun classement, aucune adresse ou version inventés.
- Les valeurs non confirmées sont explicitement « À confirmer ».
- Aucune référence à un autre mode de jeu.
- Les visuels sont des illustrations originales, jamais présentées comme des captures.
- Le logo officiel absent n'est ni remplacé ni recréé.
- La tagline est exactement **Where the known end.** (point final, pas de traduction).

## Anti-patterns

- Template Minecraft sombre avec particules, bordures néon partout et cartes égales.
- Hero centré sur dégradé avec deux boutons sans composition.
- Sections identiques « icône + titre + paragraphe + 3 cartes ».
- Statistiques inventées, faux compteur de joueurs, faux avis, faux liens Discord.
- Logo redessiné ou nom d'un autre mode de jeu.
- Titres en anglais, tagline modifiée.
- Texte gris sur navy sans contraste suffisant.
- Effet de survol qui décale la mise en page.
- Images de stock ou captures d'autres serveurs.

## Vérification avant livraison

- [x] Palette cyan/blanc/navy appliquée via tokens, pas en dur dans les composants.
- [x] Archivo + Martian Mono chargées par `next/font`.
- [x] Contraste et focus vérifiés dans la revue navigateur.
- [x] Responsive 1440 / 1024 / 768 / 390 sans overflow.
- [x] Menu mobile clavier + Échap + focus restauré.
- [x] FAQ ouverte/fermée au clavier via `<details>`.
- [x] Statut accessible et dégradation sans adresse / API.
- [x] Copie d'adresse fonctionnelle quand configurée, état d'échec géré.
- [x] Aucune image cassée, aucune erreur console.
- [x] Aucune valeur de jeu inventée.
- [x] Tagline exacte et logo officiel non fabriqué.
