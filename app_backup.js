// ==================== Data Management ====================
const DB_KEYS = {
    USERS: 'intranet_users',
    INFORMATIONS: 'intranet_informations',
    PROJETS: 'intranet_projets',
    REGLEMENT: 'intranet_reglement',
    CONTRIBUTIONS: 'intranet_contributions',
    COTISATIONS: 'intranet_cotisations',
    SANCTIONS: 'intranet_sanctions',
    SANCTIONS_TYPES: 'intranet_sanctions_types',
    TACHES: 'intranet_taches',
    DOCUMENTS: 'intranet_documents',
    MESSAGES: 'intranet_messages',
    REUNIONS: 'intranet_reunions',
    COMMENTAIRES: 'intranet_commentaires',
    REACTIONS: 'intranet_reactions',
    NOTIFICATIONS: 'intranet_notifications',
    AUDIT_LOG: 'intranet_audit_log',
    SESSION: 'intranet_session'
};

const ROLES = {
    ADMIN: 'admin',
    CADRE: 'cadre',
    RESPONSABLE: 'responsable',
    MEMBRE: 'membre'
};

const PERMISSIONS = {
    admin: ['dashboard', 'informations', 'projets', 'reglement', 'contributions', 'cotisations', 'sanctions', 'taches', 'documents', 'messages', 'reunions', 'performance', 'gestion', 'profil', 'audit'],
    cadre: ['dashboard', 'informations', 'projets', 'sanctions', 'taches', 'documents', 'messages', 'reunions', 'performance', 'profil'],
    responsable: ['dashboard', 'informations', 'projets', 'sanctions', 'documents', 'messages', 'profil'],
    membre: ['dashboard', 'informations', 'documents', 'messages', 'profil']
};

// Default data initialization
function initDefaultData() {
    // Initialize users if not exists OR update admin if exists
    let users = getData(DB_KEYS.USERS);
    
    if (users.length === 0) {
        // Admin user
        users.push({
            id: 1,
            email: 'karifadoumbouya004@gmail.com',
            password: 'Conakry224',
            nom: 'Doumbouya',
            prenom: 'Karifa',
            role: 'admin',
            dateInscription: '2024-01-01'
        });
        
        // 20 member users
        for (let i = 1; i <= 20; i++) {
            const num = i.toString().padStart(2, '0');
            let role = 'membre';
            if (i <= 2) role = 'cadre';
            else if (i <= 5) role = 'responsable';
            
            users.push({
                id: i + 1,
                email: `Membres${num}@entreprise.fr`,
                password: 'membre123',
                nom: `Membre${num}`,
                prenom: 'Employe',
                role: role,
                dateInscription: '2024-01-01'
            });
        }
        
        saveData(DB_KEYS.USERS, users);
    } else {
        // Ensure admin exists with correct credentials
        const adminIndex = users.findIndex(u => u.email === 'karifadoumbouya004@gmail.com');
        if (adminIndex === -1) {
            users.unshift({
                id: 1,
                email: 'karifadoumbouya004@gmail.com',
                password: 'Conakry224',
                nom: 'Doumbouya',
                prenom: 'Karifa',
                role: 'admin',
                dateInscription: '2024-01-01'
            });
            saveData(DB_KEYS.USERS, users);
        } else if (users[adminIndex].password !== 'Conakry224' || users[adminIndex].role !== 'admin') {
            users[adminIndex].password = 'Conakry224';
            users[adminIndex].role = 'admin';
            saveData(DB_KEYS.USERS, users);
        }
    }
    
    // Initialize informations if not exists
    if (!localStorage.getItem(DB_KEYS.INFORMATIONS)) {
        const informations = [
            {
                id: 1,
                titre: 'Reunion mensuelle - Mars 2024',
                contenu: 'La reunion mensuelle aura lieu le 15 Mars a 14h00 dans la salle de conference.',
                categorie: 'communique',
                priorite: 'haute',
                auteur: 'Admin Systeme',
                date: '2024-03-01'
            },
            {
                id: 2,
                titre: 'Nouvelle procedure de vacation',
                contenu: 'Une nouvelle procedure de gestion des vacations a ete mise en place. Merci de consulter le document.',
                categorie: 'procedure',
                priorite: 'moyenne',
                auteur: 'Admin Systeme',
                date: '2024-02-28'
            },
            {
                id: 3,
                titre: 'Formulaire de demande de conges',
                contenu: 'Le nouveau formulaire de demande de conges est disponible dans la section Documents.',
                categorie: 'document',
                priorite: 'basse',
                auteur: 'Admin Systeme',
                date: '2024-02-25'
            }
        ];
        localStorage.setItem(DB_KEYS.INFORMATIONS, JSON.stringify(informations));
    }
    
    // Initialize projets if not exists
    if (!localStorage.getItem(DB_KEYS.PROJETS)) {
        const projets = [
            {
                id: 1,
                nom: 'Refonte du site web',
                description: 'Modernisation du site web de l\'entreprise avec une nouvelle interface.',
                dateDebut: '2024-01-15',
                dateFin: '2024-04-30',
                statut: 'encours',
                chef: 'Membre01',
                membres: ['Membre01', 'Membre02', 'Membre03']
            },
            {
                id: 2,
                nom: 'Mise a jour infrastructure',
                description: 'Renouvellement du materiel informatique et mise a niveau des serveurs.',
                dateDebut: '2024-02-01',
                dateFin: '2024-03-31',
                statut: 'encours',
                chef: 'Membre05',
                membres: ['Membre05', 'Membre06']
            },
            {
                id: 3,
                nom: 'Formation QSE',
                description: 'Organisation de la formation qualite securite environnement pour tous les employes.',
                dateDebut: '2024-03-01',
                dateFin: '2024-03-15',
                statut: 'planifie',
                chef: 'Membre10',
                membres: ['Membre10']
            }
        ];
        localStorage.setItem(DB_KEYS.PROJETS, JSON.stringify(projets));
    }
    
    // Initialize reglement if not exists
    if (!localStorage.getItem(DB_KEYS.REGLEMENT)) {
        const regles = [
            { id: 1, titre: 'Respect des horaires', description: 'Etre present aux horaires definis', date: '2024-01-01' },
            { id: 2, titre: 'Confidentialite', description: 'Ne pas divulguer les informations sensibles', date: '2024-01-01' },
            { id: 3, titre: 'Travail d\'equipe', description: 'Collaborer activement avec les collegues', date: '2024-01-01' }
        ];
        localStorage.setItem(DB_KEYS.REGLEMENT, JSON.stringify(regles));
    }
    
    // Initialize sanctions if not exists
    if (!localStorage.getItem(DB_KEYS.SANCTIONS)) {
        const sanctions = [
            {
                id: 1,
                membreId: 3,
                membre: 'Membres03',
                motif: 'Retard repete aux reunions',
                montant: 50,
                date: '2024-02-15',
                statut: 'paye'
            },
            {
                id: 2,
                membreId: 7,
                membre: 'Membres07',
                motif: 'Non-respect des delais',
                montant: 75,
                date: '2024-02-20',
                statut: 'enattente'
            }
        ];
        localStorage.setItem(DB_KEYS.SANCTIONS, JSON.stringify(sanctions));
    }
    
    // Initialize taches if not exists
    if (!localStorage.getItem(DB_KEYS.TACHES)) {
        const taches = [
            {
                id: 1,
                titre: 'Preparer le rapport mensuel',
                description: 'Compiler les donnees et preparer le rapport pour la reunion de direction.',
                priorite: 'haute',
                statut: 'afaire',
                assignee: 'Membre02',
                dateEcheance: '2024-03-10',
                creePar: 'Admin Systeme',
                dateCreation: '2024-03-01'
            },
            {
                id: 2,
                titre: 'Reviser le document qualite',
                description: 'Mettre a jour le manuel qualite selon les nouvelles normes.',
                priorite: 'moyenne',
                statut: 'encours',
                assignee: 'Membre04',
                dateEcheance: '2024-03-15',
                creePar: 'Admin Systeme',
                dateCreation: '2024-02-28'
            },
            {
                id: 3,
                titre: 'Commander le materiel',
                description: 'Passer la commande pour les nouveaux ordinateurs.',
                priorite: 'basse',
                statut: 'termine',
                assignee: 'Membre05',
                dateEcheance: '2024-02-28',
                creePar: 'Admin Systeme',
                dateCreation: '2024-02-20'
            },
            {
                id: 4,
                titre: 'Planifier la formation',
                description: 'Organiser les sessions de formation pour le nouveau logiciel.',
                priorite: 'haute',
                statut: 'afaire',
                assignee: 'Membre08',
                dateEcheance: '2024-03-20',
                creePar: 'Admin Systeme',
                dateCreation: '2024-03-05'
            }
        ];
        localStorage.setItem(DB_KEYS.TACHES, JSON.stringify(taches));
    }
    
    // Initialize contributions if not exists
    if (!localStorage.getItem(DB_KEYS.CONTRIBUTIONS)) {
        const contributions = [];
        const users = JSON.parse(localStorage.getItem(DB_KEYS.USERS) || '[]');
        users.filter(u => u.role === 'membre').forEach(function(user, index) {
            contributions.push({
                id: index + 1,
                membreId: user.id,
                membre: user.prenom + ' ' + user.nom,
                type: 'Sanction',
                montant: (index % 3 + 1) * 25000,
                date: '2024-02-' + (10 + index).toString().padStart(2, '0'),
                statut: index % 2 === 0 ? 'paye' : 'enattente'
            });
        });
        localStorage.setItem(DB_KEYS.CONTRIBUTIONS, JSON.stringify(contributions));
    }
    
    // Initialize cotisations if not exists
    if (!localStorage.getItem(DB_KEYS.COTISATIONS)) {
        const cotisations = [];
        const users = JSON.parse(localStorage.getItem(DB_KEYS.USERS) || '[]');
        users.filter(u => u.role === 'membre').forEach(function(user) {
            cotisations.push({
                id: user.id,
                membreId: user.id,
                membre: user.prenom + ' ' + user.nom,
                montantDu: 100000,
                montantPaye: user.id % 3 === 0 ? 100000 : (user.id % 2 === 0 ? 0 : 100000),
                trimestre: '2024-Q1',
                statut: user.id % 3 === 0 || user.id % 2 === 1 ? 'paye' : 'impaye',
                datePaiement: user.id % 3 === 0 || user.id % 2 === 1 ? '2024-01-15' : null
            });
        });
        localStorage.setItem(DB_KEYS.COTISATIONS, JSON.stringify(cotisations));
    }
    
    // Initialize sanctions types
    if (!localStorage.getItem(DB_KEYS.SANCTIONS_TYPES)) {
        const sanctionsTypes = [
            { id: 1, nom: 'Retard', montantDefaut: 5000, description: 'Retard aux reunions ou evenements' },
            { id: 2, nom: 'Absence non justifiee', montantDefaut: 15000, description: 'Absence sans prevenir' },
            { id: 3, nom: 'Non-respect du reglement', montantDefaut: 10000, description: 'Violation des regles internes' },
            { id: 4, nom: 'Comportement inapproprie', montantDefaut: 20000, description: 'Attitude nuisible ou irrespectueuse' },
            { id: 5, nom: 'Retard de paiement', montantDefaut: 25000, description: 'Retard dans le paiement des cotisations' }
        ];
        localStorage.setItem(DB_KEYS.SANCTIONS_TYPES, JSON.stringify(sanctionsTypes));
    }
    
    // Initialize documents
    if (!localStorage.getItem(DB_KEYS.DOCUMENTS)) {
        localStorage.setItem(DB_KEYS.DOCUMENTS, JSON.stringify([]));
    }
    
    // Initialize messages
    if (!localStorage.getItem(DB_KEYS.MESSAGES)) {
        localStorage.setItem(DB_KEYS.MESSAGES, JSON.stringify([]));
    }
    
    // Initialize reunions
    if (!localStorage.getItem(DB_KEYS.REUNIONS)) {
        const reunions = [
            {
                id: 1,
                titre: 'Reunion mensuelle - Mars 2024',
                description: 'Point sur les projets en cours et planification',
                date: '2024-03-15',
                heure: '14:00',
                lieu: 'Salle de conference',
                participants: [],
                statut: 'planifie',
                creePar: 'Admin Systeme',
                dateCreation: '2024-03-01'
            }
        ];
        localStorage.setItem(DB_KEYS.REUNIONS, JSON.stringify(reunions));
    }
    
    // Initialize commentaires
    if (!localStorage.getItem(DB_KEYS.COMMENTAIRES)) {
        localStorage.setItem(DB_KEYS.COMMENTAIRES, JSON.stringify([]));
    }
    
    // Initialize reactions
    if (!localStorage.getItem(DB_KEYS.REACTIONS)) {
        localStorage.setItem(DB_KEYS.REACTIONS, JSON.stringify([]));
    }
    
    // Initialize notifications
    if (!localStorage.getItem(DB_KEYS.NOTIFICATIONS)) {
        localStorage.setItem(DB_KEYS.NOTIFICATIONS, JSON.stringify([]));
    }
    
    // Initialize audit log
    if (!localStorage.getItem(DB_KEYS.AUDIT_LOG)) {
        localStorage.setItem(DB_KEYS.AUDIT_LOG, JSON.stringify([]));
    }
}

