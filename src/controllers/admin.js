const Tela = require("../models/Tela")
const cloudinary = require('cloudinary').v2
const fs = require('fs-extra');

const createProduct = async (req, res) => {
  const {nombre, comp, desc} = req.body;

  const urls = [];

  const upload = req.files.map( file => {
    return cloudinary.uploader.upload(file.path);
  });

  const imgs = await Promise.all(upload);

  for(img of imgs) {
    urls.push(img.url)
  }

  const tela = new Tela({
    nombre,
    comp,
    desc,
    imagenes: urls
  });

  try {
    await tela.save();
    await req.files.map( file => fs.unlink(file.path) )
    res.redirect('/admin')
  } catch (err) {
    res.status(500).json({
      error: true,
      msg: err
    });
  };

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
    await Tela.findByIdAndUpdate({_id: id}, req.body, {new: true});
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
  imagenes.push(newImg)

  try {
    await Tela.findByIdAndUpdate({_id: id}, {imagenes}, {new: true});
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