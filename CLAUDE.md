# CLAUDE.md — Studio Micho React

## Projet
Site portfolio de Studio Micho (studiomicho.com). Next.js 16, déployé sur Netlify. Bilingue FR/EN.

## Stack
- **Framework** : Next.js 16.1 (App Router, Turbopack)
- **Langage** : TypeScript
- **Hébergement** : Netlify (plugin @netlify/plugin-nextjs)
- **Node** : v20

## Structure
```
app/
  page.tsx            # Page principale — orchestre toutes les sections + I18nProvider
  layout.tsx          # Layout racine (server component, metadata statique FR)
  globals.css         # Styles globaux
lib/
  i18n.tsx            # Système i18n — Context, Provider, hook, traductions FR/EN
components/
  LanguageToggle.tsx  # Bouton toggle FR/EN (fixé top-right)
  Navigation.tsx      # Barre de navigation
  VerticalBrand.tsx   # Branding latéral
  Hero.tsx            # Section héros (typewriter)
  Services.tsx        # Section services
  Portfolio.tsx       # 3 projets vedettes + bouton "Plus de projets"
  Modal.tsx           # Modal avec projets additionnels (grille 2 colonnes)
  Advantage.tsx       # Section avantages
  Comment.tsx         # Section méthode
  Pitch.tsx           # Section contact
public/
  images/             # Screenshots projets (desktop + mobile m-*)
  dashboards/         # Page statique dashboards (index.html + PNGs)
```

## i18n (internationalisation)
- Système maison léger : React Context dans `lib/i18n.tsx`
- ~120 strings traduites (FR + EN), clés organisées par section (nav.*, hero.*, services.*, etc.)
- Hook `useTranslation()` utilisé dans chaque composant
- Langue par défaut : FR, sauvée dans `localStorage`
- Le `<html lang>` est mis à jour dynamiquement via `document.documentElement.lang`
- `layout.tsx` reste un server component → les metadata (OG, Twitter) restent en FR statique
- La page `public/dashboards/index.html` n'est **pas** traduite (page statique indépendante)
- Pour ajouter une string : ajouter la clé dans les objets `fr` et `en` de `lib/i18n.tsx`

## Architecture des données
- Données des projets **hardcodées** dans les composants (pas de fichier data externe)
- Projets vedettes : `Portfolio.tsx` (3 composants `<Browser>`)
- Projets additionnels : `Modal.tsx` (tableau `projects[]`, défini à l'intérieur du composant pour accéder à `t()`)
- Convention images mobile : préfixe `m-` (ex: `m-op2-screenshot.jpg`)
- Le composant `Browser` supporte une prop optionnelle `ctaLabel` pour personnaliser le texte du CTA

## Projets vedettes (Portfolio.tsx)
1. **OP2** — cyan — op2na.com
2. **GROUPE TONIC** — magenta — groupetonic.ca
3. **OUTILS DE GESTION / MANAGEMENT TOOLS** — magenta — /dashboards/

## Conventions
- Couleurs thème : cyan `#4A90E2`, magenta `#9B59B6`, jaune `#F39C12`
- Type `color` du Browser : `"cyan" | "magenta" | "yellow"`
- Les Browser alternent le skew (-1, 1, -1)
- Build : `npx next build` (pas de `next` global installé)
- Pas de `npm run dev` global — utiliser `npx next dev`

## Netlify
- Config dans `netlify.toml`
- Le catch-all `/* → /index.html` (status 200) est en fin de fichier
- Les fichiers dans `public/` sont servis statiquement (priorité sur le catch-all)
- Le site Netlify `demodashboardfinance.netlify.app` est toujours actif (lien LinkedIn existant)

## Contexte global
Voir ~/Documents/CONTEXT.md pour le profil complet,
les conventions transversales et la liste des clients actifs.
