// ==================== Data Management ====================
const DB_KEYS = {
    USERS: 'intranet_users',
    INFORMATIONS: 'intranet_informations',
    PROJETS: 'intranet_projets',
    REGLEMENT: 'intranet_reglement',
    CONTRIBUTIONS: 'intranet_contributions',
    SANCTIONS: 'intranet_sanctions',
    TACHES: 'intranet_taches',
    SESSION: 'intranet_session'
};

// Default data initialization
function initDefaultData() {
    // Initialize users if not exists
    if (!localStorage.getItem(DB_KEYS.USERS)) {
        const users = [];
        
        // Admin user
        users.push({
            id: 1,
            email: 'karifadoumbouya004@gmail.com',
            password: 'Conakry224',
            nom: 'Admin',
            prenom: 'Kari',
            role: 'admin',
            dateInscription: '2024-01-01'
        });
        
        // 20 member users
        for (let i = 1; i <= 20; i++) {
            const num = i.toString().padStart(2, '0');
            users.push({
                id: i + 1,
                email: `Membres${num}@entreprise.fr`,
                password: 'membre123',
                nom: `Membre${num}`,
                prenom: 'Employe',
                role: 'membre',
                dateInscription: '2024-01-01'
            });
        }
        
        localStorage.setItem(DB_KEYS.USERS, JSON.stringify(users));
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
    navigateTo('dashboard');
}

function updateUserInfo() {
    if (currentUser) {
        document.getElementById('user-name').textContent = currentUser.prenom + ' ' + currentUser.nom;
        document.getElementById('user-role').textContent = currentUser.role === 'admin' ? 'Administrateur' : 'Membre';
    }
}

function navigateTo(page) {
    // Update nav
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        if (item.dataset.page === page) {
            item.classList.add('active');
        }
    });
    
    // Update page
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById('page-' + page).classList.add('active');
    
    // Load page data
    loadPageData(page);
}

function loadPageData(page) {
    switch(page) {
        case 'dashboard':
            loadDashboard();
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
        case 'sanctions':
            loadSanctions();
            break;
        case 'taches':
            loadTaches();
            break;
        case 'profil':
            loadProfil();
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
        if (currentUser.role === 'admin') {
            actions = '<div class="card-actions"><button class="btn btn-sm btn-secondary" onclick="editInformation(' + info.id + ')">Modifier</button><button class="btn btn-sm btn-danger" onclick="deleteInformation(' + info.id + ')">Supprimer</button></div>';
        }
        return '<div class="info-card"><span class="badge ' + info.priorite + '">' + info.priorite + '</span><h4>' + info.titre + '</h4><p>' + info.contenu + '</p><div class="info-meta"><span>' + info.categorie + '</span><span>' + formatDate(info.date) + '</span></div>' + actions + '</div>';
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
    document.getElementById('add-sanction-btn').addEventListener('click', addSanction);
    document.getElementById('add-tache-btn').addEventListener('click', addTache);
    
    // Filters
    document.getElementById('filter-categorie').addEventListener('change', filterInformations);
    document.getElementById('filter-priorite').addEventListener('change', filterInformations);
    document.getElementById('filter-projet-statut').addEventListener('change', filterProjets);
    document.getElementById('filter-membre').addEventListener('change', filterSanctions);
    document.getElementById('filter-tache-statut').addEventListener('change', filterTaches);
    document.getElementById('filter-tache-membre').addEventListener('change', filterTaches);
    
    // Profile forms
    document.getElementById('profil-form').addEventListener('submit', updateProfil);
    document.getElementById('password-form').addEventListener('submit', changePassword);
});
