const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 3001 });

let listUsersConnected = [];

var localPeerConnection = null;
var localPeerDescription = null;
var clients = [];

server.on('connection', (socket) => {
  let clientId = generateClientId();
  clients.push(socket); 

  setClientId(clientId);

  socket.send(JSON.stringify({
    type: 'open', 
    data: clientId
  }));

  socket.on('message', (event) => {
    let message = JSON.parse(event);

    if (message.type == 'message') {
      broadcast(JSON.stringify({
        type: 'message', 
        data: message.data
      }));
    }
    if (message.type == 'ice-candidate') {
      console.log('Candidato WebRtc detectado', message);

      localPeerConnection = message.data;

      broadcast(JSON.stringify({
        type: 'ice-candidate', 
        data: localPeerConnection
      }));
    }
    if (message.type == 'offer') {
      console.log('Conexão WebRtc offer detectada');

      localPeerDescription = message.data;

      broadcast(JSON.stringify({
        type: 'offer', 
        data: localPeerDescription
      }));
    }
    if (message.type == 'answer') {
      console.log('Resposta da Conexão WebRtc answer detectada');

      localPeerDescription = message.data;

      broadcast(JSON.stringify({
        type: 'answer', 
        data: localPeerDescription
      }));
    }
  });

  socket.onclose = () => {
    clients.splice(clients.indexOf(socket), 1);
    listUsersConnected = listUsersConnected.filter(u => u != clientId);
    console.log('Socket fechado!', listUsersConnected);
  };

  function broadcast(message) {
    clients.forEach(function (client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  }

});

function generateClientId() {
  return Math.random().toString(36).substring(2, 15);
}

function setClientId(clientId) {
  if (!listUsersConnected.includes(clientId) && listUsersConnected.length <= 2) {
    listUsersConnected = [...listUsersConnected, clientId];
    console.log('Cliente conectado :', clientId);
  }
}

console.log('Servidor WebSocket ouvindo na porta 3001');