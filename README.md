# 🍺 THIS IS A BEER APP 🍺

This project is a beer consumption monitoring application. The user can enter the beers he drinks in a grid. The purpose of the application is to provide consumption statistics to the user.

This project is not intended to push for alcohol consumption. The goal is simply to be able to track your consumption in a fun way, and to discover new beers 🍺

## Project configuration

### .env file

Before starting anything, you will have to create a .env file at the root directory.
You can duplicate the `.env-local-sample` file and update it with your own environment variables. These variables are used both client and server side.

Variables used client-side have to be prefixed with "REACT_APP\_", as the application is built with create-react-app ([see the .env documentation here](https://create-react-app.dev/docs/adding-custom-environment-variables/))

### Docker

This project is running with Docker (for the NodeJS back server, database server and the client server on development mode).
Docker uses variables provided in `.env file` (just above).
