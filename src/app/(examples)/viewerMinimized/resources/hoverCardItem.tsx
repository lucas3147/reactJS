import { ReactNode, useEffect, useRef, useState } from "react";
import ViewCardItem from "./viewerCardItem";
import html2canvas from "html2canvas";

type Props = { 
    title: ReactNode,
    delay?: number,
    className: string,
    children: ReactNode
 }

const HoverCardItem = ({title, delay, className, children}: Props) => {
    var hoverTime: NodeJS.Timeout;
    const [activedCard, setActivedCard] = useState(false);
    var content = useRef<any>();
    var viewerCard = useRef<any>();
    
    useEffect(() => {
        if (activedCard) {
            html2canvas(viewerCard.current).then(function(canvas) {
                if (viewerCard.current?.contains(canvas) == false) {
                    viewerCard.current.appendChild(canvas);
                }
            });
            
            content.current?.remove();
        }
    }, [activedCard])

    const handleMouseOver = (delay?: number) => {
        if (delay == undefined) 
        {
            delay = 1000;
        }
        hoverTime = setTimeout(() => {
            setActivedCard(true);
        }, 1000);
    }

    const handleMouseOut = () => {
        clearTimeout(hoverTime);
        setActivedCard(false);
    }

    return (
        <div className="relative">
            <div
                onMouseOver={() => handleMouseOver(delay)}
                onMouseOut={() => handleMouseOut()}
                className={className}
            >
                {title}
            </div>
            {activedCard &&
                <ViewCardItem
                    actived={activedCard}
                    scale={1}
                >
                    <div ref={viewerCard}>
                        <div ref={content}>
                            {children}
                        </div>
                    </div>
                </ViewCardItem>
            }
        </div>
    )
}

export default HoverCardItem;