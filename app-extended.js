// ==================== Vérification des dépendances ====================
if (typeof getData !== 'function' || typeof saveData !== 'function') {
    console.error('ERREUR: Les fonctions getData et saveData ne sont pas définies. Assurez-vous que app.js est chargé avant app-extended.js');
}

// ==================== Dashboard Étendu ====================
function loadDashboardExtended() {
    try {
        loadDashboardAnnonces();
        loadDashboardTachesAssignees();
        loadDashboardAlertes();
        loadDashboardNotifications();
        loadDashboardRaccourcis();
    } catch (error) {
        console.error('Erreur dans loadDashboardExtended:', error);
    }
}

function loadDashboardAnnonces() {
    try {
        const informations = getData(DB_KEYS.INFORMATIONS)
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 3);
        
        const container = document.getElementById('dashboard-annonces');
        if (!container) return;
        
        if (informations.length === 0) {
            container.innerHTML = '<p class="text-muted">Aucune annonce récente</p>';
            return;
        }
        
        container.innerHTML = informations.map(info => {
            const reactions = getData(DB_KEYS.REACTIONS).filter(r => r.itemId === info.id && r.itemType === 'information');
            const vuCount = reactions.filter(r => r.type === 'vu').length;
            
            return `
                <div class="annonce-card" onclick="navigateTo('informations')">
                    <div class="annonce-header">
                        <span class="badge ${info.priorite}">${info.priorite}</span>
                        <span class="annonce-date">${formatDate(info.date)}</span>
                    </div>
                    <h4>${info.titre}</h4>
                    <p>${info.contenu.substring(0, 100)}...</p>
                    <div class="annonce-footer">
                        <span class="vu-count">${vuCount} vus</span>
                    </div>
                </div>
            `;
        }).join('');
    } catch (error) {
        console.error('Erreur dans loadDashboardAnnonces:', error);
        const container = document.getElementById('dashboard-annonces');
        if (container) container.innerHTML = '<p class="text-muted">Erreur de chargement</p>';
    }
}

function loadDashboardTachesAssignees() {
    if (!currentUser) return;
    
    const taches = getData(DB_KEYS.TACHES)
        .filter(t => t.assignee === currentUser.prenom + ' ' + currentUser.nom && t.statut !== 'termine')
        .sort((a, b) => new Date(a.dateEcheance) - new Date(b.dateEcheance));
    
    const container = document.getElementById('dashboard-taches');
    if (!container) return;
    
    if (taches.length === 0) {
        container.innerHTML = '<p class="text-muted">Aucune tâche assignée</p>';
        return;
    }
    
    container.innerHTML = taches.map(tache => {
        const isRetard = new Date(tache.dateEcheance) < new Date();
        const retardClass = isRetard ? 'tache-retard' : '';
        
        return `
            <div class="tache-mini ${retardClass}" onclick="navigateTo('taches')">
                <div class="tache-mini-header">
                    <span class="badge ${tache.priorite}">${tache.priorite}</span>
                    ${isRetard ? '<span class="badge-retard">RETARD</span>' : ''}
                </div>
                <h5>${tache.titre}</h5>
                <div class="tache-mini-footer">
                    <span>Échéance: ${formatDate(tache.dateEcheance)}</span>
                </div>
            </div>
        `;
    }).join('');
}

