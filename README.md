[![Build Status](https://travis-ci.org/fedoranimus/typescript-mean-stack.svg?branch=master)](https://travis-ci.org/fedoranimus/typescript-mean-stack)

# MEAN stack built with Typescript
A project building out a MEAN stack with Typescript and Mongoose

## Introduction

This is a basic Express server running on NodeJS built with Typescript. It uses Gulp, also written in Typescript, for running tasks. The purpose is to provide a skeleton for users to stay up to date on building server-side Typescript applications.

## Prerequisites

1. Latest version of NodeJS install
2. Install MongoDB on the default port (27017)

## How to Run

```javascript
npm install //install the npm dependencies
typings install //install the TypeDefs (will migrate to npm @types soon)
npm start //build the project with dev environment, start Nodemon, watch for changes
```

Additionally, NODE_ENV can be specified to change the environment the server will be running under
```javascript
npm run stage //uses environment/stage.ts
npm run prod //uses environment/prod.ts
```

## Using Gulp

This project includes two gulpfiles:
```javascript
gulpfile.js //eval and compile gulpfile.ts; all paths must be relative to this file
tasks/gulpfile.ts //write gulp tasks here
```

## API Routes

TBD

## License

MIT