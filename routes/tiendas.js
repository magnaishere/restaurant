

/* 

Ruta: /api/usuarios

*/

const {Router} = require('express');

// Para validaciones
const {check} = require('express-validator');

// Middleware personalizado
const { validarCampos } = require('../middlewares/validar-campos')
 
const { crearTienda,
    actualizarTienda,
    desactivarTienda,
    activarTienda, 
    obtenerMiTienda } = require('../controllers/tiendas');
const { validarJWT, validarAdminStore, validarADMIN_ROLE, validarADMIN_ROLE_o_MismoUsuario } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/mi-tienda/:id', [validarJWT, validarAdminStore], obtenerMiTienda);

// crear tienda
router.post('/',[
    validarJWT,
    check('description', 'El descripción es Obligatorio').not().isEmpty(),
    check('user', 'El id del usuario es Obligatorio').not().isEmpty(),
], crearTienda);

// actualizar usuario
router.put('/disable/:id',[validarJWT, validarAdminStore], desactivarTienda);

// actualizar usuario
router.put('/enable/:id',[validarJWT, validarAdminStore], activarTienda);

// actualizar usuario
router.put('/:id', [validarJWT, validarAdminStore], actualizarTienda);

module.exports = router;
