# 📸 Comment ajouter vos projets - Guide pratique

## 🎯 Problème résolu

Vous voulez afficher vos vrais sites web dans les 3 browsers du Portfolio avec des liens cliquables.

---

## 📁 Étape 1 : Préparer vos images

### Option A : Screenshots (Recommandé)

1. **Prenez des screenshots de vos projets**
   - Ouvrez chaque site
   - Appuyez sur `Cmd+Shift+3` (Mac) ou `Win+Shift+S` (Windows)
   - Sauvegardez l'image

2. **Dimensions recommandées**
   - Largeur : 1920px minimum
   - Hauteur : 1080px minimum
   - Format : JPG ou PNG
   - Poids : Optimisé < 500KB

3. **Nommez vos fichiers**
   ```
   op2-screenshot.jpg
   gpcqm-screenshot.jpg
   tonic-screenshot.jpg
   ```

### Option B : Utiliser des URLs d'images existantes

Vous pouvez aussi utiliser des URLs directes si vos images sont déjà en ligne :
```
https://votre-site.com/images/screenshot.jpg
```

---

## 📂 Étape 2 : Placer les images dans le projet

### Créer le dossier images

```bash
mkdir -p "Studio micho site/studio-micho-react/public/images"
```

### Copier vos images

Placez vos screenshots dans :
```
studio-micho-react/
└── public/
    └── images/
        ├── op2-screenshot.jpg      ← Votre image OP2
        ├── gpcqm-screenshot.jpg    ← Votre image GPCQM
        └── tonic-screenshot.jpg    ← Votre image TONIC
```

⚠️ **Important** : Le dossier `public` est accessible directement via `/images/...`

---

## ✏️ Étape 3 : Modifier le code

Ouvrez le fichier : `components/Portfolio.tsx`

### Trouvez cette section (ligne ~344) :

```typescript
<Browser
  name="OP2"
  description="Firme d'ingénierie — Site corporatif avec gestion RFP IA. 3 semaines, conception à déploiement."
  tags={["Solo", "IA", "3 Semaines"]}
  color="cyan"
  skew={-1}
  delay={0}
  imageUrl="/images/op2-screenshot.jpg"        ← Changez ici
  projectUrl="https://votre-url-op2.com"       ← Changez ici
/>
```

### Modifiez les 3 browsers :

```typescript
{/* PROJET 1 - OP2 */}
<Browser
  name="OP2"
  description="Firme d'ingénierie — Site corporatif avec gestion RFP IA. 3 semaines, conception à déploiement."
  tags={["Solo", "IA", "3 Semaines"]}
  color="cyan"
  skew={-1}
  delay={0}
  imageUrl="/images/op2-screenshot.jpg"        // ← Votre image
  projectUrl="https://op2.ca"                   // ← Lien vers le site
/>

{/* PROJET 2 - GPCQM */}
<Browser
  name="GPCQM"
  description="PWA Grands Prix Cyclistes. Application spectateurs live. Milliers d'usagers en temps réel."
  tags={["PWA", "Live", "Production"]}
  color="magenta"
  skew={1}
  delay={300}
  imageUrl="/images/gpcqm-screenshot.jpg"      // ← Votre image
  projectUrl="https://gpcqm.ca"                 // ← Lien vers le site
/>

{/* PROJET 3 - GROUPE TONIC */}
<Browser
  name="GROUPE TONIC"
  description="Site corporatif complet. Construction solo avec IA. Livraison express en temps record."
  tags={["Corporate", "Express", "Déployé"]}
  color="yellow"
  skew={-1}
  delay={600}
  imageUrl="/images/tonic-screenshot.jpg"      // ← Votre image
  projectUrl="https://groupetonic.com"          // ← Lien vers le site
/>
```

---

## 🎨 Options avancées

### Utiliser une URL externe

Si votre image est déjà hébergée :
```typescript
imageUrl="https://mon-site.com/images/screenshot.jpg"
```

### Ne pas mettre de lien

Si vous ne voulez pas que le browser soit cliquable :
```typescript
imageUrl="/images/mon-projet.jpg"
projectUrl={undefined}  // ← Pas de lien
```

### Ne pas mettre d'image (garder le placeholder)

```typescript
imageUrl={undefined}    // ← Affiche "SCREENSHOT ICI"
projectUrl="https://mon-site.com"
```

---

## 🔍 Comment ça fonctionne ?

### Le composant Browser accepte maintenant :

```typescript
interface BrowserProps {
  name: string;              // Nom affiché en gros
  description: string;       // Texte descriptif
  tags: string[];           // Badges en bas
  color: "cyan" | "magenta" | "yellow";
  skew: number;             // Inclinaison
  delay: number;            // Délai d'apparition
  imageUrl?: string;        // ← NOUVEAU : Chemin de l'image
  projectUrl?: string;      // ← NOUVEAU : Lien cliquable
}
```

### Comportements automatiques :

1. **Si `imageUrl` est fourni** : L'image s'affiche en background cover
2. **Si `projectUrl` est fourni** : 
   - Le browser devient cliquable
   - Un badge "Voir le projet →" apparaît en hover
   - Ouvre dans un nouvel onglet
3. **Hover effect** : Zoom 1.02x sur le browser

---

## 🖼️ Optimiser vos images

### Avec ImageMagick (ligne de commande)

```bash
# Redimensionner
convert input.jpg -resize 1920x1080^ -gravity center -extent 1920x1080 output.jpg

# Compresser
convert input.jpg -quality 85 output.jpg
```

