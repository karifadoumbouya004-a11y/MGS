# 🚀 INTRANET MGS - GUIDE DE DÉPANNAGE

## 🔴 PROBLÈME ACTUEL : Les membres ne peuvent pas se connecter

### ⚡ SOLUTION RAPIDE (30 secondes)

**Ouvrez ce fichier dans votre navigateur :**
```
fix-connexion.html
```

Suivez les 3 étapes à l'écran. C'est automatique !

---

## 📁 Fichiers de l'application

### Application principale
- **`index.html`** - Page principale de l'intranet (utilisez celle-ci après avoir corrigé)
- **`app.js`** - Toute la logique JavaScript
- **`styles.css`** - Tous les styles

### Outils de diagnostic (pour réparer)
- ⭐ **`fix-connexion.html`** - **UTILISEZ CELUI-CI EN PRIORITÉ** (auto-diagnostic + correction)
- 🔍 `diagnostic-connexion.html` - Diagnostic détaillé interactif
- 📊 `test-membres.html` - Voir tous les utilisateurs dans un tableau
- ⚡ `test-connexion.html` - Test rapide de connexion

### Documentation
- 📄 `SOLUTION_CONNEXION_RAPIDE.md` - Guide pour résoudre le problème de connexion
- 📄 `GESTION_STATUTS_MEMBRES.md` - Documentation sur la gestion des statuts
- 📄 `MODIFICATIONS_COTISATIONS.md` - Infos sur les cotisations
- 📄 `CORRECTIONS_APPLIQUEES.md` - Historique des corrections
- 📄 `PROBLEME_CONNEXION_MEMBRES.md` - Analyse du problème

### Fichiers de sauvegarde
- `index_backup.html` - Sauvegarde de l'index
- `app_backup.js` - Sauvegarde du JS

---

## 🔑 IDENTIFIANTS DE CONNEXION

### Administrateur
```
Email    : karifadoumbouya004@gmail.com
Password : Conakry224
```

### Membres (20 comptes)
```
Email    : Membres01@entreprise.fr (jusqu'à Membres20@entreprise.fr)
Password : membre123
```

**⚠️ ATTENTION** : L'email commence par un **M majuscule** : `Membres01` pas `membres01`

---

## 🛠️ PROCÉDURE DE RÉPARATION

### Si vous n'arrivez PAS à vous connecter avec un membre :

#### 1️⃣ Ouvrir l'outil de réparation
```
Double-cliquez sur : fix-connexion.html
```

#### 2️⃣ Laisser le diagnostic se faire (automatique)
- Attendez 2 secondes
- Lisez les résultats

#### 3️⃣ Cliquer sur un bouton de correction

**Si vous débutez :** Cliquez sur 🔄 **"Réinitialiser TOUT"**
- Recrée tous les utilisateurs
- Données propres

**Si vous avez des données importantes :** Cliquez sur 🔧 **"Corriger les données existantes"**
- Garde vos données
- Corrige juste les problèmes

#### 4️⃣ Tester la connexion
- Cliquez sur ✅ **"Tester connexion Membre01"**
- Si vous voyez "🎉 PROBLÈME RÉSOLU!" → Parfait !

#### 5️⃣ Utiliser l'application
- Cliquez sur **"Aller à l'application"**
- Ou ouvrez `index.html`

---

## 🎯 FONCTIONNALITÉS DE L'APPLICATION

### Pour tous les utilisateurs
- 📊 Tableau de bord
- ℹ️ Informations générales
- 📁 Documents
- 💬 Messages internes

### Pour les Responsables et plus
- 📋 Projets
- ⚖️ Sanctions

### Pour les Cadres et Admin
- ✅ Gestion des tâches
- 📅 Réunions
- 📈 Performance

### Pour l'Admin seulement
- 📜 Règlement intérieur
- 💰 Contributions
- 💵 Cotisations
- 👥 Gestion des utilisateurs (modifier rôles, bloquer/débloquer)
- 📋 Journal d'audit

---

## ⚙️ GESTION DES STATUTS (Nouveau)

L'administrateur peut maintenant **bloquer/débloquer** des comptes :

1. Connexion en tant qu'admin
2. Menu **"Gestion des Utilisateurs"**
3. Boutons disponibles pour chaque membre :
   - 🔵 **"Changer rôle"** - Modifier le rôle (Admin/Cadre/Responsable/Membre)
   - 🟡 **"Bloquer"** - Bloquer le compte (ne peut plus se connecter)
   - 🟢 **"Débloquer"** - Réactiver un compte bloqué

---

## 💰 COTISATIONS

### Règles
- **Seuil minimal** : 100 000 GNF (pour ajouter ou retirer)
- **Seuil maximal** : Aucun (infini)
- **Tous les membres** sont inclus, y compris l'administrateur

### Actions admin
- **Modifier Total** - Changer le montant total à payer
- **Ajouter** - Ajouter un paiement (min 100 000 GNF)
- **Retirer** - Retirer un paiement (min 100 000 GNF)
- **Marquer payé/impayé** - Basculer le statut

---

## 🆘 SI ÇA NE MARCHE TOUJOURS PAS

### Vérifications rapides

1. **Email sensible à la casse**
   - ✅ `Membres01@entreprise.fr` (M majuscule)
   - ❌ `membres01@entreprise.fr` (m minuscule)

2. **Mot de passe exact**
   - ✅ `membre123` (tout minuscule)
   - ❌ `Membre123` ou autre variation

3. **Vider le cache**
   - Windows : `Ctrl + Shift + R`
   - Mac : `Cmd + Shift + R`

4. **Console du navigateur**
   - Appuyez sur `F12`
   - Onglet "Console"
   - Notez les erreurs en rouge

### Déblocage d'un compte

Si un membre ne peut pas se connecter à cause d'un blocage :

1. Connectez-vous en **admin**
2. Allez dans **"Gestion des Utilisateurs"**
3. Trouvez le membre avec le badge 🔴 **"Bloqué"**
4. Cliquez sur 🟢 **"Débloquer"**
5. Le membre peut maintenant se connecter

---

## 📞 SUPPORT

Si après TOUT ça le problème persiste :

1. Ouvrez `fix-connexion.html`
2. Faites le diagnostic complet
3. Prenez une **capture d'écran** de tous les résultats
4. Notez les **messages d'erreur exacts** (Console F12)
5. Partagez ces informations

---

## ✅ CHECKLIST AVANT DE COMMENCER

- [ ] J'ai ouvert `fix-connexion.html`
- [ ] J'ai laissé le diagnostic se faire
- [ ] J'ai cliqué sur "Réinitialiser TOUT" ou "Corriger"
- [ ] J'ai testé avec "Tester connexion Membre01"
- [ ] Ça affiche "PROBLÈME RÉSOLU"
- [ ] Je peux maintenant ouvrir `index.html` et me connecter

**Si toutes les cases sont cochées → L'application fonctionne ! 🎉**

---

## 📝 VERSION
- Application : Intranet MGS v2.0
- Dernière mise à jour : 18 Février 2026
- Corrections appliquées : Gestion des statuts, cotisations, connexion membres

---

**🚀 Bon travail avec votre intranet !**
