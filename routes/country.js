/* 

Ruta: /api/login

*/

const {Router} = require('express');
const {getCountries} = require('../controllers/countries');

const router = Router();

router.get('/all', getCountries);

module.exports = router;