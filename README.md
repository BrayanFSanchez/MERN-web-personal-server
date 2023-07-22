# Project Name

Welcome to my MERN project server called web-personal-server.

## Description

This server was developed using Node.js and Express as the backend for a MERN project (MongoDB, Express, React, Node.js). It provides a RESTful API to interact with the database and serve the data required by the client.

## Installation

1. Clone the repository: https://github.com/BrayanFSanchez/MERN-web-personal-server.git
2. Navigate to the server directory: cd server
3. Install the dependencies using Yarn: yarn install or npm install

## Configuration

1. Create a .env file in the root directory of the server.
2. Define the required environment variables, such as the database connection string or other project-specific configurations.

## Usage

To start the server, run the following command:

yarn dev
yarn start

The server will run on http://localhost:3977/ by default.

## Project structure

The folder structure you mentioned (controllers, middlewares, models, router, uploads, utils, .env) follows an organization based on the Model-Controller pattern (MVC). In this pattern, the models represent the data and are located in the "models" folder. Controllers, located in the "controllers" folder, take care of the business logic and handle user requests. Although not explicitly mentioned, the MVC structure also includes the view, which handles the presentation of data to the user. The modularized and organized structure of the Model-Controller pattern allows for easier project development and maintenance.

## APIs and endpoints

APIs represent sets of endpoints that provide functionality and enable communication with the Node.js server. Each API focuses on a specific domain of the application, such as authentication (auth), courses (course), menus (menu), newsletters (newsletter), posts (post) and users (user). Each API has designated endpoints, which are the paths through which that functionality is accessed.

## Dependencies and requirements

* bcryptjs: Version 2.4.3. This library provides hashing and password verification functions to aid in authentication security.

* body-parser: Version 1.20.2. This middleware allows parsing and extracting data from the body of HTTP requests, facilitating access to parameters and data sent by clients.

* connect-multiparty: Version 2.2.0. This middleware is used to handle multiparty form data, such as file uploads in HTTP requests.

* cors: Version 2.8.5. This middleware allows the configuration of HTTP headers to allow or restrict Cross-Origin Resource Sharing (CORS) requests between different domains.

* dotenv: Version 16.1.4. This library loads environment variables from an .env file to facilitate the configuration of your application in different environments.

* express: Version 4.18.2. Express is a fast and minimalistic web framework for Node.js that allows you to handle HTTP routes, requests and responses easily and efficiently.

* jsonwebtoken: Version 9.0.0. This library is used to generate and verify authentication tokens based on JSON Web Tokens (JWT), which is useful for implementing authentication and authorization in your application.

* mongoose: Version 7.2.2. Mongoose is an object modeling library for Node.js that provides a simple, schema-based interface for interacting with a MongoDB database.

* mongoose-paginate: Version 5.0.3. This Mongoose extension adds pagination functions to database queries, which is useful when you need to split results into pages.

### The development dependencies (devDependencies) are:

* nodemon: Version 2.0.22. Nodemon is a tool that automatically restarts the Node.js server when it detects changes in the project files, which is useful during development to speed up the testing and debugging process.
