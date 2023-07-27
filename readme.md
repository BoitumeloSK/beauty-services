# Beauty Shop

This is a fully functional CRUD beauty shop application developed using the node.js express web application framework. It can be used with one of the SQL databases supported by sequelize.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [License](#license)

## Installation

You can download the ZIP folder or clone the repository using:

```shell
git clone https://github.com/BoitumeloSK/beauty-shop.git
```

To install the apps packages, run:

```shell
npm install
```

## Usage

- This application was built using MySQL. To use a different SQL database, check the sequelize documentation to verify if it supports it.
- Add a new database in your chosen database system.
- In the .env file, add the values for `PG_DATABASE`, `PG_USERNAME`, and `PG_PASSWORD` which are the name of your database, username, and password respectively. Additionally, add a value for `SECRET` which is your **jsonwebtoken** secret key.

- To seed the database, run the following command:

```shell
npm run seed
```

- In the terminal run the following command to initialise the database and run the server:

```shell
npm start
```

You may now perform the CRUD functionality using an API platform like Postman.

## License

Licensed under the MIT license.
