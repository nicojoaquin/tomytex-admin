const Tela = require("../models/Tela");

const readProducts = async (req, res) => {
  try {
    const telas = await Tela.find().sort({createdAt: -1});
    res.json({
      ok: true,
      telas
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      msg: err
    });
  };
};

const readProductById = async (req, res) => {
  try { 
    const tela = await Tela.findById({_id: req.params.id});
    res.json({
      ok: true,
      tela
    });
  } catch (err) {
    res.status(500).json({
      error: true,
      msg: err
    });
  };
}

module.exports = {
  readProducts,
  readProductById
}