import { CSSProperties, ReactNode, useEffect, useRef, useState } from "react";
import ViewCardItem from "./viewerCardItem";
import html2canvas from "html2canvas";

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
    
    useEffect(() => {
        if (activedCard) {
            html2canvas(viewerCard.current, ).then(function(canvas) {
                if (viewerCard.current?.contains(canvas) == false) {
                    var widthCurrent = canvas.width - (canvas.width / 3);
                    var heightCurrent = canvas.height - (canvas.height / 3);
                    var newCanvas = document.createElement('canvas');
                    var image = new Image();
                    var width = widthCurrent * scale;
                    var height = heightCurrent * scale;
                    newCanvas.width = width;
                    newCanvas.height = height;
                    image.src = canvas.toDataURL('image/jpeg');
                    var context = newCanvas.getContext('2d');
                    context?.drawImage(image, 0, 0, width, height);
                    viewerCard.current.appendChild(newCanvas);
                }
            });
            
            content.current?.remove();
        }
    }, [activedCard]);

    const copyScreen = async () => {
        var newCanvas = document.createElement('canvas');
        
        var image = new Image();

        var canvas = await html2canvas(viewerCard.current);

        if (viewerCard.current?.contains(canvas) == false) {
            canvas.width -= (canvas.width / 3);
            canvas.height -= (canvas.height / 3);
            /*
            newCanvas.width = canvas.width;
            newCanvas.height = canvas.height;*/
            image.src = canvas.toDataURL('image/jpeg');
            var context = newCanvas.getContext('2d');
            context?.drawImage(image, 0, 0, canvas.height, canvas.height);
        };

        return newCanvas
    }

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