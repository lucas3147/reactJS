'use client'
import TitlePage from "@/components/TitlePage"
import ContainerPage from "@/components/ContainerPage"
import { useEffect, useState } from "react";
import * as MediaRecorder from "./resources/mediaRecorder";
import DownloadVideo from "./resources/downloadVideo";
import DescriptiveItem from "@/components/DescriptiveItem";
import * as displayMedia from "./resources/getDisplayMedia";

const screenRecorder = () => {
    const [recordedChunks, setRecordedChunks] = useState([]);
    const [tab1, setTab1] = useState(true);
    const [displayOn, setDisplayOn] = useState(false);
    const [onRecord, setOnRecord] = useState(false);
    const [openVideo, setOpenVideo] = useState(false);
    const [tab1Value, setTab1Value] = useState('Teste de gravação 01 \n\n Bla Bla Bla Bla Bla Bla Bla Bla Bla');
    const [tab2Value, setTab2Value] = useState('Teste de gravação 02');

    useEffect(() => {
        if (onRecord) {
            handleCaptureDisplay();
        }
        else {
            handleCloseRecord();
        }
    }, [onRecord])

    const handleCaptureDisplay = async () => {
        const displayMediaOptions = {
            video: {
              displaySurface: "browser",
            },
            audio: {
              suppressLocalAudioPlayback: true,
            },
            preferCurrentTab: false,
            selfBrowserSurface: "exclude",
            systemAudio: "include",
            surfaceSwitching: "include",
            monitorTypeSurfaces: "include",
        } as DisplayMediaStreamOptions;

        const stream = await displayMedia.startCapture();
        if (stream) {
            handleStartRecord(stream);
        }
    }

    const handleStartRecord = (stream: MediaStream) => {
        MediaRecorder.startRecord(stream, setRecordedChunks, "video/webm");
    };

    const handleCloseRecord = () => {
        MediaRecorder.closeRecord();
        displayMedia.closeCapture();
    };

    return (
        <ContainerPage>
            <TitlePage
                title='Gravador de tela'
                subtitle='Para gravar a janela aberta no lado do cliente e exportar esse vídeo. Template pronto para utilizar'
            />
            <DescriptiveItem
                resources={[
                    'MediaDevices: getDisplayMedia()', 
                    'MediaRecorder'
                ]}
                about={[
                    {title: 'MediaDevices: getDisplayMedia()', link: 'https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getDisplayMedia'},
                    {title: 'MediaRecorder', link: 'https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder'},
                ]}
            />
            <div className="flex items-center">
                <div className="flex flex-col">
                    <button
                        onClick={() => setOnRecord(!onRecord)}
                        className="bg-zinc-700 px-10 py-6 font-bold uppercase rounded-lg border-b-8 border-b-zinc-400 mr-40 mb-8 hover:bg-zinc-800"
                    >
                        {!onRecord ? 'Gravar tela' : 'Parar de Gravar'}
                    </button>
                    <button
                        onClick={() => setOpenVideo(true)}
                        className="bg-zinc-700 px-10 py-6 font-bold uppercase rounded-lg border-b-8 border-b-zinc-400 mr-40 hover:bg-zinc-800"
                    >
                        Baixar Vídeo
                    </button>
                </div>
                
                {openVideo &&
                    <DownloadVideo
                        chunks={recordedChunks}
                        openVideo={openVideo}
                        setOpenVideo={setOpenVideo}
                    />
                }
                <div>
                    <div className="flex">
                        <button 
                            className="p-4 bg-zinc-700 border-r-black border-r-2 rounded-t-md hover:bg-zinc-800"
                            onClick={() => setTab1(true)}
                        >
                            Tab 01
                        </button>
                        <button 
                            className="p-4 bg-zinc-700 rounded-t-md hover:bg-zinc-800"
                            onClick={() => setTab1(false)}
                        >
                            Tab 02
                        </button>
                    </div>
                    <div className="w-96 h-80 bg-zinc-400 rounded-b-md rounded-tr-md p-2">
                        {tab1 &&
                            <textarea value={tab1Value} onChange={(e) => setTab1Value(e.target.value)} className="w-full h-full text-black rounded-md p-2 font-bold text-2xl">
                            </textarea>
                        }
                        {!tab1 &&
                            <textarea value={tab2Value} onChange={(e) => setTab2Value(e.target.value)} className="w-full h-full text-black rounded-md p-2  font-bold  text-2xl">
                            </textarea>
                        }
                    </div>
                </div>
            </div>
            
        </ContainerPage>
    )
}

export default screenRecorder;