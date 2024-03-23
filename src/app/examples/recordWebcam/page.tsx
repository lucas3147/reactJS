'use client'
import TitlePage from "@/components/TitlePage"
import ContainerPage from "@/components/ContainerPage"
import { useCallback, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import DescriptiveItem from "@/components/DescriptiveItem";
import DownloadVideo from "./resources/downloadVideo";
import * as MediaRecorder from "./resources/mediaRecorder";

const recordWebcam = () => {

    const webCamRef = useRef<any>();
    const videoRef = useRef<any>();
    const mediaRecorderRef = useRef<any>(null);

    const [webcamOn, setWebcamOn] = useState(false);
    const [onRecord, setOnRecord] = useState(false);
    const [openVideo, setOpenVideo] = useState(false);
    const [recordedChunks, setRecordedChunks] = useState([]);

    const handleStartRecord = useCallback(() => {
        if (webCamRef.current) {
            setOnRecord(!onRecord);
            const stream = webCamRef.current.stream;
            MediaRecorder.startRecord(stream, setRecordedChunks, "video/webm");
        } 
        else
        {
            alert('Ligue a webcam primeiro');
        }
    }, [webCamRef, setOnRecord, mediaRecorderRef]);

    const handleCloseRecord = () => {
        MediaRecorder.closeRecord();
        setOnRecord(false);
        setWebcamOn(false);
    };

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
                    {title: 'biblioteca Webcam', link: 'https://www.npmjs.com/package/react-webcam'},
                    {title: 'MediaRecorder', link: 'https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder'},
                ]}
            />
            {openVideo && 
                <DownloadVideo
                    chunks={recordedChunks}
                    openVideo={openVideo}
                    setOpenVideo={setOpenVideo}
                />
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
                            audio={true}
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