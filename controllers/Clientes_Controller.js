const ClientesModel = require('../models/Cientes');


exports.mostrarClientes = async (req, res) => {
  try{
    const clientes = await ClientesModel.find();
    res.json({ Ok: true, clientes });
  }catch(error) {
    json.res({ Ok: false, mensaje: 'Error al Consultar Clientes' });
    console.log(error);
  }
}

exports.mostrarCliente = async (req, res) => {
  try {
    const cliente = await ClientesModel.findById(req.params.id);
    if(!cliente) {
      res.json({ Ok: false, mensaje: 'El Cliente no existe' });
      return
    }
    res.json({ Ok: true, cliente });
  }catch(error) {
    res.json({ Ok: false, mensaje: 'Error al Consultar Cliente' });
    console.log(error);
  }
}

exports.registrarCliente = async (req, res) => {
  const cliente = new ClientesModel(req.body);
  try {
    // ALMACENAR EL REGISTRO
    await cliente.save();
    res.json({ Ok: true, mensaje: 'Exito al Registrar Cliente!' })
  }catch(error) {
    console.log(error);
    if(error.code && error.code === 11000)
      res.json({ Ok: false, mensaje: 'El correo ya se encuentra registrado' });
    else
      res.json({ Ok: false, mensaje: 'Error al Registrar Cliente' });
  
  }
}

exports.actualizarCliente = async (req, res) => {
  try {
    const cliente = await ClientesModel.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    res.json({ Ok: true, cliente });
  }catch(error) {
    console.log(error);
    if(error.code && error.code === 11000)
      res.json({ Ok: false, mensaje: 'El correo ya se encuentra registrado a otro cliente' });
    else
      res.json({ Ok: false, mensaje: 'Error al Actualizar Cliente'});
  }
}

exports.eliminarCliente = async (req, res) => {
  try {
    await ClientesModel.findOneAndRemove({ _id: req.params.id });
    res.json({ Ok: true, mensaje: 'El Cliente se ha Eliminado' });
  }catch(error) {
    res.json({ Ok: false, mensaje: error });
    console.log(error);
  }
}