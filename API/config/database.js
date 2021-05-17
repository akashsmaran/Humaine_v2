var pg = require("pg");
const { Client } = require("pg");
require("dotenv").config();
const client = new Client({
  user: process.env.DB_USER,
  // For dev, use below
  // host: process.env.DB_HOST,
  host: process.env.DB_HOST_DOCKER,
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
