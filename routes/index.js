const express = require('express');
const router = express.Router();

// CONTROLADORES
const ClientesController = require('../controllers/Clientes_Controller');
const ProductosController = require('../controllers/Productos_Controller');
const PedidosController = require('../controllers/Pedidos_Controller');
const UsuariosController = require('../controllers/Usuarios_Controller');

const AuthMiddleware = require('../middlewares/Auth');

module.exports = function() {

  // RUTAS PARA LOS CLIENTES
  router.get('/clientes', AuthMiddleware, ClientesController.mostrarClientes);
  router.get('/clientes/:id', AuthMiddleware, ClientesController.mostrarCliente);
  router.post('/clientes', AuthMiddleware, ClientesController.registrarCliente);
  router.put('/clientes/:id', AuthMiddleware, ClientesController.actualizarCliente);
  router.delete('/clientes/:id', AuthMiddleware, ClientesController.eliminarCliente);

  // RUTAS PARA LOS PRODUCTOS
  router.get('/productos', AuthMiddleware, ProductosController.mostrarProductos);
  router.get('/productos/buscar', AuthMiddleware, ProductosController.buscarProducto);
  router.get('/productos/:id', AuthMiddleware, ProductosController.mostrarProducto);
  router.post('/productos', 
    AuthMiddleware, ProductosController.subirImagen, 
    ProductosController.nuevoProducto
  );
  router.put('/productos/:id', 
    AuthMiddleware, 
    ProductosController.subirImagen, 
    ProductosController.actualizarProducto
  );
  router.delete('/productos/:id', AuthMiddleware, ProductosController.eliminarProducto);

  // RUTAS PARA LOS PEDIDOS
  router.get('/pedidos', AuthMiddleware, PedidosController.mostrarPedidos);
  router.get('/pedidos/:id', AuthMiddleware, PedidosController.mostrarPedido);
  router.post('/pedidos', AuthMiddleware, PedidosController.nuevoPedido);
  router.put('/pedidos/:id', AuthMiddleware, PedidosController.actualizarPedido);
  router.delete('/pedidos/:id', AuthMiddleware, PedidosController.eliminarPedido);

  // RUTAS PARA LOS USUARIOS
  router.post('/iniciar-sesion', UsuariosController.autenticarUsuario);
  router.post('/crear-cuenta', UsuariosController.registrarUsuario);

  return router;
}