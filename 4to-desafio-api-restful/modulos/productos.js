const express = require('express')
const { Router } = express

const router = Router()

const productos =[
        {
            titulo: "Brocoli",
            precio : 45,
            imagen : "##",
            id: 1
        },
        {
            titulo: "Zanahoria",
            precio : 666,
            imagen : "##",
            id: 2
        } 
    ]

//DEVUELVE TODOS LOS PRODUCTOS
router.get('/productos', (req, res) => {
            res.send(productos)
            
    });


//AGREGA UN NUEVO PRODUCTO CON UN NUEVO ID
router.post('/productos', (req, res) => {
        const productoAGuardar = req.body;
        

        let idAgregado = parseInt( productoAGuardar.id )

        productoAGuardar.id = idAgregado
        
        console.log( productoAGuardar );

        productos.push(productoAGuardar);

        res.status(201).send({idAgregado})
        
    });


//DEVUELVE EL PRODUCTO SOLICITADO SEGUN SU ID
router.get('/productos/:id', (req, res) => {
    const { id } = req.params; 
    //console.log(productos[0]);
    const producto = productos[id - 1]
    //console.log(productos[1]);
    if(isNaN( id )){
        res.status(400).send({error: 'El parámetro no es un número'});
        return
    }
    if(id > productos.length){
        res.status(400).send({error: 'Producto no enontrado'});
        return
    }
    
    res.send(producto);
    
})


//ACTUALIZA LOS DATOS DE UN PRODUCTO SEGUN SU ID
router.put( '/productos/:id' , ( req, res )=>{
    let { id } = req.params

    let { tituloNuevo, precioNuevo, imagenNueva } = req.body

    productos[ id -1 ].titulo = tituloNuevo;
    productos[ id -1 ].precio = precioNuevo;
    productos[ id -1 ].imagen = imagenNueva;
    //console.log( productos );

    res.status(200).send("Usuraio Actualizado")
})


//ELIMINA PRODUCTO SEGUN SU ID
router.delete( '/productos/:id' , (req, res) => {
    let { id } = req.params;

    productos.splice( id-1, id )
    productos.forEach( elem => { elem.id = elem.id - 1 })
    res.status(200).send("Producto Eliminado Exitosamente");

} )



module.exports= router  //EXPRTO EL MODULO ROUTER PARA PODER UTILIZARLO EN EL SERVER  