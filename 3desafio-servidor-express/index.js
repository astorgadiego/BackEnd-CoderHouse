const data = require ( 'fs' )

const express = require ( 'express' )

const app = express()

const PORT = 8080

const server = app.listen( PORT, ()=>{ console.log(`El servidor esta escuchando en el puerto: ${ PORT }`); } )

class Contenedor {
    constructor( archivo )  {
        this.archivo = archivo
    }
    

    getAll(  ){
        if ( data.readFileSync( `${this.archivo}`,'utf-8' )  ==  '') {
            console.log("ACA NO HAY NADA");
        }else{
            console.log("ACA SI HABIA ALGO");
            let archivoJSON = data.readFileSync( `${this.archivo}`,'utf-8' )  //PASA DE JSON A JS
            console.log( archivoJSON );
            return archivoJSON
        } 
    }

    RandomProduct () {
        data.readFileSync( `${this.archivo}`,'utf-8' )
        let archivoJS = JSON.parse( data.readFileSync( `${this.archivo}`,'utf-8' ))  //PASA DE JSON A JS
        let aleatorio = archivoJS [ Math.floor ( Math.random() * archivoJS.length ) ]
        return aleatorio

    }

    async  save( object ){
        
        try{

            if ( data.readFileSync( `${this.archivo}`,'utf-8' )  ==  '') {
                console.log("ACA NO HABIA NADA");
                let archivoJS = [];
                object.id =  1
                let idAsignado = object.id
                archivoJS.push( object )
                //console.log(archivoJS);
                let arraySTRING= JSON.stringify( archivoJS )  //PASA DE JS A JSON
                //console.log(arraySTRING);
                await data.promises.writeFile(  `${this.archivo}`, `${ arraySTRING }` )
                console.log("El ultimo id asignado es : ", idAsignado);
                return idAsignado
    
            }else{
                console.log("ACA SI HAABIA ALGO.");
                let idAsignado 
                let ultimoid = 0
                let ultimoObjeto = object
                let archivoJS = JSON.parse( await data.promises.readFile( `${this.archivo}`,'utf-8' )) //PASA DE JSON A JS
                


                archivoJS.forEach(element => {
                    ultimoid = element.id
                    console.log(element.id);
                });
                console.log("El ultimo id es:", ultimoid);

                for (const iterador of archivoJS ) {

                    ultimoObjeto = iterador
                    //console.log(iterador);
                }
                // console.log("El ultimo objeto agregado es : ", ultimoObjeto);
                object.id = ultimoid + 1
                console.log("El ultimo objeto agregado es : ", object)
                archivoJS.push( object )
                console.log("EL FINAL", archivoJS);
                
                idAsignado = object.id

                let arraySTRING= JSON.stringify( archivoJS )  //PASA DE JS A JSON
                //console.log(arraySTRING);
                await data.promises.writeFile(  `${this.archivo}`, `${ arraySTRING }` )
                console.log("El ultimo id asignado es : ", idAsignado);
                return idAsignado
                
            } 

        }
        catch(err){
            console.log( "Error de Lectura:", err );
        }

        
              
    }
    

    getByID( idRecibido ){
        let arrayJS = Diego.getAll()
        let arrayByID= []
        // arrayJS.forEach(element => {
        //     if ( element.id == idRecibido) {
        //         arrayByID.push( element )
        //         //console.log( arrayByID );
        //     }else{
        //         console.log("NINGUN ID COINCIDE");
        //         return null
        //     }
        arrayByID = arrayJS.filter( elemento =>  elemento.id == idRecibido)
        if (arrayByID.length !== 0) {
            //console.log( `LOS ELEMENTOS CON ID= ${idRecibido} SON:`, arrayByID)  
            return console.log( `LOS ELEMENTOS CON ID= ${idRecibido} SON:`, arrayByID)  
        }
        if (arrayByID.length == 0) {
            console.log(`NINGUN ELEMENTO COINCIDE CON EL ID= ${idRecibido} SOLICITADO`);
            return null
        }
       
        
    }


    deletebyID( idEliminado ){
        let arrayJS = Diego.getAll()
        let arrayLimpioJS = []
        let elementosEliminados = []
        console.log(`Se eliminan los elementos con ID = ${idEliminado}`);
        arrayJS.forEach(element => {
            if (element.id !== idEliminado) {
                arrayLimpioJS.push( element)    
            }else if (element.id == idEliminado) {
                elementosEliminados.push( element)
            }
            
            //console.log(element.id);
        })
        console.log("El nuevo array limpio es: ",arrayLimpioJS);
        console.log("Los Elementos eliminados fueron: ",elementosEliminados);
        let arrayLimpioSTRING = JSON.stringify ( arrayLimpioJS )  //PASAR DE JS A STRING
        data.writeFileSync(  `${this.archivo}`, `${ arrayLimpioSTRING }` )
    }

    deleteAll(){
        data.unlink('./productos.txt', err => {
                            if (err) {
                                console.log("Hubo un error al borrar el archivo: ", err);
                            }else{
                                console.log("ARCHIVO BORRADO!");
                            }
                        })
    }
}

const Diego = new Contenedor ( './productos.txt' )


app.get( '/' , ( req, res )=>{ 
                res.send(  Diego.getAll()  )
        } )

app.get( '/productoRandom', ( req , res )=>{

            res.send( Diego.RandomProduct() )

        } )


server.on( "Error", err => console.log(` Error en el servidor: ${err} `)); 