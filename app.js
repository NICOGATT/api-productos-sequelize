const express = require('express')
const app = express()
const db = require('./models')
const routerProductos = require('./routes/productos.routes')
const routerCategoria = require('./routes/categorias.routes')
const routerEtiquetas = require('./routes/etiquetas.routes')
const PORT = 3000

app.use(express.json())

app.use('/productos', routerProductos)
app.use('/categorias', routerCategoria)
app.use('/etiquetas', routerEtiquetas)

app.listen(PORT, async () =>{
    await db.sequelize.sync()
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
})