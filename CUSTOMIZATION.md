# Guide de Customisation - Studio Micho React

Ce guide vous montre comment personnaliser facilement le site sans casser les animations.

---

## 🎨 Changer les couleurs

**Fichier** : `app/globals.css`

```css
:root {
    --deep-blue: #0a1128;   /* ← Changez ici */
    --bg-dark: #030712;     /* ← Changez ici */
    --cyan: #00f5ff;        /* ← Changez ici */
    --magenta: #ff00ff;     /* ← Changez ici */
    --yellow: #ffff00;      /* ← Changez ici */
    --orange: #ff6b35;      /* ← Changez ici */
}
```

**Exemple** - Thème violet :
```css
:root {
    --cyan: #8B5CF6;        /* Violet clair */
    --magenta: #EC4899;     /* Rose */
    --yellow: #F59E0B;      /* Orange */
}
```

Les couleurs se mettent à jour automatiquement partout !

---

## ✏️ Modifier les textes du Hero

**Fichier** : `components/Hero.tsx`

### Ligne 1
```typescript
const line1 = useTypewriter({
  text: "> On imagine et construit des produits numériques à vélocité IA",
  //    ↑ Changez ce texte
  delay: 500,
});
```

### Ligne 4 (avec gradient)
```typescript
const line4 = useTypewriter({
  text: '> Je <span class="gradient-text">livre des produits qui fonctionnent</span>.',
  //         ↑ Texte normal        ↑ Texte en gradient                           ↑
});
```

**Note** : Gardez les balises `<span class="gradient-text">` pour les mots en couleur.

---

## ⏱️ Modifier les timings du Typewriter

**Fichier** : `components/Hero.tsx`

```typescript
const line1 = useTypewriter({
  text: "...",
  speed: 30,      // ← ms par caractère (plus bas = plus rapide)
  delay: 500,     // ← ms avant de commencer
});
```

**Exemples** :
- **Plus rapide** : `speed: 20`
- **Plus lent** : `speed: 50`
- **Commence plus tôt** : `delay: 0`
- **Commence plus tard** : `delay: 2000`

---

## 📱 Ajouter un projet au Portfolio

**Fichier** : `components/Portfolio.tsx`

Trouvez la section `<div className="browsers">` et ajoutez :

```typescript
<Browser
  name="NOUVEAU PROJET"           // ← Nom affiché en gros
  description="Description ici"   // ← Texte descriptif
  tags={['Tag1', 'Tag2']}        // ← Badges en bas
  color="cyan"                    // ← cyan | magenta | yellow
  skew={-1}                       // ← -1 ou 1 pour inclinaison
  delay={900}                     // ← 0, 300, 600, 900...
/>
```

**Ordre d'apparition** :
- delay 0 = premier
- delay 300 = deuxième
- delay 600 = troisième
- delay 900 = quatrième

---

## 🖼️ Ajouter un projet dans la Modal

**Fichier** : `components/Modal.tsx`

Trouvez l'array `projects` et ajoutez :

```typescript
const projects: Project[] = [
  // ... projets existants
  {
    name: 'ACRONYME',           // ← Affiché sur l'image
    title: 'Nom Complet',       // ← Titre de la carte
    description: 'Description détaillée du projet...',
    tags: ['Tag1', 'Tag2', 'Tag3'],
  },
];
```

---

## 🔄 Modifier la comparaison (Différence)

**Fichier** : `components/Difference.tsx`

### Colonne gauche (Agence traditionnelle)
```typescript
<div className="vs-column vs-them">
  <div className="vs-item">Échéancier 3-6 mois</div>
  {/* ↑ Ajoutez/modifiez ces lignes */}
</div>
```

### Colonne droite (Studio Micho)
```typescript
<div className="vs-column vs-you">
  <div className="vs-item">
    3-4 semaines
    <span style={{ color: 'var(--cyan)', animation: 'blink 1s infinite' }}>
      {' '}▮
    </span>
  </div>
</div>
```

**Note** : Gardez le `<span>` avec ▮ pour le curseur qui clignote !

---

## 🎯 Modifier le Flow (Comment)

**Fichier** : `components/Comment.tsx`

```typescript
<div className="flow-item">
  <div className="flow-number">01</div>
  <div className="flow-title">Expérience</div>  {/* ← Changez ici */}
  <div className="flow-desc">
    10 ans Radio-Canada (Olympiques). Connaissance entreprise.
    {/* ↑ Changez ici */}
  </div>
</div>
```

Répétez pour 02 et 03.

---

## 💬 Modifier le Pitch final

