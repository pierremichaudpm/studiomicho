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
  page.tsx            # Page principale FR — orchestre toutes les sections + I18nProvider
  layout.tsx          # Layout racine (server component, metadata SEO FR)
  eng/
    page.tsx          # Page EN — même contenu, I18nProvider initialLocale="en"
    layout.tsx        # Layout EN (metadata SEO anglaises, og:image EN)
  globals.css         # Styles globaux (section padding, responsive)
lib/
  i18n.tsx            # Système i18n — Context, Provider, hook, traductions FR/EN (~160 clés)
components/
  LanguageToggle.tsx  # Bouton toggle FR/EN (fixé top-right desktop, intégré dans header mobile)
  Navigation.tsx      # Header mobile (hamburger | titre+logo | toggle) + menu fullscreen
  VerticalBrand.tsx   # Branding latéral desktop (logo + titre vertical + nav)
  Hero.tsx            # Section héros (typewriter, h1 pour SEO)
  TeamDuo.tsx         # Section duo Pierre + Virginie (photos, rôles, stats promesse)
  Services.tsx        # Section services (liste verticale, 4 services)
  Portfolio.tsx       # 3 projets vedettes (Browser) + démos interactives + bouton "Plus"
  Modal.tsx           # Modal avec projets additionnels (grille 2 colonnes)
  Advantage.tsx       # Tableau comparatif Agence vs Freelance vs Studio Micho
  Comment.tsx         # Section méthode 5 étapes (Écoute → Prototype → Construction → Livraison → Suivi)
  Pitch.tsx           # Section CTA + contacts
public/
  images/             # Screenshots projets (desktop + mobile m-*), photos équipe
  dashboards/         # Page statique dashboards (index.html + PNGs)
  og-fr-v5.png        # Image Open Graph FR (1200x630)
  og-en-v5.png        # Image Open Graph EN (1200x630)
  sitemap.xml         # Sitemap avec / et /eng + hreflang
  robots.txt          # Allow all + sitemap
```

## i18n (internationalisation)
- Système maison léger : React Context dans `lib/i18n.tsx`
- ~160 strings traduites (FR + EN), clés organisées par section (nav.*, hero.*, team.*, services.*, etc.)
- Hook `useTranslation()` retourne `{ t, locale, setLocale }`
- Langue par défaut : FR, sauvée dans `localStorage`
- Le `<html lang>` est mis à jour dynamiquement via `document.documentElement.lang`
- `I18nProvider` accepte `initialLocale` prop pour forcer la langue (utilisé par `/eng`)
- Meta SEO : FR dans `app/layout.tsx`, EN dans `app/eng/layout.tsx`
- La page `public/dashboards/index.html` n'est **pas** traduite (page statique indépendante)
- Pour ajouter une string : ajouter la clé dans les objets `fr` et `en` de `lib/i18n.tsx`

## Architecture des données
- Données des projets **hardcodées** dans les composants (pas de fichier data externe)
- Projets vedettes : `Portfolio.tsx` (3 composants `<Browser>` + section démos)
- Projets additionnels : `Modal.tsx` (tableau `projects[]`, défini à l'intérieur du composant pour accéder à `t()`)
- Convention images mobile : préfixe `m-` (ex: `m-op2-screenshot.jpg`)
- Le composant `Browser` supporte des props optionnelles `ctaLabel` et `stat`
- Les liens `#ancre` dans Browser font un smooth scroll (pas target="_blank")

## Projets vedettes (Portfolio.tsx)
1. **OP2** — cyan — op2na.com
2. **GROUPE TONIC** — magenta — groupetonic.ca
3. **OUTILS DE GESTION / MANAGEMENT TOOLS** — yellow — #demos (scroll vers démos)

## Démos interactives (Portfolio.tsx, sous les projets vedettes)
- Dashboard Accueil — accueildemo.netlify.app
- Dashboard Financier — demodashboardfinance.netlify.app
- Dashboard Comptabilité — comptablepro.netlify.app

## Copywriting
- Ton : direct, québécois, conversationnel. Pas corporate. Pas de jargon vide.
- Le site parle au "nous" (duo Pierre + Virginie), jamais au "je"
- Descriptions de services = problème client + solution concrète
- Descriptions de projets = contexte client + résultat + délai

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
