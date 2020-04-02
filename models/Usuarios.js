const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Usuarios = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: 'El Email es Obligatorio'
  },
  nombre: {
    type: String,
    required: 'El Nombre es Obligatorio'
  },
  password: {
    type: String,
    required: 'El password es Obligatorio'
  }
});

module.exports = mongoose.model('usuarios', Usuarios);