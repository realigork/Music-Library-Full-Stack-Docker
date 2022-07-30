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

Run docker-compose container in a detached mode specifying that it needs to build a Dockerfile
```bash
docker-compose up -d --build
```

# MySQL

Default port for MySQL is 3306

Connect via terminal to test the connection:
```bash
mysql -h localhost -P 3306 --protocol=tcp -uroot -pletmein
```

Ensure 'musiclibrarydb' database exists:
```bash
SHOW DATABASES;
```

If yes, connect to it:
```bash
USE musiclibrarydb
```

Now check which tables exist:
```bash
SHOW TABLES;
```

To view rows and columns of the table:
```bash
DESC <tablename>
```
