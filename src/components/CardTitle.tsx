const CardTitle = ({title, subtitle} : {title: string, subtitle: string}) => {
    return (
        <div className="flex absolute top-0 flex-col items-center bg-zinc-700 rounded-b-md">
            <div className="p-10">
                <h1
                    className="text-4xl text-center uppercase font-bold font-mono"
                >
                    {title}
                </h1>
                <h2 className="text-2xl text-center font-mono">{subtitle}</h2>
            </div>
        </div>
    )
}

export default CardTitle;