function loadDashboardAlertes() {
    const alertes = [];
    
    // Alertes de retard de tâches
    const tachesEnRetard = getData(DB_KEYS.TACHES).filter(t => {
        return new Date(t.dateEcheance) < new Date() && t.statut !== 'termine';
    });
    
    if (tachesEnRetard.length > 0) {
        alertes.push({
            type: 'danger',
            message: `${tachesEnRetard.length} tâche(s) en retard`,
            action: 'taches'
        });
    }
    
    // Alertes de cotisations impayées
    if (currentUser && (currentUser.role === 'admin' || currentUser.role === 'cadre')) {
        const cotisationsImpayees = getData(DB_KEYS.COTISATIONS).filter(c => c.statut === 'impaye');
        if (cotisationsImpayees.length > 0) {
            alertes.push({
                type: 'warning',
                message: `${cotisationsImpayees.length} cotisation(s) impayée(s)`,
                action: 'cotisations'
            });
        }
    }
    
    // Alertes de réunions à venir
    const reunionsProchaines = getData(DB_KEYS.REUNIONS).filter(r => {
        const dateReunion = new Date(r.date);
        const aujourd_hui = new Date();
        const diff = (dateReunion - aujourd_hui) / (1000 * 60 * 60 * 24);
        return diff >= 0 && diff <= 7 && r.statut === 'planifie';
    });
    
    if (reunionsProchaines.length > 0) {
        alertes.push({
            type: 'info',
            message: `${reunionsProchaines.length} réunion(s) cette semaine`,
            action: 'reunions'
        });
    }
    
    const container = document.getElementById('dashboard-alertes');
    if (!container) return;
    
    if (alertes.length === 0) {
        container.innerHTML = '<p class="text-muted">Aucune alerte</p>';
        return;
    }
    
    container.innerHTML = alertes.map(alerte => {
        return `
            <div class="alerte ${alerte.type}" onclick="navigateTo('${alerte.action}')">
                <span>${alerte.message}</span>
            </div>
        `;
    }).join('');
}

function loadDashboardNotifications() {
    if (!currentUser) return;
    
    const notifications = getData(DB_KEYS.NOTIFICATIONS)
        .filter(n => n.userId === currentUser.id && !n.lu)
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5);
    
    const container = document.getElementById('dashboard-notifications');
    if (!container) return;
    
    const badge = document.getElementById('notification-badge');
    if (badge) {
        badge.textContent = notifications.length;
        badge.style.display = notifications.length > 0 ? 'block' : 'none';
    }
    
    if (notifications.length === 0) {
        container.innerHTML = '<p class="text-muted">Aucune notification</p>';
        return;
    }
    
    container.innerHTML = notifications.map(notif => {
        return `
            <div class="notification-item" onclick="marquerNotificationLue(${notif.id}, '${notif.lienPage || ''}')">
                <div class="notification-header">
                    <strong>${notif.titre}</strong>
                    <span class="notification-date">${formatDate(notif.date)}</span>
                </div>
                <p>${notif.message}</p>
            </div>
        `;
    }).join('');
}

function marquerNotificationLue(id, lienPage) {
    const notifications = getData(DB_KEYS.NOTIFICATIONS);
    const index = notifications.findIndex(n => n.id === id);
    
    if (index !== -1) {
        notifications[index].lu = true;
        saveData(DB_KEYS.NOTIFICATIONS, notifications);
    }
    
    if (lienPage) {
        navigateTo(lienPage);
    }
    
    loadDashboardNotifications();
}

function loadDashboardRaccourcis() {
    const container = document.getElementById('dashboard-raccourcis');
    if (!container) return;
    
    const raccourcis = [
        { page: 'informations', icon: 'info', label: 'Informations', color: 'blue' },
        { page: 'taches', icon: 'tasks', label: 'Mes tâches', color: 'orange' },
        { page: 'documents', icon: 'document', label: 'Documents', color: 'green' },
        { page: 'messages', icon: 'message', label: 'Messages', color: 'purple' }
    ].filter(r => hasPermission(r.page));
    
    container.innerHTML = raccourcis.map(r => {
        return `
            <div class="raccourci-card ${r.color}" onclick="navigateTo('${r.page}')">
                <div class="raccourci-icon">${r.icon}</div>
                <span>${r.label}</span>
            </div>
        `;
    }).join('');
}

// ==================== Documents ====================
function loadDocuments() {
    const documents = getData(DB_KEYS.DOCUMENTS);
    
    const categories = ['Procedures', 'Rapports', 'Formulaires', 'Autres'];
    const filterCategory = document.getElementById('filter-document-category');
    
    if (filterCategory) {
        filterCategory.innerHTML = '<option value="">Toutes les catégories</option>' + 
            categories.map(c => `<option value="${c}">${c}</option>`).join('');
    }
    
    renderDocuments(documents);
}

