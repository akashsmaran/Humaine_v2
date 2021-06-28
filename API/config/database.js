var pg = require("pg");
const { Client } = require("pg");
require("dotenv").config();
// require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` })
// make two

let host =
  process.env.NODE_ENV.trim() === "production"
    ? process.env.DB_HOST_RDS
    : process.env.DB_HOST_DOCKER;

const client = new Client({
  user: process.env.DB_USER,
  // For dev, use below
  // host: process.env.DB_HOST,
  // Docker usage
  // host: process.env.DB_HOST_DOCKER,
  // RDS usage
  // host: process.env.DB_HOST_RDS,
  host: host,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});
client
  .connect()
  .then((result) => {
    console.log("Database connection successful");
  })
  .catch((err) => console.log(err));

module.exports = {
  database: client,
};
