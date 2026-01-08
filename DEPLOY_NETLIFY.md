# 🚀 Déploiement sur Netlify - Guide Complet

## 📋 Prérequis

- ✅ Compte GitHub
- ✅ Compte Netlify (gratuit)
- ✅ Git installé sur votre machine
- ✅ Les 3 images dans `public/images/` (op2, tonic, jaxa)

---

## 🎯 Étape 1 : Initialiser Git (si pas déjà fait)

```bash
cd "/home/edgar/Documents/Studio Micho/Studio micho site/studio-micho-react"

# Initialiser Git
git init

# Ajouter tous les fichiers
git add .

# Premier commit
git commit -m "Initial commit - Studio Micho React"
```

---

## 📦 Étape 2 : Créer un dépôt GitHub

### Option A : Via le site GitHub

1. Allez sur https://github.com
2. Cliquez sur **"New repository"**
3. Nom : `studio-micho-react`
4. Visibilité : **Private** (recommandé) ou Public
5. **NE PAS** initialiser avec README, .gitignore ou license
6. Cliquez sur **"Create repository"**

### Option B : Via GitHub CLI (si installé)

```bash
gh repo create studio-micho-react --private --source=. --remote=origin
```

---

## 🔗 Étape 3 : Connecter votre projet local à GitHub

Copiez les commandes depuis GitHub (après avoir créé le repo) :

```bash
git remote add origin https://github.com/VOTRE-USERNAME/studio-micho-react.git
git branch -M main
git push -u origin main
```

**Remplacez `VOTRE-USERNAME`** par votre nom d'utilisateur GitHub.

---

## 🌐 Étape 4 : Déployer sur Netlify

### Méthode 1 : Via l'interface Netlify (Recommandée)

1. **Allez sur** https://app.netlify.com
2. Cliquez sur **"Add new site"** → **"Import an existing project"**
3. Choisissez **"Deploy with GitHub"**
4. Autorisez Netlify à accéder à vos repos GitHub
5. Sélectionnez le repo **`studio-micho-react`**
6. **Configuration de build** :
   - **Build command** : `npm run build`
   - **Publish directory** : `.next`
   - **Branch to deploy** : `main`
7. Cliquez sur **"Deploy site"**

### Méthode 2 : Via Netlify CLI

```bash
# Installer Netlify CLI
npm install -g netlify-cli

# Se connecter
netlify login

# Initialiser le projet
netlify init

# Suivre les instructions :
# - Create & configure a new site
# - Choose your team
# - Site name: studio-micho (ou autre)
# - Build command: npm run build
# - Directory to deploy: .next

# Déployer
netlify deploy --prod
```

---

## ⚙️ Étape 5 : Variables d'environnement (si nécessaire)

Si vous avez des variables d'environnement :

1. Dans Netlify : **Site settings** → **Environment variables**
2. Ajoutez vos variables (ex: `NEXT_PUBLIC_API_URL`)

Pour ce projet Studio Micho, **aucune variable nécessaire** (tout est statique).

---

## ✅ Étape 6 : Vérifier le déploiement

Après le déploiement (2-3 minutes) :

1. Netlify vous donne une URL : `https://votre-site.netlify.app`
2. Ouvrez l'URL dans votre navigateur
3. Vérifiez :
   - ✅ Le site s'affiche correctement
   - ✅ Les 3 images de projets sont visibles
   - ✅ Les liens vers OP2, Tonic, JAXA fonctionnent
   - ✅ Les animations fonctionnent (typewriter, reveal, etc.)
   - ✅ La modale s'ouvre/ferme
   - ✅ Le responsive fonctionne

---

## 🔄 Workflow : Mises à jour futures

### Chaque fois que vous modifiez le site :

```bash
# 1. Arrêter le serveur local (si actif)
./stop-server.sh

# 2. Tester en local
./restart-server.sh
# Vérifier sur http://localhost:3000

# 3. Commiter les changements
git add .
git commit -m "Description de vos modifications"

# 4. Pusher sur GitHub
git push origin main

# 5. Netlify rebuild automatiquement ! 🎉
# Attendez 2-3 minutes, le site sera à jour
```

**Netlify détecte automatiquement** les push sur GitHub et rebuild le site.

---

