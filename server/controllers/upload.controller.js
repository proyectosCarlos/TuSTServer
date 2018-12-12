const imageModel = require ('../models/imagen')




const imageController = {}

imageController.crearImagen=  (req, res)=>{   
    try {
        const imagen = new imageModel(req.body)
         imagen.save()
        res.status(200).send('bien')    
        
    } catch (error) {
        res.status(401).send(error)    
        
    }    
      
}

imageController.obtenerImagenes = async(req, res)=>{

    try {
        const start = req.params.dateDesde
        const end = req.params.dateHasta
        console.log(start +" - "+end)
        const imagenes = await imageModel.find({$and : [{fechaCreacion : {$gte : start}}, {fechaCreacion: {$lte : end}}]})
        res.status(200).send(imagenes)    
        
    } catch (error) {
        res.status(401).send(error)   
    }

 
    }



module.exports = imageController;