// ==================== Utility Functions ====================
function getData(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
}

function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function generateId(key) {
    const data = getData(key);
    if (data.length === 0) return 1;
    return Math.max(...data.map(item => item.id)) + 1;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR');
}

function formatDateTime(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString('fr-FR');
}

function addAuditLog(action, details) {
    const logs = getData(DB_KEYS.AUDIT_LOG);
    logs.push({
        id: generateId(DB_KEYS.AUDIT_LOG),
        utilisateur: currentUser ? currentUser.prenom + ' ' + currentUser.nom : 'Systeme',
        utilisateurId: currentUser ? currentUser.id : 0,
        action: action,
        details: details,
        date: new Date().toISOString()
    });
    saveData(DB_KEYS.AUDIT_LOG, logs);
}

function createNotification(userId, titre, message, type, lienPage) {
    const notifications = getData(DB_KEYS.NOTIFICATIONS);
    notifications.push({
        id: generateId(DB_KEYS.NOTIFICATIONS),
        userId: userId,
        titre: titre,
        message: message,
        type: type,
        lienPage: lienPage || null,
        lu: false,
        date: new Date().toISOString()
    });
    saveData(DB_KEYS.NOTIFICATIONS, notifications);
}

function hasPermission(page) {
    if (!currentUser) return false;
    const userPermissions = PERMISSIONS[currentUser.role] || [];
    return userPermissions.includes(page);
}

function canModify(resourceType) {
    if (!currentUser) return false;
    
    const modifyPermissions = {
        informations: ['admin', 'cadre'],
        projets: ['admin', 'cadre', 'responsable'],
        taches: ['admin', 'cadre'],
        sanctions: ['admin', 'cadre', 'responsable'],
        documents: ['admin', 'cadre', 'responsable'],
        reunions: ['admin', 'cadre']
    };
    
    const allowedRoles = modifyPermissions[resourceType] || [];
    return allowedRoles.includes(currentUser.role);
}

// ==================== Authentication ====================
let currentUser = null;

function checkSession() {
    const session = localStorage.getItem(DB_KEYS.SESSION);
    if (session) {
        currentUser = JSON.parse(session);
        showApp();
        return true;
    }
    return false;
}

function login(email, password) {
    const users = getData(DB_KEYS.USERS);
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        currentUser = user;
        localStorage.setItem(DB_KEYS.SESSION, JSON.stringify(user));
        return { success: true };
    }
    
    return { success: false, message: 'Email ou mot de passe incorrect' };
}

function logout() {
    currentUser = null;
    localStorage.removeItem(DB_KEYS.SESSION);
    showLogin();
}

// ==================== UI Functions ====================
function showLogin() {
    document.getElementById('login-page').classList.remove('hidden');
    document.getElementById('app').classList.add('hidden');
}

function showApp() {
    document.getElementById('login-page').classList.add('hidden');
    document.getElementById('app').classList.remove('hidden');
    updateUserInfo();
    updateAdminVisibility();
    updateNavigationByRole();
    navigateTo('dashboard');
}

function updateNavigationByRole() {
    const navItems = document.querySelectorAll('.nav-item[data-page]');
    
    navItems.forEach(item => {
        const page = item.dataset.page;
        if (hasPermission(page)) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
    
    // Show audit log only for admin
    const auditNav = document.getElementById('audit-nav');
    if (auditNav && currentUser && currentUser.role === 'admin') {
        auditNav.style.display = 'flex';
    } else if (auditNav) {
        auditNav.style.display = 'none';
    }
}

function updateAdminVisibility() {
    const gestionNav = document.getElementById('gestion-nav');
    const addContribBtn = document.getElementById('add-contribution-btn');
    
    if (currentUser && currentUser.role === 'admin') {
        if (gestionNav) gestionNav.style.display = 'flex';
        if (addContribBtn) addContribBtn.style.display = 'inline-flex';
    } else {
        if (gestionNav) gestionNav.style.display = 'none';
        if (addContribBtn) addContribBtn.style.display = 'none';
    }
    
    updateButtonVisibility();
}

function updateButtonVisibility() {
    const buttons = {
        'add-info-btn': canModify('informations'),
        'add-projet-btn': canModify('projets'),
        'add-tache-btn': canModify('taches'),
        'add-sanction-btn': canModify('sanctions'),
        'add-document-btn': canModify('documents'),
        'add-reunion-btn': canModify('reunions'),
        'add-message-btn': true
    };
    
    Object.keys(buttons).forEach(btnId => {
        const btn = document.getElementById(btnId);
        if (btn) {
            btn.style.display = buttons[btnId] ? 'inline-flex' : 'none';
        }
    });
}

function updateUserInfo() {
    if (currentUser) {
        document.getElementById('user-name').textContent = currentUser.prenom + ' ' + currentUser.nom;
        const roleLabels = {
            admin: 'Administrateur',
            cadre: 'Cadre',
            responsable: 'Responsable',
            membre: 'Membre'
        };
        document.getElementById('user-role').textContent = roleLabels[currentUser.role] || 'Membre';
    }
}

function navigateTo(page) {
    // Check permission
    if (!hasPermission(page)) {
        alert('Vous n\'avez pas accès à cette section.');
        return;
    }
    
    // Update nav
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        if (item.dataset.page === page) {
            item.classList.add('active');
        }
    });
    
    // Update page
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const pageElement = document.getElementById('page-' + page);
    if (pageElement) {
        pageElement.classList.add('active');
    }
    
    // Load page data
    loadPageData(page);
}

function loadPageData(page) {
    switch(page) {
        case 'dashboard':
            loadDashboard();
            if (typeof loadDashboardExtended === 'function') {
                loadDashboardExtended();
            }
            break;
        case 'informations':
            loadInformations();
            break;
        case 'projets':
            loadProjets();
            break;
        case 'reglement':
            loadReglement();
            break;
        case 'contributions':
            loadContributions();
            break;
        case 'cotisations':
            loadCotisations();
            break;
        case 'sanctions':
            loadSanctions();
            break;
        case 'taches':
            loadTaches();
            break;
        case 'documents':
            if (typeof loadDocuments === 'function') loadDocuments();
            break;
        case 'messages':
            if (typeof loadMessages === 'function') loadMessages();
            break;
        case 'reunions':
            if (typeof loadReunions === 'function') loadReunions();
            break;
        case 'performance':
            if (typeof loadPerformance === 'function') loadPerformance();
            break;
        case 'profil':
            loadProfil();
            break;
        case 'gestion':
            loadGestion();
            break;
        case 'audit':
            if (typeof loadAuditLog === 'function') loadAuditLog();
            break;
    }
}

// ==================== Dashboard ====================
function loadDashboard() {
    // Stats
    const projets = getData(DB_KEYS.PROJETS);
    const taches = getData(DB_KEYS.TACHES);
    const sanctions = getData(DB_KEYS.SANCTIONS);
    
    document.getElementById('stat-projets').textContent = projets.filter(function(p) { return p.statut === 'encours'; }).length;
    document.getElementById('stat-taches-terminees').textContent = taches.filter(function(t) { return t.statut === 'termine'; }).length;
    document.getElementById('stat-taches-encours').textContent = taches.filter(function(t) { return t.statut === 'encours'; }).length;
    document.getElementById('stat-sanctions').textContent = sanctions.length;
    
    // Recent informations
    const informations = getData(DB_KEYS.INFORMATIONS).slice(0, 5);
    const recentInfoHtml = informations.map(function(info) {
        return '<div class="recent-item"><h4>' + info.titre + '</h4><p>' + info.categorie + ' - ' + formatDate(info.date) + '</p></div>';
    }).join('');
    document.getElementById('recent-informations').innerHTML = recentInfoHtml || '<p>Aucune information</p>';
    
    // Projets en cours
    const projetsEnCours = projets.filter(function(p) { return p.statut === 'encours'; });
    const projetsHtml = projetsEnCours.map(function(projet) {
        return '<div class="recent-item"><h4>' + projet.nom + '</h4><p>Chef: ' + projet.chef + ' - Fin: ' + formatDate(projet.dateFin) + '</p></div>';
    }).join('');
    document.getElementById('projets-encours-list').innerHTML = projetsHtml || '<p>Aucun projet en cours</p>';
}

