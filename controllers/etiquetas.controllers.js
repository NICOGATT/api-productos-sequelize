const {Etiqueta, Productos} = require('../models'); 

const crearEtiquetas = async(req, res) => {
    try {
        const {nombre} = req.body
        if (!nombre) {
            res.status(401).json({message :"Falta el nombre"})
        }
        const etiqueta = await Etiqueta.create({nombre})
        res.status(201).json(etiqueta)
    } catch (error) {
        res.status(500).json({message: "Error interno del servidor"})
    }
}
const obtenerEtiquetas = async(req, res) => {
    try {
        const etiquetas = await Etiqueta.findAll({
            attributes : ["nombre"]
        })
        res.json(etiquetas)
    } catch (error) {
        res.status(500).json({message: "Error interno del servidor"})
    }
}

module.exports = {
    obtenerEtiquetas, 
    crearEtiquetas
}