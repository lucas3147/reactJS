import IconTheme from "./IconTheme";

const TitlePage = ({title, subtitle} : {title: string, subtitle: string}) => {
    return (
        <div className="top-[-130px] hover:top-0 transition-all flex absolute flex-col items-center bg-zinc-600 rounded-b-md z-10">
            <div className="w-10 h-10 absolute right-0 bottom-[-25px] bg-zinc-600 rounded-bl-[20px] rounded-br-[20px] flex items-center justify-center">
                <IconTheme
                    type="ArrowBackIosIcon"
                    style={{
                        width: '20px',
                        height: '20px',
                        transform: 'rotate(-90deg)'
                    }}
                />
            </div>
            <div className="p-10">
                <h1
                    className="text-2xl text-center uppercase font-bold font-mono"
                >
                    {title}
                </h1>
                <h2 className="text-xl text-center font-mono">{subtitle}</h2>
            </div>
        </div>
    )
}

export default TitlePage;