import { Dispatch,SetStateAction } from "react";

var mediaRecorder : MediaRecorder | undefined;

export function startRecord(stream: MediaStream, setRecordedChunks: Dispatch<SetStateAction<never[]>>, mimeType: string) 
{
    const start = () => {
        mediaRecorder = new MediaRecorder(stream, {
            mimeType: mimeType
        });
        mediaRecorder.addEventListener(
            "dataavailable",
            handleDataAvailable
        );
        mediaRecorder.start();
    };

    const handleDataAvailable = ({ data } : any) => {
        if (data.size > 0) {
          setRecordedChunks((prev) => prev.concat(data));
        }
    };

    start();
}

export function closeRecord() {
    if (mediaRecorder) {
        mediaRecorder.stop();
    }
}