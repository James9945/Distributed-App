const socket = io();
let currentRoom = '';

const name = prompt('Enter your name:');

function joinRoom() {
  const room = document.getElementById('roomInput').value;

  if (!room) return alert('Enter Room Name');

  currentRoom = room;
  socket.emit('joinRoom', {room, name});

  document.getElementById('chat').hidden = false;
  document.getElementById('msgInput').hidden = false;
  document.querySelector('button[onclick="sendMessage()"]').hidden = false;
  document.getElementById('roomInput').disabled = true;

  appendMessage(`You Joined room: ${room}`);
}

function sendMessage() {
  const input = document.getElementById('msgInput');
  const msg = input.value;

  if (msg) {
    socket.emit('chatMessage', msg);
    input.value = '';
  }
}

socket.on('message', (msg) => {
  appendMessage(msg);
});

function appendMessage(msg) {
  const chat = document.getElementById('chat');
  const p = document.createElement('p'); 
  p.textContent = msg;
  chat.appendChild(p);
  chat.scrollTop = chat.scrollHeight;
}
