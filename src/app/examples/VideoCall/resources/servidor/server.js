const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 3001 });

var clients = [];

server.on('connection', (socket) => {
    let clientId = generateClientId();
    setClientId(clientId, socket);

    socket.send(JSON.stringify({
        type: 'open',
        data: clientId
    }));

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
    });

    socket.onclose = () => {
        clients = clients.filter(u => u.id != clientId);
        clients.forEach((client) => {
            console.log('Socket fechado!. Usuários conectados:', client.id);
        });
        broadcast({type: 'users-disconnect'});
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

function setClientId(id_client, client ) {
    if (!clients.find(e => e.id == id_client) && clients.length <= 2) {
        clients.push({ id: id_client, socket: client });
        console.log('Cliente conectado :', id_client);
    }
    else {
        console.log('Não é possível se conectar. Limite de clientes excedido!')
    }
}

console.log('Servidor WebSocket ouvindo na porta 3001');