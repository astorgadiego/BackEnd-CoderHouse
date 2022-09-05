//ESTO VIENE A REPRESENTEAR EL LADO DEL SERVIDOR
//IMPORTANDO LIBRERIAS
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

//IMPORTAMOS LA CLASE DESDE EL CONTENEDOR 
const Diego = require ('./contenedor')

const ListadeProductos =   [];
const mensaje = "Hola Mundo"
const Arraymensajes = [];
Diego.crearTabla();
Diego.CrearMensajes();


io.on ('connection', ( socket ) =>{
    
    console.log("Un usuario se ha conectado");
    socket.emit("Tabla de Productos", ListadeProductos )//ACA LE ENVIAMOS LOS PRODUCTOS QUE ESTAN A ESE CLIENTE NUEVO!!
    socket.emit("ID de mensaje", Arraymensajes)//ACA LE ENVIAMOS LOS MENSAJES QUE ESTAN A ESE CLIENTE NUEVO!!
    socket.on ( 'guardarProducto', (prod) => {
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

//EL SERVIDOR FUNCIONANDO EN EL PUERTO 8080
const server = httpServer.listen(PORT, () => console.log(`Servidor OK en puertO : ${PORT} `));  // INICIO LA APLICACION

server.on( "Error", err => console.log(` Error en el servidor: ${err} `));