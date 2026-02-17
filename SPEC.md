# Intranet Entreprise - Spécification

## 1. Project Overview

**Nom du projet:** Intranet Entreprise  
**Type:** Application web monopage (SPA)  
**Description:** Site web privé pour une entreprise de 20 membres permettant le partage d'informations administratives, la gestion de projets, le règlement intérieur, le suivi des sanctions/contributions financières et la gestion des tâches.  
**Utilisateurs cibles:** Membres de l'entreprise (employés, managers, admins)

## 2. UI/UX Specification

### Layout Structure

**Pages:**
1. **Page de connexion** - Authentification
2. **Tableau de bord** - Vue d'ensemble
3. **Informations** - Section administrative/professionnelle
4. **Projets** - Gestion des projets
5. **Règlement intérieur** - Documents et règles
6. **Sanctions & Contributions** - Suivi financier
7. **Tâches** - Liste des tâches à faire
8. **Profil** - Paramètres utilisateur

**Navigation:**
- Sidebar fixe à gauche (280px)
- Header avec logo, nom utilisateur, déconnexion
- Contenu principal à droite

**Responsive:**
- Desktop: > 1024px (sidebar visible)
- Tablette: 768px - 1024px (sidebar collapsible)
- Mobile: < 768px (menu hamburger)

### Visual Design

**Palette de couleurs:**
- Primary: #1a365d (bleu foncé professionnel)
- Secondary: #2d3748 (gris foncé)
- Accent: #38a169 (vert succès)
- Warning: #d69e2e (orange)
- Danger: #e53e3e (rouge)
- Background: #f7fafc (gris clair)
- Card: #ffffff (blanc)
- Text Primary: #1a202c
- Text Secondary: #718096

**Typographie:**
- Police principale: 'Inter', sans-serif
- H1: 28px, bold
- H2: 22px, semibold
- H3: 18px, semibold
- Body: 15px, regular
- Small: 13px, regular

**Espacements:**
- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 32px

**Ombres:**
- Card: 0 1px 3px rgba(0,0,0,0.1)
- Hover: 0 4px 6px rgba(0,0,0,0.1)

### Components

**Cartes:**
- Coins arrondis: 8px
- Padding: 20px
- Ombre subtile
- Effet hover avec élévation

**Boutons:**
- Primary: fond bleu, texte blanc
- Secondary: fond gris clair, texte gris foncé
- Danger: fond rouge, texte blanc
- Padding: 10px 20px
- Border-radius: 6px
- Transition: 0.2s

**Formulaires:**
- Labels au-dessus des champs
- Inputs avec bordure #e2e8f0
- Focus: bordure bleue
- Error: bordure rouge

**Tableaux:**
- En-tête bleu gris
- Lignes alternées
- Hover sur lignes

## 3. Functionality Specification

### Authentification
- Login avec email/mot de passe
- Mot de passe haché (simulation)
- Session persistée (localStorage)
- Déconnexion
- Création de compte admin par défaut

### Section Informations
- Liste d'informations administratives
- Ajouter/Modifier/Supprimer des informations
- Catégories: Communiqués, Procédures, Documents
- Date de publication
- Priorité (Haute, Moyenne, Basse)

### Section Projets
- Liste des projets
- Ajouter/Modifier/Supprimer des projets
- Détails: Nom, description, date début, date fin, statut, chef de projet
- Statuts: Planifié, En cours, Terminé, En pause

### Section Règlement Intérieur
- Document principal consultable
- Liste des règles/missions
- Version du document
- Dernière mise à jour

### Section Sanctions & Contributions
- Liste des membres
- Contributions financières de chacun
- Historique des sanctions
- Montant total des contributions
- Filtrage par membre/date

### Section Tâches
- Liste des tâches
- Ajouter/Modifier/Supprimer des tâches
- Assigner à un membre
- Priorité (Haute, Moyenne, Basse)
- Statut (À faire, En cours, Terminé)
- Date d'échéance
- Filtrage par statut/membre

### Base de données (localStorage)
- Utilisateurs
- Informations
- Projets
- Règlement
- Sanctions/Contributions
- Tâches

## 4. Acceptance Criteria

1. ✓ L'utilisateur peut se connecter avec un compte valide
2. ✓ L'accès est refusé sans authentification
3. ✓ Toutes les sections sont accessibles après connexion
4. ✓ Les données persistent après rafraîchissement
5. ✓ L'interface est responsive
6. ✓ Les couleurs et typographies sont cohérentes
7. ✓ Les interactions ont des transitions fluides
8. ✓ Le site fonctionne hors ligne après premier chargement

## 5. Compte par défaut

**Admin:**
- Email: admin@entreprise.fr
- Mot de passe: admin123

**Membres (20 comptes simulateurs):**
- Membres01@entreprise.fr à Membres20@entreprise.fr
- Mot de passe: membre123
