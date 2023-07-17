const jwt = require('jsonwebtoken');
const { crearSesion, cerrarSesion } = require('../controllers/socket/sesion');
module.exports = io => {
  io.use(function (socket, next) {
    if (socket.handshake.query && socket.handshake.query.token) {
      jwt.verify(socket.handshake.query.token, process.env.JWT_SECRET, function (err, decoded) {
        if (err) return next(new Error('Authentication error'));
        socket.decoded = decoded;
        next();
      });
    }
    else {
      next(new Error('Authentication error'));
    }
  }).on('connection', socket => {
    socket.emit("authenticated");
    socket.on('logIn', async (request) => {
      const sesionResult = crearSesion(request.email, socket.id);
      if (sesionResult) {
        console.log(request.email, "Se ha conectado con el ID:", socket.id);
      }
    });

    // Cerrar sesión (por el usuario)
    socket.on('logout', request => {
      cerrarSesion(request.email);
      console.log(request.email, "Ha cerrado sesión");
    });

    // Al desconectar
    socket.on('disconnect', () => {
      console.log("Conexión perdida");
    });
  })
}