**Fichier** : `components/Pitch.tsx`

### Statement principal
```typescript
<h1 className="pitch-statement">
  JE CONÇOIS.
  <br />
  JE CONSTRUIS.
  <br />
  JE LIVRE.
  {/* ↑ Changez ces lignes */}
</h1>
```

### Sous-titre
```typescript
<p className="pitch-sub">
  Produits numériques qui livrent. Pas de transferts. Pas de délais. Juste des résultats.
  {/* ↑ Changez ce texte */}
</p>
```

### Email du CTA
```typescript
<a href="mailto:pmicho@pm.me">  {/* ← Changez l'email */}
  Parlons-en  {/* ← Changez le texte du bouton */}
</a>
```

---

## 🎭 Changer le nom de marque

**Fichier** : `components/VerticalBrand.tsx`

```typescript
<a href="#" className="brand">
  STUDIO MICHO  {/* ← Changez ici */}
</a>
```

**Fichier** : `app/layout.tsx`

```typescript
export const metadata: Metadata = {
  title: "Studio Micho — Produits Numériques Qui Livrent",
  //     ↑ Changez ici
  description: "...",
};
```

---

## 🖼️ Ajouter de vraies images aux browsers

**Fichier** : `components/Portfolio.tsx`

### Option 1 : Image URL
```typescript
<div className="browser-content" style={{
  background: 'url(/images/projet1.jpg) center/cover',
  // ↑ Ajoutez l'image ici
}}>
  {/* Retirez le texte "SCREENSHOT ICI" */}
</div>
```

### Option 2 : Next.js Image
```typescript
import Image from 'next/image';

<div className="browser-content">
  <Image 
    src="/images/projet1.jpg" 
    alt="Projet"
    fill
    style={{ objectFit: 'cover' }}
  />
</div>
```

**N'oubliez pas** de mettre les images dans `/public/images/`

---

## 📐 Ajuster les espacements

**Fichier** : `app/globals.css`

### Sections
```css
section {
    padding: 4rem 2rem;  /* ← Changez ici */
    /* 4rem = haut/bas, 2rem = gauche/droite */
}
```

### Grilles
Cherchez dans chaque composant :
```typescript
style={{
  gap: '4rem',  /* ← Espacement entre items */
}}
```

---

## 🎨 Désactiver les formes flottantes

**Fichier** : `app/globals.css`

Ajoutez à la fin :
```css
.proof-shape-1,
.proof-shape-2,
.shape-circle,
.shape-square,
.sauce-shape-1,
.sauce-shape-2,
.pitch-shape-1,
.pitch-shape-2 {
    display: none !important;
}
```

Ou dans chaque composant, supprimez les `<div>` des formes.

---

## 🔤 Changer les polices

**Fichier** : `app/globals.css`

### Remplacer Inter
```css
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700;900&display=swap');

body {
    font-family: "Poppins", sans-serif;  /* ← Au lieu de Inter */
}
```

### Remplacer JetBrains Mono
```css
@import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;700&display=swap');

.terminal {
    font-family: "Fira Code", monospace;  /* ← Au lieu de JetBrains Mono */
}
```

---

## ⚡ Accélérer/ralentir les animations

**Fichier** : `app/globals.css`

```css
@keyframes smoothReveal {
    /* ... */
}

/* Utilisation dans composant */
animation: smoothReveal 2s ease-out;
/*                      ↑ Changez la durée */
```

**Exemples** :
- Plus rapide : `1s`
- Plus lent : `3s`
- Super rapide : `0.5s`

---

## 📱 Changer le breakpoint mobile

**Fichier** : `app/globals.css`

```css
@media (max-width: 968px) {  /* ← Changez ce nombre */
    /* Styles mobiles */
}
```

**Exemples** :
- Tablets : `768px`
- Phones only : `480px`
- Large screens : `1200px`

---

## 🎯 Ajouter une nouvelle section

### 1. Créer le composant
**Nouveau fichier** : `components/MaSection.tsx`

```typescript
'use client';

import React from 'react';

const MaSection: React.FC = () => {
  return (
    <section style={{
      background: 'var(--bg-dark)',
      flexDirection: 'column',
    }}>
      <div style={{
        maxWidth: '1400px',
        width: '100%',
        position: 'relative',
        zIndex: 10,
      }}>
        <h2 style={{
          fontSize: 'clamp(4rem, 12vw, 15rem)',
          fontWeight: 900,
          textAlign: 'center',
        }}>
          <span className="gradient-text">Mon Titre</span>
        </h2>
        
        {/* Votre contenu ici */}
      </div>
    </section>
  );
};

export default MaSection;
```

