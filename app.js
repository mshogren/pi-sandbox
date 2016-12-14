var app = require('express')();
var http = app.listen(3000, function() {
  console.log('listening on *:3000');
});
var io = require('./socketServer.js')(http);
var bbq = require('./bbq.js')();

app.get('/', function(req, res){
  res.sendFile('index.html', {root: __dirname});
});

io.on('connection', function(socket){
  console.log('a user connected');

  socket.on('disconnect', function(){
    console.log('user disconnected');

    bbq.stop();
  });

  bbq.start();

  bbq.on('temperatureChange', function(data) {
    socket.emit('temperatureChange', data);
  });
});


