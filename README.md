# Tier App Shortern URL Service
This repository contains code for shorterning url microservice.

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites
* Node > v12.18.3
* npm / yarn 
* PostgreSQL Instant Client ( [Download from here](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads) )
* PostgreSQL DB Connectivity

### Installing
Get a copy of the code

#### Install dependencies
```
cd tier-app
npm install
```

#### App Configurations
 Create .env fle at root level in the project folder, and copy the content from [.env.example](.env.example)

#### Running the App

> If you are running the app for the first time, set `DB_SYNCHRONIZE`=true and `DB_MIGRATION_RUN`=false in `.env`. ( It'll take care of the initial database schema setup and seeding data)

Run this command, and it'll start a development server on port defined in `.env`
```
npm run dev
```

#### Swagger Documentation
```
http://localhost:<port>/<base-url>/docs
```


### Running the test cases
```
npm run test
```
Run following command for coverage
```
npm run coverage
```


### Compiling the app
```
npm run compile
```
It'll create an optimised build in __build__ directory