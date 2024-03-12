const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 3001 });

let listUsersConnected = [];

server.on('connection', (socket) => {
  let clientId = generateClientId();

  setClientId(clientId);
  
  console.log('Cliente conectado !', clientId);

  socket.send(JSON.stringify({
    type: 'firstAccess', 
    clientId, 
    value: 'Olá cliente, aqui está seu Id:'
  }));

  socket.on('message', (event) => {
    let data = JSON.parse(event.toString());

    if (data.type == 'firstAccess') {
      console.log(data.value);
    }
    if (data.type == 'message') {
      console.log('Mensagem do cliente:', data.value, clientId);
    }
    if (data.type == 'video') {
      console.log(data.value);
    }
  });

  socket.onclose = () => {
    listUsersConnected = listUsersConnected.filter(u => u != clientId);
    console.log('Usuários conectados !', listUsersConnected);
  };
});

function generateClientId() {
  return Math.random().toString(36).substring(2, 15);
}

function setClientId(clientId) {
  if (!listUsersConnected.includes(clientId) && listUsersConnected.length <= 2) {
    listUsersConnected = [...listUsersConnected, clientId];
  }
}

console.log('Servidor WebSocket ouvindo na porta 3001');