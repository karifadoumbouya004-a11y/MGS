-- ==================== SCHEMA SUPABASE ====================
-- Intranet Entreprise
-- Généré depuis les modèles de données de app.js / app-extended.js
-- ===========================================================

-- Extension pour UUID (recommandée sur Supabase)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==================== TYPES ENUM ====================

CREATE TYPE role_utilisateur AS ENUM ('admin', 'cadre', 'responsable', 'membre');
CREATE TYPE statut_utilisateur AS ENUM ('actif', 'bloque');
CREATE TYPE priorite AS ENUM ('haute', 'moyenne', 'basse');
CREATE TYPE categorie_information AS ENUM ('communique', 'procedure', 'document', 'autre');
CREATE TYPE statut_projet AS ENUM ('planifie', 'encours', 'termine', 'suspendu');
CREATE TYPE statut_tache AS ENUM ('afaire', 'encours', 'termine');
CREATE TYPE statut_paiement AS ENUM ('paye', 'enattente', 'impaye');
CREATE TYPE statut_reunion AS ENUM ('planifie', 'encours', 'termine', 'annule');
CREATE TYPE type_reaction AS ENUM ('vu', 'like', 'coeur', 'bravo');
CREATE TYPE type_item AS ENUM ('information', 'message', 'projet', 'tache', 'reunion');
CREATE TYPE type_notification AS ENUM ('info', 'warning', 'danger', 'success');

-- ==================== TABLES ====================

