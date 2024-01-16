import { ReactNode, useEffect, useState } from "react";

type Props = {title: string, children?: ReactNode, actived: boolean, scale: number}

const ViewCardItem = ({children, actived, scale} : Props) => {
    const [dimensions, setDimensions] = useState({height: 0, width: 0})
    
    useEffect(() => {
        const width = document.documentElement.clientWidth * scale;
        const height = document.documentElement.clientHeight * scale;
        setDimensions({height, width});
    }, [actived])

    return (
        <div
            className={`absolute top-[100%] left-0 rounded-md border-zinc-300 border-[1px]`}
            style={{display: actived ? 'block' : 'none', height: dimensions.height, width: dimensions.width}}
        >
            <div className={`origin-top-left scale-[${scale}]`}>
                {children}
            </div>
        </div>
    )
}

export default ViewCardItem;