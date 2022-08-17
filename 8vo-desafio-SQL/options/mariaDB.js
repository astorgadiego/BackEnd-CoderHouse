const options = {
    client : 'mysql',
    connection : { 
        host: 'localhost',
        user: 'root',
        password : '',
        database : '8vodesafio' //ACA VA EL NOMBRE MI BASE DE DATOS CREADA EN WORKBENCH
    
    }    
}

module.exports = { options };

//ESTO ES LA CONFIGURACION DE KNEX
//ESTO LO TENGO QUE IMPORTAR EN DONDE SEA QUE VOY A HACER USO DE MI BASE DE DATOS