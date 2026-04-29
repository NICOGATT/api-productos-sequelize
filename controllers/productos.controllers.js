const { Producto, Categoria } = require('../models')

const obtenerProductos = async (req,res) => {
    try {
        const productos = await Producto.findAll({
            attributes: ["nombre","precio","stock"],
            include: {
                model: Categoria,
                as: "categoria",
                attributes: ["nombre"]
            }
        })
        res.status(200).json(productos)
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

const obtenerProducto = async (req,res) =>{
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
        res.status(200).json(producto)
    } catch (error) {
        res.status(500).json({
            error: "Error al obtener el producto"
        })
    }
}

const crearProducto = async (req,res) => {
    try {
        const { nombre, precio, stock, categoriaId } = req.body
        if(!nombre || precio == null || stock == null || categoriaId == null){
            return res.status(400).json({message: "Faltan datos obligatorios"})
        }
        const producto = await Producto.create({
            nombre,
            precio,
            stock,
            categoriaId
        })
        res.status(201).json(producto)
    } catch (error) {
        res.status(500).json({
            error: "Error al crear el producto"
        })
    }
}

const actualizarProducto = async (req, res) => {
    try {
        const { id } = req.params
        const { nombre, precio, stock } = req.body
        const producto = await Producto.findByPk(id)
        if (!producto) {
            return res.status(404).json({ message: 'Producto no encontrado' })
        }
        if (!nombre || precio == null || stock == null) {
            return res.status(400).json({ message: "Faltan datos obligatorios" })
        }
        await producto.update({
            nombre,
            precio,
            stock
        })
        res.status(200).json(producto)
    } catch (error) {
        res.status(500).json({
            error: "Error al actualizar el producto"
        })
    }
}

const eliminarProducto = async (req, res) => {
    try {
        const { id } = req.params
        const producto = await Producto.findByPk(id)
        if (!producto) {
            return res.status(404).json({ message: 'Producto no encontrado' })
        }
        await producto.destroy()
        res.status(200).json({
            message: "Producto eliminado correctamente"
        })
    } catch (error) {
        res.status(500).json({
            error: "Error al eliminar el producto"
        })
    }
}

module.exports = {
    obtenerProductos,
    obtenerProducto,
    crearProducto,
    actualizarProducto,
    eliminarProducto
}