function renderDocuments(documents) {
    const container = document.getElementById('documents-list');
    if (!container) return;
    
    if (documents.length === 0) {
        container.innerHTML = '<p>Aucun document</p>';
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
        return `
            <div class="document-category">
                <h3>${categorie}</h3>
                <div class="documents-grid">
                    ${docs.map(doc => {
                        let actions = '';
                        if (canModify('documents')) {
                            actions = `
                                <button class="btn btn-sm btn-danger" onclick="deleteDocument(${doc.id})">Supprimer</button>
                            `;
                        }
                        
                        return `
                            <div class="document-card">
                                <div class="document-icon">${getFileIcon(doc.type)}</div>
                                <h4>${doc.nom}</h4>
                                <p class="text-muted">${doc.description || ''}</p>
                                <div class="document-meta">
                                    <span>Ajouté le ${formatDate(doc.dateAjout)}</span>
                                    <span>Par ${doc.ajoutePar}</span>
                                </div>
                                <div class="document-actions">
                                    <button class="btn btn-sm btn-primary" onclick="consulterDocument(${doc.id})">Consulter</button>
                                    ${actions}
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
    }).join('');
}

function getFileIcon(type) {
    const icons = {
        'pdf': '📄',
        'doc': '📝',
        'xls': '📊',
        'img': '🖼️',
        'other': '📁'
    };
    return icons[type] || icons.other;
}

function ajouterDocument() {
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    
    modalTitle.textContent = 'Ajouter un document';
    modalBody.innerHTML = `
        <form id="document-form">
            <div class="form-group">
                <label for="doc-nom">Nom du document</label>
                <input type="text" id="doc-nom" required>
            </div>
            <div class="form-group">
                <label for="doc-description">Description</label>
                <textarea id="doc-description" rows="2"></textarea>
            </div>
            <div class="form-group">
                <label for="doc-categorie">Catégorie</label>
                <select id="doc-categorie" required>
                    <option value="Procedures">Procédures</option>
                    <option value="Rapports">Rapports</option>
                    <option value="Formulaires">Formulaires</option>
                    <option value="Autres">Autres</option>
                </select>
            </div>
            <div class="form-group">
                <label for="doc-fichier">Fichier (simulé - entrez une URL)</label>
                <input type="url" id="doc-fichier" placeholder="https://exemple.com/fichier.pdf" required>
            </div>
            <button type="submit" class="btn btn-primary btn-block">Ajouter</button>
        </form>
    `;
    
    modal.classList.remove('hidden');
    
    document.getElementById('document-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const documents = getData(DB_KEYS.DOCUMENTS);
        const newDoc = {
            id: generateId(DB_KEYS.DOCUMENTS),
            nom: document.getElementById('doc-nom').value,
            description: document.getElementById('doc-description').value,
            categorie: document.getElementById('doc-categorie').value,
            url: document.getElementById('doc-fichier').value,
            type: 'pdf',
            ajoutePar: currentUser.prenom + ' ' + currentUser.nom,
            dateAjout: new Date().toISOString().split('T')[0]
        };
        
        documents.push(newDoc);
        saveData(DB_KEYS.DOCUMENTS, documents);
        
        addAuditLog('Document ajouté', `Document "${newDoc.nom}" ajouté dans ${newDoc.categorie}`);
        
        closeModal();
        loadDocuments();
    });
}

function consulterDocument(id) {
    const doc = getData(DB_KEYS.DOCUMENTS).find(d => d.id === id);
    if (!doc) return;
    
    addAuditLog('Document consulté', `Document "${doc.nom}" consulté`);
    window.open(doc.url, '_blank');
}

function deleteDocument(id) {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce document?')) return;
    
    const documents = getData(DB_KEYS.DOCUMENTS);
    const doc = documents.find(d => d.id === id);
    
    if (doc) {
        addAuditLog('Document supprimé', `Document "${doc.nom}" supprimé`);
    }
    
    const filtered = documents.filter(d => d.id !== id);
    saveData(DB_KEYS.DOCUMENTS, filtered);
    
    loadDocuments();
}

