const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const bbq = require('./bbq.js')();
const ServerShutdown = require('server-shutdown');

const serverShutdown = new ServerShutdown();

serverShutdown.registerServer(http);
serverShutdown.registerServer(io, ServerShutdown.Adapters.socketio);

const gracefulShutdown = function gracefulShutdown() {
  bbq.stop();
  serverShutdown.shutdown(() => {
    console.log('All servers shutdown gracefully');
  });
};

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: __dirname });
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  bbq.on('temperatureChange', (data) => {
    socket.emit('temperatureChange', data);
  });

  socket.on('setTarget', (temp, callback) => {
    bbq.setTarget(temp);
    console.log('Target: ', temp);
    callback(temp);
  });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});

