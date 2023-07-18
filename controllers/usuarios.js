const bcrypt = require("bcryptjs/dist/bcrypt");
const { generarJWT } = require("../helpers/jwt");
const Usuario = require("../modelos/usuario");
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

    // Generar el JWT
    const token = await generarJWT(usuario.id);

    // Para grabar en la base de datos
    await usuario.save();
    res.json({
      ok: true,
      token: token,
      userData: usuario,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      code: 0,
    });
  }
};

// const actualizarUsuario = async (req, res) => {
//   const uid = req.params.id;
//   try {
//     //Actualizaciones
//     let { password, google, email, img, ...campos } = req.body;
//     // buscar  Usuario por id
//     const usuarioDB = await Usuario.findById(uid);
//     // Verificar si el usuario existe en DB
//     if (!usuarioDB) {
//       return res.status(404).json({
//         ok: false,
//         code : 6,
//       });
//     }

//     const existeEmail = await Usuario.findOne({ email });
//     if (existeEmail && existeEmail.id != uid) {
//       return res.status(400).json({
//         ok: false,
//         code : 1,
//       });
//     }

//     // Solo si no es un usuario de google
//     if (!usuarioDB.google) {
//       campos.email = email;
//     } else if (usuarioDB.email !== email) {
//       return res.status(400).json({
//         ok: false,
//         code : 7,
//       });
//     }
//     const countries = Country.getAllCountries();
//     const index = countries.findIndex(x => x.name == campos.country);
//     if (index != -1) {
//       campos.countryisoCode = countries[index].isoCode;
//     }
//     if (img) {
//       const reg = new RegExp(
//         "^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$"
//       );
//       let block = img.split(";base64,");
//       if (!reg.test(block[1])) {
//         return res.status(500).json({
//           ok: false,
//           code : 3,
//         });
//       }
//       if (block[1].charAt(0) != 'i' && block[1].charAt(0) != '/') {
//         return res.status(500).json({
//           ok: false,
//           code : 4,
//         });
//       }
//       if (usuarioDB.img) {
//         var imgURL = usuarioDB.img.split("/");
//         removeFolder(`/${imgURL[1]}/${imgURL[2]}`);
//       }
//       const path = "/usuarios/" + uid;
//       const filename = uid + "_usuario";
//       base64ToFile(img, path, filename).then(async (base64ToFileRes) => {
//         if (base64ToFileRes.status == "success") {
//           campos.img = base64ToFileRes.finalpath;
//           const usuarioActualizado = await Usuario.findByIdAndUpdate(
//             uid,
//             campos,
//             { new: true }
//           );
//           res.json({
//             ok: true,
//             user: usuarioActualizado,
//           });
//         } else {
//           console.log(base64ToFileRes.message);
//           return res.status(500).json({ ok: false, msg: "Error inesperado" });
//         }
//       });
//     } else {
//       const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, {
//         new: true,
//       });

//       res.json({
//         ok: true,
//         user: usuarioActualizado,
//       });
//     }
//   } catch (error) {
//     res.status(500).json({
//       ok: false,
//       code : 0,
//     });
//   }
// };

// const actualizarPerfilUsuario = async (req, res) => {
//   const uid = req.params.id;
//   try {
//     let { password, google, email, img, ...campos } = req.body;
//     const usuarioDB = await Usuario.findById(uid);
//     if (!usuarioDB) {
//       return res.status(400).json({
//         ok: false,
//         code: 1,
//       });
//     }
//     if (!usuarioDB.google) {
//       campos.email = email;
//     } else if (usuarioDB.email !== email) {
//       return res.status(400).json({
//         ok: false,
//         code: 7,
//       });
//     }
//     const existeEmail = await Usuario.findOne({ email });
//     if (existeEmail && existeEmail.id != uid) {
//       return res.status(400).json({
//         ok: false,
//         code: 1,
//       });
//     }
//     const countries = Country.getAllCountries();
//     const index = countries.findIndex(x => x.name == campos.country);
//     if (index != -1) {
//       campos.countryisoCode = countries[index].isoCode;
//     }
//     if (password) {
//       const salt = bcrypt.genSaltSync();
//       campos.password = bcrypt.hashSync(password, salt);
//     }
//     if (img) {
//       const reg = new RegExp(
//         "^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$"
//       );
//       let block = img.split(";base64,");
//       if (!reg.test(block[1])) {
//         return res.status(500).json({
//           ok: false,
//           code: 3,
//         });
//       }
//       if (block[1].charAt(0) != 'i' && block[1].charAt(0) != '/') {
//         return res.status(500).json({
//           ok: false,
//           code: 4,
//         });
//       }
//       if (usuarioDB.img) {
//         var imgURL = usuarioDB.img.split("/");
//         removeFolder(`/${imgURL[1]}/${imgURL[2]}`);
//       }
//       const path = "/usuarios/" + usuarioDB._id;
//       const filename = usuarioDB._id + "_usuario";
//       base64ToFile(img, path, filename).then(async (base64ToFileRes) => {
//         if (base64ToFileRes.status == "success") {
//           campos.img = base64ToFileRes.finalpath;

//           const usuarioActualizado = await Usuario.findByIdAndUpdate(
//             usuarioDB._id,
//             campos,
//             { new: true }
//           );

//           res.json({
//             ok: true,
//             user: password ? await { token: await generarJWT(usuarioDB._id), ...usuarioActualizado.toCustomA() } : await usuarioActualizado.toCustomA(),
//           });
//         } else {
//           return res.status(500).json({ ok: false, code: 0 });
//         }
//       });
//     } else {
//       const usuarioActualizado = await Usuario.findByIdAndUpdate(usuarioDB._id, campos, {
//         new: true,
//       });
//       res.json({
//         ok: true,
//         user: password ? await { token: await generarJWT(usuarioDB._id), ...usuarioActualizado.toCustomA() } : await usuarioActualizado.toCustomA(),
//       });
//     }
//   } catch (error) {
//     res.status(500).json({
//       ok: false,
//       code: 0,
//     });
//   }
// };

module.exports = {
  crearUsuario,
  // actualizarUsuario,
  // actualizarPerfilUsuario,
};
