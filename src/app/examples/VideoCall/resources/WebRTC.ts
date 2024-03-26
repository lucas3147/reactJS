export var localConnection: RTCPeerConnection;
export var sendChannel: RTCDataChannel;
export var connectionIsOpen: (() => void) | undefined;
export var connectionIsClose: (() => void) | undefined;
export var remoteDescription: RTCSessionDescription | null;
var receiveChannel: RTCDataChannel;

export function createLocalConnection () {
    localConnection = new RTCPeerConnection();
}

export function addIceCandidate(candidateObj: RTCIceCandidate) {
    const candidate = new RTCIceCandidate(candidateObj);
    localConnection.addIceCandidate(candidate)
    .then(() => console.log('Candidato adicionado'))
    .catch(handleAddCandidateError);
}

export function handleICECandidateEvent(callbackSuccess: (candidate: RTCIceCandidate) => void) {
    localConnection.onicecandidate = e => {
        if (e.candidate) {
            callbackSuccess(e.candidate);
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

export function addRemoteDescriptionAnswer() {
    if (remoteDescription) {
        localConnection
        .setRemoteDescription(remoteDescription)
        .then(() => console.log('Conexão WebRTC Offer estabelecida'))
        .catch(handleCreateDescriptionError);
    }
}

export function disconnectedPeer() {
    if (localConnection) {
        localConnection.ontrack = null;
        localConnection.onicecandidate = null;
        localConnection.onnegotiationneeded = null;
        localConnection.oniceconnectionstatechange = null;
        localConnection.onicegatheringstatechange = null;
        localConnection.onsignalingstatechange = null;
        localConnection.close();
        remoteDescription = null;
    }
}

export function handleNegotiationNeeded(sendToServer: (localDescription: RTCSessionDescription | null) => void) {
    localConnection.onnegotiationneeded = () => {
        localConnection
        .createOffer()
        .then((offer) => localConnection.setLocalDescription(offer))
        .then(() => {
            sendToServer(localConnection.localDescription);
        })
        .then(() => handleLog('Negociação enviada ao servidor!'))
        .catch(reportError);
    }
}

export function addRemoteDescriptionOffer(sendToServer: (localDescription: RTCSessionDescription | null) => void, setMyStream: (stream: MediaStream | undefined) => void) {
    if (remoteDescription) {
        localConnection
        .setRemoteDescription(remoteDescription)
        .then(() => navigator.mediaDevices.getUserMedia({video: true, audio: false}))
        .then((stream) => {

            stream
                .getTracks()
                .forEach((track) => localConnection.addTrack(track, stream));

            setMyStream(stream);
        })
        .then(() => localConnection.createAnswer())
        .then((answer) => localConnection.setLocalDescription(answer))
        .then(() => sendToServer(localConnection.localDescription))
        .then(() => console.log('Conexão WebRTC Answer estabelecida'))
        .catch((error) => console.log('Erro', error));
    }
}

export function setRemoteDescription(data: any) {
    remoteDescription = new RTCSessionDescription(data);
}

export function handleTrackReceive(webcamCallback: (this: RTCPeerConnection, ev: RTCTrackEvent) => void) {
    localConnection.ontrack = webcamCallback;
}

export function handleICEConnectionStateChangeEvent(closeCall: () => void) {
    localConnection.oniceconnectionstatechange = () => {
        if (localConnection.iceConnectionState == "closed" || 
            localConnection.iceConnectionState == "failed") 
        {
            closeCall();
        }
    }
}

export function handleSignalingStateChange(closeConnection: () => void) {
    localConnection.onsignalingstatechange = (event) => {
        if (localConnection.signalingState == 'closed'){
            console.log('conexão fechada');
        }
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
function handleLog(message: string) {
    console.log(message);
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