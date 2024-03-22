import { RawData, WebSocket } from 'ws';
import { clientType } from './types/clientType';
import { requestType } from './types/requestType';

const server = new WebSocket.Server({ port: 3001 });

var clients: clientType[];

server.on('connection', (socket) => {
    let clientId = generateClientId();
    setClientId(clientId, socket);

    socket.send(JSON.stringify({
        type: 'open',
        data: clientId
    }));

    socket.on('message', (event) => {
        let message = getRequest(event) as requestType;

        if (message.type == 'message') {
            console.log('mensagem:', message.data);
            broadcast({
                type: 'message',
                data: message.data
            });
        }
        if (message.type == 'ice-candidate') {
            console.log('Candidato WebRtc detectado', message);

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
        clients.forEach((client) => console.log(console.log('Socket fechado!. Usuários conectados:', client.id)));

    };

    function broadcast(response: requestType) {
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

function getRequest(event: RawData) {
    return JSON.parse(event.toString());
}

function setResponse(response: requestType): string {
    return JSON.stringify(response);
}

function setClientId(id_client: string, client: any) {
    if (!clients.find(e => e.id == id_client) && clients.length <= 2) {
        clients.push({ id: id_client, socket: client });
        console.log('Cliente conectado :', id_client);
    }
    else {
        console.log('Não é possível se conectar. Limite de clientes excedido!')
    }
}

console.log('Servidor WebSocket ouvindo na porta 3001');