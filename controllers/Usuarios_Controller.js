const Usuarios = require('../models/Usuarios');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.registrarUsuario = async (req, res) => {
  const usuario = new Usuarios(req.body);
  usuario.password = await bcrypt.hash(req.body.password, 12);
  try{
    await usuario.save();
    res.json({ Ok: true, mensaje: 'Usuario Creado Exitosamente!' });
  }catch(error) {
    console.log(error);
    res.json({ Ok: false, mensaje: 'Error al Crear Usuario' })
  }
}

exports.autenticarUsuario = async (req, res) => {
  const { email, password } = req.body;
  const usuario = await Usuarios.findOne({ email });
  if(!usuario)
    await res.json({ Ok: false, mensaje: 'El Usuario no existe' });
  else if(!bcrypt.compareSync(password, usuario.password))
    await res.json({ Ok: false, mensaje: 'Password Incorrecto' });
  else {
    const token = jwt.sign(
      {
        email: usuario.email,
        nombre: usuario.nombre,
        id: usuario._id
      }, 
      'LLAVESUPERSECRETA',
      { expiresIn: '5h' }
    );
    res.json({ Ok: true, token });
  }
}
