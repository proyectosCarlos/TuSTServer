const mongoose = require('mongoose')
const Schema = mongoose.Schema 

const imagenSchema = new Schema({       
    idTecnico: { type: String, required: true },    
    idCliente: { type: String, required: true },
    nombre: { type: String, required: true },
    fechaCreacion: { type: Date, default: new Date() },
    url: { type: String, required: true }  
    
})

module.exports = mongoose.model('Imagenes', imagenSchema)