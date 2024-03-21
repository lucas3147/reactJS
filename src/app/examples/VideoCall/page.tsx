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
    
    const [textMessageServer, setTextMessageServer] = useState('');
    const [myWebcamOn, setMyWebcamOn] = useState(false);
    const [otherWebcamOn, setOtherWebcamOn] = useState(false);
    const [connectionRemoteOn, setConnectionRemoteOn] = useState(false);
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
        if (connectionRemoteOn && myWebcamOn) {
            handleConnectWebcam();
        }

        if (myWebcamOn == false && streamTrackSend) {
            console.log('Disconectando webcam', streamTrackSend);

            streamTrackSend.forEach(track => {
                track.stop();
            });
        }
    }, [connectionRemoteOn, myWebcamOn])

    const handleConnectServer = () => {
        try
        {
            const socketClient = new WebSocket('ws://localhost:3001');
        
            socketClient.addEventListener('open', () => {
                console.log('Conectado ao servidor WebSocket');
        
                WebRTC.createLocalConnection(
                    () => setConnectionRemoteOn(true),
                    () => setConnectionRemoteOn(false));
                WebRTC.negotiationNeeded((localDescription) => socketClient.send(JSON.stringify({type: 'video-offer', data: localDescription})))
            });
        
            socketClient.addEventListener('message', (event) => {
                const response = JSON.parse(event.data);
                
                if (response.type === 'open') {
                    console.log('Meu id no servidor:', response.data);
                }
                if (response.type === 'ice-candidate') {
                    
                    WebRTC.createRemoteConnection(response.data);
            
                    WebRTC.addIceCandidate(() => socketClient.send(JSON.stringify({type: 'ice-candidate', data: WebRTC.localConnection})));

                    WebRTC.createOffer(() => socketClient.send(JSON.stringify({type: 'offer', data: WebRTC.localConnection.localDescription})));
                }
                if (response.type === 'video-offer') {
                    WebRTC.setRemoteDescription(response.data);
                }
                if (response.type === 'video-answer') {
                    const remoteDescription = response.data;

                    WebRTC.localConnection
                    .setRemoteDescription(remoteDescription)
                    .then(() => WebRTC.localConnection.createAnswer())
                    .then(answer => WebRTC.localConnection.setLocalDescription(answer))
                    .then(() => socketClient.send(JSON.stringify({type: 'offer', data: WebRTC.remoteConnection.localDescription})))
                    .catch((error) => console.log('Error', error));
                }
            });

            setSocketClient(socketClient);
        } 
        catch (e) 
        {
            console.log('Não foi possível estabelecer conexão com o servidor', e);
        }
    }

    const handleDisconnectServer = () => {
        WebRTC.disconnectedConnection();
        setConnectionRemoteOn(false);
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
                titleTest="Enviar mensagem pelo servidor"
                serverTest={{
                    onSubmit : () => {
                        WebRTC.sendChannel.readyState == 'open' ? 
                        WebRTC.sendChannel.send(textMessageServer) : 
                        console.log('Estado da conexão:', WebRTC.sendChannel.readyState);
                        setTextMessageServer('');
                    },
                    text : textMessageServer,
                    setText : setTextMessageServer,
                    remoteConnectionOn: connectionRemoteOn
                }}
            />
            <div className="w-[1400px] h-[650px] bg-zinc-600 rounded-md border-2 flex p-1 relative">
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

                    {connectionRemoteOn &&
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
                            onClick={handleDisconnectServer}
                        />
                    }
                    {!connectionRemoteOn && 
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