const Array = [{nombre: "Diego", edad: 23},{nombre:"Emma", edad: 545} ]

function agregar(params) {
    Array.push({nombre: params})
}

function solonombres() {
    const nombres= []
    Array.forEach(element => { nombres.push(element.nombre)});
    console.log(nombres);
}

//agregar("Carolina")
solonombres()

//console.log(Array);