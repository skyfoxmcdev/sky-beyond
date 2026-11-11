# Sky & Beyond — site officiel

> **Where the known end.**

Site vitrine et éditorial du serveur Minecraft **Sky & Beyond** : construction d'appareils avec
Create Aeronautics, exploration d'un archipel d'îles, ressources et guerre de factions.

Le site est **implémenté et vérifié localement**, mais **volontairement non déployé**. La mise en
ligne est préparée dans [`DEPLOYMENT.md`](./DEPLOYMENT.md).

## Stack

| Domaine | Choix |
| --- | --- |
| Framework | Next.js 16.4.6, App Router, TypeScript strict |
| Rendu | Server Components par défaut, îlots clients ciblés |
| Styles | CSS art-directed + Tailwind v4 (import et utilitaires) |
| Typographie | Archivo (voix éditoriale) + Martian Mono (instruments) via `next/font` |
| Animation | Motion, révélations sobres, `prefers-reduced-motion` respecté |
| Icônes | Lucide |
| Actualités | Markdown versionné dans Git (`gray-matter`, `react-markdown`, `remark-gfm`) |
| Statut | Route serverless `/api/status` → MCSrvStat.us, cache 5 minutes |
| Hébergement cible | Vercel, offre gratuite, sans backend permanent |

## Démarrage local

Prérequis : **Node.js 20 LTS** (testé avec 20.20.2) et npm.

```bash
npm ci
cp .env.example .env.local
npm run dev
```

Ouvrir <http://localhost:3000>. Sans variables renseignées, le site reste entièrement lisible :
l'adresse, la version et l'invitation Discord sont affichées comme non configurées, et le statut
est « indisponible ». Aucune valeur n'est inventée.

### Scripts

| Commande | Rôle |
| --- | --- |
| `npm run dev` | Serveur de développement |
| `npm run build` | Build de production |
| `npm run start` | Serveur de production (après build) |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |

## Configuration

Toutes les valeurs publiques vivent dans `lib/config.ts` et sont lues depuis `.env.local`.
Les variables `NEXT_PUBLIC_*` sont **intégrées au build** : après une modification, relancer
`npm run build` ou redéployer.

| Variable | Rôle | Sans valeur |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | URL canonique, sans slash final | `https://skyandbeyond.example` (placeholder documenté) |
| `NEXT_PUBLIC_MC_SERVER_ADDRESS` | Adresse Minecraft, port facultatif | « À confirmer », copie masquée, statut inconnu |
| `NEXT_PUBLIC_MC_VERSION` | Version affichée | « À confirmer » |
| `NEXT_PUBLIC_DISCORD_URL` | Invitation HTTPS Discord | Liens remplacés par un état d'attente, aucun faux lien |
| `NEXT_PUBLIC_LOGO_SRC` | Chemin local du logo officiel | Wordmark typographique de secours |
| `NEXT_PUBLIC_LOGO_WIDTH` / `HEIGHT` | Dimensions intrinsèques du logo | 184 × 48 |

Le fichier [`.env.example`](./.env.example) contient les commentaires détaillés. Ne jamais
committer `.env.local` (déjà ignoré par Git).

## Actualités

Trois notes sont livrées dans [`content/actualites`](./content/actualites). Le nom du fichier
devient le slug de l'article. Les pages sont générées statiquement au build.

Pour publier : ajouter un fichier `.md`, remplir le frontmatter, commit, push ; Vercel reconstruit
le site. Aucune interface CMS factice n'est incluse. Guide complet :
[`content/actualites/README.md`](./content/actualites/README.md).

## Architecture

```text
app/                    pages, métadonnées, routes API, SEO
components/layout/      en-tête, menu mobile, pied de page, logo
components/sections/    les neuf sections de la page d'accueil
components/status/      contexte de statut et affichages accessibles
components/ui/          boutons, copie d'adresse
content/actualites/     articles Markdown
lib/                    configuration, lecture des notes, utilitaires
public/images/          illustrations originales du monde
public/brand/           emplacement du logo officiel
design-system/          système de design effectif
```

Le site ne dépend d'aucune base de données. Le seul code serveur dynamique est la route de statut,
qui interroge MCSrvStat.us avec un cache mémoire et des en-têtes HTTP de 5 minutes.

## Qualité

Le journal des passe 1 à 3, les décisions de design et les preuves d'utilisation des skills sont
dans [`DESIGN_PROCESS.md`](./DESIGN_PROCESS.md). Les vérifications finales exécutées couvrent :

- `npm run typecheck`, `npm run lint`, `npm run build` ;
- revue navigateur à 1440, 1024, 768 et 390 px (Chrome headless via Puppeteer) ;
- absence de débordement horizontal, d'erreur console, d'image cassée et de lien interne cassé ;
- navigation mobile, focus, skip link, FAQ accessible, copie d'adresse ;
- états du statut : inconnu sans adresse, hors ligne, en ligne (selon réponse de l'API) ;
- pages actualités, article, mentions légales, 404, sitemap, robots, Open Graph.

Voir la section « Vérifications finales » de `DESIGN_PROCESS.md` pour les résultats datés et les
limites. Aucun score Lighthouse n'est annoncé sans mesure enregistrée.

## Limites connues

1. **Logo officiel absent du dépôt fourni.** Le header, le footer et la carte d'embarquement
   utilisent un wordmark typographique. Aucun logo n'a été redessiné. Voir
   [`public/brand/README.md`](./public/brand/README.md) pour brancher l'original.
2. **Aucune capture de jeu fournie.** Les visuels sont des illustrations voxel originales reprises
   du projet existant, toujours signalées comme telles ; elles ne prétendent pas être des captures
   du serveur. Voir [`public/images/README.md`](./public/images/README.md).
3. **Adresse, version et Discord non confirmés.** Les états « à confirmer » sont volontaires.
4. **Référence Figma inaccessible au-delà de son titre.** Aucun contenu de la communauté Figma
   n'a pu être lu ; la direction repose sur le brief et les skills.
5. **Pas de déploiement ni de domaine.** Aucun achat, aucune mise en ligne.

## Crédits

- Illustrations voxel : créations originales du projet Sky & Beyond, reprises du site existant.
  Aucune capture de jeu, aucune image de stock.
- Archivo et Martian Mono : SIL Open Font License 1.1, chargées et auto-hébergées par
  `next/font`.
- Minecraft et Mojang Studios sont des marques de leurs propriétaires respectifs. Ce site est
  indépendant et non affilié.