// ==================== Messages / Communication Interne ====================
function loadMessages() {
    const messages = getData(DB_KEYS.MESSAGES)
        .sort((a, b) => new Date(b.date) - new Date(a.date));
    
    renderMessages(messages);
}

function renderMessages(messages) {
    const container = document.getElementById('messages-list');
    if (!container) return;
    
    if (messages.length === 0) {
        container.innerHTML = '<p>Aucun message</p>';
        return;
    }
    
    container.innerHTML = messages.map(msg => {
        const commentaires = getData(DB_KEYS.COMMENTAIRES)
            .filter(c => c.itemId === msg.id && c.itemType === 'message');
        
        const reactions = getData(DB_KEYS.REACTIONS)
            .filter(r => r.itemId === msg.id && r.itemType === 'message');
        
        const vuCount = reactions.filter(r => r.type === 'vu').length;
        const approuveCount = reactions.filter(r => r.type === 'approuve').length;
        
        const userReaction = reactions.find(r => r.userId === currentUser.id);
        
        return `
            <div class="message-card">
                <div class="message-header">
                    <div class="message-author">
                        <strong>${msg.auteur}</strong>
                        <span class="text-muted">${formatDateTime(msg.date)}</span>
                    </div>
                </div>
                <h3>${msg.titre}</h3>
                <div class="message-content">${msg.contenu}</div>
                <div class="message-reactions">
                    <button class="reaction-btn ${userReaction && userReaction.type === 'vu' ? 'active' : ''}" 
                            onclick="toggleReaction(${msg.id}, 'message', 'vu')">
                        👁️ Vu (${vuCount})
                    </button>
                    <button class="reaction-btn ${userReaction && userReaction.type === 'approuve' ? 'active' : ''}" 
                            onclick="toggleReaction(${msg.id}, 'message', 'approuve')">
                        ✅ Approuvé (${approuveCount})
                    </button>
                    <button class="reaction-btn" onclick="afficherCommentaires(${msg.id}, 'message')">
                        💬 Commentaires (${commentaires.length})
                    </button>
                </div>
                <div id="commentaires-${msg.id}" class="commentaires-section" style="display:none;"></div>
            </div>
        `;
    }).join('');
}

function publierMessage() {
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    
    modalTitle.textContent = 'Publier un message';
    modalBody.innerHTML = `
        <form id="message-form">
            <div class="form-group">
                <label for="msg-titre">Titre</label>
                <input type="text" id="msg-titre" required>
            </div>
            <div class="form-group">
                <label for="msg-contenu">Contenu</label>
                <textarea id="msg-contenu" rows="6" required></textarea>
            </div>
            <button type="submit" class="btn btn-primary btn-block">Publier</button>
        </form>
    `;
    
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
        
        addAuditLog('Message publié', `Message "${newMsg.titre}" publié`);
        
        // Créer des notifications pour tous les utilisateurs
        const users = getData(DB_KEYS.USERS);
        users.forEach(user => {
            if (user.id !== currentUser.id) {
                createNotification(
                    user.id,
                    'Nouveau message',
                    `${currentUser.prenom} ${currentUser.nom} a publié: ${newMsg.titre}`,
                    'info',
                    'messages'
                );
            }
        });
        
        closeModal();
        loadMessages();
    });
}

function toggleReaction(itemId, itemType, reactionType) {
    const reactions = getData(DB_KEYS.REACTIONS);
    const existing = reactions.find(r => 
        r.itemId === itemId && 
        r.itemType === itemType && 
        r.userId === currentUser.id &&
        r.type === reactionType
    );
    
    if (existing) {
        const filtered = reactions.filter(r => r.id !== existing.id);
        saveData(DB_KEYS.REACTIONS, filtered);
    } else {
        reactions.push({
            id: generateId(DB_KEYS.REACTIONS),
            itemId: itemId,
            itemType: itemType,
            userId: currentUser.id,
            userName: currentUser.prenom + ' ' + currentUser.nom,
            type: reactionType,
            date: new Date().toISOString()
        });
        saveData(DB_KEYS.REACTIONS, reactions);
    }
    
    if (itemType === 'message') {
        loadMessages();
    } else if (itemType === 'information') {
        loadInformations();
    }
}

