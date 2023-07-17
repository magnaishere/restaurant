/* 

Ruta: /api/usuarios

*/

const {Router} = require('express');

// Para validaciones
const {check} = require('express-validator');

// Middleware personalizado
const { validarCampos } = require('../middlewares/validar-campos')
 
const { crearUsuario } = require('../controllers/usuarios');
const { validarJWT, validarADMIN_ROLE, validarADMIN_ROLE_o_MismoUsuario } = require('../middlewares/validar-jwt');

const router = Router();

// crear usuario
router.post('/',[
    check('name', 'El nombre es Obligatorio').not().isEmpty(),
    check('password', 'El password es Obligatorio').not().isEmpty(),
    check('email', 'El email es Obligatorio').isEmail(),
    check('country', 'El pais es Obligatorio').not().isEmpty(),
    check('code', 'El codigo es Obligatorio').not().isEmpty(),
    check('phone', 'El telefono es Obligatorio').not().isEmpty(),
    validarCampos
], crearUsuario);

// // actualizar usuario
// router.put('/admin/:id',[
//     validarJWT,
//     validarADMIN_ROLE,
//     check('name', 'El nombre es Obligatorio').not().isEmpty(),
//     check('password', 'El password es Obligatorio').not().isEmpty(),
//     check('email', 'El email es Obligatorio').isEmail(),
//     check('country', 'El pais es Obligatorio').not().isEmpty(),
//     check('code', 'El codigo es Obligatorio').not().isEmpty(),
//     check('phone', 'El telefono es Obligatorio').not().isEmpty(),
// ], actualizarUsuario);

// // actualizar mi perfil
// router.put('/perfil/:id',[
//     validarJWT,
//     validarADMIN_ROLE_o_MismoUsuario,
//     check('name', 'El nombre es Obligatorio').not().isEmpty(),
//     check('email', 'El email es Obligatorio').isEmail(),
//     check('country', 'El pais es Obligatorio').not().isEmpty(),
//     check('code', 'El codigo es Obligatorio').not().isEmpty(),
//     check('phone', 'El telefono es Obligatorio').not().isEmpty(),
//     check('language', 'El lenguaje es Obligatorio').not().isEmpty(),
// ],actualizarPerfilUsuario);

// eliminar usuario
// router.delete('/:id', [validarJWT, validarADMIN_ROLE], borrarUsuario);
module.exports = router;
