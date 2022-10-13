process.on('mensaje', llega => {

    console.log('PAPA ME ENVIO ESTO: ', {llega});

    process.send({ msg: 1 })

})






// process.on('message', msg => {
//     console.log(`mensaje del puto: ${msg}`)
//     process.send('mundo!')
//     process.exit()
// })

// process.send('listo')