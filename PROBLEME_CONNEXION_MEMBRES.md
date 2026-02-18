# RÉSOLUTION DU PROBLÈME DE CONNEXION DES MEMBRES

## Problème signalé
Les membres n'arrivent pas à se connecter à l'application.

## Solution : Utiliser la page de diagnostic

### Étape 1 : Ouvrir la page de diagnostic
Ouvrez le fichier **`diagnostic-connexion.html`** dans votre navigateur.

### Étape 2 : Lancer le diagnostic
1. Cliquez sur le bouton **"🔍 Lancer le diagnostic complet"**
2. La page va vérifier :
   - Si app.js est chargé correctement
   - Si les utilisateurs existent dans la base
   - Afficher tous les utilisateurs avec leurs identifiants
   - Vérifier les permissions

### Étape 3 : Tester une connexion membre
1. L'email et le mot de passe d'un membre sont pré-remplis :
   - **Email** : `Membres01@entreprise.fr`
   - **Mot de passe** : `membre123`
2. Cliquez sur **"🔐 Tester cette connexion"**
3. Si la connexion fonctionne, vous verrez un message de succès ✅

### Étape 4 : Si le problème persiste
Si aucun utilisateur n'est trouvé ou si les données semblent corrompues :
1. Cliquez sur **"🔄 Forcer la réinitialisation"**
2. Confirmez l'action (⚠️ cela supprimera toutes les données)
3. Les utilisateurs seront recréés automatiquement
4. Refaites un diagnostic pour vérifier

### Étape 5 : Aller sur l'application
Une fois le test de connexion réussi :
1. Cliquez sur **"➡️ Aller à l'application"**
2. Ou ouvrez directement **`index.html`**
3. Connectez-vous avec les identifiants testés

## Identifiants des comptes

### Administrateur
- **Email** : karifadoumbouya004@gmail.com
- **Mot de passe** : Conakry224

### Cadres (2 comptes)
- **Email** : Membres01@entreprise.fr - **Mot de passe** : membre123
- **Email** : Membres02@entreprise.fr - **Mot de passe** : membre123

### Responsables (3 comptes)
- **Email** : Membres03@entreprise.fr - **Mot de passe** : membre123
- **Email** : Membres04@entreprise.fr - **Mot de passe** : membre123
- **Email** : Membres05@entreprise.fr - **Mot de passe** : membre123

### Membres (15 comptes)
- **Email** : Membres06@entreprise.fr à Membres20@entreprise.fr
- **Mot de passe** : membre123 (pour tous)

## Fichiers créés pour le diagnostic

1. **`diagnostic-connexion.html`** (recommandé) ⭐
   - Page complète avec diagnostic automatique
   - Test de connexion interactif
   - Réinitialisation forcée si nécessaire
   - Interface visuelle avec émojis

2. **`test-membres.html`**
   - Affiche tous les utilisateurs dans un tableau
   - Permet de tester la connexion de chaque utilisateur
   - Interface plus technique

3. **`test-connexion.html`**
   - Test basique de connexion admin
   - Vérification des permissions

## Causes possibles du problème

1. **localStorage vide ou corrompu**
   - Les utilisateurs n'ont jamais été créés
   - Solution : Forcer la réinitialisation

2. **Erreur de saisie**
   - L'email est sensible à la casse : `Membres01` avec un M majuscule
   - Le mot de passe est : `membre123` (tout en minuscules)

3. **Cache du navigateur**
   - Appuyez sur `Ctrl+Shift+R` (Windows) ou `Cmd+Shift+R` (Mac) pour recharger sans cache
   - Ou videz le cache du navigateur

4. **Données anciennes**
   - Si vous avez déjà utilisé l'application, les anciennes données peuvent être incompatibles
   - Solution : Réinitialiser les données

## Vérification rapide (Console du navigateur)

Vous pouvez aussi vérifier dans la console du navigateur (F12) :

```javascript
// Vérifier les utilisateurs
console.log(JSON.parse(localStorage.getItem('intranet_users')));

// Vérifier combien d'utilisateurs
const users = JSON.parse(localStorage.getItem('intranet_users')) || [];
console.log('Nombre d\'utilisateurs:', users.length);

// Tester une connexion
initDefaultData();
const result = login('Membres01@entreprise.fr', 'membre123');
console.log('Résultat connexion:', result);
```

## Statut
🟡 **EN DIAGNOSTIC** - Utilisez les pages de diagnostic pour identifier et résoudre le problème.

## Besoin d'aide ?
Si le problème persiste après avoir suivi toutes ces étapes :
1. Ouvrez la console du navigateur (F12)
2. Allez sur l'onglet "Console"
3. Notez tous les messages d'erreur en rouge
4. Partagez ces erreurs pour un diagnostic plus approfondi
