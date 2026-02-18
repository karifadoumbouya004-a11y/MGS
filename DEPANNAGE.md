# 🔧 Guide de Dépannage Rapide

## Problème: Impossible d'accéder aux fonctionnalités

### Solution 1: Réinitialiser les données
1. Ouvrir `index.html`
2. Sur la page de connexion, cliquer sur **"Réinitialiser les données"**
3. Confirmer
4. Recharger la page (F5)
5. Se reconnecter

### Solution 2: Vider le cache du navigateur
1. Appuyer sur `Ctrl + Shift + Delete`
2. Cocher "Cookies" et "Données en cache"
3. Cliquer sur "Effacer"
4. Fermer et rouvrir le navigateur
5. Rouvrir `index.html`

### Solution 3: Vérifier la console du navigateur
1. Appuyer sur `F12` pour ouvrir les outils de développement
2. Aller dans l'onglet "Console"
3. Chercher les erreurs (texte en rouge)
4. Noter l'erreur et me la communiquer

### Solution 4: Utiliser la page de test
1. Ouvrir `test.html`
2. Cliquer sur les boutons de test
3. Vérifier quelles fonctions sont chargées
4. Si des tests échouent, me communiquer lesquels

## Connexion

### Comptes de test:

**Administrateur (tout accès):**
```
Email: karifadoumbouya004@gmail.com
Mot de passe: Conakry224
```

**Cadre:**
```
Email: Membres01@entreprise.fr
Mot de passe: membre123
```

**Membre:**
```
Email: Membres06@entreprise.fr
Mot de passe: membre123
```

## Vérifications Rapides

### 1. Les sections visibles dépendent de votre rôle

| Section | Admin | Cadre | Responsable | Membre |
|---------|-------|-------|-------------|--------|
| Dashboard | ✅ | ✅ | ✅ | ✅ |
| Informations | ✅ | ✅ | ✅ | ✅ |
| Projets | ✅ | ✅ | ✅ | ❌ |
| Documents | ✅ | ✅ | ✅ | ✅ |
| Messages | ✅ | ✅ | ✅ | ✅ |
| Tâches | ✅ | ✅ | ❌ | ❌ |
| Réunions | ✅ | ✅ | ❌ | ❌ |
| Sanctions | ✅ | ✅ | ✅ | ❌ |
| Performance | ✅ | ✅ | ❌ | ❌ |
| Cotisations | ✅ | ❌ | ❌ | ❌ |
| Gestion | ✅ | ❌ | ❌ | ❌ |
| Audit | ✅ | ❌ | ❌ | ❌ |

### 2. Si une section n'apparaît pas:
- C'est normal! Votre rôle n'a pas accès à cette section
- Connectez-vous avec un compte admin pour voir toutes les sections

### 3. Si le tableau de bord est vide:
- C'est peut-être normal au premier démarrage
- Cliquez sur "Réinitialiser les données"
- Des données de test seront créées automatiquement

## Erreurs Communes

### "Vous n'avez pas accès à cette section"
**Cause:** Votre rôle n'a pas la permission
**Solution:** Connectez-vous avec un compte ayant les bonnes permissions

### Page blanche
**Cause:** Erreur JavaScript
**Solution:** 
1. Ouvrir la console (F12)
2. Recharger (F5)
3. Noter l'erreur
4. Vider le cache et réessayer

### Boutons "Ajouter" invisibles
**Cause:** Votre rôle ne peut pas modifier cette section
**Solution:** C'est normal! Seuls certains rôles peuvent modifier

### Données disparues
**Cause:** LocalStorage effacé
**Solution:** Cliquer sur "Réinitialiser les données"

## Navigation

### Menu de gauche
- Cliquer sur une section pour y accéder
- La section active est surlignée en bleu
- Les sections grisées ne sont pas accessibles à votre rôle

### Menu burger (mobile)
- Cliquer sur ☰ en haut à gauche
- Le menu latéral s'ouvre
- Cliquer à nouveau pour fermer

## Test Rapide

1. Ouvrir `test.html`
2. Cliquer sur "Test Connexion"
3. Cliquer sur "Test Navigation"
4. Cliquer sur "Test Permissions"

Si tous les tests passent, l'application fonctionne correctement!

## Besoin d'aide?

Si le problème persiste:
1. Ouvrir la console (F12)
2. Prendre une capture d'écran des erreurs
3. Noter quelle action vous essayez de faire
4. Me contacter avec ces informations

## Fichiers Importants

- `index.html` - Application principale
- `test.html` - Page de test
- `app.js` - Fonctions principales
- `app-extended.js` - Fonctions avancées
- `styles.css` - Styles

Si un fichier est manquant, l'application ne fonctionnera pas correctement.

## Réinitialisation Complète

Si rien ne fonctionne:
1. Fermer le navigateur complètement
2. Ouvrir `index.html`
3. Cliquer sur "Réinitialiser les données"
4. Vider le cache (Ctrl + Shift + Delete)
5. Fermer et rouvrir le navigateur
6. Rouvrir `index.html`
7. Se connecter avec le compte admin

---

**Bon courage! L'application devrait fonctionner correctement après ces étapes.**
