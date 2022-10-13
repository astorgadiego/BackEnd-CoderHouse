// Realizar una aplicación en Javascript ejecutada a través de Node.JS que al ejecutarse de la siguiente manera:
// node main.js 1 2 3 -m dev -p 8080 -d
// Construya y muestre por pantalla el siguiente objeto:
// { modo: 'dev', puerto: 8080, debug: true, otros: [ 1, 2, 3 ] }
// Y con el siguiente llamado:
// node main.js 1 2 3
// Construya y muestre por pantalla el siguiente objeto:
// { modo: 'prod', puerto: 0, debug: false, otros: [ 1, 2, 3 ] }


const parseArgs = require('minimist');

const options = {
    alias: {
        m: 'modo',
        p: 'puerto',
        d: 'debug'
    },
    default: {
        modo: 'prod',
        puerto: 0,
        debug: false
    }
}

const commandLineArgs = process.argv.slice(2);

const { modo, puerto, debug, _ } = parseArgs(commandLineArgs, options);

console.log({ modo, puerto, debug, otros: _ });