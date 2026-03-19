# WORKING_LOG — Studio Micho React

## Session 2026-03-10

### Objectif
Remplacer InTexto par les Dashboards comme 3e projet vedette, et réorganiser le modal.

### Changements effectués

#### 1. Portfolio.tsx — 3e projet vedette
- **Avant** : INTEXTO (cyan, intexto.ca)
- **Après** : OUTILS DE GESTION (magenta, /dashboards/)
- Description : "Dashboards financiers. Prototypes d'outils de gestion sur mesure."
- Tags : Prototype, Dashboards
- Images : réutilisation de `dashboard-screenshot.jpg` / `m-dashboard-screenshot.jpg`

#### 2. Modal.tsx — Réorganisation "Plus de projets"
- Ajout d'InTexto en **première position** du modal
- Suppression de Dashboard financier du modal (promu en vedette)

#### 3. Dashboards intégrés au site principal
- Copie du build `Studiomicho_dashboards/deploy/` → `public/dashboards/`
  - `index.html` + 3 PNGs (comptable, finance, itinérance)
- Page accessible à `studiomicho.com/dashboards/` sans proxy externe

#### 4. Netlify — Nettoyage redirects
- **Ajout puis suppression** de redirects proxy vers demodashboardfinance.netlify.app
- Décision finale : pas besoin de proxy, le contenu est servi statiquement depuis `public/`

### Décisions techniques
| Décision | Raison |
|----------|--------|
| Intégrer le dashboard en static dans `public/` | Élimine la dépendance au site Netlify séparé |
| URL relative `/dashboards/` | Fonctionne en dev et prod sans hardcoder le domaine |
| Couleur magenta pour le 3e projet | Éviter deux cyan consécutifs (OP2 est déjà cyan) |
| Réutiliser les images existantes | Pas besoin de nouveaux assets |

### Problèmes rencontrés
- `next` non installé globalement → résolu avec `npx next build`
- `npm install` nécessaire (node_modules absent) → résolu

### Commits
1. `45df1f3` — Replace InTexto with Outils de gestion dashboards as 3rd featured project
2. `6e4c864` — Move dashboards build into main site as static page

### Prochaines étapes
- [x] ~~Considérer un screenshot plus représentatif pour le projet Dashboards~~ → fait (session 2)
- [ ] Supprimer le site Netlify `demodashboardfinance.netlify.app` (plus nécessaire)
- [ ] Vérifier que `studiomicho.com/dashboards/` fonctionne après déploiement
- [ ] Éventuellement mettre à jour les liens internes dans `public/dashboards/index.html` (les démos pointent encore vers des sites Netlify externes : accueildemo, comptablepro)
- [ ] Supprimer les anciens `dashboard-screenshot.jpg` / `m-dashboard-screenshot.jpg` (remplacés par `gestion-*`)

---

## Session 2026-03-10 (2)

### Objectif
Mettre à jour les screenshots et le CTA du projet Outils de gestion.

### Changements effectués

#### 1. Nouveaux screenshots — Outils de gestion
- **Avant** : `dashboard-screenshot.jpg` (122 KB) / `m-dashboard-screenshot.jpg` (47 KB)
- **Après** : `gestion-screenshot.jpg` (160 KB) / `m-gestion-screenshot.jpg` (109 KB)
- Source : captures d'écran PNG fournies par l'utilisateur
- Conversion PNG → JPG optimisé (quality 85, strip metadata)
  - Desktop : 259 KB → 160 KB (-38%)
  - Mobile : 199 KB → 109 KB (-45%)

#### 2. Portfolio.tsx — CTA personnalisé
- Ajout prop optionnelle `ctaLabel` au composant `Browser`
- Outils de gestion : "Voir les projets →" (pluriel, car pointe vers plusieurs dashboards)
- Autres projets : inchangés ("Voir le projet →")

### Décisions techniques
| Décision | Raison |
|----------|--------|
| Nouvelle prop `ctaLabel` plutôt que modifier le texte global | Seul Outils de gestion nécessite le pluriel |
| JPG quality 85 + strip | Bon compromis taille/qualité pour screenshots |
| Noms `gestion-*` plutôt que `dashboard-*` | Cohérent avec le nouveau nom "Outils de gestion" |

