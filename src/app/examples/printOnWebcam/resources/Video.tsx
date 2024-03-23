import { HtmlHTMLAttributes, MutableRefObject, useEffect, useRef } from "react"

type Props = {
    optionsStream: MediaStreamConstraints,
    activedWebcam: boolean,
    videoRef: MutableRefObject<any>
}

const Video = ({activedWebcam, optionsStream, videoRef} : Props) => {

    useEffect(() => {
        var videoItem = videoRef.current;
        if (activedWebcam) {
            navigator.mediaDevices.getUserMedia(optionsStream)
            .then(function (mediaStream) {
                videoItem.style.display = 'block';
                videoItem.srcObject = mediaStream;
                videoItem.play();
            })
            .catch(function (err) {
                alert('Não há permissões para acessar a webcam');
            })
        } else {
            if (videoItem.srcObject) {
                const mediaStream = videoItem.srcObject as MediaStream;
                mediaStream.getTracks().forEach( track => track.stop() );
                videoItem.style.display = 'none';
            }
        }
    }, [activedWebcam]);
    

    return (
        <div>
            <video
                ref={videoRef}
            />
        </div>
       
    )
}

export default Video;