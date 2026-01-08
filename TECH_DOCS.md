# Studio Micho - Documentation Technique Complète

## 📋 Table des matières

1. [Architecture](#architecture)
2. [Composants](#composants)
3. [Hooks personnalisés](#hooks-personnalisés)
4. [Animations CSS](#animations-css)
5. [Gestion d'état](#gestion-détat)
6. [Performance](#performance)
7. [Responsive Design](#responsive-design)
8. [Débogage](#débogage)

---

## Architecture

### Stack technique
- **Framework** : Next.js 15 (App Router)
- **Language** : TypeScript
- **Styling** : CSS Modules + CSS Variables
- **Build** : Turbopack (dev) / Webpack (prod)

### Structure des fichiers
```
studio-micho-react/
├── app/
│   ├── page.tsx          # Page principale (client component)
│   ├── layout.tsx        # Layout racine avec metadata
│   └── globals.css       # Styles globaux + animations
├── components/
│   ├── VerticalBrand.tsx # Branding sticky vertical
│   ├── Hero.tsx          # Section 1 - Typewriter
│   ├── Portfolio.tsx     # Section 2 - Browsers reveal
│   ├── Modal.tsx         # Modale projets
│   ├── Difference.tsx    # Section 3 - VS comparison
│   ├── Comment.tsx       # Section 4 - Flow
│   └── Pitch.tsx         # Section 5 - CTA
└── hooks/
    ├── useTypewriter.ts  # Hook effet machine à écrire
    └── useScrollReveal.ts # Hook IntersectionObserver
```

---

## Composants

### 1. VerticalBrand (`components/VerticalBrand.tsx`)

**Rôle** : Affiche "STUDIO MICHO" en vertical, fixé à gauche de l'écran.

**Props** : Aucune

**Comportement** :
- Position `fixed` avec `left: 2rem`, `top: 2rem`
- `writing-mode: vertical-rl` + `transform: rotate(180deg)`
- Hover : couleur passe de blanc à cyan
- Z-index: 1000 (au-dessus de tout)

**Responsive** :
- Mobile : devient horizontal, centré en haut
- `transform: translateX(-50%)` pour centrage parfait

**Code critique** :
```typescript
style={{
  position: 'fixed',
  writingMode: 'vertical-rl',
  transform: 'rotate(180deg)',
  zIndex: 1000,
}}
```

---

### 2. Hero (`components/Hero.tsx`)

**Rôle** : Section d'intro avec effet typewriter sur 4 lignes.

**Props** : Aucune

**State interne** :
- 4 instances de `useTypewriter` (une par ligne)
- Chaque ligne a son propre délai et configuration

**Lignes et timings** :
```typescript
line1: delay 500ms  - Pas de curseur permanent
line2: delay 2000ms - Pas de curseur permanent
line3: delay 3000ms - Pas de curseur permanent (avec gradient)
line4: delay 5500ms - CURSEUR PERMANENT ▮ (avec gradient)
```

**Rendu HTML** :
- Utilise `dangerouslySetInnerHTML` pour injecter HTML avec classes
- Les spans `.gradient-text` sont inclus dans le texte

**Scroll indicator** :
- Position absolute en bas de section
- Animation `bounce` (keyframe CSS)

---

### 3. Portfolio (`components/Portfolio.tsx`)

**Rôle** : Affiche 3 browsers avec animation reveal au scroll.

**Props** :
- `onOpenModal: () => void` - Callback pour ouvrir la modale

**Sous-composant Browser** :
- Props : `name`, `description`, `tags`, `color`, `skew`, `delay`
- State : `isRevealed` (boolean)
- Observer : IntersectionObserver avec `threshold: 0.2`

**Animation reveal** :
1. Élément observé au scroll
2. Quand visible : setTimeout avec `delay` prop
3. `isRevealed = true` déclenche l'animation CSS
4. Observer unobserve après (triggerOnce)

**Scan line** :
- Div absolute avec height: 3px
- Background: gradient cyan
- Animation `scanLine` : top 0 → 100%
- Durée: 2s synchronisé avec reveal

**Cascade timing** :
```typescript
Browser 1: delay 0ms
Browser 2: delay 300ms
Browser 3: delay 600ms
```

**Formes flottantes** :
- Cercle orange : right 5%, top 10%
- Carré cyan : left 3%, bottom 15%
- Animation `float` : translateY(0 → 30px)

---

### 4. Modal (`components/Modal.tsx`)

**Rôle** : Modale fullscreen avec grille de projets.

**Props** :
- `isOpen: boolean` - État ouvert/fermé
- `onClose: () => void` - Callback fermeture

**Data** :
- Array `projects` hardcodé avec 4 projets
- Structure : `{ name, title, description, tags[] }`

**Comportements de fermeture** :
1. **Click X** : `onClick` du bouton close
2. **ESC** : Event listener `keydown` dans useEffect
3. **Click background** : `onClick` de la div modale si `e.target === e.currentTarget`

**Gestion du scroll** :
```typescript
useEffect(() => {
  if (isOpen) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
  }
  // Cleanup dans return
}, [isOpen]);
```

**Animation d'entrée** :
- CSS : `animation: modalSlideIn 0.5s ease-out`
- Keyframe : opacity 0 → 1, translateY(50px → 0)

**Grille responsive** :
```css
grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
gap: 3rem;
```

---

### 5. Difference (`components/Difference.tsx`)

**Rôle** : Comparaison "Agence traditionnelle" vs "Studio Micho".

**Props** : Aucune

**Layout** :
- Grid 2 colonnes égales
- Gap: 4rem
- Responsive : 1 colonne sur mobile

**Colonne gauche (Them)** :
- Label barré (text-decoration: line-through)
- Couleur grise, opacity 0.5
- Pas de curseur blink

**Colonne droite (Studio Micho)** :
- Label en gradient (cyan → magenta)
- Texte blanc, opacity 1
- **Curseur ▮ après chaque item** :
  ```typescript
  <span style={{ 
    color: 'var(--cyan)',
    animation: 'blink 1s infinite'
  }}>
    {' '}▮
  </span>
  ```

**Formes flottantes** :
- Cercle cyan : left -10%, top 20%
- Carré magenta : right -5%, bottom 10%

---

### 6. Comment (`components/Comment.tsx`)

**Rôle** : Flow diagram 01 → 02 → 03.

**Props** : Aucune

**Structure** :
- Flexbox horizontal (3 items + 2 flèches)
- Chaque item : numéro géant + titre + description

**Numéros** :
- Font-size: `clamp(8rem, 20vw, 20rem)`
- Opacity: 0.3
- Couleurs : 01=cyan, 02=magenta, 03=yellow

**Flèches** :
- Caractère : → (U+2192)
- Couleur : orange
- Opacity: 0.5

**Responsive** :
- Desktop : horizontal
- Mobile : vertical (flex-direction: column)
- Flèches rotées 90° sur mobile

---

### 7. Pitch (`components/Pitch.tsx`)

**Rôle** : Section finale avec CTA.

**Props** : Aucune

**Statement** :
- "JE CONÇOIS. JE CONSTRUIS. JE LIVRE."
- Gradient animé : `animation: gradientShift 5s linear infinite`
- Background-size: 200% pour effet de défilement

**CTA Button** :
- Tag `<a>` avec `href="mailto:..."`
- Background cyan par défaut
- Hover : 
  - Scale 1.05
  - Background magenta slide de gauche (pseudo-element)
  - Box-shadow magenta glow

**Pseudo-element trick** :
```typescript
<div className="cta-before" style={{
  position: 'absolute',
  left: '-100%',
  background: 'var(--magenta)',
  transition: 'left 0.3s ease',
  zIndex: -1,
}} />
```
Sur hover : `left: 0`

---

## Hooks personnalisés

### useTypewriter (`hooks/useTypewriter.ts`)

**Signature** :
```typescript
interface UseTypewriterOptions {
  text: string;
  speed?: number;           // ms par caractère (défaut: 30)
  delay?: number;           // ms avant de commencer (défaut: 0)
  onComplete?: () => void;  // Callback fin de frappe
  showCursor?: boolean;     // Curseur pendant frappe (défaut: true)
  permanentCursor?: boolean;// Curseur reste après (défaut: false)
}

Return: { 
  displayedText: string, 
  isTyping: boolean, 
  isComplete: boolean 
}
```

**Algorithme** :
1. Parcourt `text` caractère par caractère
2. Si `<` : mode "inTag" activé
3. En mode inTag : accumule dans `tagBuffer`
4. Si `>` : ferme tag, ajoute tagBuffer à currentHTML
5. Sinon : ajoute caractère à currentHTML
6. Met à jour state avec curseur si `showCursor`
7. À la fin : ajoute curseur permanent si `permanentCursor`

**Gestion du HTML** :
- Ne type PAS les balises (elles apparaissent d'un coup)
- Type uniquement le contenu texte
- Préserve les classes CSS (ex: gradient-text)

**Cleanup** :
```typescript
return () => {
  clearTimeout(timeoutId);
  clearInterval(intervalId);
};
```

---

### useScrollReveal (`hooks/useScrollReveal.ts`)

**Signature** :
```typescript
interface UseScrollRevealOptions {
  threshold?: number;      // % visible pour trigger (défaut: 0.2)
  rootMargin?: string;     // Margin de détection (défaut: '0px')
  triggerOnce?: boolean;   // Une seule fois (défaut: true)
}

Return: { 
  ref: RefObject<HTMLDivElement>, 
  isVisible: boolean 
}
```

**Usage** :
```typescript
const { ref, isVisible } = useScrollReveal({ threshold: 0.2 });

<div ref={ref}>
  {isVisible && <Animation />}
</div>
```

**Implémentation** :
- Crée IntersectionObserver dans useEffect
- Observe `ref.current`
- Callback : met à jour `isVisible`
- Si `triggerOnce` : unobserve après trigger
- Cleanup : `observer.disconnect()`

---

## Animations CSS

### Keyframes définies (`app/globals.css`)

#### 1. blink
```css
@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}
```
**Usage** : Curseurs clignotants (▮)
**Durée** : 1s infinite

#### 2. gradientShift
```css
@keyframes gradientShift {
  to { background-position: 200% center; }
}
```
**Usage** : Textes avec gradient animé
**Durée** : 3-5s infinite linear

#### 3. bounce
```css
@keyframes bounce {
  0%, 20%, 50%, 80%, 100% { transform: translateX(-50%) translateY(0); }
  40% { transform: translateX(-50%) translateY(-10px); }
  60% { transform: translateX(-50%) translateY(-5px); }
}
```
**Usage** : Scroll indicator
**Durée** : 2s infinite

#### 4. smoothReveal
```css
@keyframes smoothReveal {
  0% {
    opacity: 0;
    clip-path: inset(100% 0 0 0);
    transform: translateY(50px);
  }
  100% {
    opacity: 1;
    clip-path: inset(0 0 0 0);
    transform: translateY(0);
  }
}
```
**Usage** : Browser reveal
**Durée** : 2s ease-out forwards
**Note** : `clip-path: inset()` crée effet "dé-masquage" du haut vers le bas

#### 5. scanLine
```css
@keyframes scanLine {
  0% { top: 0; opacity: 1; }
  100% { top: 100%; opacity: 0; }
}
```
**Usage** : Ligne cyan qui descend pendant browser reveal
**Durée** : 2s ease-out

#### 6. float
```css
@keyframes float {
  0%, 100% { transform: translateY(0) translateX(0); }
  50% { transform: translateY(30px) translateX(30px); }
}
```
**Usage** : Formes géométriques flottantes
**Durée** : 7-12s infinite ease-in-out
**Variations** : Certaines en `reverse` pour effet contraire

#### 7. modalSlideIn
```css
@keyframes modalSlideIn {
  0% { opacity: 0; transform: translateY(50px); }
  100% { opacity: 1; transform: translateY(0); }
}
```
**Usage** : Entrée de la modale
**Durée** : 0.5s ease-out

---

## Gestion d'état

### State global (page.tsx)

```typescript
const [isModalOpen, setIsModalOpen] = useState(false);

const openModal = () => setIsModalOpen(true);
const closeModal = () => setIsModalOpen(false);
```

**Pourquoi pas de Context ?**
- State simple (1 boolean)
- Pas de nesting profond
- Props drilling minimal (1 niveau)

### State local des composants

#### Hero
- 4x `useTypewriter` states indépendants
- Chaque ligne gère son propre `displayedText`

#### Portfolio (Browser)
- `isRevealed: boolean` par browser
- Déclenché par IntersectionObserver

#### Modal
- Pas de state interne
- 100% contrôlé par props (controlled component)

---

## Performance

### Optimisations implémentées

#### 1. IntersectionObserver natif
- Pas de librairie externe (react-intersection-observer, etc.)
- Trigger once : unobserve après révélation
- Évite re-render inutiles

#### 2. Animations CSS pures
- Aucune animation en JavaScript
- GPU-accelerated (transform, opacity)
- Pas de layout thrashing

#### 3. dangerouslySetInnerHTML
- Évite re-parse du HTML à chaque frame
- Typewriter met à jour 1 seule div

#### 4. Cleanup approprié
```typescript
useEffect(() => {
  // Setup
  return () => {
    // Cleanup timers, observers, listeners
  };
}, [deps]);
```

#### 5. Événements optimisés
- Event listeners ajoutés/retirés uniquement quand nécessaire
- Modal : listeners ajoutés seulement si `isOpen`

### Points d'attention

⚠️ **dangerouslySetInnerHTML**
- Sécurisé ici car le HTML est hardcodé
- NE PAS utiliser avec user input

⚠️ **Inline styles**
- Utilisés pour simplicité et portabilité
- En production, considérer CSS Modules pour meilleures perfs

⚠️ **Animations multiples**
- Beaucoup d'animations simultanées
- Monitor performance sur devices low-end

---

## Responsive Design

### Breakpoint principal : 968px

```css
@media (max-width: 968px) {
  /* Styles mobiles */
}
```

### Changements mobile

#### Layout
- `body { padding-left: 0 }` (retire l'espace pour branding)
- Grids : `grid-template-columns: 1fr !important`

#### VerticalBrand
- `writing-mode: horizontal-tb`
- `transform: translateX(-50%)` (centrage)
- `left: 50%`
- `font-size: 1.5rem` (réduit)

#### Typography
- Utilise `clamp()` pour scaling fluide
- Ex: `font-size: clamp(1rem, 5vw, 4rem)`

#### Flow (Comment)
- `flex-direction: column`
- Flèches : `transform: rotate(90deg)`

#### Formes flottantes
- `display: none` (masquées pour lisibilité)

#### Modal
- Grid : 1 colonne
- Close button : font-size réduit (3rem)

---

## Débogage

### Erreurs communes

#### 1. Typewriter ne s'affiche pas
**Symptôme** : Lignes vides
**Cause** : Hook ne s'exécute pas
**Fix** : Vérifier que composant est "use client"

#### 2. Animations ne se déclenchent pas
**Symptôme** : Éléments statiques
**Cause** : Keyframes CSS non chargées
**Fix** : Vérifier import de `globals.css` dans layout

#### 3. Modal ne se ferme pas
**Symptôme** : Bloqué sur modal
**Cause** : Event listeners pas attachés
**Fix** : Vérifier useEffect avec `[isOpen, onClose]` deps

#### 4. Scroll reveal ne fonctionne pas
**Symptôme** : Browsers n'apparaissent pas
**Cause** : IntersectionObserver pas supporté
**Fix** : Ajouter polyfill ou fallback

#### 5. Styles inline ne s'appliquent pas
**Symptôme** : CSS par défaut visible
**Cause** : CSS variables non définies
**Fix** : Vérifier `:root` dans globals.css

### Outils de debug

#### Console logs stratégiques
```typescript
useEffect(() => {
  console.log('Browser revealed:', isRevealed);
}, [isRevealed]);
```

#### React DevTools
- Inspecter props/state
- Vérifier re-renders
- Profiler les performances

#### Chrome DevTools
- **Performance tab** : Enregistrer scroll/animations
- **Network tab** : Vérifier fonts chargées
- **Elements tab** : Inspecter computed styles

#### Lighthouse
```bash
npm run build
npm start
# Ouvrir Lighthouse dans Chrome DevTools
```
Cibles :
- Performance : > 90
- Accessibility : > 95
- Best Practices : > 95

---

## Tests recommandés

### Checklist manuelle

- [ ] Typewriter : toutes les lignes se tapent
- [ ] Curseur permanent sur line4
- [ ] Browser reveal au scroll
- [ ] Scan line visible
- [ ] Modal : ouvre/ferme (X, ESC, click)
- [ ] Scroll bloqué quand modal ouverte
- [ ] ▮ clignote après items Studio Micho
- [ ] Gradient animés (texte bouge)
- [ ] Hover : couleurs changent
- [ ] Mobile : layout correct
- [ ] Formes flottantes bougent

### Tests automatisés (TODO)

```typescript
// Example avec Testing Library
test('Modal opens and closes', () => {
  render(<App />);
  const btn = screen.getByText(/plus de projets/i);
  fireEvent.click(btn);
  expect(screen.getByText(/autres projets/i)).toBeInTheDocument();
  
  fireEvent.keyDown(window, { key: 'Escape' });
  expect(screen.queryByText(/autres projets/i)).not.toBeInTheDocument();
});
```

---

## Déploiement

### Vercel (recommandé)

```bash
npm install -g vercel
vercel
```

### Netlify

```bash
npm run build
# Déployer dossier .next/
```

### Variables d'environnement

Aucune requise pour ce projet (tout est statique).

---

## Maintenance

### Mise à jour du contenu

#### Changer les projets
Fichier : `components/Modal.tsx`
Modifier l'array `projects`

#### Changer les textes du typewriter
Fichier : `components/Hero.tsx`
Modifier la prop `text` de chaque `useTypewriter`

#### Changer les couleurs
Fichier : `app/globals.css`
Modifier les variables dans `:root`

### Dépendances à maintenir

```json
{
  "next": "^15.x",
  "react": "^18.x",
  "react-dom": "^18.x",
  "typescript": "^5.x"
}
```

Commande update :
```bash
npm update
npm audit fix
```

---

## Crédits & Licence

**Original** : Studio Micho (HTML/CSS/JS)
**Conversion React** : Cette version Next.js
**Licence** : À définir selon le projet original

---

**Version** : 1.0.0
**Dernière mise à jour** : 2024