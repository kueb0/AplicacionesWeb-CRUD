const mongoose = require("mongoose");

const ProductoEsquema = new mongoose.Schema({
  idProducto: {
    type: Number,
    required: true,
  },
  nombre: {
    type: String,
    required: true,
  },
  precio: {
    type: Number,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  imagen: { 
    type: String,
    required: true
  },
});

module.exports = mongoose.model("Producto", ProductoEsquema);