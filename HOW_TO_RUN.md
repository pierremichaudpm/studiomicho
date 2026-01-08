# 🚀 Comment lancer le serveur - Guide visuel

## 📍 Vous êtes ici
```
/home/edgar/Documents/Studio Micho/Studio micho site/studio-micho-react/
```

---

## 🖥️ Méthode 1 : Terminal (Recommandé)

### Sur Linux/macOS

#### Étape 1 : Ouvrir un terminal
```bash
cd "/home/edgar/Documents/Studio Micho/Studio micho site/studio-micho-react"
```

#### Étape 2 : Installer les dépendances (première fois seulement)
```bash
npm install
```

Vous verrez :
```
added 363 packages in 12s
✅ Installation réussie !
```

#### Étape 3 : Lancer le serveur
```bash
npm run dev
```

Vous verrez :
```
  ▲ Next.js 16.1.1
  - Local:        http://localhost:3000
  - Network:      http://192.168.x.x:3000

 ✓ Starting...
 ✓ Ready in 2.3s
```

#### Étape 4 : Ouvrir votre navigateur
```
http://localhost:3000
```

**C'EST TOUT !** 🎉

---

### Sur Windows

#### Méthode A : Double-clic (Plus facile)
1. Trouvez le fichier `start-server.bat` dans le dossier
2. Double-cliquez dessus
3. Une fenêtre noire s'ouvre et le serveur démarre
4. Ouvrez votre navigateur sur http://localhost:3000

#### Méthode B : PowerShell
```powershell
cd "C:\...\Studio Micho\Studio micho site\studio-micho-react"
npm install
npm run dev
```

---

## 🖱️ Méthode 2 : VSCode (Si vous l'utilisez)

### Étape 1 : Ouvrir le dossier dans VSCode
```
File → Open Folder → Sélectionnez "studio-micho-react"
```

### Étape 2 : Ouvrir le terminal intégré
```
Menu: Terminal → New Terminal
OU
Raccourci: Ctrl + ` (backtick)
```

### Étape 3 : Dans le terminal VSCode
```bash
npm install  # Première fois seulement
npm run dev
```

### Étape 4 : Cliquer sur le lien
VSCode affichera :
```
  Local: http://localhost:3000
         ↑ Ctrl+Click pour ouvrir
```

---

## 📱 Méthode 3 : Accéder depuis mobile/autre appareil

### Étape 1 : Lancer le serveur (comme ci-dessus)
```bash
npm run dev
```

### Étape 2 : Noter l'adresse Network
Dans le terminal, vous verrez :
```
- Local:    http://localhost:3000
- Network:  http://192.168.1.100:3000  ← CETTE ADRESSE
```

### Étape 3 : Sur votre mobile/tablette
Ouvrez le navigateur et tapez l'adresse Network :
```
http://192.168.1.100:3000
```

⚠️ **Important** : Votre appareil doit être sur le même WiFi !

---

## ✅ Comment savoir si ça marche ?

### Dans le terminal, vous devriez voir :
```
  ▲ Next.js 16.1.1
  - Local:        http://localhost:3000
  - Environments: .env

 ✓ Starting...
 ✓ Ready in 2.3s
```

### Dans le navigateur, vous devriez voir :
- ✅ Fond noir/bleu foncé
- ✅ "STUDIO MICHO" vertical à gauche
- ✅ Texte qui se tape caractère par caractère
- ✅ Pas d'erreur 404 ou page blanche

---

## 🐛 Problèmes courants

### Erreur : "command not found: npm"
**Cause** : Node.js n'est pas installé

**Solution** :
1. Téléchargez Node.js : https://nodejs.org/
2. Installez la version LTS (recommandée)
3. Relancez le terminal
4. Réessayez `npm install`

---

### Erreur : "EACCES: permission denied"
**Cause** : Problème de permissions

**Solution (Linux/macOS)** :
```bash
sudo chown -R $USER /home/edgar/Documents/Studio\ Micho/Studio\ micho\ site/studio-micho-react
```

**Solution (Windows)** :
Lancez PowerShell en tant qu'administrateur

---

### Erreur : "Port 3000 is already in use"
**Cause** : Un autre serveur utilise le port 3000

**Solution 1** : Tuer le processus sur le port 3000
```bash
# Linux/macOS
lsof -ti:3000 | xargs kill -9

# Windows
netstat -ano | findstr :3000
taskkill /PID [PID_NUMBER] /F
```

**Solution 2** : Utiliser un autre port
```bash
PORT=3001 npm run dev
```
Puis ouvrez http://localhost:3001

---

### Page blanche dans le navigateur
**Cause** : Erreur JavaScript

**Solution** :
1. Ouvrez la console (F12)
2. Regardez les erreurs en rouge
3. Vérifiez que le serveur tourne toujours (terminal)
4. Rafraîchissez avec Ctrl+F5

---

### Animations ne fonctionnent pas
**Cause** : CSS non chargé

**Solution** :
1. Vérifiez que `app/globals.css` existe
2. Rafraîchissez la page (Ctrl+F5)
3. Videz le cache du navigateur

---

## 🔄 Commandes utiles

### Arrêter le serveur
Dans le terminal où le serveur tourne :
```
Ctrl + C
```

### Redémarrer le serveur
```bash
# Arrêter (Ctrl+C) puis :
npm run dev
```

### Build de production
```bash
npm run build
npm start
```

### Nettoyer et réinstaller
```bash
rm -rf node_modules package-lock.json
npm install
```

---

## 📊 Vérification rapide

Cochez ce qui s'affiche :

- [ ] Terminal affiche "✓ Ready"
- [ ] Navigateur s'ouvre sur localhost:3000
- [ ] Fond noir/bleu visible
- [ ] "STUDIO MICHO" à gauche
- [ ] Texte se tape automatiquement
- [ ] Pas d'erreur dans la console (F12)

**6/6** → Tout est parfait ! 🎉

---

## 🎯 Prochaines étapes

Une fois le serveur lancé :

1. ✅ Testez toutes les sections (scrollez)
2. ✅ Cliquez sur "Plus de projets"
3. ✅ Testez la fermeture modal (ESC)
4. ✅ Testez sur mobile (si possible)
5. ✅ Lisez QUICK_START.md pour la checklist complète

---

## 💡 Astuces

### Hot Reload
Modifiez un fichier → Sauvegardez → Le navigateur se rafraîchit automatiquement !

### Console Logs
Pour déboguer, ajoutez dans le code :
```typescript
console.log('Ceci apparaîtra dans la console');
```
Puis ouvrez F12 dans le navigateur.

### React DevTools
Installez l'extension :
- Chrome : https://chrome.google.com/webstore (cherchez "React DevTools")
- Firefox : https://addons.mozilla.org (cherchez "React DevTools")

---

## 📞 Toujours bloqué ?

1. Vérifiez que Node.js est installé : `node --version`
2. Vérifiez que npm fonctionne : `npm --version`
3. Lisez les erreurs dans le terminal
4. Ouvrez la console navigateur (F12)
5. Consultez QUICK_START.md → "Problèmes courants"

---

## 🎉 Succès !

Si le site s'affiche, vous avez réussi ! 

**Le serveur tourne maintenant sur votre machine.**

Pour arrêter : `Ctrl + C` dans le terminal.

Pour relancer : `npm run dev`

---

**Bon développement ! 🚀**

*Créé le : 2024*  
*Version : 1.0.0*