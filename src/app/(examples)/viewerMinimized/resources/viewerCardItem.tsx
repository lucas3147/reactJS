import { ReactNode, useEffect, useState } from "react";

type Props = {children?: ReactNode, actived: boolean, scale: number}

const ViewCardItem = ({children, actived, scale} : Props) => {
    const [dimensions, setDimensions] = useState({height: 0, width: 0})
    
    useEffect(() => {
        const width = document.documentElement.clientWidth * scale;
        const height = document.documentElement.clientHeight * scale;
        setDimensions({height, width});
    }, [actived])

    return (
        <div
            className={`block absolute top-[100%] left-0 rounded-md border-zinc-300 border-[1px]`}
            
        >
            <div 
                style={{scale}}
                className='origin-top-left'>
                {children}
            </div>
        </div>
    )
}

export default ViewCardItem;