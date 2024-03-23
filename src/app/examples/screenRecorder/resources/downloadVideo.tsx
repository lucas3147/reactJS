import IconTheme from "@/components/IconTheme";
import { useCallback, useEffect, useRef } from "react";

type Props = {
    chunks: never[],
    openVideo: boolean,
    setOpenVideo: (openVideo: boolean) => void
}

const DownloadVideo = ({chunks, openVideo, setOpenVideo} : Props) => {
    const videoRef = useRef<any>();

    const handleDownload = () => {
        if (chunks.length) {
            const blob = new Blob(chunks, {
              type: "video/webm"
            });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            document.body.appendChild(a);
            a.style.display = 'none';
            a.href = url;
            a.download = "react-webcam-stream-capture.webm";
            a.click();
            window.URL.revokeObjectURL(url);
        }
    }

    useEffect(() => {
        if (openVideo && chunks.length > 0) {
            const blob = new Blob(chunks, {
                type: "video/webm"
              });
            const url = URL.createObjectURL(blob);
            var video = document.createElement("video");
            video.width = 918;
            video.height = 491;
            video.controls = true;
            video.src = url;
            if (!videoRef.current.hasChildNodes()) {
                videoRef.current.appendChild(video);
            }
        }
    }, [openVideo]);

    return (
        <div
            className={`absolute ${chunks.length == 0 ? '' : 'flex items-center'} w-[950px] h-[537px] bg-zinc-700 p-4 rounded-md border-[1px]`}
        >
            <div
                className="absolute top-0 right-[-48px]"
            >
                <IconTheme
                    type='CloseIcon'
                    style={{ width: '40px', height: '40px', cursor: 'pointer', backgroundColor: 'rgb(63 63 70 / 1)', padding: '5px', borderRadius: '20px', marginBottom: '20px', border: '2px solid' }}
                    onClick={() => setOpenVideo(false)}
                />
                <IconTheme
                    type='SaveAltIcon'
                    style={{ width: '40px', height: '40px', cursor: 'pointer', backgroundColor: 'rgb(63 63 70 / 1)', padding: '5px', borderRadius: '20px', border: '2px solid' }}
                    onClick={handleDownload}
                />
            </div>

            <div
                ref={videoRef}
            >
                {chunks.length == 0 &&
                    <div style={
                        {
                            textTransform: 'uppercase',
                            margin: 'auto',
                            fontWeight: 'bold'
                        }}>
                        Nada gravado!
                    </div>
                }
            </div>
        </div>
    )
}

export default DownloadVideo;