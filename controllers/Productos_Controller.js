const Productos = require('../models/Productos');
const multer = require('multer');
const shortid = require('shortid');
const fs = require('fs');

exports.mostrarProductos = async (req, res) => {
  try{
    const productos = await Productos.find();
    res.json({ Ok: true, productos });
  }catch(error) {
    console.log(error);
    res.json({ Ok: false, mensaje: 'Error al Consultar Productos' });
  }
}

exports.mostrarProducto = async (req, res) => {
  try{
    const producto = await Productos.findById(req.params.id);
    if(!producto) {
      res.json({ Ok: false, mensaje: 'El Producto no existe' });
      return;
    }
    res.json({ Ok: true, producto });
  }catch(error) {
    console.log(error);
    res.json({ Ok: false, mensaje: 'Error al Consultar Producto' });
  }
}

// Configuracion de Multer
const configuracionMulter = {
  storage: multer.diskStorage({
    destination(req, file, callback) {
      callback(null, __dirname + '../../uploads/');
    },
    filename(req, file, callback) {
      const extension = file.mimetype.split('/')[1];
      callback(null, `${shortid.generate()}.${extension}`);
    }
  }),
  fileFilter(req, file, next) {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
      next(null, true) // true ACEPTAR EL ARCHIVO
    }else {
      next(new Error('Formato No válido'), false); // false RECHAZAR EL ARCHIVO PASAR EL ERROR
    }
  }
};

const uploadImage = multer(configuracionMulter).single('imagen');

exports.subirImagen = (req, res, next) => {
  uploadImage(req, res, function(error) {
    if(error) {
      console.log('ERROR AL SUBIR IMAGEN : ', error);

      if(error instanceof multer.MulterError || error.hasOwnProperty('message'))
        res.json({ Ok: false , mensaje: error.message });

      return;
    }
    
    next();
  });
}

exports.nuevoProducto = async (req, res) => {
  const producto = new Productos(req.body);
  try {
    if(req.file) {
      producto.imagen = req.file.filename;
    }
    console.log('PRODUCTO : ', producto)
    await producto.save();
    res.json({ Ok: true, mensaje: 'Exito al Registrar Producto!' });

  }catch(error) {
    console.log(error);
    res.json({ Ok: false, mensaje: error });
  }
}

exports.actualizarProducto = async (req, res) => {
  try{
    let productoAnterior = await Productos.findById(req.params.id);
    
    if(!productoAnterior) {
      res.json({ Ok: false, mensaje: 'El Producto no existe' });
      return;
    }

    let nuevoProducto = req.body;
    if(req.file) {
      if(productoAnterior.imagen) {
        const pathAnterior = __dirname + `../../uploads/${productoAnterior.imagen}`;
        fs.unlink(pathAnterior, (error) => {
          if(error) {
            console.log('Error al eliminar imagen anterior : ', error);
          }
          return;
        });
      }
      nuevoProducto.imagen = req.file.filename;
    }else
      nuevoProducto.imagen = productoAnterior.imagen;

    let producto = await Productos.findOneAndUpdate({ _id: req.params.id }, nuevoProducto, { new: true });

    res.json({ Ok: true, producto });

  }catch(error) {
    console.log(error);
    res.json({ Ok: false, mensaje: error });
  }
}

exports.eliminarProducto = async (req, res) => {
  try {
    const producto = await Productos.findById(req.params.id);
    await Productos.findByIdAndRemove(req.params.id);
    if(producto.imagen) {
      const path = __dirname + `../../uploads/${producto.imagen}`;
      fs.unlink(path, (error) => {
        if(error)
          console.log('Error al eliminar imagen anterior : ', error);
        return;
      });
    }
    res.json({ Ok: true, mensaje: 'El Producto se ha eliminado!' })
  }catch(error) {
    console.log(error);
    res.json({ Ok: false, mensaje: 'Error al Eliminar Producto'});
  }
}

exports.buscarProducto = async (req, res) => {
  try{
    const { busqueda } = req.query;
    const nombreBusqueda = new RegExp(busqueda, 'i');
    const productos = await Productos.find({ nombre: nombreBusqueda });
    res.json({ Ok: true, productos});
  }catch(error) {
    console.log(error)
    res.json({ Ok: false, mensaje: 'Error al Buscar Producto' });
  }
}