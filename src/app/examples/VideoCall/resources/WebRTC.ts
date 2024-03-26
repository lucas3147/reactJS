export var localConnection: RTCPeerConnection;
export var sendChannel: RTCDataChannel;
export var remoteDescription: RTCSessionDescription | null;
var contraints: MediaStreamConstraints | undefined;

export function createLocalConnection () {
    localConnection = new RTCPeerConnection();
}

export async function addIceCandidate(candidateObj: RTCIceCandidate) {
    const candidate = new RTCIceCandidate(candidateObj);
    try {
        await localConnection.addIceCandidate(candidate)
    } catch (err) {
        handleAddCandidateError();
    }
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

export async function addRemoteDescriptionAnswer() {
    if (remoteDescription) {
        await localConnection
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

export async function handleNegotiationNeeded(sendToServer: (localDescription: RTCSessionDescription | null) => void) {
    localConnection.onnegotiationneeded = async () => {
        try {
            const offer = await localConnection.createOffer();
    
            await localConnection.setLocalDescription(offer);
    
            sendToServer(localConnection.localDescription);
    
            console.log('Enviando negociação')
        } catch (err) {
            console.log("Error na negociação");
        };
    }
}

export async function addRemoteDescriptionOffer(sendToServer: (localDescription: RTCSessionDescription | null) => void, myStream: MediaStream | undefined, setMyStream: (stream: MediaStream | undefined) => void) {
    if (remoteDescription) {
        if (localConnection.signalingState != "stable") {
            await Promise.all([
                localConnection.setLocalDescription({ type: "rollback" }),
                localConnection.setRemoteDescription(remoteDescription)
            ]);
            return;
        } else {
            await localConnection.setRemoteDescription(remoteDescription);
        }

        if (!myStream) {
            
            var stream : MediaStream | undefined;

            try {
                stream = await navigator.mediaDevices.getUserMedia(contraints);
            } catch(err) {
                console.log('Erro ao abrir a câmera');
            }

            if (stream) {
                setMyStream(stream);
        
                try {
                    stream.getTracks().forEach(
                        track => localConnection.addTrack(track, stream as MediaStream)
                    );
                } catch (err) {
                    console.log('Erro ao enviar faixa de vídeo', err);
                }
            }   
            
        }

        await localConnection.setLocalDescription(await localConnection.createAnswer());

        sendToServer(localConnection.localDescription);
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
        switch(localConnection.iceConnectionState) {
            case "closed":
            case "failed":
            case "disconnected":
              closeCall();
              break;
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

export function setContrainsts(contrains: MediaStreamConstraints | undefined) {
    contraints = contrains;
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