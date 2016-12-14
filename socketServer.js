//var http = require('http');
var io = require('socket.io');
var ServerShutdown = require('server-shutdown');

module.exports = SocketServer;

function SocketServer(srv) {
  if (!(this instanceof SocketServer)) return new SocketServer(srv);
  var socketServer = io(srv);

  var serverShutdown = new ServerShutdown();

  serverShutdown.registerServer(srv);
  serverShutdown.registerServer(socketServer, ServerShutdown.Adapters.socketio);

  var gracefulShutdown = function() {
    serverShutdown.shutdown(function() {
      console.log('All servers shutdown gracefully');
    });
  };

  process.on('SIGTERM', gracefulShutdown);
  process.on('SIGINT', gracefulShutdown);

  return socketServer;
}
