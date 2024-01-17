'use client'
import CardTitle from "@/components/CardTitle"
import ContainerPages from "@/components/Container"
import { useState } from "react";

const screenRecorder = () => {
    const [tab1, setTab1] = useState(true);
    const [tab1Value, setTab1Value] = useState('Teste de gravação 01')
    const [tab2Value, setTab2Value] = useState('Teste de gravação 02')

    return (
        <ContainerPages>
            <CardTitle
                title='Gravador de tela'
                subtitle='Para gravar a janela aberta no lado do cliente e exportar esse vídeo. Template pronto para utilizar'
            />
            <div className="flex items-center">
                <button
                    className="bg-zinc-700 px-10 py-6 font-bold uppercase rounded-lg border-b-8 border-b-zinc-400 mr-40 hover:bg-zinc-800"
                >
                    Gravar
                </button>
                <div>
                    <div className="flex">
                        <button 
                            className="p-4 bg-zinc-700 border-r-black border-r-2 rounded-t-md hover:bg-zinc-800"
                            onClick={() => setTab1(true)}
                        >
                            Tab 01
                        </button>
                        <button 
                            className="p-4 bg-zinc-700 rounded-t-md hover:bg-zinc-800"
                            onClick={() => setTab1(false)}
                        >
                            Tab 02
                        </button>
                    </div>
                    <div className="w-96 h-80 bg-zinc-400 rounded-b-md rounded-tr-md p-2">
                        {tab1 &&
                            <textarea value={tab1Value} onChange={(e) => setTab1Value(e.target.value)} className="w-full h-full text-black rounded-md p-2 font-bold text-2xl">
                            </textarea>
                        }
                        {!tab1 &&
                            <textarea value={tab2Value} onChange={(e) => setTab2Value(e.target.value)} className="w-full h-full text-black rounded-md p-2  font-bold  text-2xl">
                            </textarea>
                        }
                    </div>
                </div>
            </div>
            
        </ContainerPages>
    )
}

export default screenRecorder;