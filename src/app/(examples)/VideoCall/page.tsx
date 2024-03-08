import ContainerPage from "@/components/ContainerPage";
import DescriptiveItem from "@/components/DescriptiveItem";
import IconTheme from "@/components/IconTheme";
import TitlePage from "@/components/TitlePage";
import { useState } from "react";

const VideoCall = () => {
    
    return (
        <ContainerPage>
            <TitlePage
                title="Vídeo Chamada"
                subtitle="Emulando uma vídeo chamada com socket simples"
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
            <div className="w-[1400px] h-[650px] bg-zinc-600 rounded-md border-2 flex p-1 relative">
                <div className="w-[692px] h-[640px] bg-zinc-900 mr-1 rounded-md">

                </div>
                <div className="w-[692px] h-[640px] bg-zinc-900 rounded-md">

                </div>
                <div className="w-32 h-16 rounded-[40px] bg-zinc-800 border-2 absolute bottom-[20px] left-[636px]">
                    <IconTheme

                    />
                </div>
            </div>
        </ContainerPage>
    );
}

export default VideoCall;