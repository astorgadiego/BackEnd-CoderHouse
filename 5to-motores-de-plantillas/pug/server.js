const express = require ('express')

const app = express()

const PORT = 8080; 

app.use(express.json());   //ESTAS DOS LINEAS SON NECESARIAS PARA PODER USAR GET, POST, PUT, Y DELETE
app.use(express.urlencoded({ extended: true })); //ARRIBA DEL VIEW ENGINE

//INDICO EL MOTOR DE PLANTILLAS A UTILIZAR
app.set ('view engine', 'pug');
//INDICO LA CARPETA EN LA QUE SE ALMACENARAN MIS PLANTILLAS
app.set ('views','./views');

//SE MUESTRA LA PLANTILLA HELLO.PUG EN LA RUTA LOCALHOST:8080/HELLO
app.get('/hello', (req, res) => { 
    res.render ('plantilla.pug', { mensaje: 'Usando mi plantilla PUG' }); //INDICO QUE PLANTILLA QUIERO QUE RENDERICE Y EL OBJETO QUE LE MANDO 
    //EN ESTE CASO LE MANDO MENSAJE, Y QUIERO QUE RENDERICE LA PLANTILLA plantilla.pug
})

app.get( '/', (req, res) => { 
    res.render( 'formulario.pug' ) 
})


//SE MUESTRA LA PLANTILLA ejercicio.pug EN LA RUTA LOCALHOST:8080/DATOS
app.get ( '/datos', (req, res ) => { 
    //CAPTURO LOS QUERY PARAMS
    const { minimo , maximo , nivel, titulo } = req.query;
    //LO MANDO A LA PLANTILLA A MOSTRAR
    res.render( 'ejercicio.pug', { minimo , maximo, nivel, titulo } ) 
})

let ListadeProductos = [];

app.get ( '/productos', (req, res ) => { 
    //CAPTURO LOS QUERY PARAMS
   // let { nombre_del_producto , precio } = req.query;
    //LO MANDO A LA PLANTILLA A MOSTRAR
    //let ProductoAgregado = { titulo: nombre_del_producto, precio: precio }
    //ListadeProductos.push( ProductoAgregado )
    console.log(ListadeProductos.length);
    console.log(ListadeProductos);
    // console.log({nombre_del_producto});
    // console.log({precio});
    //res.render( 'tabla.pug', { nombre_del_producto, precio, ListadeProductos } ) 
    //CUANDO ENTOR POR UN "GET" SOLO ME INTERESA VER LA TABLA CON LA LISTA DE PRODUCTOS
    res.render( 'tabla.pug', { ListadeProductos } )
})

app.post( '/productos', (req, res) => { 
    
    const { nombre_del_producto , precio } = req.body;

    if (nombre_del_producto == '') {
        res.render( 'tabla.pug', { ListadeProductos } )
    }else{
        console.log( nombre_del_producto );
        console.log( precio );
        ListadeProductos.push ( req.body )
        console.log( ListadeProductos );
        res.render( 'tabla.pug', { nombre_del_producto, precio, ListadeProductos } )
    }
})


const server = app.listen(PORT, () => console.log(`Servidor OK en puertO : ${PORT} `));  // INICIO LA APLICACION

server.on( "Error", err => console.log(` Error en el servidor: ${err} `)); //MANEJO EL ERROR