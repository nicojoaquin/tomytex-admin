const {Router} = require('express');
const { check } = require('express-validator');
const { imageValidator, inputsValidator } = require('../middlewares/validations');
const {login } = require('../controllers/auth');

const router = Router();

router.post('/login', login);

module.exports = router;