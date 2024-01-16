import { ReactNode } from "react"

const ContainerPages = ({children}: {children: ReactNode}) => {
    return (
        <main
            className="h-screen w-screen flex justify-center items-center"
        >
            {children}
        </main>
    )
}

export default ContainerPages