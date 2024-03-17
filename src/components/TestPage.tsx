import { useState } from "react";
import IconTheme from "./IconTheme";

type Props = {
    titleTest?: string;
    onSubmit: () => void
}

const TestPage = ({titleTest, onSubmit }: Props) => {
    const [text, setText] = useState('');

    return (
        <div
            className="transition-all left-[-214px] hover:left-[0px] top-[50%] translate-y-[-50%] absolute w-[225px] min-h-[150px] bg-zinc-600 rounded-tr-md rounded-br-md pt-6 pt-3 px-6 z-10"
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
                className="font-mono mb-8 px-4 flex justify-between flex-col "
            >
                <p 
                    className="uppercase font-bold mb-2"
                >{titleTest ?? 'Teste:'}</p>
                <input 
                    className="mb-8 text-black"
                    type="text"
                    value={text} 
                    onChange={(e) => setText(e.target.value)} 
                />
                <button
                    className="bg-zinc-800 px-4 py-2 rounded-md border-2 border-zinc-700"
                    onClick={() => onSubmit()}
                >Enviar</button>
            </div>
        </div>
    )
}

export default TestPage;