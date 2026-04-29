const { Router } = require('express')
const productosController = require('../controllers/productos.controllers')
const router = Router()

router.get('/', productosController.obtenerProductos)
router.get('/:id', productosController.obtenerProducto)
router.post('/', productosController.crearProducto)
router.put('/:id', productosController.actualizarProducto)
router.delete('/:id', productosController.eliminarProducto)

module.exports = router