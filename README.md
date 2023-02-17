
# KleenHub Assessment

A backend app that is a sample service for e-commerce.

## Getting the App Locally

1. Clone this repository with this command
```bash
git clone https://github.com/Smeks-ops/TestProject.git
```

## Installing the App

1. Cd into the project folder and the server folder then install the dependencies using

```bash
npm install or yarn 
```
2. Ensure you have the local .env file for configuration parameters.

3. create a docker container for the database using
```bash
npm run docker:db or yarn docker:db
```
4. migrate the database using
```bash
npm run prisma:generate or yarn prisma:generate
```
5. seed the database using
```bash
npm run db: init or yarn db: init
```
6. Run the app using
```bash
npm run start or yarn start
```

## Running tests

```bash
# unit tests
cd server
$ npm run test

```