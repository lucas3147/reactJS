const CardItem = ({title, subtitle, onSubmit} : {title: string, subtitle: string, onSubmit: () => void}) => {
    return (
        <div className="w-full mb-2">
            <div className="rounded-md bg-zinc-600 border-b-4 border-b-zinc-500 hover:border-b-zinc-400 hover:bg-zinc-500 flex items-center justify-between py-4 px-6">
            <div className="flex items-center">
                <img 
                    src='https://th.bing.com/th/id/OIP.kbTriMj81wYGYzvVRmWvTAHaE8?rs=1&pid=ImgDetMain'
                    alt="imagem de estudo"
                    className="w-20 h-20 rounded-[20%] mr-6" />
                <div className="mr-6">
                    <h1 className="text-2xl capitalize font-bold font-sans">{title}</h1>
                    <h2 className="text-1xl font-sans">{subtitle}</h2>
                </div>
            </div>
            
            <button 
                className="px-4 py-2 rounded-md bg-zinc-800 border-b-4 border-b-zinc-500 hover:border-b-white"
                onClick={onSubmit}
                >
                acessar
            </button>
            </div>
            
        </div>
    )
}

export default CardItem;