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

    imagenes: {
      type: [{
        type: String
      }],
      validate: [ val => val.length <= 3, 'Solo se puede agregar hasta 3 imagenes']
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

module.exports = model('Tela', TelasSchema);