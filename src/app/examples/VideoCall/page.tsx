"use client"

import ContainerPage from "@/components/ContainerPage";
import DescriptiveItem from "@/components/DescriptiveItem";
import IconTheme from "@/components/IconTheme";
import TitlePage from "@/components/TitlePage";
import { useCallback, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { 
    addIceCandidate, 
    createLocalConnection, 
    createOffer, 
    createRemoteConnection,  
    localConnection, 
    remoteConnection, 
    setRemoteDescription 
} from "./resources/WebRTC";
import TestPage from "@/components/TestPage";

const VideoCall = () => {
    var socketClient: WebSocket;

    const myWebCamRef = useRef<any>();
    const otherWebCamRef = useRef<any>();

    const [myWebcamOn, setMyWebcamOn] = useState(false);
    const [otherWebcamOn, setOtherWebcamOn] = useState(false);
    const [connectionRtcOn, setConnectionRtcOn] = useState(false);

    useEffect(() => {
        const constraints = { video: true, audio: true };

        async function getMedia() {
            try {
              const stream = await navigator.mediaDevices.getUserMedia(constraints);
              
              const videoTrack = stream.getVideoTracks()[0];
              console.log('Track de vídeo:', videoTrack);
              
              localConnection.addTrack(videoTrack);
            } catch (error) {
              console.error('Erro ao obter mídia:', error);
            }
        }

        if (connectionRtcOn) {
            getMedia();
        }

        return () => {
            if (myWebCamRef.current && myWebCamRef.current.srcObject) {
                const stream = myWebCamRef.current.srcObject;
                const tracks = stream.getTracks();
      
                tracks.forEach(track => {
                    track.stop();
                });
            }
        };
    }, [connectionRtcOn])

    const handleConnectServer = () => {
        try
        {
            socketClient = new WebSocket('ws://localhost:3001');
        
            socketClient.addEventListener('open', () => {
                console.log('Conectado ao servidor WebSocket');
        
                createLocalConnection("sendChannel");
            });
        
            socketClient.addEventListener('message', (event) => {
                const response = JSON.parse(event.data);
                
                if (response.type === 'ice-candidate') {
                    createRemoteConnection(response.data);
            
                    addIceCandidate(() => socketClient.send(JSON.stringify({type: 'ice-candidate', data: localConnection})));

                    createOffer(() => socketClient.send(JSON.stringify({type: 'offer', data: localConnection.localDescription})));
                }
                if (response.type === 'offer') {
                    setRemoteDescription(response.data);
                }
            });
        } 
        catch (e) 
        {
            console.log('Não foi possível estabelecer conexão com o servidor', e);
        }
    }

    const handleTest = () => {

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
                    {title: 'exemplo WebRTC API', link: 'https://github.com/mdn/samples-server/blob/master/s/webrtc-simple-datachannel/main.js'}
                ]}
            />
            <TestPage
                titleTest="Enviar mensagem ao servidor"
                onSubmit={() => socketClient.send(JSON.stringify({type: 'message', data: 'Oi servidor'}))}
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
                            audio={true}
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
                    <div onClick={handleTest} className="uppercase w-16 h-8 absolute top-0 bg-zinc-600 rounded-bl-md rounded-br-md flex items-center justify-center">
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

                    <IconTheme
                        type="LeakAddIcon"
                        style={{
                            width: '50px',
                            height: '50px',
                            backgroundColor: '#505059',
                            padding: '5px',
                            borderRadius: '25px',
                            border: '2px solid white',
                            cursor: 'pointer'
                        }}
                        className="hover:bg-green-900"
                        onClick={handleConnectServer}
                    />
                </div>
            </div>
        </ContainerPage>
    );
}

export default VideoCall;