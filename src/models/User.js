const {Schema, model} = require('mongoose');

const UserSchema = new Schema(
  
  {
    username: {
      type: String,
      trim: true,
      required: true
    },

    password: {
      type: String,
      required: true
    },
  },
  {
    versionKey: false
  }
);

module.exports = model('User', UserSchema);