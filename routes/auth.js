/* 

Ruta: /api/login

*/

const {Router} = require('express');
const { check } = require('express-validator');
const { login, recuperarCuenta, recuperarCuentaConCodigo, recuperarCuentaConKey } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt')

const router = Router();

router.post('/', [
    check('password', 'El password es Obligatorio').not().isEmpty(),
    check('email', 'El email es Obligatorio').isEmail(),
    validarCampos
], login);

router.post('/recuperacion', [
    check('email', 'El email es Obligatorio').isEmail(),
    validarCampos
], recuperarCuenta);

router.post('/recuperacion/codigo', [
    check('email', 'El email es Obligatorio').isEmail(),
    check('code', 'El código es Obligatorio').not().isEmpty(),
    validarCampos
], recuperarCuentaConCodigo);

router.post('/recuperacion/key', [
    check('email', 'El email es Obligatorio').isEmail(),
    check('key', 'El key es Obligatorio').not().isEmpty(),
    check('password', 'El password es Obligatorio').not().isEmpty(),
    validarCampos
], recuperarCuentaConKey);

module.exports = router;