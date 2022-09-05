//ESTO VIENE A REPRESENTEAR EL LADO DEL SERVIDOR
//IMPORTANDO LIBRERIAS

//IMPORTAMOS EL FAKER
import { faker } from '@faker-js/faker';

//----------
//-------IMPORTANTE PARA PODER USAR EL REQUIRE CON EL TYPE: MODULE
import { createRequire } from 'module';
const require = createRequire ( import.meta.url )

//---------------------IMPORTANTE PARA PODER USAR __DIRNAME CON EL TYPEMODULE 
import { URL } from 'url';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
//---------------

const express = require('express')

const HandleBar = require('express-handlebars'); //CARGO EL MODULO DE EXPRESS-HANDLEBARS

const { Server : IOServer } = require ('socket.io')

const { Server : HttpServer } = require ( 'http' )
//-----------------
const PORT = 8080
//-----------------

//INSTANCIANDO EL SERVIDOR Y EL SOCKET
const app = express()
const httpServer = new HttpServer ( app )
const io  = new IOServer ( httpServer )

//INDICAMOS QUE QUEREMOS CARGAR NUESTRO ARCHIVO INDEX.HTML EN LA RAIZ DE LA MISMA
app.use ( express.static ( './public' )  )

//ESTA RUTA CARGA NUESTRO ARCHIVO INDEX.HTML EN LA RAIZ DE LA MISMA
app.get ( '/', ( req, res)=>{ 
    res.sendFile ( 'index.html', { root:__dirname }  ) 
    }
)

//GENERA 5 PRODUCTOS CON FAKER
app.get('/api/productos_test', (req,res) => { 
    const resultado = [];
    for (let i = 1; i <= 5; i++) {
        resultado.push({
            id: i,
            nombre: faker.commerce.product(),
            precio: faker.commerce.price(),
            foto: faker.image.food()
        });
    }
    res.send(resultado); 
})

//IMPORTAMOS LA CLASE DESDE EL CONTENEDOR 
//const Diego = require ('./contenedor.js')
//import {Diego} from '../contenedor.js'
import Contenedor from './contenedor.js'

import coneccionMariaDB from './configuracionMariaDB.js';
import coneccionSQlite from './configuracionsqlite.js';

const Diego = new Contenedor( coneccionMariaDB , 'tablaProductos_11vo_desafio', coneccionSQlite )
const ListadeProductos =   [];
const mensaje = "Hola Mundo"
const Arraymensajes = [];
Diego.crearTablaMariaDB();
Diego.CrearMensajes();

io.on ('connection', ( socket ) =>{
    console.log("Un usuario se ha conectado");
    socket.emit("Tabla de Productos", ListadeProductos )//ACA LE ENVIAMOS LOS PRODUCTOS QUE ESTAN A ESE CLIENTE NUEVO!!
    socket.emit("ID de mensaje", Arraymensajes)//ACA LE ENVIAMOS LOS MENSAJES QUE ESTAN A ESE CLIENTE NUEVO!!

    socket.on ( 'guardarProducto', prod => {
        Diego.InsertarenTabla( prod );
        ListadeProductos.push( prod );
        Diego.MostrarArticulosMariaDB();  //--> MUESTRO TABLA DE PRODUCTOS POR MARIADB
        io.sockets.emit ( 'ProductoActual', ListadeProductos )//-->ACA LO ENVIA TODOS LOS USUARIOS
    })

    socket.on ( "nuevo-mensaje", data=>{ 
        Diego.InsertarenMensajes( data );
        Arraymensajes.push( data )
        Diego.MostrarMensajesSQLITE(); //--->MUESTRO TABLA DE MENSAJES POR SQLITE ( ES ASINCRONO A VECES NO LO MUESTRA )
        io.sockets.emit("Mensajes Actualizados", Arraymensajes)
     });

});

//EL SERVIDOR FUNCIONANDO EN EL PUERTO 3000
const server = httpServer.listen(PORT, () => console.log(`Servidor OK en puertO : ${PORT} `));  // INICIO LA APLICACION

server.on( "Error", err => console.log(` Error en el servidor: ${err} `));