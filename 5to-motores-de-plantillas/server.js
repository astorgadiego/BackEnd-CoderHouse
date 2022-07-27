const express = require ('express')

const app = express()


const server = app.listen(8080, () => console.log('Servidor OK en puerto 78384584'));  // INICIO LA APLICACION

app.get('/',(req, res )=>{
    res.sendFile(__dirname + '/public/index.html')
})