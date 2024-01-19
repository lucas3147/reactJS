import { HtmlHTMLAttributes, useEffect, useRef } from "react"

const Video = ({activedWebcam} : {activedWebcam: boolean}) => {
    const video = useRef<any>()

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({video: true})
        .then(function (mediaStream) {
            video.current.srcObject = mediaStream;
        })
        .catch(function (err) {
            alert('Não há permissões para acessar a webcam');
        })
    }, [activedWebcam]);
    

    return (
        <div>
            <video
                ref={video}
                width={780}
                height={430}
            />
        </div>
       
    )
}

export default Video;