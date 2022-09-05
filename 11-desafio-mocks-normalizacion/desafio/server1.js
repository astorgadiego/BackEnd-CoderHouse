//IMPORTAMOS EL FAKER
import express from 'express'
import { faker } from '@faker-js/faker';

const PORT = 8080

const app = express()

    app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
});

//ESTA RUTA CARGA NUESTRO ARCHIVO INDEX.HTML EN LA RAIZ DE LA MISMA
// app.get ( '/api', ( req, res)=>{ 
//     res.sendFile ( 'index.html', { root:__dirname }  ) 
//     }
// )

app.get('/api/productos_test', (req,res) => { 
    const resultado = [];
    for (let i = 1; i <= 5; i++) {
        resultado.push({
            id: i,
            nombre: faker.commerce.product(),
            precio: faker.commerce.price(),
            foto: faker.image.food()
        });
    }
    res.send(resultado); 
})

