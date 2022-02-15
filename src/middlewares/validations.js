const {validationResult} = require('express-validator');

const inputsValidator = (req, res, next) => {

  const errors = validationResult(req);

  if(!errors.isEmpty()){
    return res.status(400).json({
      ok: false,
      errors: errors.array()
    });
  }

  next();

};

const imageValidator = (req, res, next) => {

  const img = req.files[0];
  
  if(!img) {
    return res.status(404).json({
      ok: false,
      msg: 'Por favor inserte una imagen'
    })
  }

  next();
  
}

module.exports = {
  imageValidator,
  inputsValidator
}