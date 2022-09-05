import  express  from  'express'
const app = express();

app.listen(3000, () => {
    console.log('Servidor iniciado en el puerto 3000');
});

app.get('/test', (req, res) => {
    const nombres = ['Luis', 'Lucía', 'Juan', 'Augusto', 'Ana'];
    const apellidos = ['Pieres', 'Cacurri', 'Bezzola', 'Alberca', 'Mei'];
    const colores = ['rojo', 'verde', 'azul', 'amarillo', 'magenta'];
    const resultado = [];
    for (let i = 0; i < 10; i++) {
        const nombre = nombres[Math.floor(Math.random() * nombres.length)];
        const apellido = apellidos[Math.floor(Math.random() * apellidos.length)];
        const color = colores[Math.floor(Math.random() * colores.length)];
        resultado.push({
            nombre,
            apellido,
            color
        });
    }
    res.send(resultado);
});
