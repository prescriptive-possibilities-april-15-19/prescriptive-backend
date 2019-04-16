const environment = process.env.NODE_ENV || 'development';    // if nothing sets ENV, use development
const configuration = require('../knexfile.js')[environment]; // require environment's settings from knexfile
const database = require('knex')(configuration);              // connect to DB via knex using env's settings

module.exports = database; 