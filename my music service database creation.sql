DROP DATABASE IF EXISTS my_music_service;
CREATE DATABASE my_music_service;
USE my_music_service;

CREATE TABLE artists (
id INT AUTO_INCREMENT NOT NULL,
artist_name VARCHAR(255) NOT NULL,
cover_img LONGTEXT,
upload_at DATE NOT NULL,
PRIMARY KEY (id),
UNIQUE (id)
);

CREATE TABLE albums (
id INT AUTO_INCREMENT NOT NULL,
album_name VARCHAR(255) NOT NULL,
artist_id INT NOT NULL,
cover_img LONGTEXT,
created_at VARCHAR(255) NOT NULL,
upload_at DATE NOT NULL,
PRIMARY KEY (id),
FOREIGN KEY (artist_id) REFERENCES artists (id) ON DELETE CASCADE,
UNIQUE (id)
);

CREATE TABLE songs (
id INT AUTO_INCREMENT NOT NULL,
title VARCHAR(255) NOT NULL,
artist_id INT NOT NULL,
featured_artist_id INT,
album_id INT,
youtube_link VARCHAR(255),
length VARCHAR(255) NOT NULL,
track_number INT,
lyrics LONGTEXT,
created_at VARCHAR(255) NOT NULL,
PRIMARY KEY (id),
UNIQUE (id),
FOREIGN KEY (artist_id) REFERENCES artists (id) ON DELETE CASCADE,
FOREIGN KEY (featured_artist_id) REFERENCES artists (id) ON DELETE CASCADE,
FOREIGN KEY (album_id) REFERENCES albums (id) ON DELETE CASCADE
);

CREATE TABLE playlists (
playlist_id INT AUTO_INCREMENT NOT NULL,
name VARCHAR(255) NOT NULL,
cover_img LONGTEXT,
created_at DATE NOT NULL,
upload_at DATE NOT NULL,
PRIMARY KEY (playlist_id),
UNIQUE (playlist_id)
);

CREATE TABLE users (
id INT AUTO_INCREMENT NOT NULL, -- unique
username VARCHAR(255) NOT NULL, -- unique 
email VARCHAR(255) NOT NULL, -- unique 
created_at DATE NOT NULL,
password VARCHAR(255) NOT NULL,
preferences JSON,
is_admin BOOLEAN,
remrmber_token BOOLEAN,
PRIMARY KEY (id),
UNIQUE (id),
UNIQUE (username),
UNIQUE (email)
);

CREATE TABLE songs_in_playlists (
song_id INT NOT NULL,
playlist_id INT NOT NULL,
FOREIGN KEY (song_id) REFERENCES songs (id) ON DELETE CASCADE,
FOREIGN KEY (playlist_id) REFERENCES playlists (playlist_id) ON DELETE CASCADE
);


CREATE TABLE playlists_of_users (
user_id INT NOT NULL,
playlist_id INT NOT NULL,
FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
FOREIGN KEY (playlist_id) REFERENCES playlists (playlist_id) ON DELETE CASCADE
);

CREATE TABLE liked_songs_interactions (
interaction_id INT NOT NULL AUTO_INCREMENT,
user_id INT NOT NULL,
song_id INT NOT NULL,
is_liked BOOLEAN,
created_at DATE NOT NULL,
PRIMARY KEY (interaction_id),
FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
FOREIGN KEY (song_id) REFERENCES songs (id) ON DELETE CASCADE
);

CREATE TABLE songs_played_count (
count_id INT NOT NULL AUTO_INCREMENT,
user_id INT NOT NULL,
song_id INT NOT NULL,
created_at DATE NOT NULL,
PRIMARY KEY (count_id),
FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
FOREIGN KEY (song_id) REFERENCES songs (id) ON DELETE CASCADE
);

-- ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'moran1324'
 