
const {response} = require('express');
// Nos ayuda a atrapar los resultados de la validacion, los errores
const{ validationResult} = require('express-validator')

// el next lo vamos a llamar si este middleware pasa, para continuar con el otro 
// controlador que estamos protegiendo en la ruta
const validarCampos= (req, res=response, next)=>{


    // va a crear un arreglo de todos los errores que ocurrieron en la ruta
    const errores = validationResult(req);

    if(!errores.isEmpty()){
        return res.status(400).json({
            ok: false,
            code: 30,
            errors: errores.mapped()
        })
    }
    // en esta linea paso el validador y se supone que no hay errores
    // por eso se invoca el next
    next();
}
module.exports={
    validarCampos
}