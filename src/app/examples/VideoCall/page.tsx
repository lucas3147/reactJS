"use client"

import ContainerPage from "@/components/ContainerPage";
import DescriptiveItem from "@/components/DescriptiveItem";
import IconTheme from "@/components/IconTheme";
import TitlePage from "@/components/TitlePage";
import { useCallback, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import * as WebRTC from "./resources/WebRTC";
import TestPage from "@/components/TestPage";

const VideoCall = () => {

    const myWebCamRef = useRef<any>();
    const otherWebCamRef = useRef<any>();
    
    const [messageRequest, setMessageRequest] = useState('');
    const [messageResponse, setMessageResponse] = useState('');
    const [myWebcamOn, setMyWebcamOn] = useState(false);
    const [otherWebcamOn, setOtherWebcamOn] = useState(false);
    const [connectionServerOn, setConnectionServerOn] = useState(false);
    const [socketClient, setSocketClient] = useState<WebSocket | undefined>();
    const [streamTrackSend, setStreamTrackSend] = useState<MediaStreamTrack[]>([]);

    async function handleConnectWebcam()  {
        try {
            if (socketClient) {
                const stream = await navigator.mediaDevices.getUserMedia({video: true, audio: false});
                const tracks = stream.getTracks() as MediaStreamTrack[];
                tracks.forEach(track => {
                    console.log('Enviando track de vídeo:', track, socketClient, WebRTC.localConnection);

                    WebRTC.localConnection.addTrack(track, stream);
                });

                setStreamTrackSend(tracks);
            }
        } catch (error) {
          console.error('Erro ao enviar mídia:', error);
        }
    }

    useEffect(() => {
        if (connectionServerOn && myWebcamOn) {
            handleConnectWebcam();
        }

        if (myWebcamOn == false && streamTrackSend.length > 0) {
            console.log('Disconectando webcam', streamTrackSend);

            streamTrackSend.forEach(track => {
                track.stop();
            });
        }
    }, [connectionServerOn, myWebcamOn])

    const handleConnectServer = () => {
        try
        {
            const socketClient = new WebSocket('ws://localhost:3001');
        
            socketClient.addEventListener('open', () => {
                setConnectionServerOn(true);

                WebRTC.createLocalConnection(
                    () => setConnectionServerOn(true),
                    () => setConnectionServerOn(false));
                WebRTC.negotiationNeeded((localDescription) => socketClient.send(JSON.stringify({type: 'offer', data: localDescription})));
                WebRTC.handleICECandidateEvent((candidate) => socketClient.send(JSON.stringify({type: 'ice-candidate', data: candidate})));
            });
        
            socketClient.addEventListener('message', (event) => {
                const response = JSON.parse(event.data);
                
                if (response.type === 'open') {
                    console.log('Meu id no servidor:', response.data);
                }
                if (response.type === 'message') {
                    setMessageResponse(response.data);
                    console.log(response.data);
                }
                if (response.type === 'ice-candidate') {
                    WebRTC.addIceCandidate(response.data);
                }
                if (response.type === 'answer') {
                    const targetUsername = response.targetUserName;
                    console.log('answer', targetUsername);
                    WebRTC.setRemoteDescription(response.data);
                    WebRTC.addRemoteDescriptionAnswer();
                }
                if (response.type === 'offer') {
                    const targetUsername = response.targetUserName;
                    console.log('offer', targetUsername);

                    WebRTC.createLocalConnection(
                        () => setOtherWebcamOn(true),
                        () => setOtherWebcamOn(false)
                    );
                    WebRTC.negotiationNeeded((localDescription) => socketClient.send(JSON.stringify({type: 'offer', data: localDescription})));
                    WebRTC.handleICECandidateEvent((candidate) => socketClient.send(JSON.stringify({type: 'ice-candidate', data: candidate})));
                    WebRTC.setRemoteDescription(response.data);
                    WebRTC.addRemoteDescriptionOffer((localDescription) => socketClient.send(JSON.stringify({ target: targetUsername, type: "answer", data: localDescription })));
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

    const handlePeerDisconnect = () => {
        WebRTC.disconnectedConnection();
        setConnectionServerOn(false);
        setMessageResponse('');
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
            <div className={`w-[1400px] h-[650px] bg-zinc-600 rounded-md border-2 flex p-1 relative ${connectionServerOn ? 'border-green-800' : 'border-none'}`}>
                <div 
                    style={{border: myWebcamOn ? 'solid 2px white' : 'none'}}
                    className="w-[692px] h-[640px] bg-zinc-900 mr-1 rounded-md relative flex justify-center items-center"
                >
                    <div className="uppercase w-16 h-8 absolute top-0 bg-zinc-600 rounded-bl-md rounded-br-md flex items-center justify-center">
                        you
                    </div>
                    {myWebcamOn &&
                        <Webcam
                            
                            audio={false}
                            ref={myWebCamRef}
                            screenshotFormat="image/jpeg"
                            videoConstraints={{height: 635, width: 686}}
                        />  
                    }
                </div>
                <div 
                    style={{border: otherWebcamOn ? 'solid 2px white' : 'none'}}
                    className="w-[692px] h-[640px] bg-zinc-900 rounded-md relative flex justify-center"
                >
                    <div className="uppercase w-16 h-8 absolute top-0 bg-zinc-600 rounded-bl-md rounded-br-md flex items-center justify-center">
                        other
                    </div>
                    {otherWebcamOn &&
                        <div ref={otherWebCamRef}>
                            
                        </div>
                    }
                </div>
                <div className="flex justify-between items-center px-1 w-44 h-16 rounded-[40px] bg-zinc-800 border-2 absolute bottom-[20px] left-[610px]">
                    <IconTheme
                        type="MonochromePhotosOutlinedIcon"
                        style={{
                            width: '50px',
                            height: '50px',
                            backgroundColor: 'blue',
                            padding: '5px',
                            borderRadius: '25px',
                            border: '2px solid white',
                            cursor: 'pointer'
                        }}
                        onClick={() => setMyWebcamOn(true)}
                    />

                    <IconTheme
                        type="DoDisturbOnIcon"
                        style={{
                            width: '50px',
                            height: '50px',
                            backgroundColor: 'red',
                            padding: '5px',
                            borderRadius: '25px',
                            border: '2px solid white',
                            cursor: 'pointer'
                        }}
                        onClick={() => setMyWebcamOn(false)}
                    />

                    {connectionServerOn &&
                        <IconTheme
                            type="LeakRemoveIcon"
                            style={{
                                width: '50px',
                                height: '50px',
                                backgroundColor: 'red',
                                padding: '5px',
                                borderRadius: '25px',
                                border: '2px solid white',
                                cursor: 'pointer'
                            }}
                            onClick={handlePeerDisconnect}
                        />
                    }
                    {!connectionServerOn && 
                        <IconTheme
                            type="LeakAddIcon"
                            style={{
                                width: '50px',
                                height: '50px',
                                padding: '5px',
                                borderRadius: '25px',
                                border: '2px solid white',
                                cursor: 'pointer'
                            }}
                            className="hover:bg-green-600"
                            onClick={handleConnectServer}
                        />
                    }
                    
                </div>
            </div>
        </ContainerPage>
    );
}

export default VideoCall;