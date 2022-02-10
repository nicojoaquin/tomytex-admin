const mongoose = require('mongoose');

const dbConnection = async () => {
  try {
    const db = await mongoose.connect(process.env.URI);
    console.log(`Conectado a la DB ${db.connection.name}`);
  } catch (err) {
    console.error('Error al inicializar base de datos', err);
  }
}


module.exports = {
  dbConnection
};