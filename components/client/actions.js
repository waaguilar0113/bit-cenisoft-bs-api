const Client = require('./model')

// metodo creacion de cliente
const createClient = (req, res) => {
  const newClient = new Client(req.body)
  newClient.save((error, clientSaved) => {
    if (error) {
      console.error('Error al guardar cliente ', error)
      res.status(500).send(error)
    } else {
      res.send(clientSaved)
    }
  })
}

// Consulta Id CLiente
const consul_Id_Cliente = (id, res) => {
	Client.findById(id.params.id, (errors, cliente) => {
		if (errors) {
			res.status(500).send(error)
		}else if (cliente){
			res.status(200).send(cliente)
		}else{
			res.status(404).send({message : ' Cliente no encontrado'})	
		}
	})
}

// Consulta Clientes
const consul_Clientes = (req, res) => {
  let query = req.query
  if (req.query.name) {
    query = { name: new RegExp(`.${req.query.name}.`, 'i') }
  }
  Client.find(query, (error, clientes) => {
    if (error) {
      res.status(500).send(error)
    }else if (clientes) {
      res.status(200).send({message : ' Datos Cliente ', clientes : clientes})
    }else {
      res.status(404).send({message : ' Clientes no encontrado'})
    }
  })
}

// Eliminar Cliente
const eliminar_Cliente = (id, res) => {
	Client.findByIdAndDelete(id.params.id, (error, result) => {
		if (error) {
			res.status(500).send(error)
		} else if (result) {
			res.status(200).send({message : ' Cliente Eliminado',result  : result })
		}else {
			res.status(204).send({message : ' Cliente no encontrado'})
		}
	})
}

module.exports = { createClient, consul_Id_Cliente, consul_Clientes, eliminar_Cliente }
