const mongoose = require('mongoose')

const Ventas = mongoose.model('ventas', { fecha: { type:Date, default: Date.now }, total: String, idCliente: String })

module.exports = Ventas
