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
- [x] ~~Traduire les metadata SEO~~ → fait (session 2026-03-26)
- [ ] Traduire `public/dashboards/index.html` (page statique, hors React)
- [x] ~~Vérifier rendu mobile du LanguageToggle~~ → fait, intégré dans le header mobile
- [ ] Considérer ajout d'un flag/icône sur le toggle plutôt que texte EN/FR

---

## Session 2026-03-26 — Redesign majeur contenu + conversion

### Objectif
Refonte complète du contenu pour convertir les prospects PME québécoises. Passage du "je" au "nous", nouvelle structure de sections, copy de conversion, design plus aéré.

### Changements effectués

#### 1. Passage "je" → "nous" (global)
- Tout le copywriting du site passe au "nous" (duo Pierre + Virginie)
- Hero, services, méthode, pitch, footer, meta SEO — tout ajusté
- Meta description SEO mise à jour en FR (layout.tsx)

#### 2. Section TeamDuo — Nouvelle section duo
- Nouveau composant `TeamDuo.tsx` après le hero
- Photos Pierre + Virginie (depuis la présentation bijoux)
- Rôles révisés : Pierre = Consultant numérique · Développeur IA / Virginie = Stratégie opérationnelle · Gestion de comptes
- Stats en bas = promesse équipe (3–4 semaines, 100% sur mesure, 0 intermédiaire)

#### 3. Services — Refonte complète
- Layout changé de grille 2×2 à liste verticale (plus élégant, inspiré présentation)
- Réduit de 5 services à 4 : fusionné "Publicité & Analytique" dans "Contenu & Marketing", "Outils de gestion" promu en #3
- Descriptions réécrites en "problème client → solution" au lieu de listes de features
- Titre centré, suppression du sous-titre dupliqué

#### 4. Portfolio — Restructuration
- CARI Saint-Laurent retiré des projets vedettes
- 3e projet = Outils de gestion (yellow) avec scroll vers démos
- Section démos interactives ajoutée sous les projets vedettes (3 dashboards)
- Descriptions de projets réécrites avec impact : contexte client + résultat + délai
- OP2 : "Firme d'ingénierie internationale. Nouveau site bilingue pour le marché nord-américain"
- Tonic : "Organisateur d'événements sportifs et production audiovisuelle"
- Gestion : "Ce que votre ERP devrait faire mais ne fait pas"
- Auréa ajouté dans le modal "Plus de projets"

#### 5. Avantage → Tableau comparatif
- Section Advantage transformée en tableau 3 colonnes : Agence vs Freelance vs Studio Micho
- Colonne Studio Micho mise en évidence visuellement
- Ton factuel, pas arrogant

#### 6. Méthode — 3 étapes → 4 étapes
- Écoute → Prototype → Construction → Livraison (inspiré présentation bijoux)
- Descriptions plus concrètes et conversationnelles

#### 7. Design — Plus aéré
- Floating shapes : tous les carrés (rotate 45deg) remplacés par des cercles
- Opacité des shapes réduite à 0.09
- Padding des sections augmenté globalement
- Pitch : font-size réduit (était trop agressif)

#### 8. Mobile header — Réorganisation
- Layout : hamburger | STUDIO MICHO + logo | EN/FR
- Language toggle intégré dans le header (plus de toggle fixe séparé sur mobile)
- Logo ajouté à droite du titre
- LanguageToggle desktop masqué sous 968px

#### 9. VerticalBrand — Desktop nav fusionné
- Navigation desktop fusionnée dans VerticalBrand (un seul conteneur flex)
- Logo + titre vertical + nav dans une colonne fixe à gauche
- Élimine le problème de synchronisation de position entre brand et nav séparés

### Décisions techniques
| Décision | Raison |
|----------|--------|
| Stats = promesse équipe, pas CV Pierre | Les 3 stats (3-4 sem, 100%, 0) parlent au client, les détails perso sont dans les fiches |
| Services en liste verticale | Plus élégant et aéré que la grille 2×2, inspiré de la présentation |
| 4 services au lieu de 5 | Pub & Analytique fusionné dans Contenu & Marketing, moins de dispersion |
| Cercles au lieu de carrés | Cohérent avec la présentation bijoux, plus doux visuellement |
| Nav fusionnée dans VerticalBrand | Impossible de synchroniser deux éléments fixed séparés proprement |
| Browser #anchor = smooth scroll | Les ancres internes ne doivent pas ouvrir un nouvel onglet |

### Problèmes rencontrés
- Nav desktop overlap avec le titre après ajout du logo → résolu en fusionnant nav dans VerticalBrand
- `href="#"` dans Browser sans projectUrl renvoyait en haut de page → ajout de preventDefault
- Descriptions de projets inventaient du contexte faux (OP2 "sans présence web" alors qu'ils avaient déjà un site international) → corrigé avec le vrai contexte
- "Pas de site, ou il date de 2019" → formulation bizarre, remplacée
- Section services "Ce que nous faisons" dupliquait le titre (sous-titre mono + gros titre) → supprimé le doublon
- Floating shapes carrées ne matchaient pas la présentation → remplacées par cercles

### Commits
- `c64f78a` — Major site redesign: je→nous, team duo, comparison table, 4-step method
- `24a95b6` — Reorganize mobile header: hamburger | STUDIO MICHO + logo | EN/FR
- `397aa69` — Merge desktop nav into VerticalBrand as single flex column
- `2563181` — Add conversion copy: impact descriptions, client-problem services, 6 stats
- `a36a80b` — Trim stats to best 3 (25 yrs, 15 yrs digital, 10+ shipped), fix 12→15 ans
- `60485e1` — Polish: airy spacing, circles, list-style services, team stats as promise
- `f4dc336` — Fix Outils de gestion click: smooth scroll to demos
- `b1ccdf8` — Fix project descriptions: OP2 international firm, Tonic sports+AV

### Prochaines étapes
- [ ] Passe globale cohérence design : paddings, fonts, spacing proportionnels
- [ ] Vérifier version anglaise complète (toutes les nouvelles clés traduites)
- [ ] Tester responsive mobile complet (toutes les nouvelles sections)
- [ ] Traduire `public/dashboards/index.html`
- [ ] Merger la branche redesign dans main quand satisfait
- [ ] Déployer sur Netlify et vérifier
