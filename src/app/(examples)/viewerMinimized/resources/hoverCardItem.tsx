import { ReactNode } from "react";

type Props = { 
    title: ReactNode, 
    callback: (activedCard: boolean) => void,
    delay?: number,
    className: string
 }

const HoverCardItem = ({title, callback, delay, className}: Props) => {
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
            className={className}
        >
            {title}
        </div>
    )
}

export default HoverCardItem;