// ==================== Informations ====================
function loadInformations() {
    const informations = getData(DB_KEYS.INFORMATIONS);
    renderInformations(informations);
}

function renderInformations(data) {
    const container = document.getElementById('informations-list');
    
    if (data.length === 0) {
        container.innerHTML = '<p>Aucune information</p>';
        return;
    }
    
    container.innerHTML = data.map(function(info) {
        let actions = '';
        if (canModify('informations')) {
            actions = '<div class="card-actions"><button class="btn btn-sm btn-secondary" onclick="editInformation(' + info.id + ')">Modifier</button><button class="btn btn-sm btn-danger" onclick="deleteInformation(' + info.id + ')">Supprimer</button></div>';
        }
        
        const reactions = getData(DB_KEYS.REACTIONS).filter(r => r.itemId === info.id && r.itemType === 'information');
        const vuCount = reactions.filter(r => r.type === 'vu').length;
        const userReaction = reactions.find(r => r.userId === currentUser.id);
        
        const reactionsHtml = '<div class="info-reactions"><button class="reaction-btn ' + (userReaction && userReaction.type === 'vu' ? 'active' : '') + '" onclick="toggleReaction(' + info.id + ', \'information\', \'vu\')">👁️ Vu (' + vuCount + ')</button></div>';
        
        return '<div class="info-card"><span class="badge ' + info.priorite + '">' + info.priorite + '</span><h4>' + info.titre + '</h4><p>' + info.contenu + '</p><div class="info-meta"><span>' + info.categorie + '</span><span>' + formatDate(info.date) + '</span></div>' + reactionsHtml + actions + '</div>';
    }).join('');
}

function addInformation() {
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    
    modalTitle.textContent = 'Nouvelle information';
    modalBody.innerHTML = '<form id="info-form"><div class="form-group"><label for="info-titre">Titre</label><input type="text" id="info-titre" required></div><div class="form-group"><label for="info-contenu">Contenu</label><textarea id="info-contenu" rows="4" required></textarea></div><div class="form-group"><label for="info-categorie">Categorie</label><select id="info-categorie" required><option value="communique">Communique</option><option value="procedure">Procedure</option><option value="document">Document</option></select></div><div class="form-group"><label for="info-priorite">Priorite</label><select id="info-priorite" required><option value="haute">Haute</option><option value="moyenne">Moyenne</option><option value="basse">Basse</option></select></div><button type="submit" class="btn btn-primary btn-block">Ajouter</button></form>';
    
    modal.classList.remove('hidden');
    
    document.getElementById('info-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const informations = getData(DB_KEYS.INFORMATIONS);
        const newInfo = {
            id: generateId(DB_KEYS.INFORMATIONS),
            titre: document.getElementById('info-titre').value,
            contenu: document.getElementById('info-contenu').value,
            categorie: document.getElementById('info-categorie').value,
            priorite: document.getElementById('info-priorite').value,
            auteur: currentUser.prenom + ' ' + currentUser.nom,
            date: new Date().toISOString().split('T')[0]
        };
        
        informations.push(newInfo);
        saveData(DB_KEYS.INFORMATIONS, informations);
        
        addAuditLog('Information ajoutée', 'Information "' + newInfo.titre + '" ajoutée');
        
        closeModal();
        loadInformations();
    });
}

function editInformation(id) {
    const informations = getData(DB_KEYS.INFORMATIONS);
    const info = informations.find(function(i) { return i.id === id; });
    
    if (!info) return;
    
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    
    modalTitle.textContent = 'Modifier l\'information';
    modalBody.innerHTML = '<form id="info-form"><div class="form-group"><label for="info-titre">Titre</label><input type="text" id="info-titre" value="' + info.titre + '" required></div><div class="form-group"><label for="info-contenu">Contenu</label><textarea id="info-contenu" rows="4" required>' + info.contenu + '</textarea></div><div class="form-group"><label for="info-categorie">Categorie</label><select id="info-categorie" required><option value="communique"' + (info.categorie === 'communique' ? ' selected' : '') + '>Communique</option><option value="procedure"' + (info.categorie === 'procedure' ? ' selected' : '') + '>Procedure</option><option value="document"' + (info.categorie === 'document' ? ' selected' : '') + '>Document</option></select></div><div class="form-group"><label for="info-priorite">Priorite</label><select id="info-priorite" required><option value="haute"' + (info.priorite === 'haute' ? ' selected' : '') + '>Haute</option><option value="moyenne"' + (info.priorite === 'moyenne' ? ' selected' : '') + '>Moyenne</option><option value="basse"' + (info.priorite === 'basse' ? ' selected' : '') + '>Basse</option></select></div><button type="submit" class="btn btn-primary btn-block">Enregistrer</button></form>';
    
    modal.classList.remove('hidden');
    
    document.getElementById('info-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const index = informations.findIndex(function(i) { return i.id === id; });
        informations[index] = {
            ...informations[index],
            titre: document.getElementById('info-titre').value,
            contenu: document.getElementById('info-contenu').value,
            categorie: document.getElementById('info-categorie').value,
            priorite: document.getElementById('info-priorite').value
        };
        
        saveData(DB_KEYS.INFORMATIONS, informations);
        
        closeModal();
        loadInformations();
    });
}

function deleteInformation(id) {
    if (!confirm('Etes-vous sur de vouloir supprimer cette information?')) return;
    
    let informations = getData(DB_KEYS.INFORMATIONS);
    informations = informations.filter(function(i) { return i.id !== id; });
    saveData(DB_KEYS.INFORMATIONS, informations);
    
    loadInformations();
}

// ==================== Projets ====================
function loadProjets() {
    const projets = getData(DB_KEYS.PROJETS);
    renderProjets(projets);
}

function renderProjets(data) {
    const container = document.getElementById('projets-list');
    
    if (data.length === 0) {
        container.innerHTML = '<p>Aucun projet</p>';
        return;
    }
    
    container.innerHTML = data.map(function(projet) {
        let actions = '';
        if (currentUser.role === 'admin') {
            actions = '<div class="card-actions"><button class="btn btn-sm btn-secondary" onclick="editProjet(' + projet.id + ')">Modifier</button><button class="btn btn-sm btn-danger" onclick="deleteProjet(' + projet.id + ')">Supprimer</button></div>';
        }
        return '<div class="projet-card"><span class="badge ' + projet.statut + '">' + projet.statut + '</span><h4>' + projet.nom + '</h4><p>' + projet.description + '</p><div class="projet-meta"><span>Chef: ' + projet.chef + '</span><span>Fin: ' + formatDate(projet.dateFin) + '</span></div>' + actions + '</div>';
    }).join('');
}

function addProjet() {
    const users = getData(DB_KEYS.USERS).filter(function(u) { return u.role === 'membre'; });
    const membresOptions = users.map(function(u) { return '<option value="' + u.prenom + ' ' + u.nom + '">' + u.prenom + ' ' + u.nom + '</option>'; }).join('');
    
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    
    modalTitle.textContent = 'Nouveau projet';
    modalBody.innerHTML = '<form id="projet-form"><div class="form-group"><label for="projet-nom">Nom du projet</label><input type="text" id="projet-nom" required></div><div class="form-group"><label for="projet-description">Description</label><textarea id="projet-description" rows="3" required></textarea></div><div class="form-group"><label for="projet-date-debut">Date de debut</label><input type="date" id="projet-date-debut" required></div><div class="form-group"><label for="projet-date-fin">Date de fin</label><input type="date" id="projet-date-fin" required></div><div class="form-group"><label for="projet-statut">Statut</label><select id="projet-statut" required><option value="planifie">Planifie</option><option value="encours">En cours</option><option value="termine">Termine</option><option value="pause">En pause</option></select></div><div class="form-group"><label for="projet-chef">Chef de projet</label><select id="projet-chef" required>' + membresOptions + '</select></div><button type="submit" class="btn btn-primary btn-block">Ajouter</button></form>';
    
    modal.classList.remove('hidden');
    
    document.getElementById('projet-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const projets = getData(DB_KEYS.PROJETS);
        const newProjet = {
            id: generateId(DB_KEYS.PROJETS),
            nom: document.getElementById('projet-nom').value,
            description: document.getElementById('projet-description').value,
            dateDebut: document.getElementById('projet-date-debut').value,
            dateFin: document.getElementById('projet-date-fin').value,
            statut: document.getElementById('projet-statut').value,
            chef: document.getElementById('projet-chef').value,
            membres: [document.getElementById('projet-chef').value]
        };
        
        projets.push(newProjet);
        saveData(DB_KEYS.PROJETS, projets);
        
        closeModal();
        loadProjets();
    });
}

function editProjet(id) {
    const projets = getData(DB_KEYS.PROJETS);
    const projet = projets.find(function(p) { return p.id === id; });
    
    if (!projet) return;
    
    const users = getData(DB_KEYS.USERS).filter(function(u) { return u.role === 'membre'; });
    const membresOptions = users.map(function(u) { 
        const selected = projet.chef === (u.prenom + ' ' + u.nom) ? ' selected' : '';
        return '<option value="' + u.prenom + ' ' + u.nom + '"' + selected + '>' + u.prenom + ' ' + u.nom + '</option>'; 
    }).join('');
    
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    
    modalTitle.textContent = 'Modifier le projet';
    modalBody.innerHTML = '<form id="projet-form"><div class="form-group"><label for="projet-nom">Nom du projet</label><input type="text" id="projet-nom" value="' + projet.nom + '" required></div><div class="form-group"><label for="projet-description">Description</label><textarea id="projet-description" rows="3" required>' + projet.description + '</textarea></div><div class="form-group"><label for="projet-date-debut">Date de debut</label><input type="date" id="projet-date-debut" value="' + projet.dateDebut + '" required></div><div class="form-group"><label for="projet-date-fin">Date de fin</label><input type="date" id="projet-date-fin" value="' + projet.dateFin + '" required></div><div class="form-group"><label for="projet-statut">Statut</label><select id="projet-statut" required><option value="planifie"' + (projet.statut === 'planifie' ? ' selected' : '') + '>Planifie</option><option value="encours"' + (projet.statut === 'encours' ? ' selected' : '') + '>En cours</option><option value="termine"' + (projet.statut === 'termine' ? ' selected' : '') + '>Termine</option><option value="pause"' + (projet.statut === 'pause' ? ' selected' : '') + '>En pause</option></select></div><div class="form-group"><label for="projet-chef">Chef de projet</label><select id="projet-chef" required>' + membresOptions + '</select></div><button type="submit" class="btn btn-primary btn-block">Enregistrer</button></form>';
    
    modal.classList.remove('hidden');
    
    document.getElementById('projet-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const index = projets.findIndex(function(p) { return p.id === id; });
        projets[index] = {
            ...projets[index],
            nom: document.getElementById('projet-nom').value,
            description: document.getElementById('projet-description').value,
            dateDebut: document.getElementById('projet-date-debut').value,
            dateFin: document.getElementById('projet-date-fin').value,
            statut: document.getElementById('projet-statut').value,
            chef: document.getElementById('projet-chef').value
        };
        
        saveData(DB_KEYS.PROJETS, projets);
        
        closeModal();
        loadProjets();
    });
}

