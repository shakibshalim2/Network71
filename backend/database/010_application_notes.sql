CREATE TABLE application_notes (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    application_id BIGINT UNSIGNED NOT NULL,
    author_id BIGINT UNSIGNED NOT NULL,
    note TEXT NOT NULL,
    created_at DATETIME NOT NULL,
    FOREIGN KEY (application_id) REFERENCES job_applications(id) ON DELETE CASCADE,
    FOREIGN KEY (author_id) REFERENCES admin_users(id),
    KEY application_notes_recent (application_id, created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
