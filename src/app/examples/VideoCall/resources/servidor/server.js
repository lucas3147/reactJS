const WebSocket = require('ws');
const wrtc = require('wrtc');

const server = new WebSocket.Server({ port: 3001 });

let listUsersConnected = [];

var localPeerConnection = null;
var localPeerDescription = null;
var receiveChannel = null;
var remoteConnection = null;


server.on('connection', (socket) => {
  let clientId = generateClientId();

  setClientId(clientId);

  console.log('Cliente conectado :', clientId);

  socket.send(JSON.stringify({
    type: 'open', 
    data: clientId
  }));

  createRemoteConnection();

  socket.send(JSON.stringify({
    type: 'ice-candidate', 
    data: remoteConnection
  }));

  console.log('Enviando Ponto remoto para ponto local !');

  socket.on('message', (event) => {
    let message = JSON.parse(event.toString());

    if (message.type == 'ice-candidate') {
      console.log('Candidato WebRtc detectado', message);

      localPeerConnection = message.data;

      remoteConnection.onicecandidate = e => !e.candidate
        || localPeerConnection.addIceCandidate(e.candidate, handleSuccessAddCandidate, handleErrorAddCandidate)
        .catch(handleAddCandidateError);
    }
    if (message.type == 'offer') {
      console.log('Conexão WebRtc offer detectada');

      localPeerDescription = message.data;

      remoteConnection
        .setRemoteDescription(localPeerDescription)
        .then(() => remoteConnection.createAnswer())
        .then(answer => remoteConnection.setLocalDescription(answer))
        .then(() => socket.send(JSON.stringify({type: 'offer', data: remoteConnection.localDescription})))
        .catch(handleCreateDescriptionError);
    }
  });

  socket.onclose = () => {
    listUsersConnected = listUsersConnected.filter(u => u != clientId);
    console.log('Socket fechado!', listUsersConnected);
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

// WEBRTC
function createRemoteConnection() {
  remoteConnection = new wrtc.RTCPeerConnection();
  remoteConnection.ondatachannel = receiveChannelCallback;
  remoteConnection.ontrack = receiveTrack;
  console.log('Ponto remoto rtc estabelecido !');
}

function receiveChannelCallback(event) {
  receiveChannel = event.channel;
  receiveChannel.onmessage = handleReceiveMessage;
  receiveChannel.onopen = handleReceiveChannelStatusChange;
  receiveChannel.onclose = handleReceiveChannelStatusChange;
}

function receiveTrack(event) {
  console.log('Faixas de mídia recebidas do ponto local:', event.streams);

  socket.send(JSON.stringify({type: 'on-track', data: event.streams}));
}

function handleReceiveMessage(event) {
  console.log(event.data);
}

function handleReceiveChannelStatusChange(event) {
  if (receiveChannel) {
    console.log("Connection WebRTC is " +
                receiveChannel.readyState);
  }
}

function handleSuccessAddCandidate() {
  console.log('Candidato adicionado com sucesso!')
}

function handleErrorAddCandidate() {
  console.log('Não foi possível adicionar candidato!')
}

function handleCreateDescriptionError(error) {
  console.log("Unable to create an offer: " + error.toString());
}

function handleAddCandidateError(error) {
  console.log("Unable to add an candidate: " + error.toString());
}