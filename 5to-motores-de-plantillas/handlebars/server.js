const express = require ('express');

const PORT = 8080

const app = express();

const HandleBar = require('express-handlebars'); //CARGO EL MODULO DE EXPRESS-HANDLEBARS


//LCONFIGURACION DE HANDLEBARS
app.engine ( 'hbs' ,   //NOMBRE REFERENCIA A LA PLANTILLA (SE USA LUEGO EN SET) 
        HandleBar.engine ( {  //FUNCION DE CONFIGURACION DE HANDLEBARS
                        extname: 'hbs', //EXTENSION A UTILIZAR, EN LUGAR DE .HANDLEBARS POR DEFECTO
                        defaultLayout: 'index.hbs', //PLANTILLA PRINCIPAL
                        layoutsDir: __dirname + '/views/layouts', //RUTA A LA PLANTILLA PRINCIPAL
                        partialsDir: __dirname + '/views/partials' //RUTA LA PLANTILLA PARCIALES
                    }    
        ) 
)

app.set ( 'view engine', 'hbs' ); //ESTABLECEMOS EL MOTOR DE PLANTILLAS A UTILIZAR
                                  //REGISTRA EL MOTOR DE PLANTILLAS

app.set ( 'views', './views' ); //ESTABLECEMOS EL DIRECTORIO DONDE SE ENCUENTRAN LOS ARCHIVOS DE PLANTILLA
                                //ESPECIFICA LA CARPETA DE PLANTILLAS

app.use(express.json());   //ESTAS DOS LINEAS SON NECESARIAS PARA PODER USAR GET, POST, PUT, Y DELETE
app.use(express.urlencoded({ extended: true }));

//app.use ( express.static( 'public' ) ); //ESPACIO PUBLICO DE SERVIDOR

const productos = []

app.get('/', (req, res) => {
    
        res.render('formulario', {productos});
    });



app.post('/productos', (req, res) => {

    productos.push ( req.body )
    res.render('tabla',  {productos});

    console.log(productos);    
});





const server = app.listen(8080, () => console.log(`Servidor OK en puertO : ${PORT} `));  // INICIO LA APLICACION
