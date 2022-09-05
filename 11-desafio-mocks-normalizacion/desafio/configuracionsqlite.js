//-------IMPORTANTE PARA PODER USAR EL REQUIRE CON EL TYPE: MODULE
//import { createRequire } from 'module';
//const require = createRequire ( import.meta.url )

//const { options  } = require ('./options/sqliteDB')
//const knexsqlite = require('knex')( options );

import options from './options/sqliteDB.js'
import knex from 'knex'
const coneccionSQlite = knex(options)

//module.exports = knexsqlite;
export default coneccionSQlite;