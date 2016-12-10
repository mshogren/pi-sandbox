var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var gracefullyClosing = false;

app.use(function (req, res, next) {
  if (gracefullyClosing) {
    res.setHeader("Connection", "close");
    res.send(502, "Server is shutting down");
  } else {
    return next();
  }
});

var gracefulShutdown = function() {
  gracefullyClosing = true;
  console.log("Received kill signal, shutting down gracefully.");
  io.close(function() {
    console.log("Closed out socket connections.");

    http.close(function() {
      console.log("Closed out remaining connections.");
      process.exit();
    });
  });
  setTimeout(function() {
    console.error("Could not close connections in time, forcefully shutting down");
    process.exit(1)
  }, 10*1000);
}

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

app.get('/', function(req, res){
	res.sendFile('index.html', {root: __dirname});
});

io.on('connection', function(socket){
	console.log('a user connected');

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  socket.emit('text', 'wow. such event. very real time.');
});

http.listen(3000, function(){
	console.log('listening on *:3000');
});

