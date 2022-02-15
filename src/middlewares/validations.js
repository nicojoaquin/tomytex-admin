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
  imageValidator
}