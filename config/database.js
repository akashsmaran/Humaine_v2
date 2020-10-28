var pg = require('pg');
const { Client } = require('pg');
const client = new Client({
    user: 'tecmint',
    host: 'localhost',
    database: 'taskmanagement',
    password: 'Ammar123',
    port: 5432,
});
client.connect().then((result) => console.log('Database connection successful')).catch((err) => console.log(err));

module.exports = {
    database: client
}