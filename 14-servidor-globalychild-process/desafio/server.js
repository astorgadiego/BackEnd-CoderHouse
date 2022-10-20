const express = require('express')
const path = require('path')
const parseArgs = require('minimist')
//const dotenv= require('dotenv')
require('dotenv').config()
const app = express()

const { exec, fork, spawn, execFile } = require('child_process')

//RECUPERAR DATOS Y CONTRASENAS DESDE EL ARCHIVO .ENV
require('dotenv').config()

const bCrypt = require('bcrypt')
const session = require('express-session')
const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');


//----------ELECCION DEL PUERTO DEL SERVIDOR ------
const options = {
    default:{
        puerto: 8080
    }
}

const comando = parseArgs(process.argv.slice(2), options)


// console.log(comando)
// console.log(comando.puerto);


const PORT = comando.puerto ; //  SI PONES node server --puerto 3000 VA AL PUERTO QUE VOS PONGAS SI NO POR DEFECTO VA AL PUERTO 8080
//------------------------------

app.use(express.json());   //ESTAS DOS LINEAS SON NECESARIAS PARA PODER USAR GET, POST, PUT, Y DELETE
app.use(express.urlencoded({ extended: true })); //ARRIBA DEL VIEW ENGINE

//ESTO ES IMPORTANTE PARA PODER USAR EL RES.RENDER!!! 
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

/*---PERSISTENCIA EN MONGO ====*/
const MongoStore = require('connect-mongo')
const { type } = require('os')


const claveMONGO = process.env.contraMongo

app.use(session( { 
    //----PERSISTENCIA EN REDIS DATABASE  
    store: MongoStore.create ( { 
           //EN ATLAS CONNECT APP: ASEGURATE DE CAMBIAR A 2.2.12: 
           mongoUrl: `mongodb+srv://Diego1:${claveMONGO}@cluster0.3dsj157.mongodb.net/?retryWrites=true&w=majority`,
           //mongoOptions: advancedOptions,
           ttl: 60,
           retries: 1
  
     } ) ,
     
     //----------------
     secret: 'secret',
     resave: false,
     saveUninitialized: true
  
  } ))

/*=======*/

const usuarios = []

/* ------------------ PASSPORT -------------------- */

passport.use('register', new LocalStrategy({
    passReqToCallback: true
  }, (req, username, password, done) => {
  
  
    const usuario = usuarios.find(usuario => usuario.username == username)
    if (usuario) {
      return done('already registered')
    }
  
    const user = {
      username,
      password: createHash(password),
    }
    usuarios.push(user)
  
    return done(null, user)
  }));
  
  function createHash(password) {
      return bCrypt.hashSync(
                password,
                bCrypt.genSaltSync(10),
                null);
    }
    
  
  passport.use('login', new LocalStrategy((username, password, done) => {
  
    const user = usuarios.find(usuario => usuario.username == username)
  
    if (!user) {
      return done(null, false)
    }
  
    if (user.password != password) {
      return done(null, false)
    }
    if (!isValidPassword(user, password)) {
      console.log('Contrasena Incorrecta');
      return done(null, false)
      
    }
  
    return done(null, user);
  }));
  
  function isValidPassword(user,password) {
      return bCrypt.compareSync(password, user.password);
  }
  
  passport.serializeUser(function (user, done) {
    done(null, user.username);
  });
  
  passport.deserializeUser(function (username, done) {
    const usuario = usuarios.find(usuario => usuario.username == username)
    done(null, usuario);
  });

/* --------------------- MIDDLEWARE --------------------------- */

app.use(session({
    secret: 'shhhhhhhhhhhhhhhhhhhhh',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60000
    }
  }))

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static('public'))

/* --------------------- AUTH --------------------------- */

function isAuth(req, res, next) {
  if (req.isAuthenticated()) {
    next()
  } else {
    res.redirect('/login')
  }
}


/* --------------------- ROUTES --------------------------- */

// REGISTER
app.get('/register', (req, res) => {
    res.render('register.html')
  })
  
  app.post('/register', passport.authenticate('register', { failureRedirect: '/failregister', successRedirect: '/' }))
  
  app.get('/failregister', (req, res) => {
    res.render('register-error');
  })
  
  // LOGIN
  app.get('/login', (req, res) => {
    res.render('login.html')
  })
  
  app.post('/login', passport.authenticate('login', { failureRedirect: '/faillogin', successRedirect: '/datos' }))
  
  app.get('/faillogin', (req, res) => {
    res.render('login-error');
  })  

  

// DATOS
app.get('/datos', isAuth, (req, res) => {

    res.render('datos', {
      datos: usuarios.find(usuario => usuario.username == req.user.username),
    });
  })
  
  /* --------- LOGOUT ---------- */
  app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/')
  })
  
  /* --------- INICIO ---------- */
  app.get('/', isAuth, (req, res) => {
    res.redirect('/datos')
  })


  /*--------INFO---------*/

  app.get('/info', (req,res) => { 

    const version2 = process.version
    const RutaEjecucion = process.execPath
    const Plataforma = process.platform
    const IDProcess = process.pid
    const carpetaProyecto = process.cwd()
    const UsodeMemoria = process.memoryUsage().rss
    const entrada= comando.puerto 

    console.log(version2);
    res.render('informacion.html', { entrada, version2,RutaEjecucion,Plataforma,IDProcess,carpetaProyecto,UsodeMemoria }) 
})

//---------API-RANDOMS ------------

app.get('/api/randoms', (req,res) => { 
  let { url } = req
  //console.log( 'La URL que captura de tipo : ', typeof(url) ); 
  console.log(' La url es:  ',url);

  let { cant }= req.query
  //console.log('El tipo de la url es: ', typeof(cant));

  



  if (cant !== undefined ) {
    const funcionRandoms = fork('child2.js')
    
    funcionRandoms.send( cant )
    
    

    funcionRandoms.on('message', array_objeto =>{
      
  
      console.log('aaaaa', array_objeto);
    
      console.log('CON QUERY');
      res.render('randoms.html', {array_objeto})
    })
    

    
    
  }else {
    console.log('FALTA QUERY');
    console.log('SE VAN A MOSTRAR 100.000.000 DE NUMEROS');

    const funcionRandoms = fork('child3.js')

    funcionRandoms.send( 100000 )
    
    funcionRandoms.on('message', array_objeto =>{
      
      console.log('aaaaa', array_objeto);
    
      console.log('FALTA QUERY');
      res.render('faltaquery.html')

    })

    
  }
   
})  // Por ej: /randoms?cant=20000

// Hola Diego, tenes que hacer una función que se ejecute la cantidad de veces especificada por req.query 
//(fijate que también pone un valor por defecto en caso de que no se especifique nada) y luego la función tiene que 
//ejecutarse N veces, en cada vez tiene que devolver un número entre 1 y 1000, y mismo vas a ir cargando un array donde tengas

// {

// valor: número que salió

// cantidad: cantidad de veces que salió ese número entre 1-1000

//}

//----------APLICACION-------------

const server = app.listen(PORT, () => console.log(`Servidor OK en puerto ${PORT}`));  // INICIO LA APLICACION

server.on( "Error", err => console.log(` Error en el servidor: ${err} `)); //MANEJO EL ERROR