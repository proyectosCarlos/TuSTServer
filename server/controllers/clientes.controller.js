const clienteModel = require ('../models/cliente')
const moment = require('moment');

const clienteController = {}


clienteController.crearCliente= async (req, res)=>{   
    try {
        const cliente = new clienteModel(req.body)
        await cliente.save()
        res.json({
            "status": "201"
        })
        
    } catch (error) {
        res.json({
            "status": '401',
            "mensaje": error
        })
        
    }
      
}


clienteController.obtenerClientes = async(req, res)=>{
    //todos los clientes
    const clientes = await clienteModel.find({estado:"1"})
    res.json(clientes)
    }

clienteController.obtenerGarantias = async(req, res)=>{
    //todos los clientes
    const garantias = await clienteModel.find({estado:"2"})
    res.json(garantias)
    }

clienteController.obtenerPedientes = async(req, res)=>{
    //todos los clientes
    const pendientes = await clienteModel.find({estado:"0"})
    res.json(pendientes)
    }   

    clienteController.editarCliente = async (req, res)=>{   
        let DiasGarantia = 40
        //let fecha = moment(1541027102867.0).format("DD/MM/YYYY"); 
       // let fecha = moment(1541027102867.0).format('LLLL')  
       let DateNow = new Date()
       let yearAct= DateNow.getFullYear();
       let monthAct = DateNow.getMonth()+1;
       let dayAct = DateNow.getDate(); 

       let year = req.body.fecha.year
       let month=  req.body.fecha.month
       let day = req.body.fecha.day
       

       var a = moment([yearAct, monthAct, dayAct]);
       var b = moment([year, month, day]);
      let dias = (a.diff(b, 'days'))  

    //   let salida = moment([year, day, month]).fromNow(true);      
    //   let fecha = salida.split(" ")    
    //     let DiasGarantia = 10   
    //     moment.locale('en');
    //     let f =moment(req.body.fechaCreacion).fromNow();         
    //     dias = f.split(" ");  

        if(dias>DiasGarantia){
           res.status(401).send('El tiempo de garantia ha Caducado')           
        }else{ 

        const  id  = req.params.id
        const clienteNuevo = {           

            electrodomestico: req.body.electrodomestico,
            correo: req.body.correo,
            descripcion: req.body.descripcion,
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            telefono: req.body.telefono,
            ciudad: req.body.ciudad,
            direccion: req.body.direccion,
            codigoPostal: req.body.codigoPostal,
            fecha: req.body.fecha,
            fechaCreacion: req.body.fechaCreacion,
            fechaGarantia: Date.now(),
            tecnico: req.body.tecnico,
            estado: req.body.estado,
            valor: req.body.valor
        }
        await clienteModel.findByIdAndUpdate(id, {$set: clienteNuevo}, {new: true})
       // se agrega el new true para que en caso de que no exista lo cree
        res.status(200).send('bien')         
       } 
    }


//Obtener listado de clientes por año para grafica administrador
    clienteController.obtenerClientesAnio= async(req, res)=>{
        
        try {
            const y = parseInt(req.params.year)  
       
            const clientes = await clienteModel.find({"fecha.year": y})
                   
            res.status(200).json(clientes)
            
        } catch (error) {
            res.status(401).send(error)
        }    
      }



      //Obtener clientes para grafica tecnicos por año
   clienteController.obtenerClientesAnioTecnico= async(req, res)=>{
            
            try {
                const  id = req.params.id
                const y = parseInt(req.params.year)  
           
               const clientes = await clienteModel.find({$and:[{tecnico: id},{"fecha.year": y}]})
               
                       
                res.status(200).json(clientes)
                
            } catch (error) {
                res.status(401).send(error)
            }
    }

    //metodo para obtener la facturacion total de los clientes por año y mes
    clienteController.obtenerClientesFacturacion= async(req, res)=>{            
        try {
            //y es año y m es mes 
            const y = parseInt(req.params.year)  
            const m = parseInt(req.params.month)  

            const factura = await clienteModel.aggregate([
                { $match:{$and:[{"fecha.month": m},{"fecha.year": y}]}},                
                {$group : {_id : "$by_user", total : {$sum : "$valor"}}}])

            res.status(200).json(factura)
            
        } catch (error) {
            res.status(401).send(error)
        }
}

//metodo para obtener la facturacion total de los clientes por año y mes de cada tecnico
clienteController.obtenerClientesFacturacionTecnico= async(req, res)=>{            
    try {
        //y es año y m es mes 
        const id = req.params.id
        const y = parseInt(req.params.year)  
        const m = parseInt(req.params.month)

        const factura = await clienteModel.aggregate([
            { $match:{$and:[{tecnico: id},{"fecha.month": m},{"fecha.year": y} ]}},                
            {$group : {_id : "$by_user", total : {$sum : "$valor"}}}])

        res.status(200).json(factura)
        
    } catch (error) {
        res.status(401).send(error)
    }
}



//metodos busqueda de clientes para el perfil del tecnico 

clienteController.obtenerClientesTecnico = async(req, res)=>{
    //todos los clientes
    try {
        const id = req.params.id      
       const clientes = await clienteModel.find( {$and: [{estado:"1"}, {tecnico: id }]})
       res.json(clientes)
    } catch (error) {
        console.log(error)
    }

    }

    clienteController.obtenerGarantiasTecnico = async(req, res)=>{
        //todos los clientes
        try {
            const id = req.params.id   
            const garantias = await clienteModel.find( {$and: [{estado:"2"}, {tecnico: id }]})
            res.json(garantias)
        } catch (error) {
            console.log(error)
        }
      
        }
    
    clienteController.obtenerPedientesTecnico = async(req, res)=>{
        //todos los clientes
        try {
            const id = req.params.id   
            const pendientes = await clienteModel.find( {$and: [{estado:"0"}, {tecnico: id }]})
            res.json(pendientes)
        } catch (error) {
            console.log(error)
        }
    
        }   


        clienteController.editarClienteFacturacion = (req, res)=>{
            const  id  = req.params.id
            clienteModel.findOneAndUpdate(
                {
                  _id: id  // search query
                }, 
                {
                    electrodomestico: req.body.electrodomestico,
                    correo: req.body.correo,
                    descripcion: req.body.descripcion,
                    nombre: req.body.nombre,
                    apellido: req.body.apellido,
                    telefono: req.body.telefono,
                    ciudad: req.body.ciudad,
                    direccion: req.body.direccion,
                    codigoPostal: req.body.codigoPostal,
                    fecha: req.body.fecha,
                    fechaCreacion: req.body.fechaCreacion,
                    fechaGarantia: req.body.fechaGarantia,
                    tecnico: req.body.tecnico,
                    estado: 1,
                    valor: req.body.valor  // field:values to update
                },
                {
                  new: true,                       // return updated doc
                  runValidators: true              // validate before update
                })
              .then(doc => {
                res.status(200).send('bien')
              })
              .catch(err => {
                res.status(401).send(err)
              })
   
        }


        


module.exports = clienteController;
