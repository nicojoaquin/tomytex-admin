const {Router} = require('express');
const { 
  readProducts,
  readProductById,
} = require('../controllers/telas');

const router = Router();

//GET
router.get('/', readProducts);

//GET
router.get('/tela/:id', readProductById);

module.exports = router;