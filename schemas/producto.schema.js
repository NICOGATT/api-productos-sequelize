const Joi = require('joi')

const productoSchema = Joi.object({
    nombre: Joi.string()
        .min(3)
        .max(100)
        .required()
        .messages({
            "string.base": "El nombre debe ser texto",
            "string.empty": "El nombre es obligatorio",
            "string.min": "El nombre debe tener al menos 3 caracteres",
            "any.required": "El nombre es obligatorio"
        }),
    precio: Joi.number()
        .integer()
        .positive()
        .required()
        .messages({
            "number.base": "El precio debe ser un número",
            "number.positive": "El precio debe ser mayor a 0",
            "any.required": "El precio es obligatorio"
        }),
    stock: Joi.number()
        .integer()
        .min(0)
        .required()
        .messages({
            "number.base": "El stock debe ser un número",
            "number.min": "El stock no puede ser negativo",
            "any.required": "El stock es obligatorio"
        }),
    categoriaId: Joi.number()
        .integer()
        .positive()
        .required()
        .messages({
            "number.base": "La categoría debe ser un número",
            "any.required": "La categoría es obligatoria"
        })
})

module.exports = productoSchema