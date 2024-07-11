require('dotenv').config().parsed
module.exports = {
  development: {
    username: process.env.DATABASE_DEVELOPMENT_USERNAME,
    password: process.env.DATABASE_DEVELOPMENT_PASSWORD,
    database: process.env.DATABASE_DEVELOPMENT_NAME,
    host: "127.0.0.1",
    dialect: "postgres",
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: process.env.DATABASE_DEVELOPMENT_USERNAME,
    password: process.env.DATABASE_DEVELOPMENT_PASSWORD,
    database: process.env.DATABASE_DEVELOPMENT_NAME,
    host: "127.0.0.1",
    dialect: "postgres",
  },
};
