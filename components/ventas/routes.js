const express = require('express')
const Ventas = require('./model')
const router = express.Router()
const { createVenta, consul_Id_Ventas, consul_Ventas, eliminar_Ventas } = require('./actions')


// Get Consulta Id Venta
router.get('/consul_Id_Ventas/:id', consul_Id_Ventas)

// Get Consulta Clientes
router.get('/consul_Ventas', consul_Ventas)

// POST Create a Client
router.post('/crear_Venta', createVenta)

// PUT Update a Client's info
router.put('/modificar/:id', (id,res) =>{

	Ventas.updateOne({ _id: id.params.id }, id.body, (error, result) => {
		if (error) {
			res.status(422).send(error)
		} else if (result) {
			res.status(200).send({message : ' Venta Actualizado',result  : result })
		}else {
			res.status(404).send({message : ' Venta no encontrado'})
		}
	})
})

// Eliminar Cliente
router.delete('/eliminar_Ventas/:id',eliminar_Ventas)

module.exports = router
