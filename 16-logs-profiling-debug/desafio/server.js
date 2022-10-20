//ESTO VIENE A REPRESENTEAR EL LADO DEL SERVIDOR
//IMPORTANDO LIBRERIAS
const express = require('express')

const parseArgs = require('minimist')

const compression = require('compression')

const path = require('path')

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

//----------ELECCION DEL PUERTO DEL SERVIDOR ------
const options = {
    default:{
        puerto: 8080
    }
}

//IMPORTANDO LOGGERS

const pino = require('pino')
const logger = pino()

const comando = parseArgs(process.argv.slice(2), options)

const autocannon = require('autocannon');
const { runInContext } = require('vm');



//INDICAMOS QUE QUEREMOS CARGAR NUESTRO ARCHIVO INDEX.HTML EN LA RAIZ DE LA MISMA
app.use ( express.static ( './public' )  )

//ESTO ES IMPORTANTE PARA PODER USAR EL RES.RENDER!!! 
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

//ESTA RUTA CARGA NUESTRO ARCHIVO INDEX.HTML EN LA RAIZ DE LA MISMA
app.get ( '/', ( req, res)=>{ 

    const { url, method } = req //Ruta y método de todas las peticiones recibidas por el servidor

    logger.info( `Solictud con ruta ${url}, y metodo ${method}, exitosa!!!` )
    
    res.sendFile ( 'index.html', { root:__dirname }  ) 
    }
)

const ListadeProductos =   [];
const mensaje = "Hola Mundo"
const Arraymensajes = [];

io.on ('connection', ( socket ) =>{
    console.log("Un usuario se ha conectado");
    socket.emit("Tabla de Productos", ListadeProductos )//ACA LE ENVIAMOS LOS PRODUCTOS QUE ESTAN A ESE CLIENTE NUEVO!!
    socket.emit("ID de mensaje", Arraymensajes)//ACA LE ENVIAMOS LOS MENSAJES QUE ESTAN A ESE CLIENTE NUEVO!!

    socket.on ( 'guardarProducto', prod => {
        logger.error( `FALLA AL PUBLICAR EL NUEVO PRODUCTO` )

        const errpino = pino('errores.log')
        errpino.level = 'error'
        errpino.error( `FALLA AL PUBLICAR EL NUEVO PRODUCTO` )

        ListadeProductos.push( prod );
        io.sockets.emit ( 'ProductoActual', ListadeProductos )//-->ACA LO ENVIA TODOS LOS USUARIOS
    })

    socket.on ( "nuevo-mensaje", data=>{ 
        Arraymensajes.push( data )

        logger.error( `FALLA AL PUBLICAR EL NUEVO MENSAJE` )

        const errpino = pino('errores.log')
        errpino.level = 'error'
        errpino.error(`FALLA AL PUBLICAR EL NUEVO PRODUCTO`)

        io.sockets.emit("Mensajes Actualizados", Arraymensajes)
     });

});

app.get('/info', (req,res) => { 

    const version2 = process.version
    const RutaEjecucion = process.execPath
    const Plataforma = process.platform
    const IDProcess = process.pid
    const carpetaProyecto = process.cwd()
    const UsodeMemoria = process.memoryUsage().rss
    const entrada= comando.puerto 

    const { url, method } = req //Ruta y método de todas las peticiones recibidas por el servidor

    logger.info( `Solictud con ruta ${url}, y metodo ${method}, exitosa!!!` )

    const infopino = pino('informacion.log')
    infopino.level = 'info'
    infopino.info(`Solictud con ruta ${url}, y metodo ${method}, exitosa!!!`)
    
    console.log('PRUEBA DE ARTILLERY, FUNCIONA MEJOR?');

    autocannon('http://localhost:8080/info')

    res.render('informacion.html', { entrada, version2,RutaEjecucion,Plataforma,IDProcess,carpetaProyecto,UsodeMemoria }) 
})

app.get('/infoZip', compression() , (req,res) => { 

    const version2 = process.version
    const RutaEjecucion = process.execPath
    const Plataforma = process.platform
    const IDProcess = process.pid
    const carpetaProyecto = process.cwd()
    const UsodeMemoria = process.memoryUsage().rss
    const entrada= comando.puerto 

    const { url, method } = req //Ruta y método de todas las peticiones recibidas por el servidor

    logger.info( `Solictud con ruta ${url}, y metodo ${method}, exitosa!!!` )

    console.log(version2);
    res.render('informacion.html', { entrada, version2,RutaEjecucion,Plataforma,IDProcess,carpetaProyecto,UsodeMemoria }) 
})

app.get('*', (req,res) => {  //PETICIONES A RUTAS INEXISTENTES EN EL SERVIDOR

    const { url, method } = req //Ruta y método de todas las peticiones recibidas por el servidor

    logger.warn( `Solictud con ruta ${url}, y metodo ${method}, INEXISTENTE!!!` )

    const warnpino = pino('warnings.log')
    warnpino.level = 'warn'
    warnpino.warn(`Solictud con ruta ${url}, y metodo ${method}, INEXISTENTE!!!`)

    console.log(`esta ruta no existe ${url}`); 
})



//EL SERVIDOR FUNCIONANDO EN EL PUERTO 3000
const server = httpServer.listen(PORT, () => console.log(`Servidor OK en puertO : ${PORT} `));  // INICIO LA APLICACION

server.on('error', error => logger.error(`Error en servidor: ${error}`))