### Avec des outils en ligne

- **TinyPNG** : https://tinypng.com (compression)
- **Squoosh** : https://squoosh.app (resize + compression)
- **Compressor.io** : https://compressor.io

### Dimensions idéales

```
Largeur : 1920px
Hauteur : 1080px (ou plus si scroll)
Format : JPG (photos/screenshots)
Qualité : 80-85%
Poids : 300-500KB maximum
```

---

## 🎯 Exemple complet

Voici un exemple avec 3 vrais projets :

```typescript
<div className="browsers" style={{ /* ... */ }}>
  {/* Projet 1 */}
  <Browser
    name="Mon Super Site"
    description="Site e-commerce avec paiement intégré. 5000+ produits, temps de chargement < 1s."
    tags={["E-commerce", "React", "Stripe"]}
    color="cyan"
    skew={-1}
    delay={0}
    imageUrl="/images/ecommerce-screenshot.jpg"
    projectUrl="https://mon-ecommerce.com"
  />

  {/* Projet 2 */}
  <Browser
    name="Dashboard Analytics"
    description="Tableau de bord temps réel avec graphiques interactifs. 10K utilisateurs actifs."
    tags={["SaaS", "D3.js", "WebSocket"]}
    color="magenta"
    skew={1}
    delay={300}
    imageUrl="/images/dashboard-screenshot.jpg"
    projectUrl="https://mon-dashboard.io"
  />

  {/* Projet 3 */}
  <Browser
    name="App Mobile"
    description="Application mobile hybride. iOS + Android. 50K+ téléchargements."
    tags={["React Native", "Mobile", "App Store"]}
    color="yellow"
    skew={-1}
    delay={600}
    imageUrl="/images/mobile-screenshot.jpg"
    projectUrl="https://mon-app.com"
  />
</div>
```

---

## 🐛 Troubleshooting

### Image ne s'affiche pas

**Problème** : L'image reste "SCREENSHOT ICI"

**Solutions** :
1. Vérifiez le chemin : `/images/nom-exact.jpg`
2. Vérifiez que l'image est dans `public/images/`
3. Redémarrez le serveur : `Ctrl+C` puis `npm run dev`
4. Videz le cache : `Ctrl+F5` dans le navigateur

---

### Image pixelisée

**Problème** : L'image est floue

**Solutions** :
1. Utilisez une image plus grande (1920x1080 minimum)
2. Vérifiez la compression (pas trop compressée)
3. Exportez en qualité 85-90%

---

### Lien ne fonctionne pas

**Problème** : Cliquer sur le browser ne fait rien

**Solutions** :
1. Vérifiez que `projectUrl` est bien défini
2. Vérifiez l'URL complète : `https://...`
3. Ouvrez la console (F12) pour voir les erreurs

---

### Image trop lourde

**Problème** : Le site charge lentement

**Solutions** :
1. Compressez l'image (TinyPNG, Squoosh)
2. Utilisez JPG au lieu de PNG
3. Ciblez 300-500KB par image maximum

---

## 🎨 Styles personnalisés

### Changer l'effet hover

Dans `Portfolio.tsx`, trouvez la section `onMouseEnter` :

```typescript
onMouseEnter={(e) => {
  if (projectUrl) {
    e.currentTarget.style.transform = "scale(1.02)";  // ← Changez ici (1.05 pour plus de zoom)
  }
}}
```

### Changer le badge "Voir le projet"

Trouvez cette section :

```typescript
<div style={{
  position: "absolute",
  bottom: "1rem",
  right: "1rem",
  background: "rgba(0, 0, 0, 0.8)",
  color: "var(--white)",
  padding: "0.5rem 1rem",
  borderRadius: "0.5rem",
  fontSize: "0.9rem",
  fontWeight: 700,
  opacity: 0.7,
}}>
  Voir le projet →  {/* ← Changez le texte ici */}
</div>
```

---

## ✅ Checklist finale

Avant de déployer, vérifiez :

- [ ] Les 3 images sont dans `public/images/`
- [ ] Les noms de fichiers correspondent exactement
- [ ] Les URLs des projets fonctionnent
- [ ] Les images sont optimisées (< 500KB)
- [ ] Le serveur est relancé (`npm run dev`)
- [ ] Les browsers sont cliquables
- [ ] Les liens ouvrent dans un nouvel onglet
- [ ] Le hover effect fonctionne
- [ ] Testé sur mobile

---

## 🚀 Déploiement

Une fois vos images ajoutées :

```bash
# Build de production
npm run build

# Vérifier localement
npm start

# Déployer sur Vercel
vercel
```

⚠️ **Important** : Les images dans `public/` sont automatiquement incluses dans le déploiement !

---

## 💡 Astuces bonus

### Capturer un scroll long

Pour un site avec beaucoup de contenu :

1. Utilisez l'extension Chrome "GoFullPage"
2. Capturez toute la page
3. Cropez la partie la plus représentative

### Utiliser une vidéo à la place

Vous pouvez aussi utiliser une vidéo (GIF ou MP4) :

```typescript
// Dans browser-content, remplacez background par :
style={{
  height: "500px",
  position: "relative",
  overflow: "hidden",
}}
>
  <video 
    autoPlay 
    loop 
    muted 
    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
  >
    <source src="/videos/demo.mp4" type="video/mp4" />
  </video>
```

---

**Créé le** : 2024  
**Version** : 1.0.0  
**Status** : ✅ Production Ready