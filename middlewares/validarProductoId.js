const { Producto, Categoria } = require('../models')

const validarProductoIdConCategoria = async (req, res, next) =>{
    try {
        const { id } = req.params
        const producto = await Producto.findByPk(id, {
            attributes: ["nombre","precio","stock"],
            include: {
                model: Categoria,
                as: "categoria",
                attributes: ["nombre"]
            }
        })
        if (!producto) {
            return res.status(404).json({message: 'Producto no encontrado'});
        }
        req.producto = producto
        next()
    } catch (error) {
        res.status(500).json({
            error: "Error al obtener el producto"
        })
    }
}

const validarProductoId = async (req, res, next) =>{
    try {
        const { id } = req.params
        const producto = await Producto.findByPk(id)
        if (!producto) {
            return res.status(404).json({message: 'Producto no encontrado'});
        }
        req.producto = producto
        next()
    } catch (error) {
        res.status(500).json({
            error: "Error al obtener el producto"
        })
    }
}

module.exports = {
    validarProductoIdConCategoria,
    validarProductoId
}