### 2. Ajouter à la page
**Fichier** : `app/page.tsx`

```typescript
import MaSection from "@/components/MaSection";

export default function Home() {
  return (
    <>
      <VerticalBrand />
      <Hero />
      <Portfolio onOpenModal={openModal} />
      <MaSection />  {/* ← Ajoutez ici */}
      <Difference />
      {/* ... */}
    </>
  );
}
```

---

## 🔧 Désactiver temporairement une section

**Fichier** : `app/page.tsx`

```typescript
return (
  <>
    <VerticalBrand />
    <Hero />
    {/* <Portfolio onOpenModal={openModal} /> */}  {/* ← Commenté */}
    <Difference />
    <Comment />
    <Pitch />
    <Modal isOpen={isModalOpen} onClose={closeModal} />
  </>
);
```

---

## 🎨 Créer un thème personnalisé

### Thème Minimaliste (noir & blanc)
```css
:root {
    --deep-blue: #000000;
    --bg-dark: #0a0a0a;
    --cyan: #ffffff;
    --magenta: #cccccc;
    --yellow: #999999;
    --orange: #666666;
}
```

### Thème Chaleureux (orange & marron)
```css
:root {
    --deep-blue: #2C1810;
    --bg-dark: #1a0f0a;
    --cyan: #FF6B35;
    --magenta: #F7931E;
    --yellow: #FDC830;
    --orange: #E63946;
}
```

### Thème Tech (bleu & vert)
```css
:root {
    --deep-blue: #0A192F;
    --bg-dark: #020c1b;
    --cyan: #64FFDA;
    --magenta: #00D9FF;
    --yellow: #57F287;
    --orange: #FFA500;
}
```

---

## 📊 Monitoring des performances

### Voir les re-renders
**Fichier** : Composant quelconque

```typescript
useEffect(() => {
  console.log('Component rendered');
});
```

### Profiler les animations
```typescript
const start = performance.now();
// ... code ...
const end = performance.now();
console.log(`Took ${end - start}ms`);
```

---

## 🐛 Debugging rapide

### Vérifier qu'un hook fonctionne
```typescript
const line1 = useTypewriter({ text: "..." });
console.log('Line1:', line1.displayedText);  // ← Ajoutez ça
```

### Vérifier le scroll reveal
```typescript
const { ref, isVisible } = useScrollReveal();
console.log('Is visible:', isVisible);  // ← Ajoutez ça
```

### Vérifier le state de la modal
```typescript
const [isModalOpen, setIsModalOpen] = useState(false);
console.log('Modal open:', isModalOpen);  // ← Ajoutez ça
```

---

## ⚠️ Choses à NE PAS faire

### ❌ Ne changez pas les algorithmes
Les hooks `useTypewriter` et `useScrollReveal` sont finement calibrés. Ne modifiez que les **paramètres**, pas la logique.

### ❌ Ne retirez pas les cleanup
```typescript
return () => {
  clearTimeout(timeoutId);  // ← GARDEZ ÇA
  observer.disconnect();     // ← GARDEZ ÇA
};
```

### ❌ Ne mélangez pas les unités
Si une valeur est en `rem`, gardez `rem`. Si c'est en `px`, gardez `px`.

### ❌ Ne touchez pas aux z-index
Ils sont calculés pour éviter les chevauchements.

---

## 💡 Tips avancés

### Animer un nouvel élément
1. Créez le keyframe dans `globals.css`
2. Appliquez avec `animation: nomAnimation 2s ease`
3. Testez sur mobile !

### Ajouter des variantes de couleur
```typescript
const colorVariants = {
  cyan: 'var(--cyan)',
  magenta: 'var(--magenta)',
  yellow: 'var(--yellow)',
  custom: '#FF1493',  // ← Ajoutez ici
};
```

### Créer un hook custom
Copiez un hook existant (`useTypewriter.ts`) et modifiez-le.

---

## 📚 Ressources

- **Next.js Docs** : https://nextjs.org/docs
- **React Hooks** : https://react.dev/reference/react
- **CSS Variables** : https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties
- **IntersectionObserver** : https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API

---

## 🆘 Besoin d'aide ?

Si quelque chose casse après une modification :

1. **Vérifiez la console** (F12 dans le navigateur)
2. **Annulez la modification** (Ctrl+Z)
3. **Relisez ce guide** pour la bonne méthode
4. **Testez en dev** avant de build

---

**Bon développement !** 🚀