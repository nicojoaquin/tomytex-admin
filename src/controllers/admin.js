const Tela = require("../models/Tela")

const createProduct = async (req, res) => {
  
  const tela =  new Tela(req.body)

  try {
    await tela.save();
    res.json({
      ok: true,
      tela
    })
  } catch (err) {
    res.status(500).json({
      error: true,
      msg: err
    });
  }

};

const readProducts = async (req, res) => {
  try { 
    const telas = await Tela.find().sort({createdAt: -1});
    res.render('pages/index', {telas});
  } catch (err) {
    res.status(500).json({
      error: true,
      msg: err
    });
  };
}

const readProductById = async (req, res) => {
  try { 
    const tela = await Tela.findById({_id: req.params.id});
    res.render('pages/tela', {tela});
  } catch (err) {
    res.status(500).json({
      error: true,
      msg: err
    });
  };
}

const updateProduct = async (req, res) => {

  const {id} = req.params;

  try {
    await Tela.findByIdAndUpdate(id, req.body, {new: true});
    res.json({ok: true, id})
  } catch (err) {
    res.status(500).json({
      ok: false,
      msg: err
    });
  };

}

const updateProductImg = async (req, res) => {

  const {id} = req.params;
  const {newImg} = req.body;

  const {imagenes}  = await Tela.findById(id)

  if(imagenes.length === 3) {
    return res.status(404).json({
      ok: false,
      msg: 'El maximo es de 3 imagenes'
    });
  }

  imagenes.push(newImg)

  try {
    await Tela.findByIdAndUpdate(id, {imagenes}, {new: true});
    res.json({ok: true, id})
  } catch (err) {
    res.status(500).json({
      ok: false,
      msg: err
    });
  };

}

const deleteProduct = async (req, res) => {

  const {id} = req.params

  try {
    await Tela.findByIdAndDelete({_id: id});
    res.json({ok: true})
  } catch (error) {
    res.status(500).json({
      error: true,
      msg: err
    });
  }

}

module.exports = {
  createProduct,
  readProducts,
  readProductById,
  updateProduct,
  updateProductImg,
  deleteProduct
}