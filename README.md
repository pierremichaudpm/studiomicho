# Studio Micho - React/Next.js Version

Site Studio Micho en React et Next.js.

## Hero 3D et projets — intégration de l’essai 08

Le hero validé dans le dossier voisin `animation hero` est intégré au site principal, en français et en anglais. Les cinq pièces s’assemblent avec un aperçu furtif du backend, puis restent de face, orientées vers le typewriter : vers la gauche sur ordinateur et légèrement vers le haut sur mobile. Le typewriter garde son rythme indépendant. Quatre flèches permettent de tourner le modèle dans toutes les directions, comme le glissement à la souris ou au toucher et les touches fléchées ; la touche Début recentre la vue. La pièce bleue présente un site pour ordinateur, la jaune un site mobile et l’orange un graphique circulaire ; le graphique rose est conservé. Les commandes de lecture et le texte d’aide ont été retirés.

L’ordre des premières sections est désormais :

1. Hero avec deux phrases et le modèle 3D, sur deux bulles bleue et violette très discrètes (4,5 % et 3,5 % d’opacité). La typographie s’adapte de 18–24 px sur mobile à 30–34 px sur grand écran, avec un curseur proportionnel ; la flèche lumineuse descend vers `#projets`.
2. **Projets** : les six vignettes de la mosaïque originale, sur trois colonnes sur ordinateur et deux sur mobile. Le fond bleu nuit alterne avec les sections voisines, avec les bulles flottantes bleues, violettes et ambrées du site et son dégradé cyan–magenta–jaune sur le titre. Chaque vignette ouvre sa fiche ; **Tous les projets**, en bas, ouvre le portfolio complet.
3. **Ce que nous faisons**, puis les autres sections existantes.

Le rendu 3D utilise Three.js, chargé à la demande. Les fichiers `lib/hero-*.ts` portent le modèle et les animations ; `components/Projects.tsx` porte la mosaïque. Les préférences de réduction des mouvements désactivent aussi la pulsation de la flèche. Le build statique est généré dans `out/` par `npm run build`.

Les notes ci-dessous décrivent la conversion initiale du site ; les timings et composants du hero ont été remplacés par cette intégration.

## 🚀 Installation

```bash
npm install
```

## 🏃 Développement

```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 📦 Build de production

```bash
npm run build
npm start
```

## 🎨 Fonctionnalités reproduites

### ✅ Animations clés
- **Typewriter effect** : Frappe caractère par caractère avec gestion des tags HTML
- **Curseur clignotant** : Pendant la frappe et permanent sur la dernière ligne (▮)
- **Browser reveal** : Animation clip-path avec scan line cyan
- **Cascade delay** : 300ms entre chaque browser
- **Float animations** : Formes géométriques flottantes
- **Gradient animé** : Texte avec gradient qui se déplace
- **Blink cursors** : ▮ qui clignote après chaque item Studio Micho

### ✅ Composants
- `VerticalBrand` : STUDIO MICHO vertical sticky
- `Hero` : Section 1 avec typewriter
- `Portfolio` : Section 2 avec browsers animés
- `Modal` : Modale projets (ESC, click outside)
- `Difference` : Section 3 VS comparison
- `Comment` : Section 4 flow 01→02→03
- `Pitch` : Section 5 CTA finale

### ✅ Hooks personnalisés
- `useTypewriter` : Gère l'effet machine à écrire avec HTML
- `useScrollReveal` : IntersectionObserver pour révélation au scroll

## 🎯 Spécifications techniques

### Couleurs (CSS Variables)
- `--deep-blue: #0A1128`
- `--bg-dark: #030712`
- `--cyan: #00F5FF`
- `--magenta: #FF00FF`
- `--yellow: #FFFF00`
- `--orange: #FF6B35`

### Polices
- **Inter** : Texte principal (400, 700, 900)
- **JetBrains Mono** : Terminal/code (400, 700)

### Timing des animations
- Typewriter speed: 30ms par caractère
- Line 1 delay: 500ms
- Line 2 delay: 2000ms
- Line 3 delay: 3000ms
- Line 4 delay: 5500ms (avec curseur permanent)
- Browser reveal: 2s ease-out
- Browser cascade: 300ms entre chaque
- Scan line: 2s ease-out

## 📱 Responsive

- **Desktop** : STUDIO MICHO vertical à gauche, body avec padding-left: 120px
- **Mobile (<968px)** : STUDIO MICHO horizontal centré en haut, padding supprimé
- Grilles passent en 1 colonne
- Flow devient vertical avec flèches rotated 90°
- Formes flottantes masquées

## 🔧 Structure

```
/app
  - page.tsx         # Page principale avec state modal
  - layout.tsx       # Layout Next.js avec metadata
  - globals.css      # Styles globaux + animations

/components
  - VerticalBrand.tsx
  - Hero.tsx
  - Portfolio.tsx
  - Modal.tsx
  - Difference.tsx
  - Comment.tsx
  - Pitch.tsx

/hooks
  - useTypewriter.ts
  - useScrollReveal.ts
```

## ⚡ Performance

- Toutes les animations sont en CSS (pas de JS)
- IntersectionObserver natif (pas de librairie)
- Composants React optimisés
- Build Next.js optimisé pour production

## 📝 Notes importantes

- Le typewriter gère les balises HTML inline (spans avec classes)
- Le curseur blink est synchronisé avec la frappe
- Les browser reveals ne se déclenchent qu'une seule fois (triggerOnce: true)
- La modale verrouille le scroll du body quand ouverte
- Tous les timings et valeurs sont EXACTEMENT comme l'original

## 🎨 Design fidelity

Ce build est une reproduction PIXEL-PERFECT de l'original HTML. Chaque animation, chaque timing, chaque couleur est identique. Aucun "improvement" ou "modernisation" n'a été fait - c'est une conversion pure et fidèle.
