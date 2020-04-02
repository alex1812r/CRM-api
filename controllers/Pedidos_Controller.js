const Pedidos = require('../models/Pedidos');

exports.mostrarPedidos = async (req, res) => {
  try{
    const pedidos = await Pedidos.find().populate('cliente').populate({
      path: 'pedido.producto',
      model: 'productos'
    });
    res.json({ Ok: true, pedidos });
  }catch(error) {
    console.log(error);
    res.json({ Ok: false, mensaje: 'Error al Consultar Pedidos' });
  }
}

exports.mostrarPedido = async (req, res) => {
  try {
    const pedido = await Pedidos.findById(req.params.id).populate('cliente').populate({
      path: 'pedido.producto',
      model: 'productos'
    });
    if(!pedido) {
      res.json({ Ok: false, mensaje: 'El pedido no existe' });
      return;
    }
    res.json({ Ok: true, pedido });
  }catch(error) {
    console.log(error);
    res.json({ Ok: false, mensaje: 'Error al Consultar Pedido' });
  }
}

exports.nuevoPedido = async (req, res) => {
  const pedido = new Pedidos(req.body);
  try{
    await pedido.save();
    res.json({ Ok: true, mensaje: 'Se Realizó el Pedido' });
  }catch(error) {
    console.log(error);
    res.json({ Ok: false, mensaje: 'Error al Realizar Pedido' });
  }
}


exports.actualizarPedido = async (req, res) => {
  try{
    let pedido = await Pedidos.findOneAndUpdate({ _id: req.params.id }, req.body,
      { new: true }
    ).populate('cliente').populate({
      path: 'pedido.producto',
      model: 'productos'
    });
    res.json({ Ok: true, pedido });
  }catch(error) {
    console.log(error);
    res.json({ Ok: false, mensaje: 'Error al Actualizar Pedido' });
  }
}

exports.eliminarPedido = async (req, res) => {
  try{
    await Pedidos.findOneAndRemove({ _id: req.params.id });
    res.json({ Ok: true, mensaje: 'El pedido se ha Eliminado' });
  }catch(error) {
    console.log(error);
    res.json({ Ok: false, mensaje: 'Error al Eliminar Pedido' });
  }
}