const { response } = require("express");
const jwt = require("jsonwebtoken");
const Usuario = require("../modelos/usuario");
const Sesion = require("../modelos/sesion");

const validarJWT = async (req, res=response, next)=>{

    // leer el token del header
    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            ok: false,
            code : 27
        })
    }

    // Verificar el jwt
    try {
        // Si esta expresion es false va al catch, en caso contrario continuamos
        const {uid} = jwt.verify(token, process.env.JWT_SECRET?process.env.JWT_SECRET:"clavesecretaindecifrable");
        const usuarioDB= await Usuario.findById(uid);
        if(!usuarioDB){
            res.status(404).json({
                ok: false,
                code: 6
            })
        }
        req.uid = uid;
        //console.log(req);
        next();
    } catch (error) {
        return res.status(401).json({
            ok: false,
            code: 28
        }) 
    }
    
}

const validarADMIN_ROLE= async (req, res, next)=>{

    const uid = req.uid;
    try {

        const usuarioDB= await Usuario.findById(uid);

        if(!usuarioDB){
            res.status(404).json({
                ok: false,
                code: 6
            })
        }

        if(usuarioDB.role !== 'ADMIN_ROLE'){
            res.status(403).json({
                ok: false,
                code: 29
            })
        }

        next();
        
    } catch (error) {

        res.status(500).json({
            ok: false,
            code: 0
        })
    }
}

const validarADMIN_ROLE_o_MismoUsuario= async (req, res, next)=>{

    const uid = req.uid;

    const id = req.params.id; // id que quiero actualizar

    try {

        const usuarioDB= await Usuario.findById(uid);

        if(!usuarioDB){
            res.status(404).json({
                ok: false,
                code: 6
            })
        }

        // si uid === id es el mismo usuario que quiere autentizarse
        if(usuarioDB.role === 'ADMIN_ROLE' || uid === id){
            next();
        }else{
            res.status(403).json({
                ok: false,
                code: 29
            })
        }

        //next();
        
    } catch (error) {

        res.status(500).json({
            ok: false,
            code: 0
        })
    }
}

module.exports={
    validarJWT,
    validarADMIN_ROLE,
    validarADMIN_ROLE_o_MismoUsuario
    
}