function afficherCommentaires(itemId, itemType) {
    const container = document.getElementById(`commentaires-${itemId}`);
    if (!container) return;
    
    if (container.style.display === 'none') {
        container.style.display = 'block';
        loadCommentaires(itemId, itemType);
    } else {
        container.style.display = 'none';
    }
}

function loadCommentaires(itemId, itemType) {
    const commentaires = getData(DB_KEYS.COMMENTAIRES)
        .filter(c => c.itemId === itemId && c.itemType === itemType)
        .sort((a, b) => new Date(a.date) - new Date(b.date));
    
    const container = document.getElementById(`commentaires-${itemId}`);
    if (!container) return;
    
    let html = '<div class="commentaires-list">';
    
    commentaires.forEach(comm => {
        html += `
            <div class="commentaire">
                <strong>${comm.auteur}</strong>
                <span class="text-muted">${formatDateTime(comm.date)}</span>
                <p>${comm.contenu}</p>
            </div>
        `;
    });
    
    html += '</div>';
    html += `
        <div class="commentaire-form">
            <textarea id="comm-input-${itemId}" placeholder="Ajouter un commentaire..." rows="2"></textarea>
            <button class="btn btn-primary btn-sm" onclick="ajouterCommentaire(${itemId}, '${itemType}')">Envoyer</button>
        </div>
    `;
    
    container.innerHTML = html;
}

function ajouterCommentaire(itemId, itemType) {
    const input = document.getElementById(`comm-input-${itemId}`);
    if (!input || !input.value.trim()) return;
    
    const commentaires = getData(DB_KEYS.COMMENTAIRES);
    commentaires.push({
        id: generateId(DB_KEYS.COMMENTAIRES),
        itemId: itemId,
        itemType: itemType,
        auteur: currentUser.prenom + ' ' + currentUser.nom,
        auteurId: currentUser.id,
        contenu: input.value.trim(),
        date: new Date().toISOString()
    });
    
    saveData(DB_KEYS.COMMENTAIRES, commentaires);
    addAuditLog('Commentaire ajouté', `Commentaire sur ${itemType} #${itemId}`);
    
    loadCommentaires(itemId, itemType);
}

// ==================== Réunions ====================
function loadReunions() {
    const reunions = getData(DB_KEYS.REUNIONS)
        .sort((a, b) => new Date(b.date) - new Date(a.date));
    
    renderReunions(reunions);
}

function renderReunions(reunions) {
    const container = document.getElementById('reunions-list');
    if (!container) return;
    
    if (reunions.length === 0) {
        container.innerHTML = '<p>Aucune réunion</p>';
        return;
    }
    
    container.innerHTML = reunions.map(reunion => {
        let actions = '';
        if (canModify('reunions')) {
            actions = `
                <button class="btn btn-sm btn-secondary" onclick="editReunion(${reunion.id})">Modifier</button>
                <button class="btn btn-sm btn-danger" onclick="deleteReunion(${reunion.id})">Supprimer</button>
            `;
        }
        
        return `
            <div class="reunion-card">
                <div class="reunion-header">
                    <h4>${reunion.titre}</h4>
                    <span class="badge ${reunion.statut}">${reunion.statut}</span>
                </div>
                <p>${reunion.description}</p>
                <div class="reunion-details">
                    <div><strong>Date:</strong> ${formatDate(reunion.date)} à ${reunion.heure}</div>
                    <div><strong>Lieu:</strong> ${reunion.lieu}</div>
                    <div><strong>Participants:</strong> ${reunion.participants.length} personnes</div>
                </div>
                <div class="card-actions">
                    ${actions}
                </div>
            </div>
        `;
    }).join('');
}

