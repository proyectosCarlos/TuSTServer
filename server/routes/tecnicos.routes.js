const express = require('express')
const router = express.Router()
const tecnicoController = require('../controllers/tecnicos.controller')
const jwt = require('jsonwebtoken')

function verifyToken(req, res, next){
    if(!req.headers.authorization){
      return res.status(401).send('Unathorized request')
    }
  let token = req.headers.authorization.split(' ')[1]
    if(token=== 'null'){
      return res.status(401).send('Unathorized request')
    }
    let payload = jwt.verify(token, 'secretKey')
    if(!payload){
      return res.status(401).send('Unathorized request')
    }
    req.userId = payload.subject
    next()

  }

router.get('/tecnico', verifyToken, tecnicoController.obtenerTecnicos)
router.post('/tecnico/login', tecnicoController.login)
router.post('/tecnico', tecnicoController.crearTecnico)
router.get('/tecnico/:id', verifyToken, tecnicoController.obtenerTecnico)
router.put('/tecnico/actualizar/:id', verifyToken, tecnicoController.editarTecnico)
    
module.exports=router