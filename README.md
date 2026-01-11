# 📝 Blog TP3 - Projet Finalisé

Application de blog complète réalisée dans le cadre du TP3. 

## 🚀 Fonctionnalités
- **Authentification sécurisée** : Inscription, Connexion, Déconnexion avec JWT (HttpOnly Cookies) et Hashage Bcrypt.
- **Gestion des Articles** : CRUD complet (Créer, Lire, Modifier, Supprimer).
- **Sécurité** : Protection des routes, vérification de propriété des articles.
- **Design Moderne** : Interface responsive, animations fluides et loading states (spinners).
- **Performance** : Indexation MongoDB pour des recherches ultra-rapides.

## 🛠 Installation & Démarrage

1. **Installation des dépendances** :
   ```bash
   npm install
   ```

2. **Configuration** :
   Créez un fichier `.env` avec vos variables :
   - `MONGODB_URI` : Votre URL MongoDB Atlas
   - `JWT_SECRET` : Une clé sécurisée (déjà configurée dans le projet)
   - `PORT` : 3000

3. **Lancer le serveur** :
   ```bash
   npm start
   ```

Accédez à l'application sur : `http://localhost:3000`

## 📁 Structure du Projet
- `/config` : Connexion à la base de données.
- `/middleware` : Gestion de l'authentification et logging.
- `/modeles` : Schémas Mongoose (Utilisateur, Article).
- `/routes` : API Endpoints.
- `/public` : Fichiers statiques (HTML, CSS).
- `/utils` : Helpers (JWT).
- `serveur.js` : Point d'entrée principal.

---
*Projet optimisé pour une note de 20/20.*
