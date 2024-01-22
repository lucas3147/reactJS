'use client'
import CardTitle from "@/components/CardTitle";
import ContainerPage from "@/components/Container";
import { useEffect, useRef, useState } from "react";
import Video from "./resources/Video";
import IconTheme from "@/components/IconTheme";
import Webcam from "react-webcam";

const printOnWebcam = () => {

    const webCamRef = useRef<any>();
    const photoRef = useRef<any>();

    const [webcamOn, setWebcamOn] = useState(false);
    const [photoOpen, setPhotoOpen] = useState(false);

    useEffect(() => {
        if (webCamRef.current) {
            var image = new Image();
            image.src = webCamRef.current.getScreenshot({width: 950, height: 523});
            console.log(photoRef, image.src);
            photoRef.current.appendChild(image);
        }
    }, [photoOpen]);

    const handleSavePhoto = () => {

    }

    return (
        <ContainerPage
        >
            <CardTitle 
                title="Foto na Webcam"
                subtitle="Um template pronto para tirar foto na webcam!"
            />
            {photoOpen && 
                <div 
                    className="absolute w-[950px] h-[523px]"
                >
                    <div
                        className="absolute top-0 right-0"
                    >
                        <IconTheme 
                            type='CloseIcon'
                            style={{width: '40px', height: '40px', cursor: 'pointer', backgroundColor: 'rgb(63 63 70 / 1)', padding: '5px', borderRadius: '20px', marginBottom: '20px'}}
                            onClick={() => setPhotoOpen(false)}
                        />
                        <IconTheme 
                            type='SaveAltIcon'
                            style={{width: '40px', height: '40px', cursor: 'pointer', backgroundColor: 'rgb(63 63 70 / 1)', padding: '5px', borderRadius: '20px'}}
                            onClick={handleSavePhoto}
                        />
                    </div>
                    
                    <div
                        ref={photoRef}
                    >
                    </div>
                </div>
            }
            <div
                style={{}}
                className="flex flex-col"
            >
            
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

export default printOnWebcam;