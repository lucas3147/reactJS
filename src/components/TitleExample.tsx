import { ReactNode } from "react"

const TitleExample = ({title, subtitle, children} : {title: string, subtitle: string, children: ReactNode}) => {
    return (
        <div className="flex h-screen flex-col items-center p-24">
            <div className="relative flex flex-col justify-center items-center p-10 bg-slate-900 rounded-md">
                <h1
                    className="text-4xl uppercase font-bold font-mono"
                >
                    {title}
                </h1>
                <h2>{subtitle}</h2>
            </div>
            {children}
        </div>
    )
}

export default TitleExample;