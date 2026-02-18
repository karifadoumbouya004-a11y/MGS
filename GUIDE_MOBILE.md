# 📱 GUIDE RAPIDE - Interface Mobile

## ✅ L'interface s'adapte maintenant automatiquement !

### Sur ORDINATEUR (Grand écran)
```
┌──────────────────────────────────────────────────┐
│ [Menu]  │  Contenu principal                    │
│ - Dash  │  ┌─────────────────────────┐          │
│ - Info  │  │  Tableau de bord        │          │
│ - Proj  │  │  [Stats] [Stats] [Stats]│          │
│ - Docs  │  │                         │          │
│         │  │  Tableau complet        │          │
└──────────────────────────────────────────────────┘
```

### Sur MOBILE / TABLETTE (Petit écran)
```
┌─────────────────────────────┐
│ [☰]  Intranet MGS          │ ← Menu hamburger
├─────────────────────────────┤
│                             │
│  Tableau de bord           │
│                             │
│  [Stats]                   │
│  [Stats]                   │
│  [Stats]                   │
│                             │
│  Cartes au lieu            │
│  de tableaux               │
│                             │
└─────────────────────────────┘
```

## Comment utiliser sur mobile

### 1️⃣ Ouvrir le menu
Cliquez sur **☰** en haut à gauche

### 2️⃣ Naviguer
Le menu apparaît en glissant depuis la gauche

### 3️⃣ Fermer le menu
- Cliquez sur un lien de navigation (fermeture auto)
- Ou cliquez n'importe où à l'extérieur du menu
- Ou cliquez à nouveau sur **☰**

## Adaptations automatiques

### 📊 Tableaux
**Desktop** : Tableau classique avec colonnes
**Mobile** : Cartes empilées avec labels

### 📝 Formulaires  
**Desktop** : Labels à gauche, champs à droite
**Mobile** : Labels au-dessus, champs pleine largeur

### 🎯 Boutons
**Desktop** : Taille normale
**Mobile** : Plus grands, pleine largeur, faciles à toucher

### 🔔 Modal
**Desktop** : Fenêtre centrée (600px)
**Mobile** : Plein écran

### 📁 Menu
**Desktop** : Toujours visible à gauche (280px)
**Mobile** : Caché par défaut, s'ouvre avec ☰

## C'est automatique !

Vous n'avez **rien à faire** de spécial. L'application détecte automatiquement la taille de l'écran et s'adapte.

## Test rapide

1. Ouvrez `index.html` sur votre téléphone
2. Connectez-vous
3. Voyez le menu hamburger ☰
4. Cliquez dessus → Le menu s'ouvre
5. Cliquez sur "Informations" → La page change ET le menu se ferme
6. Faites défiler → Tout s'affiche correctement

**Ça marche ? Parfait ! 🎉**

---

## Problèmes courants

### Le menu ne se ferme pas
→ Vérifiez que le JavaScript est activé
→ Rechargez la page (F5)

### Le texte est trop petit
→ Normal sur très grand écran
→ Zoomez avec Ctrl + Plus

### Le texte est trop grand
→ Normal sur petit écran  
→ Dézoomez avec Ctrl + Moins

### Les tableaux débordent
→ Réduisez la fenêtre à moins de 480px
→ Les tableaux deviendront des cartes

### Le menu hamburger n'apparaît pas
→ Vous êtes sur un grand écran (> 1024px)
→ C'est normal, le menu est toujours visible

---

## Tailles d'écran

- **> 1024px** : Desktop (menu fixe)
- **768px - 1024px** : Tablette (menu hamburger)
- **480px - 768px** : Mobile (menu hamburger, optimisé)
- **< 480px** : Petit mobile (tableaux → cartes)

**L'application s'adapte automatiquement ! 🚀**