function deleteProjet(id) {
    if (!confirm('Etes-vous sur de vouloir supprimer ce projet?')) return;
    
    let projets = getData(DB_KEYS.PROJETS);
    projets = projets.filter(function(p) { return p.id !== id; });
    saveData(DB_KEYS.PROJETS, projets);
    
    loadProjets();
}

// ==================== Reglement ====================
function loadReglement() {
    const regles = getData(DB_KEYS.REGLEMENT);
    document.getElementById('reglement-date').textContent = formatDate(new Date().toISOString().split('T')[0]);
    
    const container = document.getElementById('regles-list');
    container.innerHTML = regles.map(function(regle) {
        return '<div class="regle-item"><strong>' + regle.titre + '</strong><p>' + regle.description + '</p></div>';
    }).join('');
}

function addRegle() {
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    
    modalTitle.textContent = 'Ajouter une regle';
    modalBody.innerHTML = '<form id="regle-form"><div class="form-group"><label for="regle-titre">Titre</label><input type="text" id="regle-titre" required></div><div class="form-group"><label for="regle-description">Description</label><textarea id="regle-description" rows="3" required></textarea></div><button type="submit" class="btn btn-primary btn-block">Ajouter</button></form>';
    
    modal.classList.remove('hidden');
    
    document.getElementById('regle-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const regles = getData(DB_KEYS.REGLEMENT);
        const newRegle = {
            id: generateId(DB_KEYS.REGLEMENT),
            titre: document.getElementById('regle-titre').value,
            description: document.getElementById('regle-description').value,
            date: new Date().toISOString().split('T')[0]
        };
        
        regles.push(newRegle);
        saveData(DB_KEYS.REGLEMENT, regles);
        
        closeModal();
        loadReglement();
    });
}

// ==================== Contributions ====================
function loadContributions() {
    const contributions = getData(DB_KEYS.CONTRIBUTIONS);
    const users = getData(DB_KEYS.USERS).filter(function(u) { return u.role === 'membre'; });
    
    const filterMembre = document.getElementById('filter-contribution-membre');
    filterMembre.innerHTML = '<option value="">Tous les membres</option>' + users.map(function(u) { 
        return '<option value="' + u.prenom + ' ' + u.nom + '">' + u.prenom + ' ' + u.nom + '</option>'; 
    }).join('');
    
    const totalMontant = contributions.reduce(function(sum, c) { return sum + c.montant; }, 0);
    document.getElementById('total-contributions-montant').textContent = totalMontant.toLocaleString() + ' GNF';
    document.getElementById('total-contributions-count').textContent = contributions.length;
    
    const uniqueMembers = new Set(contributions.map(c => c.membre));
    document.getElementById('membres-contribuant').textContent = uniqueMembers.size;
    
    const tableBody = document.getElementById('contributions-table');
    if (contributions.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="6">Aucune contribution</td></tr>';
    } else {
        tableBody.innerHTML = contributions.map(function(contrib) {
            let actions = '';
            if (currentUser.role === 'admin') {
                const btnText = contrib.statut === 'paye' ? 'Marquer impaye' : 'Marquer paye';
                actions = '<button class="btn btn-sm btn-secondary" onclick="toggleContributionStatut(' + contrib.id + ')">' + btnText + '</button> <button class="btn btn-sm btn-danger" onclick="deleteContribution(' + contrib.id + ')">Supprimer</button>';
            }
            const statutClass = contrib.statut === 'paye' ? 'statut-paye' : 'statut-enattente';
            return '<tr><td>' + contrib.membre + '</td><td>' + contrib.type + '</td><td class="montant">' + contrib.montant.toLocaleString() + ' GNF</td><td>' + formatDate(contrib.date) + '</td><td class="' + statutClass + '">' + contrib.statut + '</td><td>' + actions + '</td></tr>';
        }).join('');
    }
    
    const contributionsByMember = {};
    contributions.forEach(function(c) {
        if (!contributionsByMember[c.membre]) {
            contributionsByMember[c.membre] = { total: 0, count: 0 };
        }
        contributionsByMember[c.membre].total += c.montant;
        contributionsByMember[c.membre].count += 1;
    });
    
    const contribMembreBody = document.getElementById('contributions-par-membre-table');
    const memberKeys = Object.keys(contributionsByMember);
    if (memberKeys.length === 0) {
        contribMembreBody.innerHTML = '<tr><td colspan="3">Aucune contribution</td></tr>';
    } else {
        contribMembreBody.innerHTML = memberKeys.map(function(membre) {
            const data = contributionsByMember[membre];
            return '<tr><td>' + membre + '</td><td class="montant">' + data.total.toLocaleString() + ' GNF</td><td>' + data.count + '</td></tr>';
        }).join('');
    }
}

function addContribution() {
    const users = getData(DB_KEYS.USERS).filter(function(u) { return u.role === 'membre'; });
    const membresOptions = users.map(function(u) { 
        return '<option value="' + u.prenom + ' ' + u.nom + '" data-id="' + u.id + '">' + u.prenom + ' ' + u.nom + '</option>'; 
    }).join('');
    
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    
    modalTitle.textContent = 'Nouvelle contribution';
    modalBody.innerHTML = '<form id="contribution-form"><div class="form-group"><label for="contribution-membre">Membre</label><select id="contribution-membre" required>' + membresOptions + '</select></div><div class="form-group"><label for="contribution-type">Type</label><select id="contribution-type" required><option value="Sanction">Sanction</option><option value="Amende">Amende</option><option value="Penalite">Penalite</option><option value="Autre">Autre</option></select></div><div class="form-group"><label for="contribution-montant">Montant (GNF)</label><input type="number" id="contribution-montant" min="1" required></div><button type="submit" class="btn btn-primary btn-block">Ajouter</button></form>';
    
    modal.classList.remove('hidden');
    
    document.getElementById('contribution-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const selectMembre = document.getElementById('contribution-membre');
        const selectedOption = selectMembre.options[selectMembre.selectedIndex];
        
        const contributions = getData(DB_KEYS.CONTRIBUTIONS);
        const newContribution = {
            id: generateId(DB_KEYS.CONTRIBUTIONS),
            membreId: parseInt(selectedOption.dataset.id),
            membre: selectMembre.value,
            type: document.getElementById('contribution-type').value,
            montant: parseInt(document.getElementById('contribution-montant').value),
            date: new Date().toISOString().split('T')[0],
            statut: 'enattente'
        };
        
        contributions.push(newContribution);
        saveData(DB_KEYS.CONTRIBUTIONS, contributions);
        
        closeModal();
        loadContributions();
    });
}

function toggleContributionStatut(id) {
    const contributions = getData(DB_KEYS.CONTRIBUTIONS);
    const index = contributions.findIndex(function(c) { return c.id === id; });
    
    if (index !== -1) {
        contributions[index].statut = contributions[index].statut === 'paye' ? 'enattente' : 'paye';
        saveData(DB_KEYS.CONTRIBUTIONS, contributions);
        loadContributions();
    }
}

function deleteContribution(id) {
    if (!confirm('Etes-vous sur de vouloir supprimer cette contribution?')) return;
    
    let contributions = getData(DB_KEYS.CONTRIBUTIONS);
    contributions = contributions.filter(function(c) { return c.id !== id; });
    saveData(DB_KEYS.CONTRIBUTIONS, contributions);
    
    loadContributions();
}

function filterContributions() {
    const membre = document.getElementById('filter-contribution-membre').value;
    
    let contributions = getData(DB_KEYS.CONTRIBUTIONS);
    
    if (membre) {
        contributions = contributions.filter(function(c) { return c.membre === membre; });
    }
    
    loadContributions();
}

// ==================== Cotisations ====================
function loadCotisations() {
    const cotisations = getData(DB_KEYS.COTISATIONS);
    const users = getData(DB_KEYS.USERS).filter(function(u) { return u.role === 'membre'; });
    
    const totalDu = cotisations.reduce(function(sum, c) { return sum + c.montantDu; }, 0);
    const totalPaye = cotisations.reduce(function(sum, c) { return sum + c.montantPaye; }, 0);
    const tauxPaiement = totalDu > 0 ? Math.round((totalPaye / totalDu) * 100) : 0;
    
    document.getElementById('total-cotisations-du').textContent = totalDu.toLocaleString() + ' GNF';
    document.getElementById('total-cotisations-paye').textContent = totalPaye.toLocaleString() + ' GNF';
    document.getElementById('taux-paiement').textContent = tauxPaiement + '%';
    
    const tableBody = document.getElementById('cotisations-table');
    if (cotisations.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="7">Aucune cotisation</td></tr>';
    } else {
        tableBody.innerHTML = cotisations.map(function(cotisation) {
            let actions = '';
            if (currentUser.role === 'admin') {
                actions = '<button class="btn btn-sm btn-success" onclick="ajouterMontantCotisation(' + cotisation.id + ')">Ajouter</button> ';
                actions += '<button class="btn btn-sm btn-danger" onclick="retirerMontantCotisation(' + cotisation.id + ')">Retirer</button> ';
                const btnText = cotisation.statut === 'paye' ? 'Marquer impaye' : 'Marquer paye';
                actions += '<button class="btn btn-sm btn-secondary" onclick="toggleCotisationStatut(' + cotisation.id + ')">' + btnText + '</button>';
            }
            const statutClass = cotisation.statut === 'paye' ? 'statut-paye' : 'statut-enattente';
            const datePaiement = cotisation.datePaiement ? formatDate(cotisation.datePaiement) : '-';
            return '<tr><td>' + cotisation.membre + '</td><td>' + cotisation.trimestre + '</td><td class="montant">' + cotisation.montantDu.toLocaleString() + ' GNF</td><td class="montant">' + cotisation.montantPaye.toLocaleString() + ' GNF</td><td>' + datePaiement + '</td><td class="' + statutClass + '">' + cotisation.statut + '</td><td>' + actions + '</td></tr>';
        }).join('');
    }
}

