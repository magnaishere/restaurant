

/* 

Ruta: /api/usuarios

*/

const {Router} = require('express');

// Para validaciones
const {check} = require('express-validator');

// Middleware personalizado
const { validarCampos } = require('../middlewares/validar-campos')
 
const { crearCategoria, actualizarCategoria, eliminarCategoria, getTodasCategorias } = require('../controllers/categorias');
const { validarJWT, validarAdminStore, validarADMIN_ROLE, validarADMIN_ROLE_o_MismoUsuario } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/:id', getTodasCategorias);

// crear categoria
router.post('/:id',[validarJWT,
    validarAdminStore,
    check('title', 'El título es Obligatorio').not().isEmpty(),
], crearCategoria);

// actualizar usuario
router.put('/:id/:cat', [
    validarJWT, 
    validarAdminStore,
    check('title', 'El título es Obligatorio').not().isEmpty(),
], actualizarCategoria);

// eliminar categoria
router.delete('/:id/:cat', [validarJWT, validarAdminStore], eliminarCategoria);

module.exports = router;
