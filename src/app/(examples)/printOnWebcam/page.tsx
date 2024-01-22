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

    var image = new Image();

    const [webcamOn, setWebcamOn] = useState(false);
    const [photoOpen, setPhotoOpen] = useState(false);

    useEffect(() => {
        if (photoOpen && webcamOn) {
            image.src = webCamRef.current.getScreenshot({width: 918, height: 491});
            photoRef.current.appendChild(image);
        }
    }, [photoOpen]);

    const handleSavePhoto = () => {
        if (photoOpen && webcamOn) {
            var link = document.createElement("a");

            document.body.appendChild(link); // for Firefox
        
            link.setAttribute("href", image.src);
            link.setAttribute("download", 'Minha_foto.jpg');
            link.click();
            link.remove();
        }
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
                    className="absolute w-[950px] h-[523px] bg-zinc-700 p-4 rounded-md border-[1px]"
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
                        {webcamOn == false && 
                            <div style={
                                {
                                    textTransform: 'uppercase',
                                    margin: 'auto',
                                    fontWeight: 'bold'
                                }}>
                                Ligue a webcam primeiro!
                            </div>
                        }
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