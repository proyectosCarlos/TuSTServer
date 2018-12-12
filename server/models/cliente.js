const mongoose = require('mongoose')
const  Schema  = mongoose.Schema

const clienteSchema = new Schema({
    electrodomestico: { type: Schema.Types.Mixed, required: true },
    correo: { type: Schema.Types.Mixed, required: false },
    descripcion: { type: Schema.Types.Mixed, required: true },
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    telefono: { type: Number, required: true },
    ciudad: { type: String, required: true },
    direccion: { type: Schema.Types.Mixed, required: true },
    codigoPostal: { type: Number, required: false },
    fecha: { type: Schema.Types.Mixed, required: false },
    fechaCreacion: { type: Number, default: Date.now() },
    fechaGarantia: { type: Number, default: 0 },
    tecnico: { type: Schema.Types.Mixed, required: true },
    estado: { type: String, default: '0' },
    valor: {type: Number, default: 0}
    
})

module.exports = mongoose.model('Clientes', clienteSchema)