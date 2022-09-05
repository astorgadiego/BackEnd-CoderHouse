//-------IMPORTANTE PARA PODER USAR EL REQUIRE CON EL TYPE: MODULE
//import { createRequire } from 'module';
//const require = createRequire ( import.meta.url )




// //const { options  } = require ('./options/mariaDB')
// /*const knex = require('knex')(options);*/
import options from './options/mariaDB.js'
import knex from 'knex'
const coneccionMariaDB = knex(options)




//module.exports = knex;
export default coneccionMariaDB
