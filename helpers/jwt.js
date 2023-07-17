
const jwt = require('jsonwebtoken');

// Para generar el jwt sera necesario el user id 
const generarJWT = (uid)=>{

    return new Promise((resolve, reject)=>{
        const payload={
            uid
        };
        // el sign es para crearlo
        // lo que se va a firmar es el payload
        jwt.sign(payload, process.env.JWT_SECRET?process.env.JWT_SECRET:"clavesecretaindecifrable", {
            expiresIn: '12h'
        }, (err, token)=>{
            if(err){
                console.log(err);
                reject('No se pudo generar el JWT')
            }else{
                resolve(token)
            }
        })
    })
}

module.exports ={
    generarJWT
}

