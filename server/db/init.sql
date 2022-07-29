CREATE DATABASE IF NOT EXISTS musiclibrarydb;

USE musiclibrarydb;

CREATE TABLE IF NOT EXISTS albums (
    album_id    INT NOT NULL AUTO_INCREMENT,
    album_name  VARCHAR(255) DEFAULT NULL,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (album_id)
);

CREATE TABLE IF NOT EXISTS tracks (
    track_id    INT NOT NULL AUTO_INCREMENT,
    track_name  VARCHAR(255) DEFAULT NULL,
    album_id    INT DEFAULT NULL,
    artist      VARCHAR(255) DEFAULT NULL,
    genre       VARCHAR(255) DEFAULT NULL,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (track_id),
    FOREIGN KEY (album_id) REFERENCES albums(album_id) ON DELETE CASCADE
);