-- Table: utilisateurs
CREATE TABLE utilisateurs (
    id           BIGSERIAL PRIMARY KEY,
    email        TEXT NOT NULL UNIQUE,
    password     TEXT NOT NULL,
    nom          TEXT NOT NULL,
    prenom       TEXT NOT NULL,
    role         role_utilisateur NOT NULL DEFAULT 'membre',
    statut       statut_utilisateur NOT NULL DEFAULT 'actif',
    date_inscription DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Table: informations
CREATE TABLE informations (
    id         BIGSERIAL PRIMARY KEY,
    titre      TEXT NOT NULL,
    contenu    TEXT NOT NULL,
    categorie  categorie_information NOT NULL DEFAULT 'autre',
    priorite   priorite NOT NULL DEFAULT 'moyenne',
    auteur     TEXT NOT NULL,
    date       DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Table: projets
CREATE TABLE projets (
    id           BIGSERIAL PRIMARY KEY,
    nom          TEXT NOT NULL,
    description  TEXT,
    date_debut   DATE,
    date_fin     DATE,
    statut       statut_projet NOT NULL DEFAULT 'planifie',
    chef         TEXT,
    created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Table de liaison: projet_membres
CREATE TABLE projet_membres (
    projet_id BIGINT NOT NULL REFERENCES projets(id) ON DELETE CASCADE,
    utilisateur_id BIGINT NOT NULL REFERENCES utilisateurs(id) ON DELETE CASCADE,
    PRIMARY KEY (projet_id, utilisateur_id)
);

-- Table: reglement
CREATE TABLE reglement (
    id          BIGSERIAL PRIMARY KEY,
    titre       TEXT NOT NULL,
    description TEXT,
    date        DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Table: sanctions_types
CREATE TABLE sanctions_types (
    id             BIGSERIAL PRIMARY KEY,
    nom            TEXT NOT NULL,
    montant_defaut NUMERIC(12, 2) NOT NULL DEFAULT 0,
    description    TEXT,
    created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Table: sanctions
CREATE TABLE sanctions (
    id          BIGSERIAL PRIMARY KEY,
    membre_id   BIGINT NOT NULL REFERENCES utilisateurs(id) ON DELETE CASCADE,
    motif       TEXT NOT NULL,
    montant     NUMERIC(12, 2) NOT NULL DEFAULT 0,
    date        DATE NOT NULL DEFAULT CURRENT_DATE,
    statut      statut_paiement NOT NULL DEFAULT 'enattente',
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Table: contributions
CREATE TABLE contributions (
    id          BIGSERIAL PRIMARY KEY,
    membre_id   BIGINT NOT NULL REFERENCES utilisateurs(id) ON DELETE CASCADE,
    type        TEXT NOT NULL,
    montant     NUMERIC(12, 2) NOT NULL DEFAULT 0,
    date        DATE NOT NULL DEFAULT CURRENT_DATE,
    statut      statut_paiement NOT NULL DEFAULT 'enattente',
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Table: cotisations
CREATE TABLE cotisations (
    id             BIGSERIAL PRIMARY KEY,
    membre_id      BIGINT NOT NULL REFERENCES utilisateurs(id) ON DELETE CASCADE,
    montant_du     NUMERIC(12, 2) NOT NULL DEFAULT 0,
    montant_paye   NUMERIC(12, 2) NOT NULL DEFAULT 0,
    trimestre      TEXT NOT NULL,
    statut         statut_paiement NOT NULL DEFAULT 'impaye',
    date_paiement  DATE,
    created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Table: taches
CREATE TABLE taches (
    id            BIGSERIAL PRIMARY KEY,
    titre         TEXT NOT NULL,
    description   TEXT,
    priorite      priorite NOT NULL DEFAULT 'moyenne',
    statut        statut_tache NOT NULL DEFAULT 'afaire',
    assignee_id   BIGINT REFERENCES utilisateurs(id) ON DELETE SET NULL,
    date_echeance DATE,
    cree_par      TEXT NOT NULL,
    created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Table: documents
CREATE TABLE documents (
    id          BIGSERIAL PRIMARY KEY,
    nom         TEXT NOT NULL,
    description TEXT,
    categorie   TEXT,
    url         TEXT,
    type        TEXT,
    ajoute_par  TEXT NOT NULL,
    date_ajout  DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Table: messages
CREATE TABLE messages (
    id         BIGSERIAL PRIMARY KEY,
    titre      TEXT NOT NULL,
    contenu    TEXT NOT NULL,
    auteur_id  BIGINT NOT NULL REFERENCES utilisateurs(id) ON DELETE CASCADE,
    date       DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Table: reunions
CREATE TABLE reunions (
    id           BIGSERIAL PRIMARY KEY,
    titre        TEXT NOT NULL,
    description  TEXT,
    date         DATE NOT NULL,
    heure        TIME,
    lieu         TEXT,
    statut       statut_reunion NOT NULL DEFAULT 'planifie',
    cree_par     TEXT NOT NULL,
    created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Table de liaison: reunion_participants
CREATE TABLE reunion_participants (
    reunion_id     BIGINT NOT NULL REFERENCES reunions(id) ON DELETE CASCADE,
    utilisateur_id BIGINT NOT NULL REFERENCES utilisateurs(id) ON DELETE CASCADE,
    PRIMARY KEY (reunion_id, utilisateur_id)
);

-- Table: commentaires
CREATE TABLE commentaires (
    id          BIGSERIAL PRIMARY KEY,
    item_id     BIGINT NOT NULL,
    item_type   type_item NOT NULL,
    auteur_id   BIGINT NOT NULL REFERENCES utilisateurs(id) ON DELETE CASCADE,
    contenu     TEXT NOT NULL,
    date        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Table: reactions
CREATE TABLE reactions (
    id          BIGSERIAL PRIMARY KEY,
    item_id     BIGINT NOT NULL,
    item_type   type_item NOT NULL,
    user_id     BIGINT NOT NULL REFERENCES utilisateurs(id) ON DELETE CASCADE,
    type        type_reaction NOT NULL,
    date        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (item_id, item_type, user_id, type)
);

-- Table: notifications
CREATE TABLE notifications (
    id          BIGSERIAL PRIMARY KEY,
    user_id     BIGINT NOT NULL REFERENCES utilisateurs(id) ON DELETE CASCADE,
    titre       TEXT NOT NULL,
    message     TEXT NOT NULL,
    type        type_notification NOT NULL DEFAULT 'info',
    lien_page   TEXT,
    lu          BOOLEAN NOT NULL DEFAULT FALSE,
    date        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Table: audit_log
CREATE TABLE audit_log (
    id             BIGSERIAL PRIMARY KEY,
    utilisateur_id BIGINT REFERENCES utilisateurs(id) ON DELETE SET NULL,
    utilisateur    TEXT NOT NULL,
    action         TEXT NOT NULL,
    details        TEXT,
    date           TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==================== INDEX ====================

CREATE INDEX idx_informations_date ON informations(date DESC);
CREATE INDEX idx_projets_statut ON projets(statut);
CREATE INDEX idx_taches_assignee ON taches(assignee_id);
CREATE INDEX idx_taches_statut ON taches(statut);
CREATE INDEX idx_sanctions_membre ON sanctions(membre_id);
CREATE INDEX idx_contributions_membre ON contributions(membre_id);
CREATE INDEX idx_cotisations_membre ON cotisations(membre_id);
CREATE INDEX idx_cotisations_trimestre ON cotisations(trimestre);
CREATE INDEX idx_messages_auteur ON messages(auteur_id);
CREATE INDEX idx_reunions_date ON reunions(date);
CREATE INDEX idx_commentaires_item ON commentaires(item_id, item_type);
CREATE INDEX idx_reactions_item ON reactions(item_id, item_type);
CREATE INDEX idx_notifications_user ON notifications(user_id, lu);
CREATE INDEX idx_audit_log_date ON audit_log(date DESC);

-- ==================== TRIGGER updated_at ====================

CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_utilisateurs_updated_at   BEFORE UPDATE ON utilisateurs   FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_informations_updated_at   BEFORE UPDATE ON informations   FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_projets_updated_at        BEFORE UPDATE ON projets        FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_reglement_updated_at      BEFORE UPDATE ON reglement      FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_sanctions_updated_at      BEFORE UPDATE ON sanctions      FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_contributions_updated_at  BEFORE UPDATE ON contributions  FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_cotisations_updated_at    BEFORE UPDATE ON cotisations    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_taches_updated_at         BEFORE UPDATE ON taches         FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_messages_updated_at       BEFORE UPDATE ON messages       FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_reunions_updated_at       BEFORE UPDATE ON reunions       FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ==================== ROW LEVEL SECURITY (RLS) ====================
-- Activez RLS sur toutes les tables et configurez les policies selon vos besoins.

ALTER TABLE utilisateurs          ENABLE ROW LEVEL SECURITY;
ALTER TABLE informations          ENABLE ROW LEVEL SECURITY;
ALTER TABLE projets               ENABLE ROW LEVEL SECURITY;
ALTER TABLE projet_membres        ENABLE ROW LEVEL SECURITY;
ALTER TABLE reglement             ENABLE ROW LEVEL SECURITY;
ALTER TABLE sanctions_types       ENABLE ROW LEVEL SECURITY;
ALTER TABLE sanctions             ENABLE ROW LEVEL SECURITY;
ALTER TABLE contributions         ENABLE ROW LEVEL SECURITY;
ALTER TABLE cotisations           ENABLE ROW LEVEL SECURITY;
ALTER TABLE taches                ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents             ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages              ENABLE ROW LEVEL SECURITY;
ALTER TABLE reunions              ENABLE ROW LEVEL SECURITY;
ALTER TABLE reunion_participants  ENABLE ROW LEVEL SECURITY;
ALTER TABLE commentaires          ENABLE ROW LEVEL SECURITY;
ALTER TABLE reactions             ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications         ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_log             ENABLE ROW LEVEL SECURITY;
