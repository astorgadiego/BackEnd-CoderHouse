const express = require('express')
const cookieParser = require('cookie-parser')
app.set('PORT', process.env.PORT || 8080)

const app = express()

app.get('/cookies', (req, res) => { 
    res.cookie('primercookie', 'soy el valor de la cookie').send('COOKIE CON VIDA INFINTA')  //COOKIE CON VIDA INFINITA
})

app.post('/cookies', (req,res) => { 
    const { nombre, valor, vida  } = req.body;
    res.cookie ( `${nombre}`,`${valor}`, {maxAge: vida} )
})

app.get('/mostrar', (req,res)=> {
    res.send({
        cookies: req.cookies,  //ACA DEVUELVO TODAS LAS COOKIE EN FORMA DE OBJETO
        cookiefirmadas: req.signedCookies  //Y ACA LAS COOKIE FIRMADAS 
    })  
})

app.delete('',(req,res ) => {
    const { nombre_a_eliminar } = req.body
    res.clearCookie(`${nombre_a_eliminar}`).send(`${nombre_a_eliminar} eliminada`)

})
app.get ('/borrar', (req,res)=>{
    res.clearCookie('segundacookie').send('Cookie Eliminada') // SE MANDA COMO PARAMETRO LA NOMBRE DE LA COOKIE QUE DESEO BORRAR
})


app.listen( app.get('PORT'), ()=>{
    console.log(`eL SEREVER ESTA VIVO EN PUERTO: ${app.get('PORT')}`);
} )