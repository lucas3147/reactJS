import { HtmlHTMLAttributes, useEffect, useRef } from "react"

type Props = {
    activedWebcam: boolean,
    setActivedWebcam: (activedWebcam: boolean) => void,
    options: MediaStreamConstraints
}

const Video = ({activedWebcam, setActivedWebcam, options} : Props) => {
    const video = useRef<any>()

    useEffect(() => {
        if (activedWebcam) {
            navigator.mediaDevices.getUserMedia(options)
            .then(function (mediaStream) {
                video.current.srcObject = mediaStream;
                video.current.play();
            })
            .catch(function (err) {
                setActivedWebcam(false); 
                alert('Não há permissões para acessar a webcam');
            })
        }
        
    }, [activedWebcam]);
    

    return (
        <div>
            <video
                ref={video}
            />
        </div>
       
    )
}

export default Video;