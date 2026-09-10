CREATE TABLE private_documents (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    project_id BIGINT UNSIGNED NOT NULL,
    label VARCHAR(200) NOT NULL,
    filename VARCHAR(100) NOT NULL UNIQUE,
    original_name VARCHAR(255) NOT NULL,
    mime VARCHAR(40) NOT NULL,
    bytes INT UNSIGNED NOT NULL,
    uploaded_by BIGINT UNSIGNED NOT NULL,
    created_at DATETIME NOT NULL,
    deleted_at DATETIME NULL,
    KEY private_documents_project (project_id, deleted_at, created_at),
    CONSTRAINT private_documents_project_fk FOREIGN KEY (project_id) REFERENCES content_records(id) ON DELETE CASCADE,
    CONSTRAINT private_documents_uploader_fk FOREIGN KEY (uploaded_by) REFERENCES admin_users(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
