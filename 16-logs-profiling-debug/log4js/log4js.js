// Crear un servidor que tenga una ruta '/sumar' que reciba por query params dos números y devuelva un mensajes con la suma entre ambos.
// Utilizar log4js para crear un módulo capaz de exportar uno de los siguientes dos loggers: uno para el entorno de desarrollo, 
//que logueará de info en adelante por consola, y otro para el entorno de producción, que logueará de debug en 
//adelante a un archivo ‘debug.log’ y solo errores a otro archivo ‘errores.log’.
// El logueo se realizará siguiendo el siguiente criterio:
// En caso de operaciones exitosas, loguear una línea de info
// En caso de ingresar un número no válido, loguear un error
// En caso de fallar el inicio del servidor, loguear un error
// En caso de recibir una petición a un recurso inválido, loguear una warning.
// La decisión de qué logger exportar se tomará en base al valor de una variable de entorno NODE_ENV, 
//cuyo valor puede ser: ‘PROD’ para producción, o cualquier otra cosa (incluyendo nada) para desarrollo.


const express = require('express')
const  logger  = require('./configuracion.js')

const app = express()

app.get('/sumar', (req, res) => {
  const n1 = parseInt(req.query.n1)
  const n2 = parseInt(req.query.n2)

  if (!isNaN(n1) && !isNaN(n2)) {
    logger.info(`Parámetros ${n1} y ${n2} correctos para la suma`)
    res.send(`La suma de ${n1} más ${n2} es ${n1 + n2}`)
  } else {
    logger.error('Parámetros incorrectos para la suma')
    res.send('Parámetros de entrada no válidos')
  }
})

app.get('*', (req, res) => {
  const { url, method } = req
  logger.warn(`Ruta ${method} ${url} no implementada`)
  res.send(`Ruta ${method} ${url} no está implementada`)
})

const PORT = parseInt(process.argv[2]) || 8080

const server = app.listen(PORT, () => {
  logger.info(`Servidor express escuchando en el puerto ${PORT}`)
})
server.on('error', error => logger.error(`Error en servidor: ${error}`))