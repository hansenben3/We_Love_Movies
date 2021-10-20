const environment = process.env.NODE_ENV || "development";
const config = require("../../knexfile")[environment];
const knex2 = require("knex");

const knex = knex2(config)

module.exports = knex;
