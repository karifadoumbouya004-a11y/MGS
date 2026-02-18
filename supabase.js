// ==================== Client Supabase ====================
// Initialisation du client à partir de env.js (chargé avant ce fichier)

const { createClient } = window.supabase;

if (location.protocol === 'file:') {
    console.warn('[Supabase] Protocole file:// détecté. Servez l\'application via HTTP (ex: npx serve .) pour activer Supabase.');
}

const supabaseClient = createClient(ENV.SUPABASE_URL, ENV.SUPABASE_ANON_KEY, {
    auth: {
        persistSession: false,
        autoRefreshToken: false
    }
});

// Test de connectivité au démarrage
(async function testConnexion() {
    if (location.protocol === 'file:') return;
    try {
        const { error } = await supabaseClient.from('utilisateurs').select('id').limit(1);
        if (error) {
            console.error('[Supabase] Connexion échouée :', error.message);
        } else {
            console.info('[Supabase] Connexion réussie.');
        }
    } catch (e) {
        console.error('[Supabase] Erreur réseau :', e.message);
    }
})();

// ==================== Correspondance clés localStorage → tables Supabase ====================

const TABLE_MAP = {
    intranet_users:          'utilisateurs',
    intranet_informations:   'informations',
    intranet_projets:        'projets',
    intranet_reglement:      'reglement',
    intranet_contributions:  'contributions',
    intranet_cotisations:    'cotisations',
    intranet_sanctions:      'sanctions',
    intranet_sanctions_types:'sanctions_types',
    intranet_taches:         'taches',
    intranet_documents:      'documents',
    intranet_messages:       'messages',
    intranet_reunions:       'reunions',
    intranet_commentaires:   'commentaires',
    intranet_reactions:      'reactions',
    intranet_notifications:  'notifications',
    intranet_audit_log:      'audit_log'
};

// ==================== Fonctions CRUD asynchrones ====================

function isFileProtocol() {
    return location.protocol === 'file:';
}

async function getDataAsync(key) {
    if (isFileProtocol()) return getData(key);
    const table = TABLE_MAP[key];
    if (!table) return [];
    const { data, error } = await supabaseClient.from(table).select('*');
    if (error) {
        console.error(`Erreur getDataAsync [${table}]:`, error.message);
        return getData(key);
    }
    return data || [];
}

async function saveDataAsync(key, records) {
    if (isFileProtocol()) return;
    const table = TABLE_MAP[key];
    if (!table) return;
    const { error } = await supabaseClient.from(table).upsert(records, { onConflict: 'id' });
    if (error) {
        console.error(`Erreur saveDataAsync [${table}]:`, error.message);
    }
}

async function insertRecordAsync(key, record) {
    if (isFileProtocol()) return null;
    const table = TABLE_MAP[key];
    if (!table) return null;
    const { data, error } = await supabaseClient.from(table).insert(record).select().single();
    if (error) {
        console.error(`Erreur insertRecordAsync [${table}]:`, error.message);
        return null;
    }
    return data;
}

async function updateRecordAsync(key, id, updates) {
    if (isFileProtocol()) return null;
    const table = TABLE_MAP[key];
    if (!table) return null;
    const { data, error } = await supabaseClient.from(table).update(updates).eq('id', id).select().single();
    if (error) {
        console.error(`Erreur updateRecordAsync [${table}]:`, error.message);
        return null;
    }
    return data;
}

async function deleteRecordAsync(key, id) {
    if (isFileProtocol()) return;
    const table = TABLE_MAP[key];
    if (!table) return;
    const { error } = await supabaseClient.from(table).delete().eq('id', id);
    if (error) {
        console.error(`Erreur deleteRecordAsync [${table}]:`, error.message);
    }
}

// ==================== Authentification Supabase ====================

async function loginSupabase(email, password) {
    const users = await getDataAsync(DB_KEYS.USERS);
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
        return { success: false, message: 'Email ou mot de passe incorrect' };
    }
    if (user.statut === 'bloque') {
        return { success: false, message: 'Votre compte a été bloqué. Contactez l\'administrateur.' };
    }

    currentUser = user;
    localStorage.setItem(DB_KEYS.SESSION, JSON.stringify(user));
    return { success: true };
}

async function logoutSupabase() {
    currentUser = null;
    localStorage.removeItem(DB_KEYS.SESSION);
    showLogin();
}

// ==================== Audit log asynchrone ====================

async function addAuditLogAsync(action, details) {
    await insertRecordAsync(DB_KEYS.AUDIT_LOG, {
        utilisateur: currentUser ? currentUser.prenom + ' ' + currentUser.nom : 'Systeme',
        utilisateur_id: null,
        action: action,
        details: details,
        date: new Date().toISOString()
    });
}

// ==================== Notification asynchrone ====================

async function createNotificationAsync(userId, titre, message, type, lienPage) {
    await insertRecordAsync(DB_KEYS.NOTIFICATIONS, {
        user_id: null,
        titre: titre,
        message: message,
        type: type,
        lien_page: lienPage || null,
        lu: false,
        date: new Date().toISOString()
    });
}