function ajouterMontantCotisation(id) {
    const cotisations = getData(DB_KEYS.COTISATIONS);
    const index = cotisations.findIndex(function(c) { return c.id === id; });
    
    if (index === -1) return;
    
    const montant = prompt('Entrez le montant a ajouter (GNF):', '');
    
    if (montant === null || montant === '') return;
    
    const montantNum = parseInt(montant);
    
    if (isNaN(montantNum) || montantNum <= 0) {
        alert('Veuillez entrer un montant valide!');
        return;
    }
    
    cotisations[index].montantPaye += montantNum;
    
    if (cotisations[index].montantPaye >= cotisations[index].montantDu) {
        cotisations[index].statut = 'paye';
        cotisations[index].datePaiement = new Date().toISOString().split('T')[0];
    } else {
        cotisations[index].statut = 'impaye';
    }
    
    saveData(DB_KEYS.COTISATIONS, cotisations);
    loadCotisations();
    alert('Montant ajoute avec succes!');
}

function retirerMontantCotisation(id) {
    const cotisations = getData(DB_KEYS.COTISATIONS);
    const index = cotisations.findIndex(function(c) { return c.id === id; });
    
    if (index === -1) return;
    
    const montant = prompt('Entrez le montant a retirer (GNF):', '');
    
    if (montant === null || montant === '') return;
    
    const montantNum = parseInt(montant);
    
    if (isNaN(montantNum) || montantNum <= 0) {
        alert('Veuillez entrer un montant valide!');
        return;
    }
    
    if (montantNum > cotisations[index].montantPaye) {
        alert('Le montant a retirer ne peut pas etre superieur au montant paye (' + cotisations[index].montantPaye.toLocaleString() + ' GNF)!');
        return;
    }
    
    cotisations[index].montantPaye -= montantNum;
    
    if (cotisations[index].montantPaye >= cotisations[index].montantDu) {
        cotisations[index].statut = 'paye';
    } else {
        cotisations[index].statut = 'impaye';
        cotisations[index].datePaiement = null;
    }
    
    saveData(DB_KEYS.COTISATIONS, cotisations);
    loadCotisations();
    alert('Montant retire avec succes!');
}

function toggleCotisationStatut(id) {
    const cotisations = getData(DB_KEYS.COTISATIONS);
    const index = cotisations.findIndex(function(c) { return c.id === id; });
    
    if (index !== -1) {
        if (cotisations[index].statut === 'paye') {
            cotisations[index].statut = 'impaye';
            cotisations[index].montantPaye = 0;
            cotisations[index].datePaiement = null;
        } else {
            cotisations[index].statut = 'paye';
            cotisations[index].montantPaye = cotisations[index].montantDu;
            cotisations[index].datePaiement = new Date().toISOString().split('T')[0];
        }
        saveData(DB_KEYS.COTISATIONS, cotisations);
        loadCotisations();
    }
}

// ==================== Gestion (Admin Management) ====================
function loadGestion() {
    const users = getData(DB_KEYS.USERS);
    
    const roleLabels = {
        admin: 'Administrateur',
        cadre: 'Cadre',
        responsable: 'Responsable',
        membre: 'Membre'
    };
    
    const roleClasses = {
        admin: 'badge-admin',
        cadre: 'badge-cadre',
        responsable: 'badge-responsable',
        membre: 'badge-membre'
    };
    
    const tableBody = document.getElementById('gestion-users-table');
    tableBody.innerHTML = users.map(function(user) {
        let actions = '';
        if (currentUser.role === 'admin' && user.id !== currentUser.id) {
            actions = '<button class="btn btn-sm btn-primary" onclick="toggleUserRole(' + user.id + ')">Changer rôle</button>';
        }
        const roleClass = roleClasses[user.role] || 'badge-membre';
        const roleLabel = roleLabels[user.role] || 'Membre';
        return '<tr><td>' + user.prenom + ' ' + user.nom + '</td><td>' + user.email + '</td><td><span class="' + roleClass + '">' + roleLabel + '</span></td><td>' + formatDate(user.dateInscription) + '</td><td>' + actions + '</td></tr>';
    }).join('');
}

function toggleUserRole(userId) {
    const users = getData(DB_KEYS.USERS);
    const index = users.findIndex(function(u) { return u.id === userId; });
    
    if (index !== -1) {
        const currentRole = users[index].role;
        
        const modal = document.getElementById('modal');
        const modalTitle = document.getElementById('modal-title');
        const modalBody = document.getElementById('modal-body');
        
        modalTitle.textContent = 'Changer le rôle';
        modalBody.innerHTML = `
            <form id="role-form">
                <div class="form-group">
                    <label for="user-role-select">Sélectionnez le nouveau rôle</label>
                    <select id="user-role-select" required>
                        <option value="admin" ${currentRole === 'admin' ? 'selected' : ''}>Administrateur</option>
                        <option value="cadre" ${currentRole === 'cadre' ? 'selected' : ''}>Cadre</option>
                        <option value="responsable" ${currentRole === 'responsable' ? 'selected' : ''}>Responsable</option>
                        <option value="membre" ${currentRole === 'membre' ? 'selected' : ''}>Membre</option>
                    </select>
                </div>
                <button type="submit" class="btn btn-primary btn-block">Changer le rôle</button>
            </form>
        `;
        
        modal.classList.remove('hidden');
        
        document.getElementById('role-form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const newRole = document.getElementById('user-role-select').value;
            users[index].role = newRole;
            saveData(DB_KEYS.USERS, users);
            
            addAuditLog('Rôle modifié', `Rôle de ${users[index].prenom} ${users[index].nom} changé en ${newRole}`);
            
            closeModal();
            loadGestion();
        });
    }
}

// ==================== Sanctions ====================
function loadSanctions() {
    const sanctions = getData(DB_KEYS.SANCTIONS);
    const users = getData(DB_KEYS.USERS).filter(function(u) { return u.role === 'membre'; });
    
    // Update filter
    const filterMembre = document.getElementById('filter-membre');
    filterMembre.innerHTML = '<option value="">Tous les membres</option>' + users.map(function(u) { 
        return '<option value="' + u.prenom + ' ' + u.nom + '">' + u.prenom + ' ' + u.nom + '</option>'; 
    }).join('');
    
    // Calculate totals
    const totalContributions = sanctions.reduce(function(sum, s) { return sum + s.montant; }, 0);
    document.getElementById('total-contributions').textContent = totalContributions + ' EUR';
    document.getElementById('total-sanctions-count').textContent = sanctions.length;
    
    // Render sanctions table
    const tableBody = document.getElementById('sanctions-table');
    if (sanctions.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="6">Aucune sanction</td></tr>';
    } else {
        tableBody.innerHTML = sanctions.map(function(sanction) {
            let actions = '';
            if (currentUser.role === 'admin') {
                const btnText = sanction.statut === 'paye' ? 'Marquer impaye' : 'Marquer paye';
                actions = '<button class="btn btn-sm btn-secondary" onclick="toggleSanctionStatut(' + sanction.id + ')">' + btnText + '</button> <button class="btn btn-sm btn-danger" onclick="deleteSanction(' + sanction.id + ')">Supprimer</button>';
            }
            const statutClass = sanction.statut === 'paye' ? 'statut-paye' : 'statut-enattente';
            return '<tr><td>' + sanction.membre + '</td><td>' + sanction.motif + '</td><td class="montant">' + sanction.montant + ' EUR</td><td>' + formatDate(sanction.date) + '</td><td class="' + statutClass + '">' + sanction.statut + '</td><td>' + actions + '</td></tr>';
        }).join('');
    }
    
    // Render contributions by member
    const contributionsByMember = {};
    sanctions.forEach(function(s) {
        if (!contributionsByMember[s.membre]) {
            contributionsByMember[s.membre] = { total: 0, count: 0 };
        }
        contributionsByMember[s.membre].total += s.montant;
        contributionsByMember[s.membre].count += 1;
    });
    
    const contribBody = document.getElementById('contributions-table');
    const memberKeys = Object.keys(contributionsByMember);
    if (memberKeys.length === 0) {
        contribBody.innerHTML = '<tr><td colspan="3>Aucune contribution</td></tr>';
    } else {
        contribBody.innerHTML = memberKeys.map(function(membre) {
            const data = contributionsByMember[membre];
            return '<tr><td>' + membre + '</td><td class="montant">' + data.total + ' EUR</td><td>' + data.count + '</td></tr>';
        }).join('');
    }
}

function addSanction() {
    const users = getData(DB_KEYS.USERS).filter(function(u) { return u.role === 'membre'; });
    const membresOptions = users.map(function(u) { 
        return '<option value="' + u.prenom + ' ' + u.nom + '" data-id="' + u.id + '">' + u.prenom + ' ' + u.nom + '</option>'; 
    }).join('');
    
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    
    modalTitle.textContent = 'Nouvelle sanction';
    modalBody.innerHTML = '<form id="sanction-form"><div class="form-group"><label for="sanction-membre">Membre</label><select id="sanction-membre" required>' + membresOptions + '</select></div><div class="form-group"><label for="sanction-motif">Motif</label><input type="text" id="sanction-motif" required></div><div class="form-group"><label for="sanction-montant">Montant (EUR)</label><input type="number" id="sanction-montant" min="1" required></div><button type="submit" class="btn btn-primary btn-block">Ajouter</button></form>';
    
    modal.classList.remove('hidden');
    
    document.getElementById('sanction-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const selectMembre = document.getElementById('sanction-membre');
        const selectedOption = selectMembre.options[selectMembre.selectedIndex];
        
        const sanctions = getData(DB_KEYS.SANCTIONS);
        const newSanction = {
            id: generateId(DB_KEYS.SANCTIONS),
            membreId: parseInt(selectedOption.dataset.id),
            membre: selectMembre.value,
            motif: document.getElementById('sanction-motif').value,
            montant: parseInt(document.getElementById('sanction-montant').value),
            date: new Date().toISOString().split('T')[0],
            statut: 'enattente'
        };
        
        sanctions.push(newSanction);
        saveData(DB_KEYS.SANCTIONS, sanctions);
        
        closeModal();
        loadSanctions();
    });
}

function toggleSanctionStatut(id) {
    const sanctions = getData(DB_KEYS.SANCTIONS);
    const index = sanctions.findIndex(function(s) { return s.id === id; });
    
    if (index !== -1) {
        sanctions[index].statut = sanctions[index].statut === 'paye' ? 'enattente' : 'paye';
        saveData(DB_KEYS.SANCTIONS, sanctions);
        loadSanctions();
    }
}

