ALTER TABLE content_records
    ADD COLUMN locale VARCHAR(2) NOT NULL DEFAULT 'en',
    DROP INDEX module_slug,
    ADD UNIQUE KEY module_slug_locale (module, slug, locale);

CREATE TABLE page_sections (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    page_key VARCHAR(100) NOT NULL,
    section_key VARCHAR(100) NOT NULL,
    locale VARCHAR(2) NOT NULL,
    draft_json LONGTEXT NOT NULL,
    published_json LONGTEXT NULL,
    draft_visible TINYINT NOT NULL DEFAULT 1,
    published_visible TINYINT NOT NULL DEFAULT 1,
    sort_order INT NOT NULL DEFAULT 0,
    published_sort_order INT NOT NULL DEFAULT 0,
    status VARCHAR(20) NOT NULL DEFAULT 'draft',
    version INT UNSIGNED NOT NULL DEFAULT 1,
    updated_by BIGINT UNSIGNED NOT NULL,
    updated_at DATETIME NOT NULL,
    published_at DATETIME NULL,
    UNIQUE KEY page_section_locale (page_key, section_key, locale),
    FOREIGN KEY (updated_by) REFERENCES admin_users(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

ALTER TABLE media_assets ADD COLUMN deleted_at DATETIME NULL;

CREATE TABLE password_resets (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NOT NULL,
    token_hash CHAR(64) NOT NULL UNIQUE,
    expires_at DATETIME NOT NULL,
    used_at DATETIME NULL,
    created_at DATETIME NOT NULL,
    FOREIGN KEY (user_id) REFERENCES admin_users(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
