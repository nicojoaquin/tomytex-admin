const {Schema, model} = require('mongoose');

const TelasSchema = new Schema(
  
  {
    nombre: {
      type: String,
      trim: true,
      required: true
    },

    comp: {
      type: String,
      required: true
    },

    desc: {
      type: String,
      required: true
    },

    imagenes: Array
  },
  {
    timestamps: true,
    versionKey: false
  }
);

module.exports = model('Tela', TelasSchema);