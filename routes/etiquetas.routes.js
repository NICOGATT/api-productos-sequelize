const {Router} = require('express'); 
const router = Router()
const etiquetasController = require('../controllers/etiquetas.controllers')

router.get('/', etiquetasController.obtenerEtiquetas); 
router.post('/', etiquetasController.crearEtiquetas); 

module.exports = router