# Studio Micho - React/Next.js Version

Application React (Next.js) qui reproduit EXACTEMENT le design et les animations du site Studio Micho original.

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