/*Continuando con el desafío de la clase anterior, vamos a incorporar un mecanismo sencillo que permite loguear un cliente por su nombre, mediante un formulario de ingreso.
Luego de que el usuario esté logueado, se mostrará sobre el contenido del sitio un cartel con el mensaje “Bienvenido” y el nombre de usuario. Este cartel tendrá un botón de deslogueo a su derecha.
Verificar que el cliente permanezca logueado en los reinicios de la página, mientras no expire el tiempo de inactividad de un minuto, que se recargará con cada request. En caso de alcanzarse ese tiempo, el próximo request de usuario nos llevará al formulario de login.
Al desloguearse, se mostrará una vista con el mensaje de 'Hasta luego' más el nombre y se retornará automáticamente, luego de dos segundos, a la vista de login de usuario.
*/

const express = require ('express')
const cookie_Parser = require('cookie-parser')
const session = require('express-session')
const PORT = 8080;

/*---PERSISTENCIA EN MONGO ====*/
const MongoStore = require('connect-mongo')
const advancedOptions = { useNewUrlParser:true, useUnifiedTopology: true }
/*=======*/

const app = express()
app.use(cookie_Parser())


//------------------------------------

app.use(session( { 
    //----PERSISTENCIA EN REDIS DATABASE  
    store: MongoStore.create ( { 
           //EN ATLAS CONNECT APP: ASEGURATE DE CAMBIAR A 2.2.12: 
           mongoUrl: 'mongodb+srv://Diego1:beto12@cluster0.3dsj157.mongodb.net/?retryWrites=true&w=majority',
           mongoOptions: advancedOptions,
           ttl: 60,
           retries: 1

     } ) ,
     
     //----------------
     secret: 'secret',
     resave: false,
     saveUninitialized: true

 } ))

 //===================================




//ESTO ES IMPORTANTE PARA PODER USAR EL RES.RENDER!!! 
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');



//INDICAMOS QUE QUEREMOS CARGAR NUESTRO ARCHIVO INDEX.HTML EN LA RAIZ DE LA MISMA
app.use ( express.static ( './public' )  ) //ESPACIO PUBLICO DE SERVIDOR. ME SIRVE PARA VINCULAR EL ARCHIVO .CSS


let usuario
let marca = 1

app.get('/login',(req, res) => { 
    const { nombre_del_usuario } = req.query 
    //res.send(`Bienvenido ${nombre_del_usuario}`) 
    const mensaje = 'hola'
    
    usuario = nombre_del_usuario
    if ( nombre_del_usuario ) {
        if ( req.session.usuario ) {
            console.log('existo');
            res.render('login.html', { mensaje , nombre_del_usuario} )

        }else {
            if ( marca == 2) {
                marca = 1
                console.log('resetado por inactividad');
                return res.render('index.html')
            }
            marca = marca + 1 
            console.log('soy marca?L ',marca);
            req.session.usuario = nombre_del_usuario
            //let usuario_session = req.session.usuario
            res.render('login.html', {mensaje , nombre_del_usuario } )
            console.log( req.session.usuario );
            console.log('NO existo');
            //res.send('hola')
        }
        
    } else {
        
    }
} )

 

app.get('/logout', (req, res) => { 
    //const mensaje = 'hola'
    //res.send(`Hasta Luego ${nombre_del_usuario}`) 

    // function volverAlHome () {
    //     res.render('index.html')
    // }

    // setTimeout( volverAlHome , 2000)

    res.render('logout.html', { usuario } )
    
    
})

app.listen( `${PORT}`, () => console.log(`Servidor ok en el puerto: ${PORT}`) )

app.on( "Error", err => console.log(` Error en el servidor: ${err} `));