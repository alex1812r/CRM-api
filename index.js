const express = require('express');
const app = express();
const routes = require('./routes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config({ path: 'variables.env' });

// CONECTAR MONGOOSE
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

// HABILITAR BODY PARSER
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// CORS
// LISTA DE DOMINIOS PERMITIDOS
const listaBlanca = [process.env.FRONTEND_URL];
// HABILITAR CORS
app.use(cors({
  origin: (origin, callback) => {
    const existe = listaBlanca.some(dominio => dominio === origin);
    if(existe)
      callback(null, true);
    else
      callback((new Error('No permitido por CORS')));
  }
}));

// USAR RUTAS
app.use('/', routes());

// CARPETA PUBLICA
app.use(express.static('uploads'));

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 5000;

// INICIAR APP(SERVIDOR)
app.listen(port, host, (req, res) => {
  console.log('SERVIDOR INICIADO EN PUERTO : ', 5000);
});