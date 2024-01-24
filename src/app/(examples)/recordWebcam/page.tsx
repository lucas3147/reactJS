'use client'
import TitlePage from "@/components/TitlePage"
import ContainerPage from "@/components/ContainerPage"
import { useCallback, useEffect, useRef, useState } from "react";
import IconTheme from "@/components/IconTheme";
import Webcam from "react-webcam";
import DescriptiveItem from "@/components/DescriptiveItem";

const recordWebcam = () => {

    const webCamRef = useRef<any>();
    const videoRef = useRef<any>();
    const mediaRecorderRef = useRef<any>(null);

    const [webcamOn, setWebcamOn] = useState(false);
    const [onRecord, setOnRecord] = useState(false);
    const [openVideo, setOpenVideo] = useState(false);
    const [recordedChunks, setRecordedChunks] = useState([]);

    useEffect(() => {
        if (onRecord && webcamOn) {

        }
    }, [onRecord]);

    const handleStartRecord = useCallback(() => {
        if (webCamRef.current) {
            setOnRecord(!onRecord);
            mediaRecorderRef.current = new MediaRecorder(webCamRef.current.stream, {
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
    }, [webCamRef, setOnRecord, mediaRecorderRef]);

    const handleDataAvailable = useCallback(
        ({ data } : any) => {
          if (data.size > 0) {
            setRecordedChunks((prev) => prev.concat(data));
          }
        },
        [setRecordedChunks]
      );

    const handleDownload = useCallback(() => {
        if (recordedChunks.length) {
            const blob = new Blob(recordedChunks, {
              type: "video/webm"
            });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            document.body.appendChild(a);
            a.style.display = 'none';
            a.href = url;
            a.download = "react-webcam-stream-capture.webm";
            a.click();
            window.URL.revokeObjectURL(url);
        }
    }, [recordedChunks]);

    useEffect(() => {
        if (onRecord == false && openVideo && recordedChunks.length > 0) {
            const blob = new Blob(recordedChunks, {
                type: "video/webm"
              });
            const url = URL.createObjectURL(blob);
            var video = document.createElement("video");
            video.width = 918;
            video.height = 491;
            video.controls = true;
            video.src = url;
            videoRef.current.appendChild(video);
        }
    }, [openVideo]);

    const handleCloseRecord = useCallback(() => {
        mediaRecorderRef.current.stop();
        setOnRecord(false);
        setWebcamOn(false);
    }, [mediaRecorderRef, webCamRef, setOnRecord]);

    return (
        <ContainerPage>
            <TitlePage
                title="Gravar webcam"
                subtitle="Um template simples para usar quando quiser gravar a webcam"
            />
            <DescriptiveItem
                resources={[
                    'Webcam',
                    'Api MediaRecorder'
                ]}
                about={[
                    {title: 'biblioteca Webcam', link: 'https://www.npmjs.com/package/react-webcam'}
                ]}
            />
            {openVideo && 
                <div 
                    className="absolute w-[950px] h-[537px] bg-zinc-700 p-4 rounded-md border-[1px]"
                >
                    <div
                        className="absolute top-0 right-[-48px]"
                    >
                            <IconTheme 
                                type='CloseIcon'
                                style={{width: '40px', height: '40px', cursor: 'pointer', backgroundColor: 'rgb(63 63 70 / 1)', padding: '5px', borderRadius: '20px', marginBottom: '20px', border: '2px solid'}}
                                onClick={() => setOpenVideo(false)}
                            />
                            <IconTheme 
                                type='SaveAltIcon'
                                style={{width: '40px', height: '40px', cursor: 'pointer', backgroundColor: 'rgb(63 63 70 / 1)', padding: '5px', borderRadius: '20px', border: '2px solid'}}
                                onClick={handleDownload}
                            />
                    </div>
                    
                    <div
                        ref={videoRef}
                    >
                        {recordedChunks.length == 0 && 
                            <div style={
                                {
                                    textTransform: 'uppercase',
                                    margin: 'auto',
                                    fontWeight: 'bold'
                                }}>
                                Nada gravado!
                            </div>
                        }
                    </div>
                </div>
            }
            <div
                className="flex flex-col"
            >
            
                <div className="m-auto mb-4">
                    <button
                        className="px-4 py-2 bg-zinc-700 hover:bg-zinc-600 rounded-md mr-6 text-xl"
                        onClick={() => setWebcamOn(!webcamOn)}
                    >
                        {webcamOn && <>Desligar webcam</>}
                        {!webcamOn && <>Ligar webcam</>}
                    </button>
                    { onRecord == false &&
                        <button
                            className="px-4 py-2 bg-zinc-700 hover:bg-zinc-600 rounded-md mr-6 text-xl"
                            onClick={handleStartRecord}
                        >
                            Gravar
                        </button>
                    }
                    { onRecord &&
                        <button
                            className="px-4 py-2 bg-zinc-700 hover:bg-zinc-600 rounded-md mr-6 border-2 text-xl"
                            onClick={handleCloseRecord}
                        >
                            Parar de gravar
                        </button>
                    }
                    <button
                        style={{opacity: onRecord ? 0.5 : 1}}
                        className="px-4 py-2 bg-zinc-700 hover:bg-zinc-600 rounded-md mr-6 text-xl"
                        onClick={() => setOpenVideo(true)}
                    >
                        Abrir vídeo
                    </button>
                </div>
                <div
                    className="w-[800px] h-[450px] p-2 bg-zinc-700 rounded-[12px]"
                    style={{border: onRecord ? '2px solid white' : ''}}
                >
                    {webcamOn &&
                        <Webcam
                            audio={false}
                            ref={webCamRef}
                            screenshotFormat="image/jpeg"
                            videoConstraints={{height: 430, width: 780}}
                        />  
                    }
                                      
                </div>
            </div>
        </ContainerPage>
    )
}

export default recordWebcam;