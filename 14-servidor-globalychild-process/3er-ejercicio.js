// Realizar una aplicación en nodeJS que al pasar las siguientes variables de entorno:
// MODO=dev PUERTO=8080 DEBUG=true
// Construya y muestre por pantalla el siguiente objeto:
// { modo: 'dev', puerto: 8080, debug: true }
// Y que al ejecutarlo sin pasar ninguna variable de entorno construya y muestre por pantalla el siguiente objeto:
// { modo: 'prod', puerto: 0, debug: false }


const modo = process.env.MODO ?? 'prod'
const puerto = Number(process.env.PUERTO ?? 0)
const debug = process.env.DEBUG == 'true' ? true : false

console.log({
    modo,
    puerto,
    debug
})

