var captureStream : MediaStream | undefined;

const displayMediaOptionsInternal = {
    video: {
      displaySurface: "browser",
    },
    audio: {
      suppressLocalAudioPlayback: true,
    },
    preferCurrentTab: true,
    selfBrowserSurface: "include",
    systemAudio: "include",
    surfaceSwitching: "include",
    monitorTypeSurfaces: "include",
} as DisplayMediaStreamOptions;
  
export async function startCapture(displayMediaOptions? : DisplayMediaStreamOptions) {
    try {
        captureStream = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions ?? displayMediaOptionsInternal);
    } catch (err) {
        console.error(`Erro ao capturar display: ${err}`);
    }

    return captureStream;
}

export function closeCapture() {
    if (captureStream) {
        captureStream.getTracks().forEach( track => track.stop() );
    }
}

