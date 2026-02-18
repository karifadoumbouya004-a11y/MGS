# GESTION DES STATUTS DES MEMBRES

## Fonctionnalité ajoutée

L'administrateur peut maintenant gérer le **statut** de chaque membre en plus de leur **rôle**.

## Deux types de gestion

### 1. Gestion des Rôles (déjà existant)
L'administrateur peut changer le rôle d'un utilisateur :
- **Administrateur** : Accès complet à toutes les fonctionnalités
- **Cadre** : Accès étendu (informations, projets, sanctions, tâches, documents, messages, réunions, performance)
- **Responsable** : Accès modéré (informations, projets, sanctions, documents, messages)
- **Membre** : Accès limité (informations, documents, messages)

**Action** : Bouton "Changer rôle" → Sélection du nouveau rôle → Confirmation

### 2. Gestion des Statuts (NOUVEAU ✨)
L'administrateur peut bloquer/débloquer un compte utilisateur :
- **Actif** 🟢 : L'utilisateur peut se connecter normalement
- **Bloqué** 🔴 : L'utilisateur ne peut plus se connecter

**Actions** :
- Bouton **"Bloquer"** (jaune) : Bloque le compte
- Bouton **"Débloquer"** (vert) : Réactive le compte

## Ce qui a été modifié

### 1. Dans `app.js`

#### Fonction `login()` (ligne ~439)
- ✅ Vérification du statut avant connexion
- ✅ Message d'erreur personnalisé si compte bloqué

```javascript
if (user.statut === 'bloque') {
    return { success: false, message: 'Votre compte a été bloqué. Contactez l\'administrateur.' };
}
```

#### Fonction `loadGestion()` (ligne ~1208)
- ✅ Ajout automatique du statut "actif" pour tous les utilisateurs existants
- ✅ Affichage du badge de statut (Actif/Bloqué)
- ✅ Ajout des boutons Bloquer/Débloquer
- ✅ Style visuel différent pour les comptes bloqués (opacité réduite, fond rouge)

#### Fonction `toggleUserRole()` (ligne ~1237)
- ✅ Ajout de logs d'audit détaillés (ancien rôle → nouveau rôle)
- ✅ Message de confirmation

#### Nouvelle fonction `toggleUserStatut()` (ligne ~1271)
- ✅ Bascule entre actif/bloqué
- ✅ Confirmation avant blocage/déblocage
- ✅ Logs d'audit automatiques
- ✅ Message de succès

### 2. Dans `index.html`

#### Page Gestion (ligne ~758)
- ✅ Ajout d'une colonne "Statut" dans le tableau
- ✅ Nouvelle structure : Nom | Email | Rôle | **Statut** | Date | Actions

### 3. Dans `styles.css`

#### Nouveaux badges (ligne ~1274)
- ✅ `.badge-success` : Badge vert pour "Actif"
- ✅ `.badge-danger` : Badge rouge pour "Bloqué"
- ✅ `.btn-warning` : Bouton jaune pour "Bloquer"

## Comment utiliser

### Pour bloquer un membre :

1. Connectez-vous en tant qu'**Administrateur**
2. Allez dans la section **"Gestion des Utilisateurs"**
3. Trouvez le membre à bloquer
4. Cliquez sur le bouton **"Bloquer"** (jaune)
5. Confirmez l'action
6. Le statut passe à **"Bloqué"** (badge rouge)
7. Le compte ne peut plus se connecter

### Pour débloquer un membre :

1. Dans la section **"Gestion des Utilisateurs"**
2. Trouvez le membre bloqué (badge rouge "Bloqué")
3. Cliquez sur le bouton **"Débloquer"** (vert)
4. Confirmez l'action
5. Le statut passe à **"Actif"** (badge vert)
6. Le membre peut à nouveau se connecter

### Pour changer le rôle d'un membre :

1. Dans la section **"Gestion des Utilisateurs"**
2. Cliquez sur le bouton **"Changer rôle"** (bleu)
3. Sélectionnez le nouveau rôle dans la liste déroulante
4. Cliquez sur **"Changer le rôle"**
5. Le rôle est immédiatement mis à jour

## Visuels

### Tableau de gestion
```
┌─────────────────┬───────────────────────┬──────────────┬──────────┬────────────┬─────────────────────┐
│ Nom             │ Email                 │ Rôle         │ Statut   │ Date       │ Actions             │
├─────────────────┼───────────────────────┼──────────────┼──────────┼────────────┼─────────────────────┤
│ Karifa Doumbouya│ karifadoumbouya...    │ 🔴 Admin     │ 🟢 Actif │ 01/01/2024 │ Vous                │
│ Employe Membre01│ Membres01@entreprise  │ 💼 Cadre     │ 🟢 Actif │ 01/01/2024 │ [Changer] [Bloquer] │
│ Employe Membre05│ Membres05@entreprise  │ 📋 Responsab │ 🔴 Bloqué│ 01/01/2024 │ [Changer] [Débloq.] │
│ Employe Membre10│ Membres10@entreprise  │ 👤 Membre    │ 🟢 Actif │ 01/01/2024 │ [Changer] [Bloquer] │
└─────────────────┴───────────────────────┴──────────────┴──────────┴────────────┴─────────────────────┘
```

### Message d'erreur pour compte bloqué
```
┌────────────────────────────────────────────────────────┐
│  ⚠️ Connexion impossible                               │
│                                                        │
│  Votre compte a été bloqué.                           │
│  Contactez l'administrateur.                          │
└────────────────────────────────────────────────────────┘
```

## Traçabilité (Audit)

Toutes les actions sont enregistrées dans le journal d'audit :

- **Changement de rôle** : "Rôle de [Nom] changé de [ancien] à [nouveau]"
- **Blocage de compte** : "Compte de [Nom] bloqué"
- **Déblocage de compte** : "Compte de [Nom] débloqué"

Pour consulter l'audit :
1. Connectez-vous en tant qu'administrateur
2. Allez dans la section **"Audit"**
3. Consultez l'historique complet des actions

## Notes importantes

- ⚠️ L'administrateur **ne peut pas** bloquer son propre compte
- ⚠️ L'administrateur **ne peut pas** changer son propre rôle
- ✅ Tous les utilisateurs existants reçoivent automatiquement le statut "actif"
- ✅ Les comptes bloqués sont visuellement différents (opacité réduite, fond rouge pâle)
- ✅ Les modifications sont immédiates et sauvegardées dans le localStorage

## Test de la fonctionnalité

### Test 1 : Bloquer un compte
1. Admin : Bloquer le compte "Membres01@entreprise.fr"
2. Se déconnecter
3. Essayer de se connecter avec Membres01
4. **Résultat attendu** : Message "Votre compte a été bloqué"

### Test 2 : Débloquer un compte
1. Admin : Débloquer le compte "Membres01@entreprise.fr"
2. Se déconnecter
3. Se connecter avec Membres01
4. **Résultat attendu** : Connexion réussie

### Test 3 : Changer de rôle
1. Admin : Changer "Membres01" de "Cadre" à "Membre"
2. Se déconnecter et se connecter avec Membres01
3. **Résultat attendu** : Accès limité aux pages (seulement Dashboard, Informations, Documents, Messages)

## Statut
🟢 **OPÉRATIONNEL** - La gestion des statuts est maintenant pleinement fonctionnelle.

## Fichiers modifiés
- ✅ `app.js` : 3 fonctions modifiées, 1 fonction ajoutée
- ✅ `index.html` : Ajout colonne "Statut"
- ✅ `styles.css` : Ajout badges et bouton warning
