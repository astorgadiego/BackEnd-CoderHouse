const express = require('express')
const cookieParser = require('cookie-parser')


const app = express()

app.use(cookieParser('secret')) //ESTA ES LA CLAVE PARA DESENCRIPTAR LA COOKIE CON CLAVE FIRMADA

//app.use(cookieParser(['secret','BANANA','contrasena'])) //ESTA ES LA CLAVE PARA DESENCRIPTAR LA COOKIE FIRMADA LA CLAVE ESTA COMPUESTA POR LAS TRES PALABRAS    

app.set('PORT', process.env.PORT || 8080)


//CREAR COOKIES
app.get('/ruta1', (req, res) => { 
    res.cookie('primercookie', 'soy el valor de la cookie').send('COOKIE CON VIDA INFINTA')  //COOKIE CON VIDA INFINITA
})

app.get('/ruta2', (req, res) => { 
    res.cookie('segundacookie', 'soy el valor de la segunda cookie', {maxAge: 10000 ,signed:true}).send('COOKIE CON VIDA DE 10 SEGUNDOS') 
    //COOKIE CON VIDE 10 SEGUNDOS Y FIRMADA
})
 
//MOSTRAR COOKIES
app.get('/get', (req,res)=> {
    res.send({
        cookies: req.cookies,  //ACA DEVUELVO TODAS LAS COOKIE EN FORMA DE OBJETO
        cookiefirmadas: req.signedCookies  //Y ACA LAS COOKIE FIRMADAS 
    })
})

//BORRAR COOKIES

app.get ('/borrar', (req,res)=>{
    res.clearCookie('segundacookie').send('Cookie Eliminada') // SE MANDA COMO PARAMETRO LA NOMBRE DE LA COOKIE QUE DESEO BORRAR
})

//BORRAR TODAS LAS COOKIES 
// for ... of
for (const cookieName of Object.keys(req.cookies)) {
    res.clearCookie(cookieName)
  }





app.listen( app.get('PORT'), ()=>{
    console.log(`eL SEREVER ESTA VIVO EN PUERTO: ${app.get('PORT')}`);
} )
