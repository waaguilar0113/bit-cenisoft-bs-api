const express = require('express')
const Client = require('./model')
const router = express.Router()
const { createClient, consul_Id_Cliente, consul_Clientes, eliminar_Cliente } = require('./actions')


// Get Consulta Id CLiente
router.get('/consul_Id_Cliente/:id', consul_Id_Cliente)

// Get Consulta Clientes
router.get('/consul_Clientes', consul_Clientes)

// POST Create a Client
router.post('/crear_Cliente', createClient)

// PUT Update a Client's info
router.put('/modificar/:id', (id,res) =>{

	Client.updateOne({ _id: id.params.id }, id.body, (error, result) => {
		if (error) {
			res.status(422).send(error)
		} else if (result) {
			res.status(200).send({message : ' Cliente Actualizado',result  : result })
		}else {
			res.status(404).send({message : ' Cliente no encontrado'})
		}
	})
})

// Eliminar Cliente
router.delete('/eliminar_Cliente/:id',eliminar_Cliente)

module.exports = router
