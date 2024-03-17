import { useState } from "react";
import IconTheme from "./IconTheme";

type Props = {
    titleTest: string;
    serverTest?: {
        onSubmit: () => void;
        setText: (text: string) => void;
        text: string;
        remoteConnectionOn: boolean
    }
}

const TestPage = ({titleTest, serverTest }: Props) => {

    return (
        <div
            className="transition-all left-[-214px] hover:left-[0px] top-[50%] translate-y-[-50%] absolute w-[225px] min-h-[150px] bg-zinc-600 rounded-tr-md rounded-br-md py-6 px-1 z-10"
        >
            <div className="w-10 h-10 absolute right-[-25px] top-0 bg-zinc-600 rounded-tr-[20px] rounded-br-[20px] flex items-center justify-center">
                <IconTheme
                    type="ArrowBackIosIcon"
                    style={{
                        width: '20px',
                        height: '20px',
                        transform: 'rotate(180deg)'
                    }}
                />
            </div>
            <div
                className="font-mono px-4 flex justify-between flex-col "
            >
                <p 
                    className="uppercase font-bold mb-2"
                >{titleTest ?? 'Teste:'}</p>
                {serverTest &&
                    <div className="flex flex-col justify-center">
                        <input 
                            className="mb-8 text-black w-"
                            type="text"
                            value={serverTest.text} 
                            onChange={(e) => serverTest.setText(e.target.value)} 
                        />
                        {serverTest.remoteConnectionOn && 
                            <button
                                className="bg-zinc-800 px-4 py-2 rounded-md border-2 border-zinc-700 mb-4"
                                onClick={() => serverTest.onSubmit()}
                            >
                                Enviar
                            </button>
                        }
                        <div className="flex items-center">
                            <div className={`w-4 h-4 ${serverTest.remoteConnectionOn ? 'bg-green-700' : 'bg-slate-500'} border-2 border-zinc-800 rounded-[8px] mr-2`}>
                            </div>
                            <p>{serverTest.remoteConnectionOn ? 'Conectado' : 'Desconectado'}</p>
                        </div>
                        
                    </div>
                }
                
            </div>
        </div>
    )
}

export default TestPage;