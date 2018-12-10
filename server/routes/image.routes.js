const express = require('express')
const router = express.Router()
const imageController = require('../controllers/upload.controller')

router.post('/upload', imageController.crearImagen)
router.get('/upload/:dateDesde/:dateHasta', imageController.obtenerImagenes)

module.exports=router