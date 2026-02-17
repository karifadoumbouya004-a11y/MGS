# Intranet Entreprise - Guide d'utilisation

## Installation et démarrage

1. Ouvrez le fichier `index.html` dans votre navigateur web
2. Le site s'ouvrira automatiquement sur la page de connexion

## IMPORTANT - Première utilisation

Si vous ne pouvez pas vous connecter, c'est probablement parce que d'anciennes données sont stockées dans le navigateur. Suivez ces étapes :

### Effacer le localStorage (OBLIGATOIRE pour la première utilisation)

1. Ouvrez le fichier `index.html` dans votre navigateur
2. Appuyez sur **F12** pour ouvrir les outils de développement
3. Allez dans l'onglet **"Application"** (Chrome) ou **"Storage"** (Firefox)
4. Dans le menu de gauche, cliquez sur **"Local Storage"**
5. Cliquez sur **"file://"** ou l'URL de votre site
6. **Supprimez toutes les entrées** (clic droit → Clear ou Delete All)
7. **Rechargez la page** (F5)
8. Essayez de vous connecter

## Identifiants de connexion

### Compte Administrateur
- **Email:** karifadoumbouya004@gmail.com
- **Mot de passe:** Conakry224

### Comptes Membres (20 comptes)
- **Email:** Membres01@entreprise.fr à Membres20@entreprise.fr
- **Mot de passe:** membre123

## Fonctionnalités

### 1. Tableau de bord
- Vue d'ensemble des statistiques
- Informations récentes
- Projets en cours

### 2. Informations
- Ajouter/Modifier/Supprimer des informations administratives
- Catégories: Communiqués, Procédures, Documents
- Filtrage par catégorie et priorité
- **Réservé aux administrateurs:** Modification et suppression

### 3. Projets
- Gestion complète des projets
- Statuts: Planifié, En cours, Terminé, En pause
- Attribution de chef de projet
- Dates de début et fin
- **Réservé aux administrateurs:** Modification et suppression

### 4. Règlement intérieur
- Consultation du document officiel
- Liste des règles de l'entreprise
- Ajout de règles personnalisées

### 5. Sanctions & Contributions
- Suivi des sanctions par membre
- Montant des contributions financières de chaque membre
- Statut payé/en attente
- Tableau récapitulatif par membre
- Total des contributions
- **Réservé aux administrateurs:** Ajout, modification et suppression

### 6. Tâches
- Gestion des tâches à faire
- Attribution aux membres
- Priorités: Haute, Moyenne, Basse
- Statuts: À faire, En cours, Terminé
- Dates d'échéance
- Filtrage par statut et membre
- **Réservé aux administrateurs:** Modification et suppression

### 7. Mon Profil
- Affichage des informations personnelles
- **Modifier le nom et l'email**
- **Changer le mot de passe**

## Modification du profil

### Changer votre nom et email
1. Allez dans **"Mon Profil"**
2. Dans la section **"Modifier mes informations"**
3. Modifiez votre nom complet et/ou email
4. Cliquez sur **"Enregistrer"**

### Changer votre mot de passe
1. Allez dans **"Mon Profil"**
2. Dans la section **"Changer le mot de passe"**
3. Entrez votre mot de passe actuel
4. Entrez le nouveau mot de passe (minimum 6 caractères)
5. Confirmez le nouveau mot de passe
6. Cliquez sur **"Changer le mot de passe"**

## Stockage des données

- Toutes les données sont stockées localement dans le navigateur (localStorage)
- Les données persistent entre les sessions
- Pour réinitialiser toutes les données, effacez le localStorage comme indiqué ci-dessus

## Accès à distance

Pour rendre le site accessible à distance :

1. **Option 1 - Hébergement simple:**
   - Uploadez les fichiers (index.html, styles.css, app.js) sur un hébergeur web gratuit comme:
     - GitHub Pages
     - Netlify
     - Vercel
   
2. **Option 2 - Serveur local:**
   - Installez un serveur web local (ex: XAMPP, WAMP)
   - Placez les fichiers dans le dossier www/htdocs
   - Accédez via http://localhost

3. **Option 3 - Partage réseau local:**
   - Partagez le dossier sur votre réseau local
   - Les autres membres peuvent y accéder via le réseau

## Support

Pour toute question ou problème, contactez l'administrateur système.

## Sécurité

⚠️ **IMPORTANT:** Ce site utilise un stockage local (localStorage) qui n'est PAS sécurisé pour des données sensibles. Pour une utilisation en production avec des données réelles, il est recommandé de:
- Utiliser un backend avec base de données
- Implémenter un système d'authentification sécurisé
- Utiliser HTTPS
- Chiffrer les mots de passe
