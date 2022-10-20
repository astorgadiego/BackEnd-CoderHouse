function numero_random_1_a_1000 () {

    min = Math.ceil(1);
    max = Math.floor(1000);
    return Math.floor(Math.random() * (max - min + 1) + min);

}



function mostrar_veces_repetidas ( numeros_random_ordenados  ) {
    
    let objeto_con_datos = []
    let contador = 1

    for (let i = 0; i < numeros_random_ordenados.length; i++) {
        if ( numeros_random_ordenados[ i + 1 ]=== numeros_random_ordenados[ i ] ) {
            contador ++
        }else{
            let objeto = {
                valor: numeros_random_ordenados [ i ], 
                cantidad: contador
            }
            
            objeto_con_datos.push(objeto)
            contador=1
        }
        
    }

    //console.log('array de objetos', objeto_con_datos)
    
    return objeto_con_datos



}

process.on('message', msgpadre =>{

    if ( msgpadre !== undefined) {

        const numeros_random =  []
        for (let index = 0; index < msgpadre; index++) {
            
            numeros_random.push( numero_random_1_a_1000() )            
        }
        const numeros_random_ordenados = numeros_random.sort()

        //console.log('aaaaaaaa',numeros_random_ordenados.length);

        




        //console.log('papadice: ', numeros_random_ordenados);
        process.send( mostrar_veces_repetidas( numeros_random_ordenados ) )
        
    }
})