## 🎨 Personnaliser le domaine

### Option 1 : Sous-domaine Netlify gratuit

1. Dans Netlify : **Site settings** → **Domain management**
2. **Change site name**
3. Exemple : `studio-micho.netlify.app`

### Option 2 : Domaine custom (si vous en avez un)

1. Achetez un domaine (ex: `studiomicho.com`)
2. Dans Netlify : **Domain management** → **Add custom domain**
3. Suivez les instructions pour configurer les DNS
4. Netlify fournit automatiquement un **certificat SSL gratuit** 🔒

---

## 📊 Monitoring & Analytics

### Netlify Analytics (optionnel - payant)

Pour voir les statistiques de visite :
- Netlify Analytics : $9/mois

### Google Analytics (gratuit)

Ajoutez dans `app/layout.tsx` :

```typescript
import Script from 'next/script'

// Dans le <head>
<Script
  src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
  strategy="afterInteractive"
/>
```

---

## 🐛 Problèmes courants

### Build échoue sur Netlify

**Erreur** : "Build failed"

**Solutions** :
```bash
# 1. Vérifier que ça build localement
npm run build

# 2. Si ça marche, pusher le lock file
git add package-lock.json
git commit -m "Add package-lock for reproducible builds"
git push

# 3. Dans Netlify, trigger un nouveau deploy
```

### Images ne s'affichent pas

**Cause** : Images pas committées dans Git

**Solution** :
```bash
# Vérifier que les images sont bien là
ls -la public/images/

# Les ajouter à Git
git add public/images/*.png
git commit -m "Add project screenshots"
git push
```

### Site vide ou erreur 404

**Cause** : Mauvais dossier de publication

**Solution** :
1. Dans Netlify : **Site settings** → **Build & deploy**
2. **Publish directory** doit être `.next` (pas `out` ou `build`)
3. Re-déployer

---

## 🔒 Sécurité

### Fichiers à NE PAS commiter

Vérifiez votre `.gitignore` contient :
```
node_modules/
.next/
.env*.local
server.log
nohup.out
```

### Variables sensibles

Si vous ajoutez des API keys plus tard :
- ✅ Utilisez des variables d'environnement Netlify
- ❌ Ne les commitez JAMAIS dans Git

---

## 📈 Performance

Votre site Next.js sur Netlify bénéficie de :
- ✅ **CDN global** (temps de chargement rapide partout)
- ✅ **HTTPS automatique**
- ✅ **Compression automatique** (Gzip/Brotli)
- ✅ **Cache optimisé**
- ✅ **Rebuild automatique** sur push GitHub

---

## 🎯 Checklist avant déploiement

- [ ] Les 3 images sont dans `public/images/`
- [ ] `npm run build` fonctionne sans erreur
- [ ] Toutes les URLs de projets sont correctes
- [ ] Git est initialisé et connecté à GitHub
- [ ] Tous les fichiers sont committés
- [ ] `.gitignore` exclut les fichiers sensibles
- [ ] Le site fonctionne en local sur http://localhost:3000

---

## 🚀 Commandes récapitulatives

```bash
# Setup initial (une seule fois)
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/VOTRE-USERNAME/studio-micho-react.git
git push -u origin main

# Puis sur Netlify.com :
# - Import from GitHub
# - Select repo
# - Deploy

# Pour les mises à jour (chaque fois)
git add .
git commit -m "Votre message"
git push origin main
# Netlify rebuild automatiquement !
```

---

## 💡 Tips

### Build plus rapide

Dans `package.json`, vous pouvez ajouter :
```json
"scripts": {
  "build": "next build",
  "export": "next export"
}
```

### Preview deployments

Chaque branche créée sur GitHub = un preview deploy automatique sur Netlify !

```bash
git checkout -b nouvelle-feature
# Faire vos modifications
git push origin nouvelle-feature
# Netlify crée un preview : https://nouvelle-feature--studio-micho.netlify.app
```

---

## 📞 Support

- **Netlify Docs** : https://docs.netlify.com
- **Next.js Docs** : https://nextjs.org/docs
- **GitHub Docs** : https://docs.github.com

---

**Créé le** : 2024  
**Version** : 1.0.0  
**Status** : ✅ Ready to Deploy

Bon déploiement ! 🎉