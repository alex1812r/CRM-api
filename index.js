const express = require('express');
const app = express();
const routes = require('./routes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// CONECTAR MONGOOSE
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/CRM', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

// HABILITAR BODY PARSER
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// HABILITAR CORS
app.use(cors({
  origin: 'http://localhost:3000'
}));

// USAR RUTAS
app.use('/', routes());

// CARPETA PUBLICA
app.use(express.static('uploads'));

// INICIAR APP(SERVIDOR)
app.listen(5000, (req, res) => {
  console.log('SERVIDOR INICIADO EN PUERTO : ', 5000);
});