const { options  } = require ('./options/mariaDB')
const knex = require('knex')(options);

module.exports = knex;