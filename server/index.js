const express = require('express')
const app = express()
const morgan = require('morgan')
const { mongoose } = require('./database') 
const cors = require('cors')



//configuracion
app.set('port', process.env.PORT || 3000)


//middlewares

app.use(morgan('dev'))
app.use(express.json())
app.use(cors({origin: 'http://localhost:4200'}))


//rutas
app.use('/api/tuservicio' ,require('./routes/clientes.routes'))
app.use('/api/tuservicio' ,require('./routes/tecnicos.routes'))
app.use('/api/tuservicio' ,require('./routes/image.routes'))


//start
app.listen(app.get('port'), ()=>{
    console.log('corriendo en el puesto 3000 ')
        })