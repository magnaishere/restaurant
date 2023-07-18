require('dotenv').config();
const path = require('path');
const express = require('express');

const cors = require('cors');

const { dbConnection } = require('./database/config');
dbConnection();
const app = express();
app.set('port', process.env.PORT || 3000)
app.use(cors());
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.json({ limit: '50mb' }));



app.use(express.static('public'));
app.use(express.static('uploads'));

// Para crear las rutas 
app.use('/api/country', require('./routes/country'));
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/auth'));


app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public/index.html'));
})

// CODIGOS PARA VERSION CON SOCKET
var server = app.listen(app.get('port'), () => {
  console.log('Servidor corriendo en puerto ' + app.get('port'));
})




