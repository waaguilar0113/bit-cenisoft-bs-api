const Ventas = require('./model')

// metodo creacion de venta
const createVenta = (req, res) => {
  const newVenta = new Ventas(req.body)
  newVenta.save((error, VentasSaved) => {
    if (error) {
      console.error('Error al guardar venta ', error)
      res.status(500).send(error)
    } else {
      res.send(VentasSaved)
    }
  })
}

// Consulta Id Ventas
const consul_Id_Ventas = (id, res) => {
	Ventas.findById(id.params.id, (errors, Ventas) => {
		if (errors) {
			res.status(500).send(error)
		}else if (Ventas){
			res.status(200).send(Ventas)
		}else{
			res.status(404).send({message : ' Venta no encontrado'})	
		}
	})
}

// Consulta Ventas
const consul_Ventas = (req, res) => {
  let query = req.query
  if (req.query.name) {
    query = { name: new RegExp(`.${req.query.name}.`, 'i') }
  }
  Ventas.find(query, (error, Ventas) => {
    if (error) {
      res.status(500).send(error)
    }else if (Ventas) {
      res.status(200).send({message : ' Datos Ventas ', Ventas : Ventas})
    }else {
      res.status(404).send({message : ' Ventas no encontrado'})
    }
  })
}

// Eliminar Ventas
const eliminar_Ventas = (id, res) => {
	Ventas.findByIdAndDelete(id.params.id, (error, result) => {
		if (error) {
			res.status(500).send(error)
		} else if (result) {
			res.status(200).send({message : ' Venta Eliminado',result  : result })
		}else {
			res.status(204).send({message : ' Venta no encontrado'})
		}
	})
}

module.exports = { createVenta, consul_Id_Ventas, consul_Ventas, eliminar_Ventas }
