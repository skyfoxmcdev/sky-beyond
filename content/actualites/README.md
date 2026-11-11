# Le carnet de vol — publier une note

Les actualités de Sky & Beyond sont des fichiers **Markdown** stockés dans Git. Il n'y a pas de CMS,
pas de base de données et pas d'interface d'administration factice. Publier une note = ajouter un
fichier, puis laisser Vercel reconstruire le site.

## Ajouter une note

1. Créer un fichier dans ce dossier, par exemple `2026-12-01-nouvelle-note.md`.
2. Copier le frontmatter ci-dessous et le compléter.
3. Rédiger le corps en Markdown (titres `##`, listes, liens, gras, tableaux GFM).
4. Vérifier localement : `npm run build`. Une erreur explicite apparaît si un champ manque.
5. Commit, push. La page `/actualites` et l'article sont régénérés au déploiement.

## Modèle

```markdown
---
title: "Titre de la note"
date: "2026-12-01"
category: "Monde"
excerpt: "Une phrase de résumé, affichée dans la liste et dans les métadonnées SEO."
cover: "/images/cover-night.webp"
coverAlt: "Description précise de l'illustration de couverture."
featured: false
---

Premier paragraphe de la note.

## Un sous-titre

Le contenu de l'article.
```

## Champs obligatoires

| Champ | Type | Règles |
| --- | --- | --- |
| `title` | texte | Non vide. Devient le titre de la page et le titre SEO. |
| `date` | texte `AAAA-MM-JJ` | Date valide. Sert au tri décroissant et à l'affichage français. |
| `category` | texte | Non vide. Exemples utilisés : `Ouverture`, `Monde`, `Ingénierie`. |
| `excerpt` | texte | Non vide. Résumé et meta description. |
| `cover` | texte | Chemin local commençant par `/`, image placée dans `public/images/`. |
| `coverAlt` | texte | Non vide. Décrire l'image, pas le titre de l'article. |
| `featured` | booléen | Optionnel. `true` pour la note mise en avant (une seule de préférence). |

Le **nom du fichier** (sans `.md`) est le slug public. Exemple :
`2026-12-01-nouvelle-note` → `/actualites/2026-12-01-nouvelle-note`.

Le temps de lecture est calculé automatiquement. La catégorie, la date et l'excerpt sont affichés
dans la liste ; le titre, la date, la catégorie, la couverture, le contenu et le lien vers la note
suivante sont affichés sur la page article. Les métadonnées Open Graph et le canonical sont générés
depuis ces champs.

## Images de couverture

- Formats recommandés : WebP ou AVIF, paysage (ratio proche de 16:9), poids raisonnable.
- Les visuels actuellement livrés sont des **illustrations originales**, pas des captures du
  serveur. Conserver cette distinction dans les textes et les alt.
- Si une capture officielle du serveur est fournie plus tard, la placer dans `public/images/` et
  mettre à jour `cover` / `coverAlt` ainsi que les crédits.
- Ne jamais utiliser une capture de jeu trouvée en ligne en la présentant comme celle du serveur.

## Bonnes pratiques éditoriales

- Ne pas inventer de mécanique, de statistique, de date de lancement, de version ou d'adresse.
- Une note d'actualité doit dire ce qui est confirmé ; le reste peut rester explicitement à venir.
- Écrire en français, avec la voix sobre et aérienne du site.
- Éviter les promesses commerciales et les superlatifs non vérifiables.
- Les liens externes doivent être réels et pertinents.

## Cycle de publication sur Vercel

1. Le fichier est poussé sur la branche de production.
2. Vercel lance `npm run build`.
3. Next.js lit le dossier, valide le frontmatter, trie les notes et génère les pages statiques.
4. Le nouveau carnet de vol est en ligne.

En cas de champ manquant ou de date invalide, le build échoue avec un message du type
`[actualités] Le champ "coverAlt" est requis dans ...`. Corriger le fichier et relancer.

## Ce qui n'existe pas

- Ce fichier `README.md` n'est pas une note : il est ignoré par le lecteur d'articles, comme tout
  fichier commençant par `_`.
- Pas de brouillon : une note présente dans le dossier est publiée au build suivant.
- Pas de planification automatique par date future : une note datée dans le futur peut apparaître
  immédiatement dans la liste. Pour planifier, ne la pousser qu'au moment voulu.
- Pas d'édition depuis le navigateur, pas d'upload d'image depuis le site.
