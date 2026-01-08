# 🖥️ Gestion du Serveur - Guide Ubuntu

## 🚨 Problème résolu

Le serveur Next.js restait en arrière-plan et causait des conflits de ports. Maintenant vous avez des scripts robustes pour gérer proprement le serveur.

---

## 🎯 Scripts disponibles

### 1. `restart-server.sh` - Redémarrer le serveur (RECOMMANDÉ)

**Utilisation :**
```bash
./restart-server.sh
```

**Ce qu'il fait :**
1. ✅ Tue TOUS les processus Next.js/Node
2. ✅ Libère les ports 3000-3010
3. ✅ Nettoie les fichiers de lock
4. ✅ Démarre un serveur propre sur port 3000

**Quand l'utiliser :**
- À chaque fois que vous voulez lancer le serveur
- Quand le serveur ne répond plus
- Après avoir modifié du code

---

### 2. `stop-server.sh` - Arrêter le serveur

**Utilisation :**
```bash
./stop-server.sh
```

**Ce qu'il fait :**
1. ✅ Tue tous les processus Next.js/Node
2. ✅ Libère tous les ports
3. ✅ Nettoie les fichiers de lock

**Quand l'utiliser :**
- Quand vous avez fini de travailler
- Avant de fermer votre terminal
- Pour nettoyer les processus zombies

---

## 📋 Workflow recommandé

### Démarrage du travail
```bash
cd "/home/edgar/Documents/Studio Micho/Studio micho site/studio-micho-react"
./restart-server.sh
```

### Pendant le travail
- Le serveur tourne sur **http://localhost:3000**
- Hot reload automatique quand vous modifiez du code
- **Ne pas fermer le terminal** où le serveur tourne

### Fin du travail
```bash
# Dans un autre terminal
cd "/home/edgar/Documents/Studio Micho/Studio micho site/studio-micho-react"
./stop-server.sh
```

---

## 🔧 Commandes manuelles (si nécessaire)

### Tuer tous les processus Node
```bash
pkill -9 node
```

### Libérer le port 3000
```bash
fuser -k 3000/tcp
```

### Voir quel processus utilise le port 3000
```bash
lsof -i :3000
```

### Nettoyer les fichiers de lock
```bash
rm -rf .next/dev/lock
rm -rf .next/cache
```

---

## ❌ Erreurs courantes et solutions

### Erreur : "Port 3000 is in use"

**Solution :**
```bash
./restart-server.sh
```

Le script tue automatiquement le processus qui bloque le port.

---

### Erreur : "Unable to acquire lock"

**Solution :**
```bash
./restart-server.sh
```

Le script nettoie les fichiers de lock avant de redémarrer.

---

### Erreur : "EADDRINUSE"

**Cause :** Un processus utilise déjà le port

**Solution :**
```bash
# Libérer manuellement
fuser -k 3000/tcp

# Puis relancer
./restart-server.sh
```

---

### Le serveur ne répond plus

**Solution :**
```bash
# Arrêter proprement
./stop-server.sh

# Attendre 2 secondes
sleep 2

# Redémarrer
./restart-server.sh
```

---

## 🎯 Raccourcis pratiques

### Créer un alias dans `.bashrc`

Ajoutez à la fin de `~/.bashrc` :

```bash
# Studio Micho aliases
alias micho-start='cd "/home/edgar/Documents/Studio Micho/Studio micho site/studio-micho-react" && ./restart-server.sh'
alias micho-stop='cd "/home/edgar/Documents/Studio Micho/Studio micho site/studio-micho-react" && ./stop-server.sh'
```

Puis rechargez :
```bash
source ~/.bashrc
```

Maintenant vous pouvez faire :
```bash
micho-start  # Démarre le serveur de n'importe où
micho-stop   # Arrête le serveur
```

---

## 📊 Vérifier l'état du serveur

### Voir si le serveur tourne
```bash
ps aux | grep "next dev"
```

Si vous voyez des lignes → serveur actif  
Si rien → serveur arrêté

### Voir quels ports sont utilisés
```bash
netstat -tuln | grep 3000
```

---

## 🚀 Déploiement en production

Pour build et déployer :

```bash
# 1. Arrêter le dev server
./stop-server.sh

# 2. Build production
npm run build

# 3. Lancer en production
npm start
```

Le serveur production tourne sur **http://localhost:3000** (non hot-reload).

---

## 🔄 Processus automatique au démarrage (optionnel)

Si vous voulez que le serveur démarre automatiquement au boot Ubuntu :

### Créer un service systemd

```bash
sudo nano /etc/systemd/system/studio-micho.service
```

Contenu :
```ini
[Unit]
Description=Studio Micho React Dev Server
After=network.target

[Service]
Type=simple
User=edgar
WorkingDirectory=/home/edgar/Documents/Studio Micho/Studio micho site/studio-micho-react
ExecStart=/usr/bin/npm run dev
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

Activer :
```bash
sudo systemctl enable studio-micho
sudo systemctl start studio-micho
```

Gérer :
```bash
sudo systemctl status studio-micho  # Voir l'état
sudo systemctl stop studio-micho    # Arrêter
sudo systemctl restart studio-micho # Redémarrer
```

---

## 💡 Tips

### 1. Toujours utiliser `restart-server.sh`
Ne lancez JAMAIS `npm run dev` directement. Utilisez toujours le script `restart-server.sh` qui nettoie tout avant.

### 2. Un seul terminal par serveur
N'essayez pas de lancer plusieurs serveurs en même temps.

### 3. Ctrl+C pour arrêter
Si le serveur tourne dans votre terminal, `Ctrl+C` l'arrête proprement.

### 4. Vérifier après changements majeurs
Après avoir modifié `package.json` ou installé des dépendances :
```bash
./restart-server.sh
```

---

## 📞 Debugging avancé

### Logs détaillés
```bash
npm run dev -- --verbose
```

### Vider le cache Next.js
```bash
rm -rf .next
npm run dev
```

### Réinstaller les dépendances
```bash
rm -rf node_modules package-lock.json
npm install
./restart-server.sh
```

---

## ✅ Checklist quotidienne

Avant de commencer à travailler :
- [ ] Ouvrir un terminal
- [ ] `cd` dans le dossier du projet
- [ ] Lancer `./restart-server.sh`
- [ ] Ouvrir http://localhost:3000
- [ ] Vérifier que le site charge

En fin de journée :
- [ ] Sauvegarder vos modifications (git commit)
- [ ] Lancer `./stop-server.sh`
- [ ] Fermer le terminal

---

**Créé le** : 2024  
**Testé sur** : Ubuntu 22.04+  
**Scripts** : `restart-server.sh`, `stop-server.sh`
