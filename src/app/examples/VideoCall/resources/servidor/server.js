const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 3001 });

var clients = [];

server.on('connection', (socket) => {
    let clientId = generateClientId();
    setClientId(clientId, socket);

    socket.on('message', (event) => {
        let message = getRequest(event);

        if (message.type == 'message') {
            console.log('mensagem:', message.data);
            broadcast({
                type: 'message',
                data: message.data
            });
        }
        if (message.type == 'ice-candidate') {
            console.log('Candidato WebRtc detectado');

            const candidate = message.data;

            broadcast({
                type: 'ice-candidate',
                data: candidate
            });
        }
        if (message.type == 'offer') {
            console.log('Conexão WebRtc offer detectada');

            const localPeerDescription = message.data;

            broadcast({
                type: 'offer',
                data: localPeerDescription
            });
        }
        if (message.type == 'answer') {
            console.log('Resposta da Conexão WebRtc answer detectada');

            const localPeerDescription = message.data;

            broadcast({
                type: 'answer',
                data: localPeerDescription
            });
        }
        if (message.type == 'close-other-webcam') {

            broadcast({
                type: 'close-other-webcam'
            });
        }

        if (message.type == 'hang-up') {
            broadcast({
                type: 'hang-up'
            });
        }
    });

    socket.onclose = () => {
        let connectedClients = [];
        clients = clients.filter(u => u.id != clientId);
        clients.forEach(client => connectedClients.push(client.id));
        console.log(`Socket fechado!. ${connectedClients.length} Usuários conectados: ${connectedClients}`);
    };

    function broadcast(response) {
        clients.forEach(function (client) {
            if (client.id !== clientId) {
                client.socket.send(setResponse(response));
            }
        });
    }

});

function generateClientId() {
    return Math.random().toString(36).substring(2, 15);
}

function getRequest(event) {
    return JSON.parse(event.toString());
}

function setResponse(response) {
    return JSON.stringify(response);
}

function setClientId(id_client, socket) {
    if (!clientInclude(id_client) && clients.length < 2) {
        clients.push({ id: id_client, socket });
        socket.send(JSON.stringify({
            type: 'open',
            data: id_client
        }));
        console.log('Cliente conectado :', id_client);

    }
    else {
        socket.send(JSON.stringify({
            type: 'user-limit',
            data: 'Não é possível se conectar. Limite de clientes excedido!'
        }));
        console.log('Limite de usuários excedido');
    }
}

function clientInclude(id_client) {
    for (let client of clients) {
        if (client.id == id_client) {
            return true;
        }
    }
    return false;
}

console.log('Servidor WebSocket ouvindo na porta 3001');