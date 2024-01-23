import { CSSProperties, ReactNode } from "react"

type Props = {
    children: ReactNode;
    style?: CSSProperties;
}

const ContainerPage = ({children, style}: Props) => {
    return (
        <main
            className="h-screen w-screen flex justify-center items-center overflow-hidden"
            style={style}
        >
            {children}
        </main>
    )
}

export default ContainerPage