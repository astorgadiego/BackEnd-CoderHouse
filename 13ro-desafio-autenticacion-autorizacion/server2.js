const express = require('express')
const bCrypt = require('bcrypt')
const session = require('express-session')
const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');

/* ------------------ DATABASE -------------------- */

/*---PERSISTENCIA EN MONGO ====*/
const MongoStore = require('connect-mongo')

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

/* --------------------- SERVER --------------------------- */

const app = express()

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

//ESTO ES IMPORTANTE PARA PODER USAR EL RES.RENDER!!! 
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

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

/* --------- LISTEN ---------- */
const PORT = 8080
const server = app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`)
})
server.on("error", error => console.log(`Error en servidor: ${error}`))