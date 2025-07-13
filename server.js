const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app); 
const io = socketIo(server);           
const port = 5000;

app.use(express.static('public'));

io.on('connection', (socket) => {

  console.log('New User Connected');

  socket.on('joinRoom', ({room, name})=> {
    socket.join(room); 
    socket.room = room;
    socket.to(room).emit('message', `${name} has joined the Room`);
  });

  socket.on('chatMessage', (msg) => { 
    io.to(socket.room).emit('message', msg);
  });
  

  socket.on('disconnect', () => {
    if (socket.room) {
      socket.to(socket.room).emit('message', `A User has left the room`);
    }
  });
});

server.listen(port, () => { 
  console.log(`Server running at http://localhost:${port}`);
});
