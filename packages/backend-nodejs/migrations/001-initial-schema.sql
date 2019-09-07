-- Up
CREATE TABLE Users (id char(36) PRIMARY KEY, name TEXT, email TEXT, avatar TEXT, version INT DEFAULT 1);

-- Down
DROP TABLE Users;