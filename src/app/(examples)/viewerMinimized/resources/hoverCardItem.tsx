import { CSSProperties, ReactNode, useEffect, useRef, useState } from "react";
import ViewCardItem from "./viewerCardItem";
import html2canvas from "html2canvas";
import { findDOMNode } from "react-dom";
import { url } from "inspector";

type Props = { 
    title: ReactNode,
    delay?: number,
    className: string,
    children: ReactNode,
    scale: number,
    styleViewCardOpen?: CSSProperties
 }

const HoverCardItem = ({title, delay, className, children, scale, styleViewCardOpen}: Props) => {
    var hoverTime: NodeJS.Timeout;

    const [activedCard, setActivedCard] = useState(false);

    var content = useRef<any>();
    var viewerCard = useRef<any>();

    const addImageLoading = (src: string, width: string, height: string) => {
        var img = document.createElement('img');
        img.src = src;
        img.style.width = width;
        img.style.height = height;
        return img;
    }
    
    useEffect(() => {
        if (activedCard) {
            html2canvas(content.current).then((canvas) => {

                let imgCanva = addImageLoading(canvas.toDataURL(), (canvas.width * scale).toString(), (canvas.height * scale).toString());

                viewerCard.current.appendChild(imgCanva);
            });
            
            content.current?.remove();
        }
    }, [activedCard]);

    const handleMouseOver = (delay?: number) => {
        if (delay == undefined) 
        {
            delay = 1000;
        }
        hoverTime = setTimeout(() => {
            setActivedCard(true);
        }, delay);
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
                    style={styleViewCardOpen}
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