### Problèmes rencontrés
- Noms de fichiers avec apostrophe typographique (') et accents → `magick` en bash échouait. Résolu via `glob.glob()` en Python pour passer les noms exacts.

### Commits
1. `a09660f` — Update Outils de gestion screenshots with optimized images
2. `941ed12` — Use plural CTA label for Outils de gestion project

### Prochaines étapes
- [x] ~~Supprimer les anciens `dashboard-screenshot.jpg` / `m-dashboard-screenshot.jpg`~~ → fait (session 3)
- [ ] ~~Supprimer le site Netlify `demodashboardfinance.netlify.app`~~ → **annulé** (lien LinkedIn existant)
- [ ] Mettre à jour les liens internes dans `public/dashboards/index.html`

---

## Session 2026-03-13

### Objectif
Nettoyage screenshots, traduction complète FR/EN avec toggle de langue.

### Changements effectués

#### 1. Nettoyage — Anciens screenshots supprimés
- Suppression de `dashboard-screenshot.jpg` (122 KB) et `m-dashboard-screenshot.jpg` (47 KB)
- Plus référencés nulle part depuis session 2 (remplacés par `gestion-*`)

#### 2. Système i18n complet
- **`lib/i18n.tsx`** : React Context + Provider + hook `useTranslation()` + ~120 strings FR/EN
- **`components/LanguageToggle.tsx`** : Bouton fixé en haut à droite, affiche "EN" ou "FR"
- **`app/page.tsx`** : Wrappé avec `<I18nProvider>`, ajout du `<LanguageToggle />`
- Langue sauvée dans `localStorage`, `<html lang>` mis à jour dynamiquement

#### 3. Composants mis à jour (tous)
- `Navigation.tsx` — labels du menu
- `Hero.tsx` — 4 lignes typewriter (se relancent au changement de langue)
- `Services.tsx` — titres et descriptions des 4 services
- `Portfolio.tsx` — titre section, sous-titre, descriptions/tags des 3 projets, CTA, bouton "Plus de projets"
- `Modal.tsx` — titre, descriptions/tags de 9 projets (tableau `projects[]` déplacé à l'intérieur du composant pour accéder à `t()`)
- `Advantage.tsx` — titre section, 5 avantages (titres + descriptions)
- `Comment.tsx` — titre, sous-titre, 3 étapes (titres + descriptions)
- `Pitch.tsx` — 4 lignes de pitch, CTA

#### 4. Titre Outils de gestion traduit
- FR : "OUTILS DE GESTION" / EN : "MANAGEMENT TOOLS"
- Ajout clé `portfolio.gestion.name` dans i18n

### Décisions techniques
| Décision | Raison |
|----------|--------|
| React Context maison plutôt que next-intl | Portfolio simple, pas besoin de routing i18n ou SSR par locale |
| Traductions inline dans `lib/i18n.tsx` | ~120 strings → un seul fichier suffit, pas besoin de JSON séparés |
| `localStorage` pour persister la langue | Pas de cookie/serveur nécessaire pour un site statique |
| `layout.tsx` metadata reste en FR | Server component, pas accès au Context client. SEO principal en FR |
| `Modal.tsx` projects[] déplacé dans le composant | Besoin d'accéder à `t()` qui nécessite le Context |
| Ne pas supprimer `demodashboardfinance.netlify.app` | Lien LinkedIn existant pointe vers ce site |
| `dashboards/index.html` non traduit | Page statique indépendante, hors du système React/i18n |

### Problèmes rencontrés
- Titre "OUTILS DE GESTION" hardcodé dans Portfolio.tsx, pas dans le système i18n → ajout de la clé `portfolio.gestion.name` après le premier push
- Le `useTypewriter` hook a `text` dans ses deps → se relance correctement au changement de langue (pas de bug)

### Commits
1. `75ab42e` — Add full FR/EN translation with language toggle
2. `09d2a49` — Translate Outils de gestion title to English (MANAGEMENT TOOLS)

### Prochaines étapes
- [ ] Traduire les metadata SEO dynamiquement (nécessiterait un refactoring layout → client ou generateMetadata dynamique)
- [ ] Traduire `public/dashboards/index.html` (page statique, hors React)
- [ ] Vérifier rendu mobile du LanguageToggle (position top-right vs menu hamburger)
- [ ] Considérer ajout d'un flag/icône sur le toggle plutôt que texte EN/FR
