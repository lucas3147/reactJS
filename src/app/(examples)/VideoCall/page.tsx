"use client"

import ContainerPage from "@/components/ContainerPage";
import DescriptiveItem from "@/components/DescriptiveItem";
import IconTheme from "@/components/IconTheme";
import TitlePage from "@/components/TitlePage";
import { useCallback, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { SocketDataType } from "./resources/types/SocketDataType";
import { url_server } from "./resources/socket";

const VideoCall = () => {
    let dataSocket: SocketDataType = {type: '', clientId: 0, value: null};
    var socket : WebSocket;
    var clientId: number = 0;

    const myWebCamRef = useRef<any>();
    const otherWebCamRef = useRef<any>();
    const mediaRecorderRef = useRef<any>(null);

    const [myWebcamOn, setMyWebcamOn] = useState(false);
    const [otherWebcamOn, setOtherWebcamOn] = useState(false);
    const [recordedChunks, setRecordedChunks] = useState([]);

    const handleStartRecord = useCallback(() => {
        if (myWebCamRef.current) {
            setMyWebcamOn(!myWebcamOn);
            mediaRecorderRef.current = new MediaRecorder(myWebCamRef.current.stream, {
                mimeType: "video/webm"
            });
            mediaRecorderRef.current.addEventListener(
                "dataavailable",
                handleDataAvailable
            );
            mediaRecorderRef.current.start(); 
        } 
        else
        {
            alert('Ligue a webcam primeiro');
        }
    }, [myWebCamRef, setMyWebcamOn, mediaRecorderRef]);

    const handleDataAvailable = useCallback(({ data } : any) => {
        if (data.size > 0) {
          setRecordedChunks((prev) => prev.concat(data));
          console.log('oi')
        }
    },[setRecordedChunks]);

    useEffect(() => {
        if (recordedChunks.length > 0) 
        {
            const blob = new Blob(recordedChunks, {
              type: "video/webm"
            });

            dataSocket.type = "video";
            dataSocket.value = blob;

            socket.send(JSON.stringify(dataSocket));
        }
    }, [recordedChunks]);  

    const handleConnectServer = () => {
        socket = new WebSocket(url_server);

        socket.addEventListener('open', () => {
            console.log('Conectado!');
        });

        socket.addEventListener('message', (event) => {
            dataSocket = JSON.parse(event.data);

            if (dataSocket.type == 'firstAccess') {
                clientId = dataSocket.clientId;
                console.log(dataSocket.value, dataSocket.clientId);
            }

            if (dataSocket.type == 'video' && dataSocket.clientId != clientId) {
                const video = JSON.parse(event.data);
            
                if (video.otherWebcam.length > 0){
                    const blob = new Blob(recordedChunks, {
                        type: "video/webm"
                    });
                    const url = URL.createObjectURL(blob);
                    var videoElement = document.createElement("video");
                    videoElement.width = 635;
                    videoElement.height = 686;
                    videoElement.controls = true;
                    videoElement.src = url;
                    otherWebCamRef.current.appendChild(videoElement);
                }
            }
        });

        handleStartRecord();
    }

    const handleMessageTest = () => {
        socket.send(JSON.stringify({type: 'message', clientId: 0, value: 'Oi Servidor'}))
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
                    'Socket.io'
                ]}
                about={[
                    {title: 'biblioteca Webcam', link: 'https://www.npmjs.com/package/react-webcam'}
                ]}
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
                    <div onClick={handleMessageTest} className="uppercase w-16 h-8 absolute top-0 bg-zinc-600 rounded-bl-md rounded-br-md flex items-center justify-center">
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