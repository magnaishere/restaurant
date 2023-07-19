const { response } = require("express");
const jwt = require("jsonwebtoken");
const Usuario = require("../modelos/usuario");
const Tienda = require("../modelos/tienda");
const { ObjectId } = require("mongoose").Types;

const validarJWT = async (req, res=response, next)=>{
    const token = req.header('x-token');
    if(!token){
        return res.json({
            ok: false,
            code : 11
        })
    }
    try {
        const {uid} = jwt.verify(token, process.env.JWT_SECRET?process.env.JWT_SECRET:"clavesecretaindecifrable");
        const usuarioDB= await Usuario.findById(uid);
        if(!usuarioDB){
            return res.json({
                ok: false,
                code: 7
            })
        }
        req.uid = uid;
        next();
    } catch (error) {
        return res.json({
            ok: false,
            code: 10
        }) 
    }
    
}
const validarAdminStore= async (req, res, next)=>{
    const uid = req.uid;
    try {
        const usuarioDB= await Usuario.findById(uid);
        if(!usuarioDB){
            return res.json({
                ok: false,
                code: 7
            })
        }
        const id = req.params.id; // id de la tienda
        const tiendaDB= await Tienda.findOne({ admin: usuarioDB._id });
        if(!tiendaDB){
            return res.json({
                ok: false,
                code:12
            })
        }
        if (!tiendaDB.admin.equals(usuarioDB._id)) {
            return res.json({
                ok: false,
                code:9
            })
        }
        next();
    } catch (error) {
        console.log(error);
        return res.json({
            ok: false,
            code: 0
        })
    }
}
const validarADMIN_ROLE= async (req, res, next)=>{
    const uid = req.uid;
    try {
        const usuarioDB= await Usuario.findById(uid);
        if(!usuarioDB){
            return res.json({
                ok: false,
                code: 6
            })
        }
        if(usuarioDB.role !== 'ADMIN_ROLE'){
            return res.json({
                ok: false,
                code: 29
            })
        }
        next();
    } catch (error) {
        console.log(error);
        return res.json({
            ok: false,
            code: 0
        })
    }
}

const validarADMIN_ROLE_o_MismoUsuario= async (req, res, next)=>{
    const uid = req.uid;
    const id = req.params.id;
    try {
        const usuarioDB= await Usuario.findById(uid);
        if(!usuarioDB){
            return res.json({
                ok: false,
                code: 6
            })
        }
        if(usuarioDB.role === 'ADMIN_ROLE' || uid === id){
            next();
        }else{
            return res.json({
                ok: false,
                code: 29
            })
        }
    } catch (error) {
        console.log(error);
        return res.json({
            ok: false,
            code: 0
        })
    }
}

module.exports={
    validarJWT,
    validarADMIN_ROLE,
    validarADMIN_ROLE_o_MismoUsuario,
    validarAdminStore
}