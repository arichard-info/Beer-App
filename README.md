# THIS IS A BEER APP 🍺

This project is a beer consumption monitoring application. The user can enter the beers he drinks in a grid. The purpose of the application is to provide consumption statistics to the user.

This project is not intended to push for alcohol consumption. The goal is simply to be able to track your consumption in a fun way, and to discover new beers.

## Project configuration

### Docker

This project is running with Docker (for the NodeJS back server, database server and the client server on developement mode).
`docker-compose` files are ready for production and development, so you should install Docker and docker-compose on your machine.

Launch production containers :

`docker-compose up`

Launch developement containers :

`docker-compose -f docker-compose.dev.yml up`

### Running without Docker

If you don't want to use Docker, or you can't run it, you can run the differents services on your machine. You'll just have to set up some settings and environments.

#### MongoDB :

- [Install MongoDB](https://docs.mongodb.com/manual/installation/) and create a project database.
- Create a .env file in the `server/` directory, and add your mongodb connexion uri :

```conf
DATABASE=mongodb://localhost:27017/[database]
```

#### Frontend proxy :

In order to consume the server's data, the client redirects the /api/\* calls to the NodeJs server.
To make it works on localhost, you have to create a .env file in the `client/` directory, and add your server's address :

```conf
REACT_APP_PROXY=http://localhost:5000
```

### environment variables

Currently available variables (.env):

```conf
# Docker settings
CLIENT_PORT=2000
SERVER_PORT=7777
DATABASE_PORT=27017

# mongodb connection
DATABASE=mongodb://database:27017/beer_app

# frontend variables
REACT_APP_PROXY=http://backend:5000
```

#### with Docker

The project uses default environment variables, but if you want to override some, you can define them in a .env file at the root directory. These variables are used both client and server side.

#### without Docker

If you're running the project without Docker and need to add / override environment variables, you will have to set these variables in a .env file in the `client/` or `server/` folder.

#### Variables prefix

Variables used client-side have to be prefixed with "REACT_APP\_", as the application is built with create-react-app ([see the .env documentation here](https://create-react-app.dev/docs/adding-custom-environment-variables/))
