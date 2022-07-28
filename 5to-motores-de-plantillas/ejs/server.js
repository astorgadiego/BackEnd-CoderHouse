const express = require('express')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.set('views', './views');
app.set('view engine', 'ejs');

const productos = []

app.get('/', (req, res) => {
    res.render('form', {productos});
})

app.post('/productos', (req, res) => {
    productos.push(req.body)
    res.render('form', {productos});
})

app.listen(8080, () => console.log('ready'))