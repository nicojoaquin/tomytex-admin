const jwt = require('jsonwebtoken');

const genJWT = (user) => {

  return new Promise((resolve, reject) => {

    const payload = {_id: user.id, username: user.username};

    jwt.sign(payload, process.env.SECRET_JWT_SEED, {
      expiresIn: '2h'
    }, (err, token) => {
      
      if(err) {
        console.warn(err);
        reject('No se pudo generar el token');
      }

      resolve(token);

    });

  });

};

module.exports = {
  genJWT
};