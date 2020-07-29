const db_engine = process.env.DB_ENVIRONMENT || "development";
const config = require('./knexfile')[db_engine]

module.exports = require('knex')(config);