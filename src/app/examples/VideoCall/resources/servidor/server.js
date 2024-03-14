const WebSocket = require('ws');
const wrtc = require('wrtc');

const server = new WebSocket.Server({ port: 3001 });

let listUsersConnected = [];

var localPeerConnection = null;
var localPeerDescription = null;
var receiveChannel = null;
var remoteConnection = null;


server.on('connection', (socket) => {
  /*
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

  */
  remoteConnection = wrtc.RTCPeerConnection();
  remoteConnection.addEventListener("datachannel", (ev) => {
      receiveChannelCallback(ev);
    },
    false,
  );
  
  console.log('Cliente conectado !');

  socket.on('message', (event) => {
    let data = JSON.parse(event.toString());

    if (data.type == 'ice-candidate') {
      console.log('Candidato WebRtc detectada');

      localPeerConnection = data.value;

      remoteConnection.onicecandidate = e => !e.candidate
        || localPeerConnection.addIceCandidate(e.candidate)
        .catch(handleAddCandidateError);

      socket.send(JSON.stringify({type: 'ice-candidate', data: remoteConnection}));
    }
    if (data.type == 'offer') {
      console.log('Conexão WebRtc detectada');

      localPeerDescription = data.value;

      remoteConnection
        .setRemoteDescription(localPeerDescription)
        .then(() => remoteConnection.createAnswer())
        .then(answer => remoteConnection.setlocalPeerDescription(answer))
        .then(() => socket.send(JSON.stringify({type: 'offer', data: remoteConnection.localDescription})))
        .catch(handleCreateDescriptionError);
    }
  });

  socket.onclose = () => {
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
function receiveChannelCallback(event) {
  receiveChannel = event.channel;
  receiveChannel.onmessage = handleReceiveMessage;
  receiveChannel.onopen = handleReceiveChannelStatusChange;
  receiveChannel.onclose = handleReceiveChannelStatusChange;
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

function handleCreateDescriptionError(error) {
  console.log("Unable to create an offer: " + error.toString());
}

function handleAddCandidateError(error) {
  console.log("Unable to create an offer: " + error.toString());
}