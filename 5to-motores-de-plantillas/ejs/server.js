const express = require('express')

const app = express()

const PORT = 8080;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.set('views', './views');//---> ESTA LINEA NO ES NECESARIA PARA CONFIGURAR EJS PERO ES IMPORTANTE SABER QUE CADA VEZ 
//QUE RENDERICEMOS UNA PAGINA, LA APP BUSCARA DENTRO DE UNA CARPETA "VIEWS". ASI QUE HAY QUE TENERLA DE TODAS MANERAS

app.set('view engine', 'ejs');//---> ESTA LINEA SI QUE ES NECESARIA

app.use ( express.static( 'public' ) ); //ESPACIO PUBLICO DE SERVIDOR. ME SIRVE PARA VINCULAR EL ARCHIVO .CSS


app.get('/ejemplo1', (req,res) => { 
    res.render( 'ejemplo1.ejs'  ) 
})

const ListadeProductos = []    

app.get('/', (req, res) => {
    res.render('form', { ListadeProductos }); //RENDERIZA LA RUTA views/form
})

app.post('/productos', (req, res) => {

    const { nombre_del_producto , precio } = req.body;

    if (nombre_del_producto == '') {
        res.render ( 'partials/tabla.ejs', {ListadeProductos} )
    }else{
        console.log( nombre_del_producto );
        console.log( precio );
        ListadeProductos.push ( req.body )
        console.log( ListadeProductos );
        res.render( 'partials/tabla.ejs', { nombre_del_producto, precio, ListadeProductos } )
    }
    
})

const server = app.listen(PORT, () => console.log(`Servidor OK en puertO : ${PORT} `));  // INICIO LA APLICACION

server.on( "Error", err => console.log(` Error en el servidor: ${err} `)); //MANEJO EL ERROR