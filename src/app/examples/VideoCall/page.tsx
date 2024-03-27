"use client"

import ContainerPage from "@/components/ContainerPage";
import DescriptiveItem from "@/components/DescriptiveItem";
import IconTheme from "@/components/IconTheme";
import TitlePage from "@/components/TitlePage";
import { useEffect, useRef, useState } from "react";
import * as WebRTC from "./resources/WebRTC";
import TestPage from "@/components/TestPage";

const VideoCall = () => {

    const myWebCamRef = useRef<any>();
    const otherWebCamRef = useRef<any>();
    
    const [messageRequest, setMessageRequest] = useState('');
    const [messageResponse, setMessageResponse] = useState('');
    const [videoOn, setVideoOn] = useState(false);
    const [audioOn, setAudioOn] = useState(false);
    const [otherWebcamOn, setOtherWebcamOn] = useState(false);
    const [connectionServerOn, setConnectionServerOn] = useState(false);
    const [socketClient, setSocketClient] = useState<WebSocket | undefined>();

    useEffect(() => {
        if (videoOn == true || audioOn == true) {
            handleConnectWebcam();
        }
        else 
        {
            handleDisconnectWebcam();
        }
    }, [videoOn, audioOn])

    async function handleConnectWebcam()  {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({video: videoOn, audio: audioOn});
            PlayMyWebcam(stream);

            if (connectionServerOn) {
                const track = stream.getTracks()[0] as MediaStreamTrack;
                WebRTC.localConnection.addTrack(track, stream);
            }

        } catch (error) {
            console.error('Erro ao enviar mídia:', error);
        }
    }

    const handleConnectServer = () => {
        try
        {
            const socketClient = new WebSocket('ws://localhost:3001');
        
            socketClient.addEventListener('open', () => {
                WebRTC.createLocalConnection();
                WebRTC.handleNegotiationNeeded((localDescription) => socketClient.send(JSON.stringify({type: 'offer', data: localDescription})));
                WebRTC.handleICECandidateEvent((candidate) => socketClient.send(JSON.stringify({type: 'ice-candidate', data: candidate})));
                WebRTC.handleICEConnectionStateChangeEvent(closeVideoCall);
                WebRTC.handleTrackReceive((event) => {
                    if (event.streams[0]) {
                        PlayOtherWebcam(event.streams[0]);
                    }
                });
                WebRTC.handleSignalingStateChange(closeVideoCall);
            });
        
            socketClient.addEventListener('message', (event) => {
                const response = JSON.parse(event.data);
                
                if (response.type === 'open') {
                    setConnectionServerOn(true);
                }
                if (response.type === 'message') {
                    setMessageResponse(response.data);
                    console.log(response.data);
                }
                if (response.type === 'ice-candidate') {
                    WebRTC.addIceCandidate(response.data);
                }
                if (response.type === 'answer') {
                    WebRTC.setRemoteDescription(response.data);
                    WebRTC.addRemoteDescriptionAnswer();
                }
                if (response.type === 'offer') {
                    if (!WebRTC.localConnection) {
                        WebRTC.createLocalConnection();
                        WebRTC.handleNegotiationNeeded((localDescription) => socketClient.send(JSON.stringify({type: 'offer', data: localDescription})));
                        WebRTC.handleICECandidateEvent((candidate) => socketClient.send(JSON.stringify({type: 'ice-candidate', data: candidate})));
                        WebRTC.handleICEConnectionStateChangeEvent(closeVideoCall);
                        WebRTC.handleTrackReceive((event) => {
                            if (event.streams.length > 0) {
                                PlayOtherWebcam(event.streams[0]);
                            }
                        });
                        WebRTC.handleSignalingStateChange(closeVideoCall);
                    }   
                    
                    WebRTC.setRemoteDescription(response.data);
                    WebRTC.addRemoteDescriptionOffer((localDescription) => socketClient.send(JSON.stringify({ type: 'answer', data: localDescription })));
                }
                if (response.type === 'hang-up') {
                    closeVideoCall();
                }
                if (response.type === 'close-other-webcam') {
                    closeOtherWebcam();
                }
            });

            socketClient.addEventListener("close", () => {
                setConnectionServerOn(false);
                handlePeerDisconnect();
            });

            setSocketClient(socketClient);

            
        } 
        catch (e) 
        {
            console.log('Não foi possível estabelecer conexão com o servidor', e);
        }
    }

    const closeVideoCall = () => {
        closeOtherWebcam();
        WebRTC.disconnectedPeer();
    }

    const sendToServer = (message: any) => {
        if (socketClient && socketClient.readyState == 1) {
            socketClient.send(jsonFromString(message));
        }
    }

    const jsonFromString = (json: JSON) => {
        return JSON.stringify(json);
    }

    const handlePeerDisconnect = () => {
        closeVideoCall();
        sendToServer({type: 'hang-up'});
        closeSocket();
    }

    const closeSocket = () => {
        if (socketClient?.readyState == 1) {
            socketClient?.close();
        }
    }

    const PlayOtherWebcam = (stream: MediaStream) => {
        otherWebCamRef.current.srcObject = stream;
        setOtherWebcamOn(true);
    }

    const PlayMyWebcam = (stream: MediaStream) => {
        myWebCamRef.current.srcObject = stream;
    }

    const handleDisconnectWebcam = () => {
        closeMyWebcam();
        sendToServer({type: 'close-other-webcam'});
    }

    const closeOtherWebcam = () => {
        const mediaStream = otherWebCamRef.current.srcObject as MediaStream;
        if (mediaStream) {
            mediaStream
            .getTracks()
            .forEach(track => track.stop());
        }
        otherWebCamRef.current.removeAttribute("src");
        otherWebCamRef.current.removeAttribute("srcObject");
        setOtherWebcamOn(false);
    }

    const closeMyWebcam = () => {
        const mediaStream = myWebCamRef.current.srcObject as MediaStream;
        if (mediaStream) {
            mediaStream
            .getTracks()
            .forEach(track => track.stop());
        }
        myWebCamRef.current.removeAttribute("src");
        myWebCamRef.current.removeAttribute("srcObject");
    }

    return (
        <ContainerPage>
            <TitlePage
                title="Vídeo Chamada"
                subtitle="Emulando uma vídeo chamada com socket simples"
            />
            <DescriptiveItem
                resources={[
                    'Webcam',
                    'Api MediaRecorder',
                    'WebRTC API',
                    'WebSocket'
                ]}
                about={[
                    {title: 'biblioteca Webcam', link: 'https://www.npmjs.com/package/react-webcam'},
                    {title: 'documentação WebRTC API', link: 'https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API'},
                    {title: 'exemplo WebRTC API', link: 'https://github.com/mdn/samples-server/blob/master/s/webrtc-simple-datachannel/main.js'},
                    {title: 'exemplo WebRTC API (Enviando mídia)', link: 'https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API/Signaling_and_video_calling#starting_negotiation'},
                ]}
            />
            <TestPage
                titleTest="Enviar mensagem"
                serverTest={{
                    onSubmit : () => {
                        socketClient?.send(JSON.stringify({type: 'message', data: messageRequest}));
                        setMessageRequest('');
                    },
                    textRequest : messageRequest,
                    setTextRequest : setMessageRequest,
                    textResponse : messageResponse,
                    remoteConnectionOn: connectionServerOn
                }}
            />
            <div className={`w-[1400px] h-[650px] bg-zinc-600 rounded-md border-2 flex p-1 relative ${connectionServerOn ? 'border-green-600' : 'border-none'}`}>
                <div 
                    className="w-[692px] h-[640px] bg-zinc-900 mr-1 rounded-md relative flex justify-center items-center"
                >
                    <div className="uppercase w-16 h-8 absolute top-0 bg-zinc-600 rounded-bl-md rounded-br-md flex items-center justify-center">
                        you
                        {videoOn && connectionServerOn &&
                            <div className="w-4 h-4 rounded-[8px] bg-green-600 absolute top-0 right-[-8px]"></div>
                        }
                    </div>
                    <video 
                        ref={myWebCamRef} 
                        width={686} 
                        height={635}
                        autoPlay
                        style={{display: videoOn ? 'block' : 'none'}}
                    >
                            
                    </video>
                </div>
                <div 
                    className="w-[692px] h-[640px] bg-zinc-900 rounded-md relative flex justify-center z-0"
                >
                    <div className="uppercase w-16 h-8 absolute top-0 bg-zinc-600 rounded-bl-md rounded-br-md flex items-center justify-center z-40">
                        other
                        {otherWebcamOn &&
                            <div className="w-4 h-4 rounded-[8px] bg-green-600 absolute top-0 right-[-8px]"></div>
                        }
                    </div>
                    <video 
                        ref={otherWebCamRef} 
                        width={686} 
                        height={635}
                        autoPlay
                        style={{display: otherWebcamOn ? 'block' : 'none'}}
                    >
                            
                    </video>
                </div>
                <div className="flex justify-between items-center px-1 w-44 h-16 rounded-[40px] bg-zinc-800 border-2 absolute bottom-[20px] left-[610px]">
                    <IconTheme
                        type={videoOn == true ? 'NoPhotographyIcon' : 'MonochromePhotosOutlinedIcon'}
                        style={{
                            width: '50px',
                            height: '50px',
                            backgroundColor: videoOn == true ? 'red' : 'blue',
                            padding: '5px',
                            borderRadius: '25px',
                            border: '2px solid white',
                            cursor: 'pointer'
                        }}
                        onClick={() => setVideoOn(!videoOn)}
                    />

                    <IconTheme
                        type={audioOn == true ? 'MicOffIcon' : 'KeyboardVoiceIcon'}
                        style={{
                            width: '50px',
                            height: '50px',
                            backgroundColor: audioOn == true ? 'red' : 'blue',
                            padding: '5px',
                            borderRadius: '25px',
                            border: '2px solid white',
                            cursor: 'pointer'
                        }}
                        onClick={() => setAudioOn(!audioOn)}
                    />

                    <IconTheme
                        type={connectionServerOn == true ? 'LeakRemoveIcon' : 'LeakAddIcon'}
                        style={{
                            width: '50px',
                            height: '50px',
                            backgroundColor: connectionServerOn == true ? 'red' : 'green',
                            padding: '5px',
                            borderRadius: '25px',
                            border: '2px solid white',
                            cursor: 'pointer'
                        }}
                        onClick={() => connectionServerOn == true ? handlePeerDisconnect() : handleConnectServer()}
                    />
                    
                </div>
            </div>
        </ContainerPage>
    );
}

export default VideoCall;