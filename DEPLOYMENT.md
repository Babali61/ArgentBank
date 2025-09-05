# Guide de Déploiement ArgentBank

Ce guide vous explique comment déployer l'application ArgentBank sur Render (backend) et Netlify (frontend).

## 🚀 Déploiement Backend sur Render

### 1. Préparation
- Assurez-vous que votre code backend est dans le dossier `server/`
- Le fichier `package.json` est configuré avec les bonnes dépendances

### 2. Configuration Render
1. Connectez-vous à [Render.com](https://render.com)
2. Cliquez sur "New +" puis "Web Service"
3. Connectez votre repository GitHub
4. Sélectionnez le dossier `server/` comme racine du projet
5. Configurez les paramètres suivants :
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment**: Node

### 3. Variables d'environnement sur Render
Ajoutez ces variables dans l'onglet "Environment" de Render :
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/argenbank
PORT=3001
NODE_ENV=production
JWT_SECRET=votre_secret_jwt_ultra_securise
JWT_EXPIRES_IN=24h
CORS_ORIGIN=https://votre-app-netlify.netlify.app
```

### 4. Base de données MongoDB
- Créez un cluster MongoDB Atlas
- Configurez l'accès réseau (0.0.0.0/0 pour tous les IPs)
- Créez un utilisateur avec les permissions de lecture/écriture
- Copiez l'URI de connexion dans la variable `MONGODB_URI`

## 🌐 Déploiement Frontend sur Netlify

### 1. Préparation
- Assurez-vous que votre code frontend est dans le dossier `argenbank/`
- Le fichier `netlify.toml` est configuré

### 2. Configuration Netlify
1. Connectez-vous à [Netlify.com](https://netlify.com)
2. Cliquez sur "New site from Git"
3. Connectez votre repository GitHub
4. Sélectionnez le dossier `argenbank/` comme répertoire de base
5. Configurez les paramètres de build :
   - **Build command**: `npm run build`
   - **Publish directory**: `build`

### 3. Variables d'environnement sur Netlify
Dans l'onglet "Site settings" > "Environment variables", ajoutez :
```
REACT_APP_API_URL=https://votre-app-render.onrender.com/api/v1
REACT_APP_ENV=production
```

### 4. Redirections
Le fichier `netlify.toml` configure automatiquement les redirections pour React Router.

## 🔧 Configuration CORS

Assurez-vous que le backend autorise les requêtes depuis votre domaine Netlify. Dans `server/server.js`, vérifiez la configuration CORS :

```javascript
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}))
```

## 📝 URLs de déploiement

Après le déploiement, vous aurez :
- **Backend**: `https://votre-app-render.onrender.com`
- **Frontend**: `https://votre-app-netlify.netlify.app`

## 🔍 Vérification

1. Testez l'API backend : `https://votre-app-render.onrender.com/`
2. Testez la documentation Swagger : `https://votre-app-render.onrender.com/api-docs`
3. Testez l'application frontend : `https://votre-app-netlify.netlify.app`

## 🚨 Dépannage

### Problèmes courants :
1. **CORS Error** : Vérifiez que `CORS_ORIGIN` pointe vers votre URL Netlify
2. **API non accessible** : Vérifiez que l'URL dans `REACT_APP_API_URL` est correcte
3. **Base de données** : Vérifiez que MongoDB Atlas autorise les connexions depuis Render

### Logs :
- **Render** : Consultez les logs dans l'onglet "Logs" de votre service
- **Netlify** : Consultez les logs dans l'onglet "Functions" > "Logs"
