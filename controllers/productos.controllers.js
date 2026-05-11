const { Producto, Categoria, Etiqueta } = require('../models')
const etiqueta = require('../models/etiqueta')

const obtenerProductos = async (req,res) => {
    try {
        const productos = await Producto.findAll({
            attributes: ["nombre","precio","stock"],
            include: [
            {
                model: Categoria,
                as: "categoria",
                attributes: ["nombre"]
            }, 
            {
                model : Etiqueta, 
                as: "etiqueta", 
                through : ""
            }
        ]
        })
        res.status(200).json(productos)
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

const obtenerProducto = async (req,res) =>{
    const producto = req.producto
    res.status(200).json(producto)
}

const crearProducto = async (req,res) => {
    try {
        const { nombre, precio, stock, categoriaId } = req.body
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
        const { nombre, precio, stock, categoriaId } = req.body
        const producto = req.producto
        await producto.update({
            nombre,
            precio,
            stock,
            categoriaId
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
        const producto = req.producto
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

const asignarEtiquetas = async (req, res) => {
    try {
        const producto = req.producto
        const {etiquetasIds} = req.body 
        const etiquetas = await Etiqueta.findAll({
            where : {
                id : etiquetasIds
            }
        })
        await producto.setEtiquetas(etiquetas)
        res.status(200).json({message : "Etiquetas asignadas con exitoso"})
    } catch (error) {
        res.status(500).json({
            message : "Error al asignar etiquetas al producto"
        })
    }
}

const asociarEtiquetas = async (req, res) => {
    try {
        const producto = req.producto
        const {etiquetaId} = req.params
        const etiqueta = await Etiqueta.findPk(etiquetaId)
        await producto.addEtiqueta(etiqueta)
        res.status(200).json({message: "Etiqueta asociada con exito"})
    } catch (error) {
        res.status(500).json({message: "Error al asignar etiqueta"})
    }
}

module.exports = {
    obtenerProductos,
    obtenerProducto,
    crearProducto,
    actualizarProducto,
    eliminarProducto, 
    asignarEtiquetas, 
    asociarEtiquetas
}