function ajouterReunion() {
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    
    modalTitle.textContent = 'Planifier une réunion';
    modalBody.innerHTML = `
        <form id="reunion-form">
            <div class="form-group">
                <label for="reunion-titre">Titre</label>
                <input type="text" id="reunion-titre" required>
            </div>
            <div class="form-group">
                <label for="reunion-description">Description</label>
                <textarea id="reunion-description" rows="3" required></textarea>
            </div>
            <div class="form-group">
                <label for="reunion-date">Date</label>
                <input type="date" id="reunion-date" required>
            </div>
            <div class="form-group">
                <label for="reunion-heure">Heure</label>
                <input type="time" id="reunion-heure" required>
            </div>
            <div class="form-group">
                <label for="reunion-lieu">Lieu</label>
                <input type="text" id="reunion-lieu" required>
            </div>
            <button type="submit" class="btn btn-primary btn-block">Planifier</button>
        </form>
    `;
    
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
        
        addAuditLog('Réunion planifiée', `Réunion "${newReunion.titre}" le ${formatDate(newReunion.date)}`);
        
        closeModal();
        loadReunions();
    });
}

function editReunion(id) {
    const reunion = getData(DB_KEYS.REUNIONS).find(r => r.id === id);
    if (!reunion) return;
    
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    
    modalTitle.textContent = 'Modifier la réunion';
    modalBody.innerHTML = `
        <form id="reunion-form">
            <div class="form-group">
                <label for="reunion-titre">Titre</label>
                <input type="text" id="reunion-titre" value="${reunion.titre}" required>
            </div>
            <div class="form-group">
                <label for="reunion-description">Description</label>
                <textarea id="reunion-description" rows="3" required>${reunion.description}</textarea>
            </div>
            <div class="form-group">
                <label for="reunion-date">Date</label>
                <input type="date" id="reunion-date" value="${reunion.date}" required>
            </div>
            <div class="form-group">
                <label for="reunion-heure">Heure</label>
                <input type="time" id="reunion-heure" value="${reunion.heure}" required>
            </div>
            <div class="form-group">
                <label for="reunion-lieu">Lieu</label>
                <input type="text" id="reunion-lieu" value="${reunion.lieu}" required>
            </div>
            <button type="submit" class="btn btn-primary btn-block">Enregistrer</button>
        </form>
    `;
    
    modal.classList.remove('hidden');
    
    document.getElementById('reunion-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const reunions = getData(DB_KEYS.REUNIONS);
        const index = reunions.findIndex(r => r.id === id);
        
        if (index !== -1) {
            reunions[index] = {
                ...reunions[index],
                titre: document.getElementById('reunion-titre').value,
                description: document.getElementById('reunion-description').value,
                date: document.getElementById('reunion-date').value,
                heure: document.getElementById('reunion-heure').value,
                lieu: document.getElementById('reunion-lieu').value
            };
            
            saveData(DB_KEYS.REUNIONS, reunions);
            addAuditLog('Réunion modifiée', `Réunion "${reunions[index].titre}" modifiée`);
        }
        
        closeModal();
        loadReunions();
    });
}

function deleteReunion(id) {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette réunion?')) return;
    
    let reunions = getData(DB_KEYS.REUNIONS);
    const reunion = reunions.find(r => r.id === id);
    
    if (reunion) {
        addAuditLog('Réunion supprimée', `Réunion "${reunion.titre}" supprimée`);
    }
    
    reunions = reunions.filter(r => r.id !== id);
    saveData(DB_KEYS.REUNIONS, reunions);
    
    loadReunions();
}

// ==================== Performance ====================
function loadPerformance() {
    if (currentUser.role === 'admin' || currentUser.role === 'cadre') {
        loadPerformanceGlobale();
    } else {
        loadPerformanceIndividuelle(currentUser.id);
    }
}

