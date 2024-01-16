const ExampleCard = ({title, subtitle, onSubmit} : {title: string, subtitle: string, onSubmit: () => void}) => {
    return (
        <div className="w-full border-b-2 border-b-zinc-300 flex items-center justify-between py-4 px-6">
            <div className="flex items-center">
                <img 
                    src='https://cdn.pixabay.com/photo/2015/07/19/10/00/school-work-851328_1280.jpg'
                    alt="imagem de estudo"
                    className="w-28 h-28 rounded-full mr-6" />
                <div className="mr-6">
                    <h1 className="text-3xl capitalize font-bold font-sans">{title}</h1>
                    <h2 className="text-1xl font-sans">{subtitle}</h2>
                </div>
            </div>
            
            <button 
                className="px-6 py-4 bg- rounded-md bg-zinc-900 hover:border-2"
                onClick={onSubmit}
                >
                acessar
            </button>
        </div>
    )
}

export default ExampleCard;