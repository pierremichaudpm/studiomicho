# Déploiement Studio Micho

## Plateforme actuelle

Cloudflare Pages avec Next.js en mode export statique.

- URL production: https://studiomicho.com
- URL technique Cloudflare: https://studiomicho.pages.dev
- Build automatique sur push vers main

## Stack technique

- Framework: Next.js 16.1.1 (App Router)
- Mode: Static Export (output: 'export' dans next.config.ts)
- Build command: npm run build
- Build output directory: out
- Node version: 20

## Variables d'environnement

Aucune env var requise au build. Le site est purement statique, sans appel API runtime.

## Procédures

### Déploiement normal (cas standard)

1. Modifier le code localement
2. npm run build pour valider le build
3. Tester localement avec npm run start
4. git commit + git push sur main
5. Cloudflare Pages détecte le push et build automatiquement
6. Vérifier le déploiement sur https://studiomicho.com

### Optimisation d'images

Script one-shot disponible: scripts/optimize-images-oneshot.mjs

Utilisation: déposer les images dans public/images/, lancer:
node scripts/optimize-images-oneshot.mjs

Le script optimise in-place (mozjpeg quality 82, max width 1600px, conversion PNG opaques en JPEG).

### Plan B: Cloudflare indisponible

Le site est un export statique pur, donc déployable n'importe où.

1. npm run build
2. Le dossier out/ contient le site complet
3. Déployer sur:
   - Vercel: vercel --prod
   - Netlify: drag-and-drop out/ dans le dashboard
   - GitHub Pages: push out/ sur la branche gh-pages
   - VPS avec Nginx ou Caddy: rsync out/ vers le serveur
4. Pointer le DNS du domaine vers le nouveau host

### Plan B: rollback rapide

Si un déploiement Cloudflare est cassé:
1. Dashboard Cloudflare Pages > Project > Deployments
2. Identifier le dernier déploiement fonctionnel
3. Cliquer "Rollback to this deployment"

Le rollback est instantané, pas besoin de revert git.

### Ajout du domaine custom

Pour la première bascule DNS (à faire une fois Netlify aura libéré studiomicho.com):
1. Dashboard Cloudflare Pages > Project > Custom domains
2. Add custom domain: studiomicho.com
3. Suivre les instructions DNS:
   - Si studiomicho.com est sur Cloudflare Registrar ou utilise les nameservers Cloudflare, ajout automatique
   - Sinon, créer un enregistrement CNAME ou ALIAS chez le registrar pointant vers studiomicho.pages.dev
4. Attendre la propagation (jusqu'à 24h, généralement quelques minutes)
5. Cloudflare émet automatiquement le certificat SSL Let's Encrypt
6. Vérifier https://studiomicho.com répond en 200

## Historique migrations

- 22 mai 2026: migration depuis Netlify (compte pmicho@pm.me fermé sans préavis le 21 mai 2026) vers Cloudflare Pages. Nettoyage de 11 MB de dead assets, optimisation des images (-44%, 4 MB à 2.3 MB), configuration Next.js export statique.

## Notes architecturales

- Pas de pipeline d'optimisation automatique au build: trop de complexité pour le volume de modifications de ce site (vitrine, peu de changements de contenu).
- pierre-michaud.png reste en PNG (canal alpha pour transparence). Compression actuelle: 387 KB. Si le portrait est affiché sur un fond uni dans le design, conversion en JPEG possible (~80-100 KB attendus) avec mise à jour de la référence dans TeamDuo.tsx.
- signature-banner-studiomicho.gif: utilisé dans la signature email, à conserver dans public/images/.
