const { options  } = require ('./options/sqliteDB')
const knexsqlite = require('knex')( options );

module.exports = knexsqlite;