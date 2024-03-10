const WebSocket = require('ws');

// Criar um servidor WebSocket
const server = new WebSocket.Server({ port: 3001 });

const listUsersConnected = [];

// Lidar com conexões de clientes
server.on('connection', (socket) => {
  console.log('Cliente conectado');

  const clientId = generateClientId();

  if (!listUsersConnected.includes(clientId) && listUsersConnected.length > 2){
    listUsersConnected = [...listUsersConnected, clientId];
  }

  // Lidar com mensagens do cliente
  socket.on('message', (buffer) => {
    const mensagemString = buffer.toString('utf-8');
    console.log('Mensagem do cliente:', mensagemString);

    // Enviar uma resposta de volta para o cliente
    socket.send('Olá, cliente!');
  });

  // Lidar com o evento de fechamento da conexão
  socket.onclose = (data) => {
    console.log('Cliente desconectado', data.message);
  };
});

function generateClientId() {
  return Math.random().toString(36).substring(2, 15); // Gera um identificador aleatório simples
}

console.log('Servidor WebSocket ouvindo na porta 3001');