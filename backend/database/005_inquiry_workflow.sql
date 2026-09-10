ALTER TABLE inquiries
    ADD COLUMN assigned_to BIGINT UNSIGNED NULL AFTER status,
    ADD KEY inbox_assignee (assigned_to, status),
    ADD CONSTRAINT inquiries_assigned_to_fk FOREIGN KEY (assigned_to) REFERENCES admin_users(id) ON DELETE SET NULL;

CREATE TABLE inquiry_notes (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    inquiry_id BIGINT UNSIGNED NOT NULL,
    author_id BIGINT UNSIGNED NOT NULL,
    note TEXT NOT NULL,
    created_at DATETIME NOT NULL,
    FOREIGN KEY (inquiry_id) REFERENCES inquiries(id) ON DELETE CASCADE,
    FOREIGN KEY (author_id) REFERENCES admin_users(id),
    KEY inquiry_notes_recent (inquiry_id, created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
