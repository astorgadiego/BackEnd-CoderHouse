// Realizar un servidor con dos endpoints GET, cada uno que devuelva la frase 'Hola que tal' concatenada 1000 veces, en las rutas '/saludo' y '/saludozip'.
// Al manejador de '/saludozip' agregar gzip como middleware.
// Probar ambos endpoints y verificar en el navegador cuántos bytes llegan como respuesta desde el servidor y qué headers trae la respuesta.
// Sabiendo que  1000 veces 12 caracteres de 1 byte c/u equivale a 12000 bytes (~12kb) ese es tamaño de paquete que esperamos recibir. Chequear si es así en cada caso.


const express = require('express')

const compression = require('compression')

const app = express()

//app.use( compression() ) ---> SI AGREGO ESTA LINEA TODAS LAS RUTAS ESTAN COMPRIMIDAS, Y PUEDE HAER QUE MI APP SE VUELVA MAS LENTA

const mensaje = 'Hola que tal  '
const mensajeLargooo = mensaje.repeat ( 1000 )

const PORT = parseInt(process.argv[2]) || 8080

app.get('/saludo', (req, res) => {
    
    res.send(mensajeLargooo)

})


//{level: 8, threshold: 1}
app.get('/saludozip', compression  () , (req, res) => {  //ACA MANDO EL COMPRESSION COMO MIDDLEWARE
                                            //PUEDE SER COMPRESSION() SIN MANDARLE NINGUN OBJETO
    res.send(mensajeLargooo)

})

app.get('/', (req,res) => { 
    res.send(`Servidor express en ${PORT} - <b> PID ${process.pid}  </b> - ${new Date().toLocaleString()}`) 
})

app.listen(PORT, () => {
  console.log(`Servidor express escuchando en el puerto ${PORT}`)
})