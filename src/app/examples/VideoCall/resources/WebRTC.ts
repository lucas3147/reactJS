export var localConnection: RTCPeerConnection;
export var remoteConnection: RTCPeerConnection;
export var sendChannel: RTCDataChannel;
export var connectionIsOpen: (() => void) | undefined;
export var connectionIsClose: (() => void) | undefined;
var remoteDescription: RTCSessionDescription;
var receiveChannel: RTCDataChannel;

export function createLocalConnection (connectionCallbackOpen?: () => void, connectionCallbackClose?: () => void) {
    localConnection = new RTCPeerConnection();
    connectionIsOpen = connectionCallbackOpen;
    connectionIsClose = connectionCallbackClose;
}

export function createRemoteConnection(remotePeerConnection: any) {
    remoteConnection = remotePeerConnection;
    console.log('candidato remoto:', remoteConnection);
}

export function addIceCandidate(callbackSuccess: () => void) {
    localConnection.onicecandidate = e => {
        if (e.candidate && remoteConnection.addIceCandidate) {
            remoteConnection.addIceCandidate(e.candidate)
            .then(() => {
                console.log('Candidato remoto adicionado!', remoteConnection);
                callbackSuccess();
                console.log('Enviando ponto local para ponto remoto', localConnection);
            })
            .catch(handleAddCandidateError);
        }
        else {
            handleAddCandidateError();
        }
    }
}

export async function createOffer(callbackSuccess: () => void) {
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

export function disconnectedConnection() {
    sendChannel.close();
    localConnection.close();
}

export function negotiationNeeded(sendToServer: (localDescription: RTCSessionDescription | null) => void) {
    localConnection.onnegotiationneeded = () => {
        localConnection
        .createOffer()
        .then((offer) => localConnection.setLocalDescription(offer))
        .then(() => {
            sendToServer(localConnection.localDescription);
        })
        .catch(reportError);
    }
}

function receiveChannelCallback(this: RTCPeerConnection, event: RTCDataChannelEvent) {
    receiveChannel = event.channel;
    receiveChannel.onmessage = handleReceiveMessage;
    receiveChannel.onopen = handleReceiveChannelStatusChange;
    receiveChannel.onclose = handleReceiveChannelStatusChange;
}

function handleReceiveMessage(this: RTCDataChannel, event: MessageEvent<any>): any {
    console.log(event.data);
}
  
function handleReceiveChannelStatusChange(this: RTCDataChannel, event: Event): any {
  if (receiveChannel) {
    console.log("Connection WebRTC is " +
                receiveChannel.readyState);
  }
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
        !connectionIsOpen || connectionIsOpen();
    } else {
        !connectionIsClose || connectionIsClose();
    }
  }
}