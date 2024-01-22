'use client'
import CardTitle from "@/components/CardTitle";
import ContainerPages from "@/components/Container";
import { useEffect, useRef, useState } from "react";
import Video from "./resources/Video";
import IconTheme from "@/components/IconTheme";

const printOnWebcam = () => {

    const video = useRef<any>();
    const canvas = useRef<any>();

    const [webcamOn, setWebcamOn] = useState(false);
    const [photoOpen, setPhotoOpen] = useState(false);

    useEffect(() => {
        if (video.current && canvas.current) {
            const widthImage = 950;
            const heightImage = 523;
            const videoRef = video.current;
            const canvasRef = canvas.current;
            canvasRef.height = heightImage;
            canvasRef.width = widthImage;
            var context = canvasRef.getContext('2d');
            context.drawImage(videoRef, 0, 0, widthImage, heightImage);
        }
    }, [photoOpen])

    return (
        <ContainerPages>
            <CardTitle 
                title="Foto na Webcam"
                subtitle="Um template pronto para tirar foto na webcam!"
            />
            {photoOpen && 
                <div 
                    className="absolute w-[950px] h-[523px]"
                >
                    <div
                        onClick={() => setPhotoOpen(false)} 
                        className="relative top-0 right-0"
                    >
                        <IconTheme 
                            type='CloseIcon'
                            style={{width: '32px', height: '32px', cursor: 'pointer'}}
                        />
                    </div>
                    
                    <canvas
                        ref={canvas}
                    >
                    </canvas>
                </div>
            }
            <div className="flex flex-col">
            
                <div className="m-auto mb-4">
                    <button
                        className="px-8 py-4 bg-zinc-700 hover:bg-zinc-600 uppercase rounded-[12px] mr-6"
                        onClick={() => setWebcamOn(!webcamOn)}
                    >
                        {webcamOn && <>Desligar webcam</>}
                        {!webcamOn && <>Ligar webcam</>}
                    </button>
                    <button
                        className="px-8 py-4 bg-zinc-700 hover:bg-zinc-600 uppercase rounded-[12px] mr-6 "
                        onClick={() => setPhotoOpen(true)}
                    >
                        Tirar foto
                    </button>
                </div>
                <div
                    className="w-[800px] h-[450px] p-2 bg-zinc-700 border-2 rounded-[12px]"
                >
                    <Video 
                        activedWebcam={webcamOn}
                        optionsStream={{video: {height: 430, width: 780}}}
                        videoRef={video}
                    />                    
                </div>
            </div>
            

        </ContainerPages>
    )
}

export default printOnWebcam;