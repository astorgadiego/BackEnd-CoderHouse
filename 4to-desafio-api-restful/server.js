const express = require('express')
const productos = require('./modulos/productos');  //IMPORTO EL MODULO ROUTER PARA PODER USARLO AQUI
const multer = require('multer')

const app = express()

app.use(express.json());   //ESTAS DOS LINEAS SON NECESARIAS PARA PODER USAR GET, POST, PUT, Y DELETE
app.use(express.urlencoded({ extended: true }));

app.use('/api', productos);


//app.get('/',express.static(__dirname + './public'))
 app.get('/', (req, res) => {
     res.sendFile(__dirname + '/public/index.html')
 })

const server = app.listen(8080, () => console.log('Servidor OK en puerto 8080'));  // INICIO LA APLICACION



server.on( "Error", err => console.log(` Error en el servidor: ${err} `)); //MANEJO EL ERROR