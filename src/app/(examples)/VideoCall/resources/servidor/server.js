const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 3001 });

const listUsersConnected = [];

server.on('connection', (socket) => {
  console.log('Cliente conectado');

  const clientId = generateClientId();

  if (!listUsersConnected.includes(clientId) && listUsersConnected.length > 2){
    listUsersConnected = [...listUsersConnected, clientId];
  }

  socket.send(JSON.stringify({clientId}));

  socket.on('message', (buffer) => {
    const mensagemString = buffer.toString('utf-8');
    console.log('Mensagem do cliente:', mensagemString);

    socket.send('Olá, cliente!');
  });

  socket.onclose = () => {
    listUsersConnected = [];
  };
});

function generateClientId() {
  return Math.random().toString(36).substring(2, 15);
}

console.log('Servidor WebSocket ouvindo na porta 3001');