function deleteSanction(id) {
    if (!confirm('Etes-vous sur de vouloir supprimer cette sanction?')) return;
    
    let sanctions = getData(DB_KEYS.SANCTIONS);
    sanctions = sanctions.filter(function(s) { return s.id !== id; });
    saveData(DB_KEYS.SANCTIONS, sanctions);
    
    loadSanctions();
}

// ==================== Taches ====================
function loadTaches() {
    const taches = getData(DB_KEYS.TACHES);
    const users = getData(DB_KEYS.USERS).filter(function(u) { return u.role === 'membre'; });
    
    // Update filters
    const filterTacheMembre = document.getElementById('filter-tache-membre');
    filterTacheMembre.innerHTML = '<option value="">Tous les membres</option>' + users.map(function(u) { 
        return '<option value="' + u.prenom + ' ' + u.nom + '">' + u.prenom + ' ' + u.nom + '</option>'; 
    }).join('');
    
    renderTaches(taches);
}

function renderTaches(data) {
    const container = document.getElementById('taches-list');
    
    if (data.length === 0) {
        container.innerHTML = '<p>Aucune tache</p>';
        return;
    }
    
    container.innerHTML = data.map(function(tache) {
        let actions = '';
        if (currentUser.role === 'admin') {
            actions = '<div class="card-actions"><button class="btn btn-sm btn-secondary" onclick="editTache(' + tache.id + ')">Modifier</button><button class="btn btn-sm btn-danger" onclick="deleteTache(' + tache.id + ')">Supprimer</button></div>';
        }
        return '<div class="tache-card ' + tache.statut + '"><div class="tache-header"><h4>' + tache.titre + '</h4><span class="badge ' + tache.priorite + '">' + tache.priorite + '</span></div><p>' + tache.description + '</p><div class="tache-meta"><span class="tache-assignee"><span class="avatar-small">' + tache.assignee.substring(0, 2).toUpperCase() + '</span>' + tache.assignee + '</span><span>Echeance: ' + formatDate(tache.dateEcheance) + '</span></div>' + actions + '</div>';
    }).join('');
}

function addTache() {
    const users = getData(DB_KEYS.USERS).filter(function(u) { return u.role === 'membre'; });
    const membresOptions = users.map(function(u) { return '<option value="' + u.prenom + ' ' + u.nom + '">' + u.prenom + ' ' + u.nom + '</option>'; }).join('');
    
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    
    modalTitle.textContent = 'Nouvelle tache';
    modalBody.innerHTML = '<form id="tache-form"><div class="form-group"><label for="tache-titre">Titre</label><input type="text" id="tache-titre" required></div><div class="form-group"><label for="tache-description">Description</label><textarea id="tache-description" rows="3" required></textarea></div><div class="form-group"><label for="tache-priorite">Priorite</label><select id="tache-priorite" required><option value="haute">Haute</option><option value="moyenne">Moyenne</option><option value="basse">Basse</option></select></div><div class="form-group"><label for="tache-statut">Statut</label><select id="tache-statut" required><option value="afaire">A faire</option><option value="encours">En cours</option><option value="termine">Termine</option></select></div><div class="form-group"><label for="tache-assignee">Assigner a</label><select id="tache-assignee" required>' + membresOptions + '</select></div><div class="form-group"><label for="tache-echeance">Date d\'echeance</label><input type="date" id="tache-echeance" required></div><button type="submit" class="btn btn-primary btn-block">Ajouter</button></form>';
    
    modal.classList.remove('hidden');
    
    document.getElementById('tache-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const taches = getData(DB_KEYS.TACHES);
        const newTache = {
            id: generateId(DB_KEYS.TACHES),
            titre: document.getElementById('tache-titre').value,
            description: document.getElementById('tache-description').value,
            priorite: document.getElementById('tache-priorite').value,
            statut: document.getElementById('tache-statut').value,
            assignee: document.getElementById('tache-assignee').value,
            dateEcheance: document.getElementById('tache-echeance').value,
            creePar: currentUser.prenom + ' ' + currentUser.nom,
            dateCreation: new Date().toISOString().split('T')[0]
        };
        
        taches.push(newTache);
        saveData(DB_KEYS.TACHES, taches);
        
        closeModal();
        loadTaches();
    });
}

function editTache(id) {
    const taches = getData(DB_KEYS.TACHES);
    const tache = taches.find(function(t) { return t.id === id; });
    
    if (!tache) return;
    
    const users = getData(DB_KEYS.USERS).filter(function(u) { return u.role === 'membre'; });
    const membresOptions = users.map(function(u) { 
        const selected = tache.assignee === (u.prenom + ' ' + u.nom) ? ' selected' : '';
        return '<option value="' + u.prenom + ' ' + u.nom + '"' + selected + '>' + u.prenom + ' ' + u.nom + '</option>'; 
    }).join('');
    
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    
    modalTitle.textContent = 'Modifier la tache';
    modalBody.innerHTML = '<form id="tache-form"><div class="form-group"><label for="tache-titre">Titre</label><input type="text" id="tache-titre" value="' + tache.titre + '" required></div><div class="form-group"><label for="tache-description">Description</label><textarea id="tache-description" rows="3" required>' + tache.description + '</textarea></div><div class="form-group"><label for="tache-priorite">Priorite</label><select id="tache-priorite" required><option value="haute"' + (tache.priorite === 'haute' ? ' selected' : '') + '>Haute</option><option value="moyenne"' + (tache.priorite === 'moyenne' ? ' selected' : '') + '>Moyenne</option><option value="basse"' + (tache.priorite === 'basse' ? ' selected' : '') + '>Basse</option></select></div><div class="form-group"><label for="tache-statut">Statut</label><select id="tache-statut" required><option value="afaire"' + (tache.statut === 'afaire' ? ' selected' : '') + '>A faire</option><option value="encours"' + (tache.statut === 'encours' ? ' selected' : '') + '>En cours</option><option value="termine"' + (tache.statut === 'termine' ? ' selected' : '') + '>Termine</option></select></div><div class="form-group"><label for="tache-assignee">Assigner a</label><select id="tache-assignee" required>' + membresOptions + '</select></div><div class="form-group"><label for="tache-echeance">Date d\'echeance</label><input type="date" id="tache-echeance" value="' + tache.dateEcheance + '" required></div><button type="submit" class="btn btn-primary btn-block">Enregistrer</button></form>';
    
    modal.classList.remove('hidden');
    
    document.getElementById('tache-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const index = taches.findIndex(function(t) { return t.id === id; });
        taches[index] = {
            ...taches[index],
            titre: document.getElementById('tache-titre').value,
            description: document.getElementById('tache-description').value,
            priorite: document.getElementById('tache-priorite').value,
            statut: document.getElementById('tache-statut').value,
            assignee: document.getElementById('tache-assignee').value,
            dateEcheance: document.getElementById('tache-echeance').value
        };
        
        saveData(DB_KEYS.TACHES, taches);
        
        closeModal();
        loadTaches();
    });
}

function deleteTache(id) {
    if (!confirm('Etes-vous sur de vouloir supprimer cette tache?')) return;
    
    let taches = getData(DB_KEYS.TACHES);
    taches = taches.filter(function(t) { return t.id !== id; });
    saveData(DB_KEYS.TACHES, taches);
    
    loadTaches();
}

// ==================== Profil ====================
function loadProfil() {
    if (currentUser) {
        document.getElementById('profil-nom').textContent = currentUser.prenom + ' ' + currentUser.nom;
        document.getElementById('profil-email').textContent = currentUser.email;
        document.getElementById('profil-role').textContent = currentUser.role === 'admin' ? 'Administrateur' : 'Membre';
        document.getElementById('profil-date').textContent = formatDate(currentUser.dateInscription);
        
        document.getElementById('profil-nom-input').value = currentUser.prenom + ' ' + currentUser.nom;
        document.getElementById('profil-email-input').value = currentUser.email;
        document.getElementById('profil-photo-input').value = currentUser.photo || '';
        
        updateAvatarDisplay();
    }
}

function updateProfil(e) {
    e.preventDefault();
    
    const newNom = document.getElementById('profil-nom-input').value;
    const newEmail = document.getElementById('profil-email-input').value;
    const newPhoto = document.getElementById('profil-photo-input').value;
    
    const users = getData(DB_KEYS.USERS);
    const index = users.findIndex(function(u) { return u.id === currentUser.id; });
    
    if (index !== -1) {
        const nameParts = newNom.split(' ');
        users[index].prenom = nameParts[0] || users[index].prenom;
        users[index].nom = nameParts.slice(1).join(' ') || users[index].nom;
        users[index].email = newEmail;
        users[index].photo = newPhoto || users[index].photo;
        
        saveData(DB_KEYS.USERS, users);
        currentUser = users[index];
        localStorage.setItem(DB_KEYS.SESSION, JSON.stringify(currentUser));
        
        alert('Profil mis a jour avec succes!');
        loadProfil();
        updateUserInfo();
        updateAvatarDisplay();
    }
}

function updateAvatarDisplay() {
    const avatars = document.querySelectorAll('.profil-avatar, .user-avatar');
    avatars.forEach(function(avatar) {
        if (currentUser && currentUser.photo) {
            avatar.innerHTML = '<img src="' + currentUser.photo + '" alt="Photo" style="width:100%;height:100%;object-fit:cover;border-radius:50%;">';
        } else {
            avatar.innerHTML = '<svg width="64" height="64" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"/></svg>';
        }
    });
}

function changePassword(e) {
    e.preventDefault();
    
    const currentPassword = document.getElementById('current-password').value;
    const newPassword = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    
    if (currentPassword !== currentUser.password) {
        alert('Le mot de passe actuel est incorrect!');
        return;
    }
    
    if (newPassword !== confirmPassword) {
        alert('Les mots de passe ne correspondent pas!');
        return;
    }
    
    if (newPassword.length < 6) {
        alert('Le mot de passe doit contenir au moins 6 caracteres!');
        return;
    }
    
    const users = getData(DB_KEYS.USERS);
    const index = users.findIndex(function(u) { return u.id === currentUser.id; });
    
    if (index !== -1) {
        users[index].password = newPassword;
        saveData(DB_KEYS.USERS, users);
        currentUser.password = newPassword;
        localStorage.setItem(DB_KEYS.SESSION, JSON.stringify(currentUser));
        
        alert('Mot de passe change avec succes!');
        document.getElementById('password-form').reset();
    }
}

// ==================== Modal ====================
function closeModal() {
    document.getElementById('modal').classList.add('hidden');
}

