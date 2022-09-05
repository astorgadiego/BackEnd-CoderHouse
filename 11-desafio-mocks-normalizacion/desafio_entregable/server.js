//ESTO VIENE A REPRESENTEAR EL LADO DEL SERVIDOR
//IMPORTANDO LIBRERIAS

//IMPORTAMOS EL FAKER
import { faker } from '@faker-js/faker';

//IMPORTAMOS EL NORMALIZR
import { schema, normalize, denormalize } from 'normalizr';
import util from 'util';

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
// import Contenedor from './contenedor.js'

// import coneccionMariaDB from './configuracionMariaDB.js';
// import coneccionSQlite from './configuracionsqlite.js';

//const Diego = new Contenedor( coneccionMariaDB , 'tablaProductos_11vo_desafio', coneccionSQlite )
const Arraymensajes = [];


io.on ('connection', ( socket ) =>{
    console.log("Un usuario se ha conectado");  
    socket.emit("ID de mensaje", Arraymensajes)//ACA LE ENVIAMOS LOS MENSAJES QUE ESTAN A ESE CLIENTE NUEVO!!

    socket.on ( "nuevo-mensaje", data=>{ 
        Arraymensajes.push( data )
        console.log("somos los mensajes ",Arraymensajes );
        console.log("nuestro largo es: ",JSON.stringify(Arraymensajes).length);
        // Definimos un esquema de usuarios (autores y comentadores)
        const authorSchema = new schema.Entity('autores')
        const mensajeSchema = new schema.Entity('mensaje')
        const textoSchema = new schema.Entity('texto',{
            autores :  authorSchema,
            texto: [ mensajeSchema ] 
        })

        const MensajesNormalizados = normalize ( Arraymensajes , textoSchema ) 
        function print(objeto) {
            console.log("SOMOS LOS MENSAJES NORMALIZADOS",util.inspect(objeto,false,12,true),{
                length : JSON.stringify(objeto).length
            })
            
        }  
        print( MensajesNormalizados )

        io.sockets.emit("Mensajes Actualizados", Arraymensajes)
     });

});

//EL SERVIDOR FUNCIONANDO EN EL PUERTO 3000
const server = httpServer.listen(PORT, () => console.log(`Servidor OK en puertO : ${PORT} `));  // INICIO LA APLICACION

server.on( "Error", err => console.log(` Error en el servidor: ${err} `));