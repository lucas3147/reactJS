export var localConnection: RTCPeerConnection;
export var remoteConnection: RTCPeerConnection;
export var sendChannel: RTCDataChannel;
export var connectionIsOpen: () => void;
export var connectionIsClose: () => void;
var remoteDescription: RTCSessionDescription;

export function createLocalConnection (canal: string) {
    localConnection = new RTCPeerConnection();
    sendChannel = localConnection.createDataChannel(canal);
    sendChannel.onopen = handleSendChannelStatusChange;
    sendChannel.onclose = handleSendChannelStatusChange;
}

export function createRemoteConnection(remotePeerConnection: any) {
    remoteConnection = remotePeerConnection;
    console.log('candidato remoto:', remoteConnection);
}

export function addIceCandidate(callbackSuccess: () => void) {
    localConnection.onicecandidate = e => !e.candidate
    || remoteConnection.addIceCandidate(e.candidate)
    .then(() => {
        console.log('Candidato remoto adicionado!', remoteConnection);
        callbackSuccess();
        console.log('Enviando ponto local para ponto remoto', localConnection);
    })
    .catch(handleAddCandidateError);
}

export function createOffer(callbackSuccess: () => void) {
    localConnection.createOffer()
    .then(offer => localConnection.setLocalDescription(offer))
    .then(() => {
        callbackSuccess();
        console.log('descrição enviada ao servidor!');
    })
    .catch(handleCreateDescriptionError);
}

export function setRemoteDescription(remotePeerConnection: any) {
    remoteDescription = remotePeerConnection;

    localConnection
    .setRemoteDescription(remoteDescription)
    .then(() => console.log('Conexão WebRTC offer estabelecida'))
    .catch(handleCreateDescriptionError);
}

function handleCreateDescriptionError(error: any) {
    console.log("Unable to create an offer: " + error.toString());
}
function handleLocalAddCandidateSuccess() {
  console.log("Success in add Candidate");
}
function handleRemoteAddCandidateSuccess() {
    console.log("Error in add Candidate");
}
function handleAddCandidateError() {
  console.log("Oh noes! addICECandidate failed!");
}
function sendMessage(message: string) {
  sendChannel.send(message);
}

function handleSendChannelStatusChange(this: RTCDataChannel, event: Event): any {
  if (sendChannel) {
    var state = sendChannel.readyState;
  
    if (state === "open") {
        connectionIsOpen();
    } else {
        connectionIsClose();
    }
  }
}