// ==================== Filters ====================
function filterInformations() {
    const categorie = document.getElementById('filter-categorie').value;
    const priorite = document.getElementById('filter-priorite').value;
    
    let informations = getData(DB_KEYS.INFORMATIONS);
    
    if (categorie) {
        informations = informations.filter(function(i) { return i.categorie === categorie; });
    }
    if (priorite) {
        informations = informations.filter(function(i) { return i.priorite === priorite; });
    }
    
    renderInformations(informations);
}

function filterProjets() {
    const statut = document.getElementById('filter-projet-statut').value;
    
    let projets = getData(DB_KEYS.PROJETS);
    
    if (statut) {
        projets = projets.filter(function(p) { return p.statut === statut; });
    }
    
    renderProjets(projets);
}

function filterSanctions() {
    const membre = document.getElementById('filter-membre').value;
    
    let sanctions = getData(DB_KEYS.SANCTIONS);
    
    if (membre) {
        sanctions = sanctions.filter(function(s) { return s.membre === membre; });
    }
    
    loadSanctionsDisplay(sanctions);
}

function loadSanctionsDisplay(sanctions) {
    const totalContributions = sanctions.reduce(function(sum, s) { return sum + s.montant; }, 0);
    document.getElementById('total-contributions').textContent = totalContributions + ' EUR';
    document.getElementById('total-sanctions-count').textContent = sanctions.length;
    
    const tableBody = document.getElementById('sanctions-table');
    if (sanctions.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="6">Aucune sanction</td></tr>';
    } else {
        tableBody.innerHTML = sanctions.map(function(sanction) {
            let actions = '';
            if (currentUser.role === 'admin') {
                const btnText = sanction.statut === 'paye' ? 'Marquer impaye' : 'Marquer paye';
                actions = '<button class="btn btn-sm btn-secondary" onclick="toggleSanctionStatut(' + sanction.id + ')">' + btnText + '</button> <button class="btn btn-sm btn-danger" onclick="deleteSanction(' + sanction.id + ')">Supprimer</button>';
            }
            const statutClass = sanction.statut === 'paye' ? 'statut-paye' : 'statut-enattente';
            return '<tr><td>' + sanction.membre + '</td><td>' + sanction.motif + '</td><td class="montant">' + sanction.montant + ' EUR</td><td>' + formatDate(sanction.date) + '</td><td class="' + statutClass + '">' + sanction.statut + '</td><td>' + actions + '</td></tr>';
        }).join('');
    }
}

function filterTaches() {
    const statut = document.getElementById('filter-tache-statut').value;
    const membre = document.getElementById('filter-tache-membre').value;
    
    let taches = getData(DB_KEYS.TACHES);
    
    if (statut) {
        taches = taches.filter(function(t) { return t.statut === statut; });
    }
    if (membre) {
        taches = taches.filter(function(t) { return t.assignee === membre; });
    }
    
    renderTaches(taches);
}

// ==================== Event Listeners ====================
document.addEventListener('DOMContentLoaded', function() {
    // Initialize data
    initDefaultData();
    
    // Check session
    if (!checkSession()) {
        showLogin();
    }
    
    // Reset data button
    const resetDataBtn = document.getElementById('reset-data-btn');
    if (resetDataBtn) {
        resetDataBtn.addEventListener('click', function() {
            if (confirm('Voulez-vous vraiment réinitialiser toutes les données? Cette action est irréversible.')) {
                // Clear all localStorage
                Object.values(DB_KEYS).forEach(function(key) {
                    localStorage.removeItem(key);
                });
                
                // Reinitialize
                initDefaultData();
                
                alert('Données réinitialisées avec succès! Vous pouvez maintenant vous connecter.');
                location.reload();
            }
        });
    }
    
    // Login form
    document.getElementById('login-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        const result = login(email, password);
        if (result.success) {
            showApp();
        } else {
            document.getElementById('login-error').textContent = result.message;
        }
    });
    
    // Logout
    document.getElementById('logout-btn').addEventListener('click', logout);
    
    // Navigation
    document.querySelectorAll('.nav-item[data-page]').forEach(function(item) {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            navigateTo(this.dataset.page);
        });
    });
    
    // Mobile menu toggle
    document.getElementById('menu-toggle').addEventListener('click', function() {
        document.querySelector('.sidebar').classList.toggle('open');
    });
    
    // Modal close
    document.getElementById('modal-close').addEventListener('click', closeModal);
    document.getElementById('modal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeModal();
        }
    });
    
    // Add buttons
    document.getElementById('add-info-btn').addEventListener('click', addInformation);
    document.getElementById('add-projet-btn').addEventListener('click', addProjet);
    document.getElementById('add-regle-btn').addEventListener('click', addRegle);
    document.getElementById('add-contribution-btn').addEventListener('click', addContribution);
    document.getElementById('add-sanction-btn').addEventListener('click', addSanction);
    document.getElementById('add-tache-btn').addEventListener('click', addTache);
    
    const addDocBtn = document.getElementById('add-document-btn');
    const addMsgBtn = document.getElementById('add-message-btn');
    const addReunionBtn = document.getElementById('add-reunion-btn');
    
    if (addDocBtn) addDocBtn.addEventListener('click', ajouterDocument);
    if (addMsgBtn) addMsgBtn.addEventListener('click', publierMessage);
    if (addReunionBtn) addReunionBtn.addEventListener('click', ajouterReunion);
    
    // Filters
    document.getElementById('filter-categorie').addEventListener('change', filterInformations);
    document.getElementById('filter-priorite').addEventListener('change', filterInformations);
    document.getElementById('filter-projet-statut').addEventListener('change', filterProjets);
    document.getElementById('filter-contribution-membre').addEventListener('change', filterContributions);
    document.getElementById('filter-membre').addEventListener('change', filterSanctions);
    document.getElementById('filter-tache-statut').addEventListener('change', filterTaches);
    document.getElementById('filter-tache-membre').addEventListener('change', filterTaches);
    
    // Profile forms
    document.getElementById('profil-form').addEventListener('submit', updateProfil);
    document.getElementById('password-form').addEventListener('submit', changePassword);
});

// ==================== Fonctions de secours pour nouvelles sections ====================
function loadDocuments() {
    const documents = getData(DB_KEYS.DOCUMENTS);
    const container = document.getElementById('documents-list');
    
    if (!container) return;
    
    if (documents.length === 0) {
        container.innerHTML = '<div class="card"><p>Aucun document pour le moment.</p></div>';
        return;
    }
    
    const groupedDocs = {};
    documents.forEach(doc => {
        if (!groupedDocs[doc.categorie]) {
            groupedDocs[doc.categorie] = [];
        }
        groupedDocs[doc.categorie].push(doc);
    });
    
    container.innerHTML = Object.keys(groupedDocs).map(categorie => {
        const docs = groupedDocs[categorie];
        return '<div class="card"><h3>' + categorie + '</h3>' +
            docs.map(doc => '<div style="padding: 12px; background: #f7fafc; border-radius: 8px; margin-bottom: 8px;"><strong>' + doc.nom + '</strong><p>' + (doc.description || '') + '</p><small>Ajouté le ' + formatDate(doc.dateAjout) + ' par ' + doc.ajoutePar + '</small></div>').join('') +
            '</div>';
    }).join('');
}

function loadMessages() {
    const messages = getData(DB_KEYS.MESSAGES).sort((a, b) => new Date(b.date) - new Date(a.date));
    const container = document.getElementById('messages-list');
    
    if (!container) return;
    
    if (messages.length === 0) {
        container.innerHTML = '<div class="card"><p>Aucun message. Publiez le premier!</p></div>';
        return;
    }
    
    container.innerHTML = messages.map(msg => {
        return '<div class="card" style="margin-bottom: 20px;"><h3>' + msg.titre + '</h3><p>' + msg.contenu + '</p><div style="font-size: 12px; color: #718096; margin-top: 12px;">Par ' + msg.auteur + ' - ' + formatDate(msg.date) + '</div></div>';
    }).join('');
}

function loadReunions() {
    const reunions = getData(DB_KEYS.REUNIONS).sort((a, b) => new Date(b.date) - new Date(a.date));
    const container = document.getElementById('reunions-list');
    
    if (!container) return;
    
    if (reunions.length === 0) {
        container.innerHTML = '<div class="card"><p>Aucune réunion planifiée.</p></div>';
        return;
    }
    
    container.innerHTML = reunions.map(reunion => {
        return '<div class="card" style="margin-bottom: 16px;"><h3>' + reunion.titre + '</h3><p>' + reunion.description + '</p><div style="margin-top: 12px;"><strong>Date:</strong> ' + formatDate(reunion.date) + ' à ' + reunion.heure + '<br><strong>Lieu:</strong> ' + reunion.lieu + '</div></div>';
    }).join('');
}

function loadPerformance() {
    const container = document.getElementById('performance-container');
    if (!container) return;
    
    if (!currentUser) return;
    
    const userName = currentUser.prenom + ' ' + currentUser.nom;
    const taches = getData(DB_KEYS.TACHES).filter(t => t.assignee === userName);
    const tachesRealisees = taches.filter(t => t.statut === 'termine').length;
    const tachesEnRetard = taches.filter(t => new Date(t.dateEcheance) < new Date() && t.statut !== 'termine').length;
    const sanctions = getData(DB_KEYS.SANCTIONS).filter(s => s.membreId === currentUser.id).length;
    const tauxReussite = taches.length > 0 ? Math.round((tachesRealisees / taches.length) * 100) : 0;
    
    container.innerHTML = '<div class="card"><h3>Mes Statistiques</h3><div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 16px; margin-top: 16px;"><div style="text-align: center; padding: 16px; background: #f7fafc; border-radius: 8px;"><div style="font-size: 32px; font-weight: 700; color: #1a365d;">' + tachesRealisees + '</div><div style="font-size: 12px; color: #718096;">Tâches réalisées</div></div><div style="text-align: center; padding: 16px; background: #f7fafc; border-radius: 8px;"><div style="font-size: 32px; font-weight: 700; color: #e53e3e;">' + tachesEnRetard + '</div><div style="font-size: 12px; color: #718096;">Tâches en retard</div></div><div style="text-align: center; padding: 16px; background: #f7fafc; border-radius: 8px;"><div style="font-size: 32px; font-weight: 700; color: #d69e2e;">' + sanctions + '</div><div style="font-size: 12px; color: #718096;">Sanctions</div></div><div style="text-align: center; padding: 16px; background: #f7fafc; border-radius: 8px;"><div style="font-size: 32px; font-weight: 700; color: #38a169;">' + tauxReussite + '%</div><div style="font-size: 12px; color: #718096;">Taux de réussite</div></div></div></div>';
}

