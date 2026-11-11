# Déploiement sur Vercel — préparation

> **Aucun déploiement n'a été effectué.** Ce document prépare une future mise en ligne sur l'offre
> gratuite de Vercel. Il ne crée ni compte, ni domaine, ni projet Vercel.

## 1. Ce qui est livré

- Application Next.js 16 (App Router), TypeScript, sans serveur permanent.
- Route dynamique unique : `GET /api/status`, compatible avec les fonctions serverless Vercel.
- Aucune base de données, aucun CMS, aucun stockage persistant.
- Actualités stockées dans le dépôt Git (`content/actualites/*.md`).
- Aucun secret nécessaire : les variables du site sont publiques par construction.

## 2. Prérequis locaux

- Node.js 20 LTS (testé avec Node 20.20.2) ;
- npm 10+ ;
- un dépôt GitHub contenant ce dossier.

## 3. Vérifier le build local

```bash
npm ci
npm run typecheck
npm run lint
npm run build
npm run start
```

Le build doit produire 14 pages et afficher `/api/status` comme route dynamique (`ƒ`). Ouvrir
<http://localhost:3000> et vérifier la page d'accueil, `/actualites`, un article, `/mentions-legales`,
`/sitemap.xml`, `/robots.txt` et `/api/status`.

## 4. Variables d'environnement

Configurer ces variables dans **Vercel → Project → Settings → Environment Variables**. Utiliser
les valeurs officielles confirmées. Laisser vide tout ce qui n'est pas confirmé.

| Variable | Exemple | Obligatoire | Effet si vide |
| --- | --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | `https://votre-domaine.fr` | Recommandée | Placeholder `https://skyandbeyond.example` |
| `NEXT_PUBLIC_MC_SERVER_ADDRESS` | `play.votre-serveur.fr:25565` | Non | « À confirmer », copie absente, statut inconnu |
| `NEXT_PUBLIC_MC_VERSION` | `1.21.x` | Non | « À confirmer » |
| `NEXT_PUBLIC_DISCORD_URL` | `https://discord.gg/votre-invitation` | Non | Aucun lien Discord actif, état d'attente |
| `NEXT_PUBLIC_LOGO_SRC` | `/brand/logo-officiel.png` | Non | Wordmark typographique de secours |
| `NEXT_PUBLIC_LOGO_WIDTH` | `184` | Non | `184` |
| `NEXT_PUBLIC_LOGO_HEIGHT` | `48` | Non | `48` |

Notes :

- Toutes les variables `NEXT_PUBLIC_*` sont visibles dans le navigateur et **figées dans le build**.
  Toute modification nécessite un **redéploiement**.
- `NEXT_PUBLIC_SITE_URL` alimente les URL canoniques, Open Graph, le sitemap et les données
  structurées. Utiliser l'URL finale de production, sans slash terminal.
- Le logo doit être placé dans `public/brand/` **avant** le build. Voir
  `public/brand/README.md`.
- Ne jamais mettre de secret dans une variable `NEXT_PUBLIC_*`. Le projet n'en a pas besoin.

## 5. Préparer le dépôt GitHub

1. Créer un dépôt (privé ou public) sur GitHub.
2. S'assurer que `.env.local` n'est pas commité ; `.env.example` doit l'être.
3. Depuis le dossier du site :

```bash
git init
git add .
git commit -m "Site Sky & Beyond"
git branch -M main
git remote add origin https://github.com/<compte>/<depot>.git
git push -u origin main
```

Ne pousser que lorsque le dépôt distant est prêt et que vous y êtes autorisé.

## 6. Importer sur Vercel

1. Se connecter à <https://vercel.com> et ouvrir **Add New → Project**.
2. Importer le dépôt GitHub.
3. Vercel détecte normalement **Next.js**. Sinon :
   - Framework Preset : **Next.js** ;
   - Install Command : `npm ci` ;
   - Build Command : `npm run build` ;
   - Output Directory : laisser vide (`.next` est géré par Next.js).
