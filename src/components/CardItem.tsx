import IconTheme from "./IconTheme";

const CardItem = ({title, subtitle, onSubmit, iconTheme} : {title: string, subtitle: string, onSubmit: () => void, iconTheme: IconType}) => {
    return (
        <div className="w-full mb-2">
            <div className="rounded-md bg-zinc-600 border-b-4 border-b-zinc-500 hover:border-b-zinc-400 hover:bg-zinc-500 flex items-center justify-between py-4 px-6">
            <div className="flex items-center">
                <IconTheme
                    type={iconTheme}
                    style={{
                        width: '40px', 
                        height: '40px',
                        marginRight: '20px'
                    }}
                />
                <div className="mr-6">
                    <h1 className="text-2xl capitalize font-bold font-sans">{title}</h1>
                    <h2 className="text-1xl font-sans">{subtitle}</h2>
                </div>
            </div>
            
            <button 
                className="px-4 py-2 rounded-md bg-zinc-800 border-b-4 border-b-zinc-400 hover:border-b-white"
                onClick={onSubmit}
                >
                acessar
            </button>
            </div>
            
        </div>
    )
}

export default CardItem;