function loadAuditLog() {
    const logs = getData(DB_KEYS.AUDIT_LOG).sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 50);
    const tableBody = document.getElementById('audit-log-table');
    
    if (!tableBody) return;
    
    if (logs.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="4">Aucune entrée dans le journal</td></tr>';
        return;
    }
    
    tableBody.innerHTML = logs.map(log => {
        return '<tr><td>' + formatDateTime(log.date) + '</td><td>' + log.utilisateur + '</td><td>' + log.action + '</td><td>' + log.details + '</td></tr>';
    }).join('');
}

function loadDashboardExtended() {
    const container1 = document.getElementById('dashboard-annonces');
    const container2 = document.getElementById('dashboard-taches');
    const container3 = document.getElementById('dashboard-alertes');
    const container4 = document.getElementById('dashboard-notifications');
    const container5 = document.getElementById('dashboard-raccourcis');
    
    if (container1) {
        const informations = getData(DB_KEYS.INFORMATIONS).sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 3);
        if (informations.length === 0) {
            container1.innerHTML = '<p class="text-muted">Aucune annonce récente</p>';
        } else {
            container1.innerHTML = informations.map(info => 
                '<div style="padding: 12px; background: #f7fafc; border-radius: 8px; margin-bottom: 8px; cursor: pointer;" onclick="navigateTo(\'informations\')"><strong>' + info.titre + '</strong><p style="font-size: 13px; color: #718096; margin-top: 4px;">' + info.contenu.substring(0, 80) + '...</p></div>'
            ).join('');
        }
    }
    
    if (container2 && currentUser) {
        const userName = currentUser.prenom + ' ' + currentUser.nom;
        const taches = getData(DB_KEYS.TACHES).filter(t => t.assignee === userName && t.statut !== 'termine').sort((a, b) => new Date(a.dateEcheance) - new Date(b.dateEcheance)).slice(0, 5);
        if (taches.length === 0) {
            container2.innerHTML = '<p class="text-muted">Aucune tâche en cours</p>';
        } else {
            container2.innerHTML = taches.map(t => {
                const isRetard = new Date(t.dateEcheance) < new Date();
                return '<div style="padding: 12px; background: ' + (isRetard ? '#fed7d7' : '#f7fafc') + '; border-radius: 8px; margin-bottom: 8px; border-left: 3px solid ' + (isRetard ? '#e53e3e' : '#1a365d') + ';"><strong>' + t.titre + '</strong>' + (isRetard ? ' <span style="color: #e53e3e;">⚠️ RETARD</span>' : '') + '<p style="font-size: 12px; color: #718096; margin-top: 4px;">Échéance: ' + formatDate(t.dateEcheance) + '</p></div>';
            }).join('');
        }
    }
    
    if (container3) {
        const tachesEnRetard = getData(DB_KEYS.TACHES).filter(t => new Date(t.dateEcheance) < new Date() && t.statut !== 'termine').length;
        let alertes = [];
        if (tachesEnRetard > 0) {
            alertes.push('<div style="padding: 12px; background: #fed7d7; color: #c53030; border-radius: 8px; margin-bottom: 8px; border-left: 4px solid #e53e3e;">' + tachesEnRetard + ' tâche(s) en retard</div>');
        }
        if (currentUser && (currentUser.role === 'admin' || currentUser.role === 'cadre')) {
            const cotisationsImpayees = getData(DB_KEYS.COTISATIONS).filter(c => c.statut === 'impaye').length;
            if (cotisationsImpayees > 0) {
                alertes.push('<div style="padding: 12px; background: #feebc8; color: #c05621; border-radius: 8px; margin-bottom: 8px; border-left: 4px solid #d69e2e;">' + cotisationsImpayees + ' cotisation(s) impayée(s)</div>');
            }
        }
        container3.innerHTML = alertes.length > 0 ? alertes.join('') : '<p class="text-muted">Aucune alerte</p>';
    }
    
    if (container4 && currentUser) {
        const notifications = getData(DB_KEYS.NOTIFICATIONS).filter(n => n.userId === currentUser.id && !n.lu).slice(0, 5);
        if (notifications.length === 0) {
            container4.innerHTML = '<p class="text-muted">Aucune notification</p>';
        } else {
            container4.innerHTML = notifications.map(n => 
                '<div style="padding: 12px; background: #f7fafc; border-radius: 8px; margin-bottom: 8px;"><strong>' + n.titre + '</strong><p style="font-size: 12px; color: #718096; margin-top: 4px;">' + n.message + '</p></div>'
            ).join('');
        }
    }
    
    if (container5) {
        const raccourcis = [
            { page: 'informations', label: 'Informations', color: '#1a365d' },
            { page: 'taches', label: 'Tâches', color: '#d69e2e' },
            { page: 'documents', label: 'Documents', color: '#38a169' },
            { page: 'messages', label: 'Messages', color: '#805ad5' }
        ].filter(r => hasPermission(r.page));
        
        container5.innerHTML = '<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 16px;">' + 
            raccourcis.map(r => 
                '<div style="padding: 20px; background: ' + r.color + '; color: white; text-align: center; border-radius: 12px; cursor: pointer;" onclick="navigateTo(\'' + r.page + '\')">' + r.label + '</div>'
            ).join('') + 
            '</div>';
    }
}


function ajouterDocument() {
    if (!canModify('documents')) {
        alert('Vous n avez pas la permission d ajouter des documents');
        return;
    }
    
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    
    modalTitle.textContent = 'Ajouter un document';
    modalBody.innerHTML = '<form id=" document-form\><div class=\form-group\><label for=\doc-nom\>Nom du document</label><input type=\text\ id=\doc-nom\ required></div><div class=\form-group\><label for=\doc-description\>Description</label><textarea id=\doc-description\ rows=\2\></textarea></div><div class=\form-group\><label for=\doc-categorie\>Categorie</label><select id=\doc-categorie\ required><option value=\Procedures\>Procedures</option><option value=\Rapports\>Rapports</option><option value=\Formulaires\>Formulaires</option><option value=\Autres\>Autres</option></select></div><div class=\form-group\><label for=\doc-url\>URL du fichier</label><input type=\url\ id=\doc-url\ placeholder=\https://exemple.com/fichier.pdf\ required></div><button type=\submit\ class=\btn btn-primary btn-block\>Ajouter</button></form>';
 
 modal.classList.remove('hidden');
 
 document.getElementById('document-form').addEventListener('submit', function(e) {
 e.preventDefault();
 
 const documents = getData(DB_KEYS.DOCUMENTS);
 const newDoc = {
 id: generateId(DB_KEYS.DOCUMENTS),
 nom: document.getElementById('doc-nom').value,
 description: document.getElementById('doc-description').value,
 categorie: document.getElementById('doc-categorie').value,
 url: document.getElementById('doc-url').value,
 type: 'pdf',
 ajoutePar: currentUser.prenom + ' ' + currentUser.nom,
 dateAjout: new Date().toISOString().split('T')[0]
 };
 
 documents.push(newDoc);
 saveData(DB_KEYS.DOCUMENTS, documents);
 addAuditLog('Document ajoute', 'Document \ + newDoc.nom + \ ajoute dans ' + newDoc.categorie);
 
 closeModal();
 loadDocuments();
 });
}

function publierMessage() {
 const modal = document.getElementById('modal');
 const modalTitle = document.getElementById('modal-title');
 const modalBody = document.getElementById('modal-body');
 
 modalTitle.textContent = 'Publier un message';
 modalBody.innerHTML = '<form id=\message-form\><div class=\form-group\><label for=\msg-titre\>Titre</label><input type=\text\ id=\msg-titre\ required></div><div class=\form-group\><label for=\msg-contenu\>Contenu</label><textarea id=\msg-contenu\ rows=\6\ required></textarea></div><button type=\submit\ class=\btn btn-primary btn-block\>Publier</button></form>';
 
 modal.classList.remove('hidden');
 
 document.getElementById('message-form').addEventListener('submit', function(e) {
 e.preventDefault();
 
 const messages = getData(DB_KEYS.MESSAGES);
 const newMsg = {
 id: generateId(DB_KEYS.MESSAGES),
 titre: document.getElementById('msg-titre').value,
 contenu: document.getElementById('msg-contenu').value,
 auteur: currentUser.prenom + ' ' + currentUser.nom,
 auteurId: currentUser.id,
 date: new Date().toISOString()
 };
 
 messages.push(newMsg);
 saveData(DB_KEYS.MESSAGES, messages);
 addAuditLog('Message publie', 'Message \ + newMsg.titre + \ publie');
 
 closeModal();
 loadMessages();
 });
}

function ajouterReunion() {
 if (!canModify('reunions')) {
 alert('Vous n avez pas la permission de planifier des reunions');
 return;
 }
 
 const modal = document.getElementById('modal');
 const modalTitle = document.getElementById('modal-title');
 const modalBody = document.getElementById('modal-body');
 
 modalTitle.textContent = 'Planifier une reunion';
 modalBody.innerHTML = '<form id=\reunion-form\><div class=\form-group\><label for=\reunion-titre\>Titre</label><input type=\text\ id=\reunion-titre\ required></div><div class=\form-group\><label for=\reunion-description\>Description</label><textarea id=\reunion-description\ rows=\3\ required></textarea></div><div class=\form-group\><label for=\reunion-date\>Date</label><input type=\date\ id=\reunion-date\ required></div><div class=\form-group\><label for=\reunion-heure\>Heure</label><input type=\time\ id=\reunion-heure\ required></div><div class=\form-group\><label for=\reunion-lieu\>Lieu</label><input type=\text\ id=\reunion-lieu\ required></div><button type=\submit\ class=\btn btn-primary btn-block\>Planifier</button></form>';
 
 modal.classList.remove('hidden');
 
 document.getElementById('reunion-form').addEventListener('submit', function(e) {
 e.preventDefault();
 
 const reunions = getData(DB_KEYS.REUNIONS);
 const newReunion = {
 id: generateId(DB_KEYS.REUNIONS),
 titre: document.getElementById('reunion-titre').value,
 description: document.getElementById('reunion-description').value,
 date: document.getElementById('reunion-date').value,
 heure: document.getElementById('reunion-heure').value,
 lieu: document.getElementById('reunion-lieu').value,
 participants: [],
 statut: 'planifie',
 creePar: currentUser.prenom + ' ' + currentUser.nom,
 dateCreation: new Date().toISOString().split('T')[0]
 };
 
 reunions.push(newReunion);
 saveData(DB_KEYS.REUNIONS, reunions);
 addAuditLog('Reunion planifiee', 'Reunion \ + newReunion.titre + \ le ' + formatDate(newReunion.date));
 
 closeModal();
 loadReunions();
 });
}
