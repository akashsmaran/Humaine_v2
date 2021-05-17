var pg = require("pg");
const { Client } = require("pg");
require("dotenv").config();
// process.env.DB_HOST_DOCKER
const client = new Client({
  user: process.env.DB_USER,
  // For dev, use below
  // host: process.env.DB_HOST || process.env.DB_HOST_DOCKER,
  host: "postgres",
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
