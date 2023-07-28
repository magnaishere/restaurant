const bcrypt = require("bcryptjs/dist/bcrypt");
const { generarJWT } = require("../helpers/jwt");
const { makeid } = require("../helpers/commons");
const Usuario = require("../modelos/usuario");
const Verificacion = require("../modelos/verificacion");
const Sesion = require("../modelos/sesion");
const { sendMail } = require("../helpers/mailer");
var moment = require('moment');
moment.locale('es');

const Country = require('country-state-city').Country;

const crearUsuario = async (req, res) => {
  const { password, email, country } = req.body;
  try {
    // buscar por email el Usuario
    const existeEmail = await Usuario.findOne({ email });
    // Si el email existe
    if (existeEmail) {
      return res.json({
        ok: false,
        code: 1,
      });
    }
    const countries = Country.getAllCountries();
    const index = countries.findIndex(x => x.name == country);
    let input = req.body;
    if (index != -1) {
      input.countryisoCode = countries[index].isoCode;
    }else{
      return res.json({
        ok: false,
        code: 2,
      });
    }
    // crea una instancia del usuario
    const usuario = new Usuario(input, { versionKey: false });

    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);
    // Para grabar en la base de datos
    await usuario.save();
    const code = makeid(6);
    const userDB = await usuario.toJSON();
    const verify = new Verificacion({ user: userDB.id, code }, { versionKey: false });
    await verify.save();
    sendMail(userDB.email, "Verificación de cuenta Creaciones Maya", "Has creado una cuenta de Creaciones Maya correctamente. Ahora con el siguiente código podrás confirmar tu cuenta: </p><br /><br /><h1>"+code+"</h1><br /><br /><p>", "simple").then((r)=>{
        res.json({
          ok: true,
          email: usuario.email
        });
      });
    } catch (error) {
      console.log(error);
      res.json({
        ok: false,
        code: 0,
      });
    }
};

const verifyAgain = async (req, res) => {
  const { email } = req.body;
  try {
    const existeEmail = await Usuario.findOne({ email });
    // Si el email existe
    if (!existeEmail) {
      return res.json({
        ok: false,
        code: 17,
      });
    }
    const code = makeid(6);
    const verify = new Verificacion({ user: existeEmail._id, code }, { versionKey: false });
    await verify.save();
    sendMail(existeEmail.email, "Verificación de cuenta Creaciones Maya", "Has creado una cuenta de Creaciones Maya correctamente. Ahora con el siguiente código podrás confirmar tu cuenta: </p><br /><br /><h1>"+code+"</h1><br /><br /><p>", "simple").then((r)=>{
      res.json({
        ok: true
      });
    });
  } catch (error) {
    console.log(error);
    res.json({
      ok: false,
      code: 0,
    });
  }
};
const verifyAccount  = async (req, res) => {
  const { code, email } = req.body;
  try {
    // buscar por email el Usuario
    const existeEmail = await Usuario.findOne({ email });
    // Si el email existe
    if (!existeEmail) {
      return res.json({
        ok: false,
        code: 17,
      });
    }
    const verificationDB = await Verificacion.findOne({ code: code, user: existeEmail._id, completed: false });
    if (!verificationDB) {
      return res.json({
        ok: false,
        code: 18,
      });
    }
    if (Date.now() > verificationDB.expire_at) {
        return res.json({
            ok: false,
            code: 19
        })
    }
    verificationDB.completed = true;
    await verificationDB.save();
    existeEmail.status = 1;
    await existeEmail.save();
    const token = await generarJWT(existeEmail._id);
    const existeSesion = await Sesion.findOne({ id: existeEmail._id, closed: false });
    if (existeSesion) {
        let { closed, ...campos } = existeSesion.toJSON();
        campos.closed = true;
        await Sesion.findByIdAndUpdate(existeSesion.id, campos, {
            new: true,
        });
    }
    new Sesion({ user: existeEmail._id, token: token }, { versionKey: false });
    sendMail(existeEmail.email, "Bienvenido a Creaciones Maya", "Has confirmado tu dirección de correo correctamente. Disfruta de los productos y servicios que ofrecemos. Recuerda que puedes visitarnos en instagram.", "simple").then(async (r)=>{
      res.json({
        ok: true,
        user: await existeEmail.toJSON(),
        token: token,
      });
    });
  } catch (error) {
    console.log(error);
    res.json({
      ok: false,
      code: 0,
    });
  }
};

module.exports = {
  crearUsuario,
  verifyAccount,
  verifyAgain,
  // actualizarUsuario,
  // actualizarPerfilUsuario,
};
