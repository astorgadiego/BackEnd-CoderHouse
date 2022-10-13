//OBJETO PROCESS
// Realizar una aplicación en Node.js que permita recibir como parámetros una cantidad ilimitada de números,
// con los cuales debe confeccionar el siguiente objeto (se imprimirá por consola):

//En el caso de ingresar un número no válido, se creará un objeto de error con el siguiente formato (se imprimirá por consola):

//En este caso de error, la aplicación saldrá con código de error -5

//Si no ingresó ningún número, el objeto de error será:
//En este caso de error, la aplicación saldrá con código de error -4
//En los casos de error, se representará en consola el código antes de finalizar.



const args = process.argv  //TOMO LOS NUMEROS QUE SE ENVIEN POR PARAMETRO EN LA EJECUCION DEL PROGRAMA
            //node 5to-ejercicio.js  
 
process.on('exit', code => {
    if (code) {
        console.log(`saliendo con codigo ${code}`)  //AL MOMENTO DE SALIR SI ES QUE HYA UN CODIGO
        //NODE 5to-ejercicio 
    } else {
        console.log(`saliendo... adios!`)//SALIDA SIN NINGUN CODIGO
        //NODE 5to-ejercicio 1,2,3,4,5
    }

})

process.on('uncaughtException', error => {
    console.log(error)
    switch (error.descripcion) {
        case 'entrada vacia': return process.exit(-4)
        case 'error de tipo': return process.exit(-5)
        default: return process.exit()  //SI HAY UN ERROR ENTONCES SALIMOS DEL PROGRAMA
    }
})

function avg(nums) {
    if (nums.length == 0) {  //SI NO HYA NUMEOS
        throw {
            descripcion: 'entrada vacia'
        }
    }
    let total = 0
    for (const num of nums) {
        const val = Number(num)  .toExponentia//LOS PASO DE SSTRING A NUMEROS
        if (isNaN(val)) {  //SI NO ES UN NUMERO 
            throw {
                descripcion: 'error de tipo',
                numeros: nums,
                tipos: nums.map(n => isNaN(n) ? typeof n : 'number')
            }
        } else { //CASO CONTRARIO SE SUMA
            total += val
        }
    }
    return total / nums.length
}

const numeros = args.slice(2)  //ME TOMA A PARTIR DEL INDICE DOS PORUE LOS PRIMEROS NO LOS NECEISTO
const promedio = avg(numeros) //
const max = Math.max(...numeros)  //EL VALOR MAXIMO 
const min = Math.min(...numeros)  //EL VALOR MINIMO 
const ejecutable = process.execPath.split('\\').pop() //SEPARAMOS LA RUTA POR CADA SLASH Y LE SACAMOS EL ULITMO ELEMENTO
const pid = process.pid  //NUMERO AL AZAR

const datos = {
    numeros,
    promedio,
    max,
    min,
    ejecutable,
    pid
}

console.log(datos)
