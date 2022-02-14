const Tela = require("../models/Tela")
const cloudinary = require('cloudinary').v2
const fs = require('fs-extra');

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
  const {imagen} = req.body

  const {imagenes} = await Tela.findById(id);
  
  let newImgs;
  
  if(imagen) {
    await cloudinary.uploader.destroy(imagen.public_id);
    newImgs = imagenes?.filter( img => img.public_id !== imagen.public_id );
  }

  try {
    await Tela.findByIdAndUpdate(
      id,
      {
        ...req.body,
        imagenes: newImgs
      },
      {
      new: true
      }
    );

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
  const img = req.files[0];

  const {imagenes}  = await Tela.findById(id)

  if(!img) {
    return res.status(404).json({
      ok: false,
      msg: 'Por favor inserte una imagen'
    })
  }

  if(imagenes.length === 3) {
    return res.status(404).json({
      ok: false,
      msg: 'El maximo es de 3 imagenes'
    });
  }

  const {url, public_id} = await cloudinary.uploader.upload(img.path);
  imagenes.push({url, public_id})

  try {
    await Tela.findByIdAndUpdate(id, {imagenes}, {new: true});
    await fs.unlink(req.files[0].path)
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
  const {imagenes} = await Tela.findById(id);

  const deleteImgs = imagenes.map( img => {
    cloudinary.uploader.destroy(img.public_id)
  });

  await Promise.all(deleteImgs);

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