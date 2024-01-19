'use client'
import CardTitle from "@/components/CardTitle";
import ContainerPages from "@/components/Container";
import { useState } from "react";
import Video from "./resources/Video";

const printOnWebcam = () => {

    const [webcamOn, setWebcamOn] = useState(false);
    const handlePrint = () => {

    }

    return (
        <ContainerPages>
            <CardTitle 
                title="Foto na Webcam"
                subtitle="Um template pronto para tirar foto na webcam!"
            />
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
                        onClick={handlePrint}
                    >
                        Tirar foto
                    </button>
                </div>
                <div
                    className="w-[800px] h-[450px] p-2 bg-zinc-700 border-2 rounded-[12px]"
                >
                    <Video 
                        activedWebcam={webcamOn}
                    />
                </div>
            </div>
            

        </ContainerPages>
    )
}

export default printOnWebcam;