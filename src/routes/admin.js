const {Router} = require('express');
const { check } = require('express-validator');
const { imageValidator, inputsValidator } = require('../middlewares/validations');
const { 
  createProduct,
  readProducts,
  readProductById,
  updateProduct,
  updateProductImg,
  deleteProduct
} = require('../controllers/admin');

const router = Router();

//POST
router.post('/',
  check('nombre', "El nombre es obligatorio").not().isEmpty(),
  check('comp', "La composición es obligatoria").not().isEmpty(),
  check('desc', "La descripción es obligatoria").not().isEmpty().isLength({min: 50}).withMessage('La descripción debe contener mas de 50 caracteres'),
  inputsValidator,
  createProduct
);

//GET
router.get('/', readProducts);

// //GET
router.get('/tela/:id', readProductById);

// //PUT
router.put('/:id',
  check('nombre', "El nombre no puede estar vacio").not().isEmpty(),
  check('comp', "La composición no puede estar vacia").not().isEmpty(),
  check('desc', "La descripción no puede estar vacia").not().isEmpty().isLength({min: 50}).withMessage('La descripción debe contener mas de 50 caracteres'),
  inputsValidator,
  updateProduct
);

//PUT
router.put('/upload/:id', imageValidator, updateProductImg);

// //DELETE
router.delete('/:id', deleteProduct);

module.exports = router;