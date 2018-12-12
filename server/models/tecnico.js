const mongoose = require('mongoose')
const Schema  = mongoose.Schema

const tecnicoSchema = new Schema({       
    nombreTecnico: { type: String, required: true },    
    apellidoTecnico: { type: String, required: true },
    correoTecnico: { type: Schema.Types.Mixed, required: false },
    passwordTecnico: { type: Schema.Types.Mixed, required: false },
    telefonoTecnico: { type: Number, required: true },
    descripcionTecnico: { type: Schema.Types.Mixed, required: true },
    ciudadTecnico: { type: String, required: true },
    direccionTecnico: { type: Schema.Types.Mixed, required: true },
    codigoPostalTecnico: { type: Number, required: false },    
    fechaCreacion: { type: Number, default: Date.now() },
    estado: { type: String, default: '0' },
    rol: { type: String, default: '0' }
    
})

module.exports = mongoose.model('Tecnicos', tecnicoSchema)