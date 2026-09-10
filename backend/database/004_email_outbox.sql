CREATE TABLE email_outbox (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    inquiry_id BIGINT UNSIGNED NOT NULL UNIQUE,
    status VARCHAR(20) NOT NULL DEFAULT 'pending',
    attempts INT UNSIGNED NOT NULL DEFAULT 0,
    next_attempt_at DATETIME NOT NULL,
    last_error VARCHAR(250) NULL,
    sent_at DATETIME NULL,
    created_at DATETIME NOT NULL,
    FOREIGN KEY (inquiry_id) REFERENCES inquiries(id) ON DELETE CASCADE,
    KEY due_messages(status,next_attempt_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
