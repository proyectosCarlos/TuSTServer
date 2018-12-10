const express = require('express')
const router = express.Router()
const clienteController = require('../controllers/clientes.controller')

router.get('/', clienteController.obtenerClientes)
router.post('/', clienteController.crearCliente)
router.get('/garantias', clienteController.obtenerGarantias)
router.get('/clientes/graficaAdmin/:year', clienteController.obtenerClientesAnio)
router.get('/clientes/factura/:year/:month', clienteController.obtenerClientesFacturacion)
router.get('/clientes/facturaTec/:year/:month/:id', clienteController.obtenerClientesFacturacionTecnico)
router.get('/clientes/graficaTec/:id/:year', clienteController.obtenerClientesAnioTecnico)
router.get('/pendientes', clienteController.obtenerPedientes)
router.put('/actualizar/:id', clienteController.editarCliente)
router.put('/facturar/:id', clienteController.editarClienteFacturacion)

//rutas clientes tecnico 
router.get('/clientes/tecnico/:id', clienteController.obtenerClientesTecnico)
router.get('/garantias/tecnico/:id', clienteController.obtenerGarantiasTecnico)
router.get('/pendientes/tecnico/:id', clienteController.obtenerPedientesTecnico)

    
module.exports=router