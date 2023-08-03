
const bcrypt = require('bcryptjs/dist/bcrypt');
// Para tener las ayudas de express pero no es necesario
const { generarJWT } = require('../helpers/jwt');
const Usuario = require('../modelos/usuario');
const { makeid } = require('../helpers/commons');
const Recuperacion = require('../modelos/recuperacion');
const Sesion = require('../modelos/sesion');
const { sendMail } = require('../helpers/mailer');
const login = async (req, res) => {
    const { email, password } = req.body;
    try {

        // Verificar email
        const usuarioDB = await Usuario.findOne({ email });
        if (!usuarioDB) {
            return res.json({
                ok: false,
                code: 3
            })
        }

        // Verificar contrase;a:  regresa true si hace match o false si no
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        if (!validPassword) {
            return res.json({
                ok: false,
                code: 3
            })
        }

        // Generar el JWT
        const token = await generarJWT(usuarioDB._id);
        const existeSesion = await Sesion.findOne({ id: usuarioDB._id, closed: false });
        if (existeSesion) {
            existeSesion.closed = true;
            await existeSesion.save();
        }

        const usuario = new Sesion({ user: usuarioDB._id, token: token }, { versionKey: false });
        await usuario.save();
        if (usuarioDB.status==0) {
            return res.json({
                ok: true,
                userData: {
                    email: usuarioDB.email,
                    status: 0
                }
            })   
        }else{
            if (usuarioDB.status==1) {
                const tiendaDB = await Tienda.findOne({ admin: usuarioDB._id });
                if (tiendaDB) {
                    return res.json({
                        ok: true,
                        token,
                        userData: await usuarioDB.toJSON(),
                        store: tiendaDB._id
                    })    
                }else{
                    return res.json({
                        ok: true,
                        token,
                        userData: await usuarioDB.toJSON(),
                        store: false
                    })    
                }
            }else{
                return res.json({
                    ok: false,
                    code: 13
                })
            }
        }       
    } catch (error) {
        return res.json({
            ok: false,
            code: 0
        })
    }
}

// const googleSignIn= async (req,res=response)=>{

//     const googleToken=req.body.token;


//     try {

//         const {email, name, picture} = await googleVerify(googleToken);

//          const usuarioDB = await Usuario.findOne({email});

//          let usuario;

//         //si no existe el usuario
//         if ( !usuarioDB ){
//             usuario = new Usuario({
//                 nombre: name,
//                 email,
//                 password: '@@@',  // solo para que no choque con el modelo, no se va a usar
//                 img: picture,
//                 google: true
//             })
//         }else {
//             // si existe el usuario
//             usuario = usuarioDB;
//             usuario.google = true;  // si se autentico por google
//             //usuario.password = '@@@';
//         }

//         // Guardar en DB
//         await usuario.save();

//         // Generar el TOKEN - JWT
//         const token = await generarJWT( usuario.id);

//         res.json({
//             ok:true,
//             email, name, picture,
//             token,
//             menu: getMenuFrontEnd(usuario.role)
//         })

//     } catch (error) {

//         res.json({
//             ok:false,
//             msg: 'Token No es correcto',
//         })

//     }


// }

const recuperarCuenta = async (req, res) => {

    const email = req.body.email;
    // Verificar email
    const usuarioDB = await Usuario.findOne({ email });
    if (!usuarioDB) {
        return res.json({
            ok: false,
            code: 25
        })
    }
    const code = makeid(6);
    const user = await usuarioDB.toJSON();
    const recovery = new Recuperacion({ user: user.id, code }, { versionKey: false });
    await recovery.save();
    sendMail(usuarioDB.email, "Recuperación de clave de usuario", "Hiciste un intento de recuperar tu información de acceso a Creaciones Maya. Utiliza el siguiente código para confirmar la acción. Tu código de recuperación es:  </p><br /><br /><h1>" + code + "</h1><br /><br /><p>", "simple").then(async (resp) => {
        res.json({
            ok: true
        })
    })

}

const recuperarCuentaConCodigo = async (req, res) => {
    const { email, code } = req.body;
    // Verificar email

    const peticionDB = await Recuperacion.findOne({ email, code, claimed: false });
    if (!peticionDB) {
        return res.json({
            ok: false,
            code: 18
        })
    }
    if (Date.now() > peticionDB.expire_at) {
        return res.json({
            ok: false,
            code: 19
        })
    }
    peticionDB.recoverykey = makeid(12);
    peticionDB.claimed = true;
    await peticionDB.save();
    res.json({
        ok: true,
        key: peticionDB.recoverykey
    })
}

const recuperarCuentaConKey = async (req, res) => {
    const { email, key, password } = req.body;
    // Verificar email
    const peticionDB = await Recuperacion.findOne({ email, recoverykey: key, claimed: true, consumed: false });
    if (!peticionDB) {
        return res.json({
            ok: false,
            code: 18
        })
    }
    const usuarioDB = await Usuario.findOne({ email });
    if (!usuarioDB) {
        return res.json({
            ok: false,
            code: 17
        })
    }
    const salt = bcrypt.genSaltSync();
    usuarioDB.password = bcrypt.hashSync(password, salt);
    peticionDB.consumed = true;
    await peticionDB.save();
    await usuarioDB.save(); // si no se graba, no funciona luego 
    sendMail(usuarioDB.email, "Cambio de clave exitoso", "Haz realizado un cambio de clave a tu cuenta de Creaciones maya. Si no eres responsable de esta acción puedes contactar con el administrador del sistema mediante nuestras redes sociales.", "simple").then(async (resp) => {
        res.json({
            ok: true
        })
    })
}

module.exports = {
    login,
    // googleSignIn, 
    recuperarCuenta,
    recuperarCuentaConCodigo,
    recuperarCuentaConKey
}