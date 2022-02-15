const {Router} = require('express');
const { 
  createProduct,
  readProducts,
  readProductById,
  updateProduct,
  updateProductImg,
  deleteProduct
} = require('../controllers/admin');
const { imageValidator } = require('../middlewares/validations');

const router = Router();

//POST
router.post('/', createProduct);

//GET
router.get('/', readProducts);

// //GET
router.get('/tela/:id', readProductById);

// //PUT
router.put('/:id', updateProduct);

//PUT
router.put('/upload/:id', imageValidator, updateProductImg);

// //DELETE
router.delete('/:id', deleteProduct);

module.exports = router;