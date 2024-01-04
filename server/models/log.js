const mongoose = require('mongoose');

// Definir el esquema para el modelo Log
const logSchema = new mongoose.Schema({
  dt: {
    type: String,
    required: [true, 'Must have a Date!'],
    unique: true,
  },
  message: {
    type: String,
    required: [true, 'Must have a message!']
  },
  host: {
    type: String,
    required: [true, 'Must have a host!']
  },
});

// Crear el modelo Log 
const Log = mongoose.model('Log', logSchema);

module.exports = Log;