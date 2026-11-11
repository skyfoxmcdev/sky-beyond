# Logo officiel

## État actuel

**Aucun fichier de logo officiel n'a été fourni dans le projet.** Le site n'a donc pas reçu
d'asset à afficher dans cet emplacement.

Pour ne pas inventer ni remplacer la marque, l'en-tête, le pied de page et la carte d'embarquement
utilisent un **wordmark typographique de secours** (`Sky & Beyond`). Aucun logo d'avion n'a été
généré, redessiné ou imité.

## Ajouter l'original

1. Déposer le fichier officiel tel quel dans ce dossier, par exemple
   `public/brand/logo-officiel.png`. Ne pas le recadrer, le recolorer ni le recomposer.
2. Renseigner les variables suivantes dans `.env.local` (et dans Vercel au déploiement) :

```dotenv
NEXT_PUBLIC_LOGO_SRC=/brand/logo-officiel.png
NEXT_PUBLIC_LOGO_WIDTH=184
NEXT_PUBLIC_LOGO_HEIGHT=48
```

`WIDTH` et `HEIGHT` sont les dimensions intrinsèques du fichier original, en pixels. Elles servent
uniquement à réserver le bon ratio et à éviter un décalage de mise en page ; elles ne redimensionnent
pas le logo de façon destructive.

3. Relancer `npm run build` (ou redéployer) : les variables publiques sont figées au build.
4. Vérifier l'en-tête, le footer, la carte d'embarquement et le rendu mobile.

## Règles de marque

- **Conserver l'original** : ne pas détourer, changer les couleurs, étirer ou ajouter un fond.
  Si l'original a un fond cyan, il reste cyan.
- Le nom accessible de l'image est automatiquement `Sky & Beyond`.
- Formats recommandés : PNG ou WebP avec transparence si le logo d'origine en possède. Un SVG
  original peut être utilisé, mais vérifier le rendu de `next/image` ; si l'optimisation du SVG
  pose problème, fournir une exportation PNG haute résolution sans modifier le dessin.
- Fournir idéalement une résolution 2× ou 3× pour les écrans denses.
- Le logo ne doit pas être remplacé par un emblème « Minecraft », un avion inventé ou un visuel
  généré.

## Si le logo n'est pas disponible

Laisser `NEXT_PUBLIC_LOGO_SRC` vide. Le wordmark de secours restera cohérent avec la direction
artistique. Ce fallback est documenté comme une limite de livraison, pas comme le logo officiel.