function loadPerformanceGlobale() {
    const users = getData(DB_KEYS.USERS).filter(u => u.role !== 'admin');
    const container = document.getElementById('performance-container');
    if (!container) return;
    
    container.innerHTML = users.map(user => {
        const stats = calculateUserStats(user.id);
        
        return `
            <div class="performance-card">
                <h4>${user.prenom} ${user.nom}</h4>
                <div class="performance-stats">
                    <div class="stat-item">
                        <span class="stat-label">Tâches réalisées</span>
                        <span class="stat-value">${stats.tachesRealisees}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Tâches en retard</span>
                        <span class="stat-value text-danger">${stats.tachesEnRetard}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Sanctions</span>
                        <span class="stat-value text-warning">${stats.sanctions}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Taux de réussite</span>
                        <span class="stat-value text-success">${stats.tauxReussite}%</span>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function loadPerformanceIndividuelle(userId) {
    const stats = calculateUserStats(userId);
    const container = document.getElementById('performance-container');
    if (!container) return;
    
    container.innerHTML = `
        <div class="card">
            <h3>Mes statistiques</h3>
            <div class="performance-details">
                <div class="detail-item">
                    <span class="detail-label">Tâches réalisées ce mois</span>
                    <span class="detail-value">${stats.tachesRealisees}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Tâches en retard</span>
                    <span class="detail-value text-danger">${stats.tachesEnRetard}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Sanctions reçues</span>
                    <span class="detail-value text-warning">${stats.sanctions}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Taux de réussite</span>
                    <span class="detail-value text-success">${stats.tauxReussite}%</span>
                </div>
            </div>
            
            <h4 style="margin-top: 24px;">Historique des tâches</h4>
            <div id="historique-taches"></div>
        </div>
    `;
    
    loadHistoriqueTaches(userId);
}

function calculateUserStats(userId) {
    const user = getData(DB_KEYS.USERS).find(u => u.id === userId);
    if (!user) return { tachesRealisees: 0, tachesEnRetard: 0, sanctions: 0, tauxReussite: 0 };
    
    const userName = user.prenom + ' ' + user.nom;
    const taches = getData(DB_KEYS.TACHES).filter(t => t.assignee === userName);
    
    const tachesRealisees = taches.filter(t => t.statut === 'termine').length;
    const tachesEnRetard = taches.filter(t => {
        return new Date(t.dateEcheance) < new Date() && t.statut !== 'termine';
    }).length;
    
    const sanctions = getData(DB_KEYS.SANCTIONS).filter(s => s.membreId === userId).length;
    
    const total = taches.length;
    const tauxReussite = total > 0 ? Math.round((tachesRealisees / total) * 100) : 0;
    
    return { tachesRealisees, tachesEnRetard, sanctions, tauxReussite };
}

function loadHistoriqueTaches(userId) {
    const user = getData(DB_KEYS.USERS).find(u => u.id === userId);
    if (!user) return;
    
    const userName = user.prenom + ' ' + user.nom;
    const taches = getData(DB_KEYS.TACHES)
        .filter(t => t.assignee === userName)
        .sort((a, b) => new Date(b.dateEcheance) - new Date(a.dateEcheance));
    
    const container = document.getElementById('historique-taches');
    if (!container) return;
    
    if (taches.length === 0) {
        container.innerHTML = '<p>Aucune tâche</p>';
        return;
    }
    
    container.innerHTML = `
        <table class="data-table">
            <thead>
                <tr>
                    <th>Tâche</th>
                    <th>Échéance</th>
                    <th>Statut</th>
                </tr>
            </thead>
            <tbody>
                ${taches.map(t => {
                    const isRetard = new Date(t.dateEcheance) < new Date() && t.statut !== 'termine';
                    const retardClass = isRetard ? 'text-danger' : '';
                    
                    return `
                        <tr>
                            <td>${t.titre}</td>
                            <td class="${retardClass}">${formatDate(t.dateEcheance)}${isRetard ? ' ⚠️' : ''}</td>
                            <td><span class="badge ${t.statut}">${t.statut}</span></td>
                        </tr>
                    `;
                }).join('')}
            </tbody>
        </table>
    `;
}

// ==================== Audit Log ====================
function loadAuditLog() {
    const logs = getData(DB_KEYS.AUDIT_LOG)
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 100);
    
    const container = document.getElementById('audit-log-table');
    if (!container) return;
    
    if (logs.length === 0) {
        container.innerHTML = '<tr><td colspan="4">Aucune entrée</td></tr>';
        return;
    }
    
    container.innerHTML = logs.map(log => {
        return `
            <tr>
                <td>${formatDateTime(log.date)}</td>
                <td>${log.utilisateur}</td>
                <td>${log.action}</td>
                <td>${log.details}</td>
            </tr>
        `;
    }).join('');
}