4. Ajouter les variables de la section 4, au minimum pour **Production**, et aussi pour
   **Preview** si les aperçus doivent être cohérents.
5. Cliquer sur **Deploy**. L'offre gratuite suffit pour ce site statique + une route serverless.

Aucun réglage de Node supérieur à 20 n'est requis. Vercel peut proposer Node 22 ; le code est
compatible avec les versions LTS récentes.

## 7. Après le premier déploiement

1. Ouvrir l'URL `*.vercel.app` et vérifier l'accueil, le menu mobile et les pages d'actualités.
2. Appeler `/api/status` : sans adresse configurée, la réponse doit être
   `{"state":"unknown","players":null,"configured":false}`.
3. Configurer une adresse de test confirmée, redéployer, puis vérifier « En ligne » ou « Hors
   ligne » et la copie de l'adresse.
4. Vérifier les métadonnées avec l'URL de production (Open Graph et canonical).
5. Une fois le domaine acheté et rattaché, mettre à jour `NEXT_PUBLIC_SITE_URL` et redéployer.
6. Soumettre `sitemap.xml` dans Google Search Console si souhaité.

## 8. Mettre à jour les actualités

Le workflow est Git-first :

1. Ajouter ou modifier un fichier `.md` dans `content/actualites/`.
2. Renseigner le frontmatter requis (`title`, `date`, `category`, `excerpt`, `cover`, `coverAlt`).
3. Vérifier `npm run build` en local.
4. Commit et push sur la branche suivie par Vercel.
5. Vercel reconstruit et publie les pages statiques.

Le nom du fichier est le slug public. Un article nouveau ne nécessite aucune modification de code.
Guide : `content/actualites/README.md`.

## 9. Statut du serveur

La route `/api/status` :

- lit `NEXT_PUBLIC_MC_SERVER_ADDRESS` côté serveur ;
- appelle `https://api.mcsrvstat.us/3/<adresse>` ;
- met en cache le résultat 5 minutes en mémoire et en HTTP (`s-maxage=300`) ;
- renvoie `online`, `offline` ou `unknown`, et le nombre de joueurs uniquement si l'API le donne ;
- échoue proprement si l'API est indisponible ou lente (timeout de 6,5 s).

Aucune clé MCSrvStat n'est requise. Ne pas appeler cette API depuis le navigateur pour éviter les
problèmes CORS et les requêtes répétées. Le cache mémoire est propre à chaque instance serverless ;
le cache HTTP partagé limite les appels répétés côté CDN.

## 10. Ce qui n'est pas inclus

- Pas de CMS, pas de base de données, pas d'upload d'image depuis l'admin.
- Pas de formulaire, pas de compte utilisateur, pas de paiement.
- Pas de stockage persistant.
- Pas de déploiement automatique effectué dans le cadre de cette livraison.
- Le logo officiel et les captures du serveur restent à fournir par le propriétaire du projet.

## 11. En cas de problème

| Symptôme | Vérification |
| --- | --- |
| Les valeurs configurées n'apparaissent pas | Les variables `NEXT_PUBLIC_*` ont-elles été ajoutées avant le dernier build ? Redéployer. |
| Statut toujours inconnu | Adresse absente, invalide ou API MCSrvStat indisponible ; vérifier `/api/status`. |
| Logo absent | Fichier présent dans `public/brand/`, chemin commençant par `/`, redéploiement effectué. |
| Actualité absente | Frontmatter complet, fichier `.md`, date valide, build local réussi. |
| Erreur de build sur un article | Le message indique le champ ou le fichier fautif ; corriger le frontmatter. |

## 12. Rollback

Dans Vercel, ouvrir **Deployments**, sélectionner le déploiement précédent et utiliser
**Promote to Production**. Aucun changement de données n'est nécessaire.
