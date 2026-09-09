ALTER TABLE inquiries
    ADD COLUMN request_key VARCHAR(64) NULL UNIQUE,
    ADD COLUMN request_hash CHAR(64) NULL;
