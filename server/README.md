# Docker

With Docker you can enter one command and it will start the entire application, connect to the database, etc. It will simplify the deployment process too.

Docker Compose allows to create multiple containers in one file. In order to connect containers together, you would have to specify the same network for your services:

```yml
services:
  mysqldb:
    networks:
      - internalnet

networks:
  internalnet:
    driver: bridge
```

You need Docker to be installed in order to have the CLI and docker-compose plugin available to use.

You can test it by running this command in the root folder:
```bash
docker-compose config
```

If no errors then all good.

You can check if there are existing container running:
```bash
docker ps -a
```

You can check if you have any images;
```bash
docker images
```

Run docker-compose container in a detached mode
```bash
docker-compose up -d
```

# MySQL

Default port for MySQL is 3306

Connect via terminal to test the connection:
mysql -h localhost -P 3306 --protocol=tcp -uroot -pletmein

Ensure 'artlist' database exists:
SHOW DATABASES;

If yes, connect to it:
USE artlist

Now check which tables exist:
SHOW TABLES;

## Current Problems

I am not able to create tables using init.sql script. It does create 'artlist' database, but not tables. Therefore, I have to connect to MySQL client via terminal:
```bash
mysql -h localhost -P 3306 --protocol=tcp -uroot -pletmein
```

Switch to artlist database:
```bash
USE artlist
```

Then copy and paste script to create tables albums and tracks:
```sql
CREATE TABLE IF NOT EXISTS albums (
    id          BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    name        VARCHAR(255) DEFAULT NULL,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS tracks (
    id          BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    name        VARCHAR(255) DEFAULT NULL,
    artist      VARCHAR(255) DEFAULT NULL,
    genre       VARCHAR(255) DEFAULT NULL,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);
```

# TODO

1. Assign tracks to albums
  - create a separate table albumtracks that contains album_id and track_id columns
  - create a query to insert the data into the albumtracks
  - update getAlbum query to return album data together with an array of assigned tracks:
    - select * from albums by id
    - select * from albumtracks by id
    - select * from tracks by returned values from the albumtracks
    - contruct the data


## DATA DUMP

INSERT INTO albums (album_name) VALUES ('My favourites mixes');
INSERT INTO albums (album_name) VALUES ('Phonk Collection');
INSERT INTO tracks (track_name, artist, genre) VALUES ("Test track ok", "Lxst Cxntury", "Phonk");
INSERT INTO tracks (track_name, artist, genre, album_id) VALUES ("Flystyler", "Lxst Cxntury", "Phonk", 2);
INSERT INTO tracks (track_name, artist, genre, album_id) VALUES ("Platinum Show", "Lxst Cxntury", "Phonk", 2);