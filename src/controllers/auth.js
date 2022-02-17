const User = require("../models/User");
const bcrypt = require('bcrypt')
const { genJWT } = require("../helpers/jwt");

const login = async (req, res) => {

  const {username, password} = req.body;

  try {

    const user = await User.findOne({username})

    if(!user) {
      return res.status(400).json({
        ok: false,
        msg: "El nombre de usuario no existe"
      })
    }

    const passwordIsValid = await bcrypt.compare(password, user.password);

    if(!passwordIsValid) {
      return res.status(400).json({
        ok: false,
        msg: 'Contraseña incorrecta',
      });
    }

    const token = await genJWT(user);

    res.json({
      ok: true,
      username,
      token
    })
    
  } catch (err) {

    console.warn(err);

    res.status(500).json({
      ok: false,
      msg: 'error', 
    });

  }

};

module.exports = {
  login
}