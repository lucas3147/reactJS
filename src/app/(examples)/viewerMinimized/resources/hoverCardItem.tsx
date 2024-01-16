import { ReactNode } from "react";

type Props = { 
    title: ReactNode, 
    callback: (activedCard: boolean) => void,
    delay?: number
 }

const HoverCardItem = ({title, callback, delay}: Props) => {
    var hoverTime: NodeJS.Timeout;

    const handleMouseOver = (delay?: number) => {
        if (delay == undefined) 
        {
            delay = 1000;
        }
        hoverTime = setTimeout(() => callback(true), 1000);
    }

    const handleMouseOut = () => {
        clearTimeout(hoverTime);
        callback(false);
    }

    return (
        <div
            onMouseOver={() => handleMouseOver(delay)}
            onMouseOut={() => handleMouseOut()}
            className="w-64 h-64 mr-8 bg-zinc-700 p-4 cursor-pointer"
        >
            {title}
        </div>
    )
}

export default HoverCardItem;