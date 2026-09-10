ALTER TABLE content_records
    ADD COLUMN review_state VARCHAR(20) NOT NULL DEFAULT 'draft' AFTER review_requested_by,
    ADD COLUMN review_version INT UNSIGNED NULL AFTER review_state,
    ADD COLUMN approved_at DATETIME NULL AFTER review_version,
    ADD COLUMN approved_by BIGINT UNSIGNED NULL AFTER approved_at,
    ADD CONSTRAINT content_approver_fk FOREIGN KEY (approved_by) REFERENCES admin_users(id) ON DELETE SET NULL;

ALTER TABLE page_sections
    ADD COLUMN review_state VARCHAR(20) NOT NULL DEFAULT 'draft' AFTER review_requested_by,
    ADD COLUMN review_version INT UNSIGNED NULL AFTER review_state,
    ADD COLUMN approved_at DATETIME NULL AFTER review_version,
    ADD COLUMN approved_by BIGINT UNSIGNED NULL AFTER approved_at,
    ADD CONSTRAINT section_approver_fk FOREIGN KEY (approved_by) REFERENCES admin_users(id) ON DELETE SET NULL;
