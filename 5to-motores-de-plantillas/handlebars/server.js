const express = require ('express');

const HandleBar = require('express-handlebars'); //CARGO EL MODULO DE EXPRESS-HANDLEBARS

const app = express();

const PORT = 8080


app.use(express.json());   //ESTAS DOS LINEAS SON NECESARIAS PARA PODER USAR GET, POST, PUT, Y DELETE
app.use(express.urlencoded({ extended: true })); //ARRIBA DEL VIEW ENGINE


//LCONFIGURACION DE HANDLEBARS
app.engine ( 'hbs' ,   //NOMBRE REFERENCIA A LA PLANTILLA (SE USA LUEGO EN SET) 
        HandleBar.engine ( {  //FUNCION DE CONFIGURACION DE HANDLEBARS
                        extname: '.hbs', //EXTENSION A UTILIZAR, EN LUGAR DE .HANDLEBARS POR DEFECTO
                        defaultLayout: 'index.hbs', //PLANTILLA PRINCIPAL
                        layoutsDir: __dirname + '/views/layouts', //LOS LAYOUTS SON LOS QUE CONTIENE A TODOS LOS COMPONENTES
                                                                //RUTA A LA PLANTILLA PRINCIPAL
                        partialsDir: __dirname + '/views/partials' //LOS PARATIALS SERIAN LOS COMPONENTES
                                                                   //RUTA LA PLANTILLA PARCIALES
                    }    
        ) 
)

app.set ( 'view engine', 'hbs' ); //ESTABLECEMOS EL MOTOR DE PLANTILLAS A UTILIZAR
                                  //REGISTRA EL MOTOR DE PLANTILLAS

app.set ( 'views', './views' ); //ESTABLECEMOS EL DIRECTORIO DONDE SE ENCUENTRAN LOS ARCHIVOS DE PLANTILLA
                                //ESPECIFICA LA CARPETA DE PLANTILLAS



app.use ( express.static( 'public' ) ); //ESPACIO PUBLICO DE SERVIDOR. ME SIRVE PARA VINCULAR EL ARCHIVO .CSS

const ListadeProductos =   [];

// app.get('/', (req, res) => {
        
//         res.render('main', ListadeProductos);
//     });
app.get('/', (req, res) => {
       
    res.render('formulario');

});

app.get('/productos', (req, res) => { 
       
    // if (ListadeProductos.length == 0) {
    //     res.render('tabla', {TablaVacia : true});
    // }else{
    //     res.render('tabla', { ListadeProductos });
    // }
    console.log( ListadeProductos.length );
    console.log( ListadeProductos );
    res.render ( 'tabla.hbs', { ListadeProductos } )
});



app.post('/productos', (req, res) => {
    const { nombre_del_producto, precio, imagen } = req.body
    console.log( nombre_del_producto );
    console.log( precio );
    
    // ListadeProductos.push ( req.body )
    if ( nombre_del_producto == '') {

        if ( ListadeProductos.length == 0 ) {
            res.render( 'tabla_vacia.hbs', { mensaje: "No hay Productos" } )
        }else{
            res.render( 'tabla.hbs', { ListadeProductos } )
        }     
    }else{
        
        ListadeProductos.push ( req.body )
        console.log( ListadeProductos );
        res.render( 'tabla.hbs', { nombre_del_producto, precio, ListadeProductos } )
    
    }
    console.log("El largo de la tabal es: ", ListadeProductos.length);    
});


const server = app.listen(PORT, () => console.log(`Servidor OK en puertO : ${PORT} `));  // INICIO LA APLICACION

server.on( "Error", err => console.log(` Error en el servidor: ${err} `)); //MANEJO EL ERROR
