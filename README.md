# 🍺 THIS IS A BEER APP 🍺

This project is a beer consumption monitoring application. The user can enter the beers he drinks in a grid. The purpose of the application is to provide consumption statistics to the user.

This project is not intended to push for alcohol consumption. The goal is simply to be able to track your consumption in a fun way, and to discover new beers 🍺

## Project configuration

### Docker

This project is running with Docker (for the NodeJS back server, database server and the client server on developement mode).
`docker-compose` files are ready for production and development, so you should install Docker and docker-compose on your machine.

Launch production containers : 

`docker-compose up`

Launch developement containers : 

`docker-compose -f docker-compose.dev.yml up`

### .env file

Project is running with default variables, but if you want to override some, you can create a .env file at the root directory.
You can duplicate the `.env-local-sample` file and update it with your own environment variables. These variables are used both client and server side.

Variables used client-side have to be prefixed with "REACT_APP\_", as the application is built with create-react-app ([see the .env documentation here](https://create-react-app.dev/docs/adding-custom-environment-variables/))


### Running without Docker

If you don't want to use Docker, or you can't install it, you can run the differents services on your machine. You'll just  have to set up some settings and environments.

- MongoDB
- Frontend proxy


