# Music Library - Full Stack App with Docker

Create albums, create music library, assign each music track to individual album and delete everything in one go or separately as you please.

Based on React client-side application with Node APIs that connect to MySQL database and everything running inside Docker containers. What else could be better?

## Prerequisites

You need a docker-compose CLI. If you don't have Docker installed, download it from here: https://docs.docker.com/compose/install/compose-desktop/

## Running

1. Navigate to the root directory in your terminal
2. Run the command: `docker-compose up -d --build`
    - This should spin off 3 containers for React client, Node backend and MySQL database.
3. If all went successfully you can view the client app on: `localhost:3000`

## View API list

`localhost:3000/api`

## Testing APIs

You can test APIs through Insomnia or Postman if you prefer UI application or HTTPie through the terminal.

Server is running on port 8000: `localhost:8000`

## Stop containers

`docker-compose down`

## Further improvements

1. Implement data store
2. Implement caching