const tecnicoModel = require ('../models/tecnico')
var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const tecnicoController = {}




tecnicoController.crearTecnico= (req, res)=>{     
  
    let pass = bcrypt.hashSync(req.body.passwordTecnico , 10);

    let nombreTecnico =  req.body.nombreTecnico    
    let apellidoTecnico = req.body.apellidoTecnico  
    let correoTecnico = req.body.correoTecnico      
    let passwordTecnico = pass
    let telefonoTecnico = req.body.telefonoTecnico  
    let descripcionTecnico = req.body.descripcionTecnico  
    let ciudadTecnico =  req.body.ciudadTecnico  
    let direccionTecnico =  req.body.direccionTecnico  
    let codigoPostalTecnico = req.body.codigoPostalTecnico   

   
    tecnicoModel.findOne({correoTecnico:correoTecnico}, (error, tecnicoRegistrado)=>{
        if(error){
            console.log(error)
        }else{
                if(!tecnicoRegistrado) {                    
                   
                        let  tecnico = new tecnicoModel({
                            nombreTecnico: nombreTecnico,
                            apellidoTecnico: apellidoTecnico,
                            correoTecnico: correoTecnico,
                            passwordTecnico: passwordTecnico,
                            telefonoTecnico: telefonoTecnico,
                            descripcionTecnico: descripcionTecnico,
                            ciudadTecnico: ciudadTecnico,
                            direccionTecnico: direccionTecnico,
                            codigoPostalTecnico: codigoPostalTecnico
                        })            
                       // tecnico.save() 
                        tecnico.save((err,tecnicoRegistrado )=>{
                            if(err){
                                console.log(error)
                            }else{
                            //    let payload = { subject: tecnicoRegistrado._id }
                            //    let token = jwt.sign(payload, 'secretKeySt')
                                res.status(200).send('Datos Registrados')
                            }
                        })
                
     }else{
        res.status(401).send('El usuario ya existe')
     }
    }

    })
}







tecnicoController.obtenerTecnicos = async(req, res)=>{
    //todos los clientes
    const tecnicos = await tecnicoModel.find({rol:'0'})
    res.json(tecnicos)
    }


    tecnicoController.obtenerTecnico= async (req, res)=>{       
        const tecnico = await tecnicoModel.findById(req.params.id)
        res.json({nombreTecnico: tecnico.nombreTecnico, apellidoTecnico:tecnico.apellidoTecnico, telefonoTecnico:tecnico.telefonoTecnico})
       }



       tecnicoController.login = async(req, res)=>{
        let userData = req.body       
       await tecnicoModel.findOne({correoTecnico: userData.correoTecnico} , (error, user)=>{
            if(error){
                console.log(error)
            }else{
                if(!user){
                    //en caso de que no encuente en usuario
                    res.status(401).send('El usuario no esta registrado')
                }else{                                    
                  
                    if (!(bcrypt.compareSync(userData.passwordTecnico, user.passwordTecnico))){
                        res.status(401).send('Password invalido')
                    }else{
                        if(user.estado =='0'){
                        res.status(401).send('La cuenta aun no esta activada') 
                        }else{
                            let payload = { subject: user._id }
                            let token = jwt.sign(payload, 'secretKey')              
                               res.status(200).send({user:user.rol,usertec:user._id, tecname:user.nombreTecnico , token:token})
                               //res.status(200).send(user.rol)
                        }           
                        
                    }
                }
            }
        })
        }


        tecnicoController.editarTecnico = async (req, res)=>{
            const { id } = req.params
            const tecnicoNuevo = {           

                nombreTecnico: req.body.nombreTecnico,  
                apellidoTecnico:  req.body.apellidoTecnico, 
                correoTecnico:  req.body.correoTecnico, 
                passwordTecnico:  req.body.passwordTecnico, 
                telefonoTecnico:  req.body.telefonoTecnico, 
                descripcionTecnico:  req.body.descripcionTecnico, 
                ciudadTecnico:  req.body.ciudadTecnico, 
                direccionTecnico:  req.body.direccionTecnico, 
                codigoPostalTecnico:  req.body.codigoPostalTecnico,     
                fechaCreacion:  req.body.fechaCreacion, 
                estado:  req.body.estado, 
                rol:  req.body.rol, 
            }
           await tecnicoModel.findByIdAndUpdate(id, {$set: tecnicoNuevo}, {new: true})
            //se agrega el new true para que en caso de que no exista lo cree
            res.status(200).send('Tecnico activado')
        }

module.exports = tecnicoController;
