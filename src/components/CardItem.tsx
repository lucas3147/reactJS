const CardItem = ({title, subtitle, onSubmit} : {title: string, subtitle: string, onSubmit: () => void}) => {
    return (
        <div className="w-full px-6 mb-2">
            <div className="rounded-md bg-zinc-600 border-b-4 border-b-zinc-500 hover:border-b-zinc-400 hover:bg-zinc-500 flex items-center justify-between py-4 px-6">
            <div className="flex items-center">
                <img 
                    src='https://th.bing.com/th/id/OIP.kbTriMj81wYGYzvVRmWvTAHaE8?rs=1&pid=ImgDetMain'
                    alt="imagem de estudo"
                    className="w-28 h-28 rounded-full mr-6" />
                <div className="mr-6">
                    <h1 className="text-3xl capitalize font-bold font-sans">{title}</h1>
                    <h2 className="text-1xl font-sans">{subtitle}</h2>
                </div>
            </div>
            
            <button 
                className="px-6 py-4 bg- rounded-md bg-zinc-800 border-b-4 border-b-zinc-500 hover:border-b-white"
                onClick={onSubmit}
                >
                acessar
            </button>
            </div>
            
        </div>
    )
}

export default CardItem;