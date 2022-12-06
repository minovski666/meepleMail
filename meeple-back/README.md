# Routines Users and Authentication Microservice



This Microservice Contains
- Typescript
- i18n-node
- tape for testing
- istanbul coverage
- tslint & eslint
- Templating by nunjucks
- express
- winston for logging
- skaffold
- bcrypt
- cookie-parser
- cookie-session
- Passport.js
- passport-google-token
- passport-jwt
- passport-local
- jsonwebtoken
- swagger-jsdoc
- mongoose

## Installation

1. Globally install **node**

- You can find instruction at https://nodejs.org/en/download/

2. Setup your IDE (if you didn't already):
- Enable typescript to read from tsconfig.json

3. setup Docker and Kubernetes (if you didn't already')
4. setup skaffold on your local machine.
- more information about skaffold at https://skaffold.dev/docs/

6. Setup the project:

**Run all the following commands in the root of your project**

Run `$ npm install` and it will install all the dependencies.

## How to run

### Start the app in dev mode

`$ skaffold dev`

### Running Tests

`$ npm run test`

You must name your test `<name>.test.ts` and save the file in the same folder of the file you are testing.

For example, tests for server.ts should be in server.test.ts

    |-- src
      |-- utils.ts
      |-- utils.test.ts
    |-- server.ts
    |-- server.test.ts


## Typescript

### Documentation

Typescript documentation can be found at http://www.typescriptlang.org/docs/tutorial.html

### Configuration

Typescript configuration can be found at http://www.typescriptlang.org/docs/handbook/tsconfig-json.html

##Folder structure
* First, we have the `config` folder, which keeps all the configs needed for the application


* `src` directory houses the source code.


* `controllers`, directory will house all the controllers needed for the application. These controller methods get the request from the routes and convert them to HTTP responses with the use of any middleware as necessary.


*  `middlewares` directory will segregate any middleware needed for the application in one place. There can be middleware for passport authentication, ErrorHandler, or any other purpose.


*  `routes` directory will have a single file for each logical set of routes. For example, there can be routes for one type of resource. It can be further broken down by versions like v1 or v2 to separate the route files by the version of the API.


* `models` directory will have data models required for the application.


* `services` directory will include all the business logic. It can have services that represent business objects and can run queries on the database. Depending on the need, even general services like a password hash can be placed here.


* `utils` directory will have all the utilities and helpers needed for the application. It will also act as a place to put shared logic, if any. For example, Database connection, Logger setup etc...

## Utils

### Logger

```javascript
const { Logger } = require('./src/utils');

logger.debug("debug message");
logger.info("info message");
logger.warn("warn message");
logger.error("error message");
```

### openApiDocumentation

Documentation about the API can be found at `/api-docs`
