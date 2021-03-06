# THIS IS A BEER APP 🍺

[![Beer App](https://img.shields.io/endpoint?url=https://dashboard.cypress.io/badge/simple/3do2g1&style=flat&logo=cypress)](https://dashboard.cypress.io/projects/3do2g1/runs)

This project is a beer consumption monitoring application. The user can enter the beers he drinks in a grid. The purpose of the application is to provide consumption statistics to the user.

This project is not intended to push for alcohol consumption. The goal is simply to be able to track your consumption in a fun way, and to discover new beers.

- [Project configuration](#project-configuration)
  - [Docker](#docker)
  - [Running without Docker](#docker)
  - [Environment variables](#environmentvariables)
- [Available scripts](#available-scripts)
  - [Express server](#express-server)
  - [React](#react)
  - [Loading sample data](#loading-sample-data)

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

# nodemailer authentication
MAIL_USER=mail@example.com
MAIL_PASS=mail_password

# authentification variables
SECRET_JWT=my_secret_jwt
SESSION_SECRET=my_secret_session
GOOGLE_CLIENT_ID=my_google_client_id
GOOGLE_CLIENT_SECRET=my_google_client_secret

# frontend variables
REACT_APP_PROXY=http://backend:5000
```

#### with Docker

The project uses default environment variables, but if you want to override some, you can define them in a .env file at the root directory. These variables are used both client and server side.

#### without Docker

If you're running the project without Docker and need to add / override environment variables, you will have to set these variables in a .env file in the `client/` or `server/` folder.

#### Variables prefix

Variables used client-side have to be prefixed with "REACT_APP\_", as the application is built with create-react-app ([see the .env documentation here](https://create-react-app.dev/docs/adding-custom-environment-variables/))

## Available scripts

### Express server

#### `npm run dev`

Runs the server in the development mode.<br />
Open [http://localhost:5000](http://localhost:5000) to view it in the browser.

The server will restart if you make edits.<br />
You will also see any lint errors in the console.

#### `npm run start`

Runs the server for production.

### React

In the project directory, you can run:

#### `npm run start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

#### `npm run test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

### Loading sample data

Sample datas are ready to be injected into the database to test or develop the application more easily. To load or delete this data, these npm scripts are available :

#### `npm run mongo:sample`

Load sample data in the database (in the server/ folder).

If you're using docker, you will need to run this script inside the container :
`docker exec -it [my_container_id] npm run mongo:sample`

#### `npm run mongo:remove`

Clear the database.

To run this script inside the container :
`docker exec -it [my_container_id] npm run mongo:remove`

#### `npm run mongo:replace`

Replace the database (combinaison of the two previous commands).

To run this script inside the container :
`docker exec -it [my_container_id] npm run mongo:replace`

This will populate beers, drinks, and users. The logins for users are as follow :

| Name          | Email (login)      | Password |
| ------------- | ------------------ | -------- |
| John Doe      | john@example.com   | wes      |
| Debbie Downer | debbie@example.com | debbie   |
| Beau          | gounet80@gmail.com | beau     |
