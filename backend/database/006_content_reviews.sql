ALTER TABLE content_records
    ADD COLUMN review_requested_at DATETIME NULL AFTER published_at,
    ADD COLUMN review_requested_by BIGINT UNSIGNED NULL AFTER review_requested_at,
    ADD CONSTRAINT content_review_requester_fk FOREIGN KEY (review_requested_by) REFERENCES admin_users(id) ON DELETE SET NULL;

ALTER TABLE page_sections
    ADD COLUMN review_requested_at DATETIME NULL AFTER published_at,
    ADD COLUMN review_requested_by BIGINT UNSIGNED NULL AFTER review_requested_at,
    ADD CONSTRAINT section_review_requester_fk FOREIGN KEY (review_requested_by) REFERENCES admin_users(id) ON DELETE SET NULL;

CREATE TABLE content_revisions (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    record_id BIGINT UNSIGNED NOT NULL,
    version INT UNSIGNED NOT NULL,
    event VARCHAR(30) NOT NULL,
    snapshot_json LONGTEXT NOT NULL,
    sort_order INT NOT NULL,
    created_by BIGINT UNSIGNED NOT NULL,
    created_at DATETIME NOT NULL,
    FOREIGN KEY (record_id) REFERENCES content_records(id) ON DELETE CASCADE,
    FOREIGN KEY (created_by) REFERENCES admin_users(id),
    KEY content_revision_history (record_id, id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE section_revisions (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    section_id BIGINT UNSIGNED NOT NULL,
    version INT UNSIGNED NOT NULL,
    event VARCHAR(30) NOT NULL,
    snapshot_json LONGTEXT NOT NULL,
    visible TINYINT NOT NULL,
    sort_order INT NOT NULL,
    created_by BIGINT UNSIGNED NOT NULL,
    created_at DATETIME NOT NULL,
    FOREIGN KEY (section_id) REFERENCES page_sections(id) ON DELETE CASCADE,
    FOREIGN KEY (created_by) REFERENCES admin_users(id),
    KEY section_revision_history (section_id, id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
