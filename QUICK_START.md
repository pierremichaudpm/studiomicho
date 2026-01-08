# Studio Micho React - Guide de démarrage rapide

## 🚀 Démarrage en 3 étapes

### 1. Installation
```bash
cd studio-micho-react
npm install
```

### 2. Lancement
```bash
npm run dev
```

### 3. Ouvrir
Allez sur [http://localhost:3000](http://localhost:3000)

---

## ✅ Checklist - Tout fonctionne ?

### Hero Section
- [ ] Le texte se tape caractère par caractère
- [ ] 4 lignes apparaissent avec délais (500ms, 2s, 3s, 5.5s)
- [ ] Le curseur clignote pendant la frappe
- [ ] La dernière ligne garde un **▮** qui clignote
- [ ] Les mots en gradient ("parlent", "livre des produits") sont animés
- [ ] "Scrollez pour voir ↓" bounce en bas

### Portfolio Section
- [ ] Titre "Portfolio" en gradient
- [ ] 3 browsers apparaissent au scroll
- [ ] Animation clip-path de 2 secondes
- [ ] Ligne cyan (scan line) descend pendant reveal
- [ ] Délai de 300ms entre chaque browser
- [ ] Bouton "Plus de projets" change de couleur au hover

### Modal
- [ ] S'ouvre au clic sur "Plus de projets"
- [ ] Grille de 4 projets visible
- [ ] X en haut à droite ferme la modal
- [ ] ESC ferme la modal
- [ ] Click sur le fond noir ferme la modal
- [ ] Body scroll bloqué quand modal ouverte

### Différence Section
- [ ] Grille 2 colonnes (Desktop)
- [ ] Colonne gauche : texte gris barré
- [ ] Colonne droite : texte blanc avec **▮** qui clignote après chaque ligne
- [ ] Formes géométriques flottantes (cercle cyan, carré magenta)

### Comment Section
- [ ] Flow horizontal 01 → 02 → 03
- [ ] Numéros géants (01, 02, 03) en arrière-plan à 30% opacité
- [ ] Couleurs : cyan, magenta, yellow
- [ ] Flèches orange entre chaque étape

### Pitch Section
- [ ] "JE CONÇOIS. JE CONSTRUIS. JE LIVRE." en gradient animé
- [ ] Gradient se déplace (animation 5s)
- [ ] Bouton "Parlons-en" change de couleur au hover
- [ ] Effet scale au hover

### Branding
- [ ] "STUDIO MICHO" en vertical à gauche
- [ ] Reste visible pendant tout le scroll
- [ ] Change de couleur au hover (blanc → cyan)

---

## 📱 Test Responsive (< 968px)

- [ ] STUDIO MICHO devient horizontal en haut
- [ ] Pas de padding-left sur body
- [ ] Grilles passent en 1 colonne
- [ ] Flow devient vertical
- [ ] Flèches rotated 90°
- [ ] Formes flottantes masquées

---

## 🐛 Problèmes courants

### Le typewriter ne fonctionne pas
- Vérifiez la console (F12)
- Le hook `useTypewriter` doit être importé correctement

### Les animations ne se déclenchent pas
- Vérifiez que `globals.css` est bien importé dans `layout.tsx`
- Les keyframes CSS doivent être présentes

### La modal ne s'ouvre pas
- Vérifiez le state `isModalOpen` dans `page.tsx`
- La fonction `openModal` doit être passée au composant `Portfolio`

### Les couleurs ne sont pas bonnes
- Vérifiez que les CSS variables sont définies dans `globals.css`
- Les variables doivent être `--cyan`, `--magenta`, etc.

---

## 🎨 Comparaison avec l'original

Ouvrez les deux côte à côte :
1. Original : `studio-micho-site.html` (ouvrir dans navigateur)
2. React : `http://localhost:3000`

**Ils doivent être IDENTIQUES** :
- Mêmes couleurs
- Mêmes timings
- Mêmes animations
- Même layout

---

## 🔧 Modifications rapides

### Changer les timings du typewriter
Fichier : `components/Hero.tsx`
```typescript
const line1 = useTypewriter({
  delay: 500, // ← Changez ici
  speed: 30,  // ← Vitesse de frappe
});
```

### Changer les couleurs
Fichier : `app/globals.css`
```css
:root {
  --cyan: #00F5FF;    /* ← Changez ici */
  --magenta: #FF00FF;
  --yellow: #FFFF00;
}
```

### Ajouter un projet dans la modal
Fichier : `components/Modal.tsx`
```typescript
const projects: Project[] = [
  // Ajoutez ici ↓
  {
    name: 'NOUVEAU',
    title: 'Nouveau Projet',
    description: 'Description...',
    tags: ['Tag1', 'Tag2'],
  },
];
```

---

## 📦 Build de production

```bash
npm run build
npm start
```

Le site sera optimisé et prêt pour déploiement.

---

## 🎯 Prochaines étapes

1. ✅ Vérifier que tout fonctionne localement
2. 📸 Ajouter de vraies images dans les browsers
3. 🔗 Mettre à jour l'email dans le CTA
4. 🚀 Déployer sur Vercel/Netlify
5. 🎨 (Optionnel) Personnaliser les couleurs/textes

---

## 💡 Astuce développement

Pour travailler sur une section spécifique, commentez les autres dans `app/page.tsx` :

```typescript
return (
  <>
    <VerticalBrand />
    <Hero />
    {/* <Portfolio onOpenModal={openModal} /> */}
    {/* <Difference /> */}
    {/* <Comment /> */}
    {/* <Pitch /> */}
    <Modal isOpen={isModalOpen} onClose={closeModal} />
  </>
);
```

Cela accélère le rechargement et facilite le debug.

---

**Besoin d'aide ?** Vérifiez la console navigateur (F12) pour les erreurs.