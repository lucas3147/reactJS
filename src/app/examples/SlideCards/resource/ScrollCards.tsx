'use client'

import { useEffect, useState, useRef, LegacyRef, SyntheticEvent } from "react";

type Props = {
    align: 'LeftToRight' | 'RightToLeft' | 'center';
}

const ScrollCards = ({align} : Props) => {
    const refScroll = useRef<any>();
    const marginFromTheCards = 56;
    const widthFromTheCards = 300;
    const distanceFromTheCards = widthFromTheCards + marginFromTheCards;

    const alignCards = () => {
        refScroll.current.scrollLeft = Math.round(refScroll.current.scrollLeft / distanceFromTheCards) * distanceFromTheCards;
    }

    const onMouseUp = () => {
        alignCards();
    };

    return (
        <div 
            onMouseUp={onMouseUp} 
            ref={refScroll} 
            className={`flex items-center ${align == 'RightToLeft' ? 'flex-row-reverse' : ''} scroll-smooth rounded-md bg-slate-500 w-[1000px] h-72 overflow-y-hidden overflow-x-auto`}
        >
            { align == 'center' &&
                <div className="min-w-[150px] h-64 bg-transparent rounded-md mr-14">
                    <div className="h-full relative bg-red-900 max-w-[1px] left-0"></div>
                </div>
            }
            <div className="min-w-[300px] h-64 bg-cyan-950 rounded-md mr-14 border-solid border-white border-2">1
                <div className="h-full relative bg-red-900 max-w-[1px] left-[150px]"></div>
            </div>
            <div className="min-w-[300px] h-64 bg-cyan-950 rounded-md mr-14 border-solid border-white border-2">2
                <div className="h-full relative bg-red-900 max-w-[1px] left-[150px]"></div>
            </div>
            <div className="min-w-[300px] h-64 bg-cyan-950 rounded-md mr-14 border-solid border-white border-2">3
                <div className="h-full relative bg-red-900 max-w-[1px] left-[150px]"></div>
            </div>
            <div className="min-w-[300px] h-64 bg-cyan-950 rounded-md mr-14 border-solid border-white border-2">4
                <div className="h-full relative bg-red-900 max-w-[1px] left-[150px]"></div>
            </div>
            <div className="min-w-[300px] h-64 bg-cyan-950 rounded-md mr-14 border-solid border-white border-2">5
                <div className="h-full relative bg-red-900 max-w-[1px] left-[150px]"></div>
            </div>
            <div className="min-w-[300px] h-64 bg-cyan-950 rounded-md mr-14 border-solid border-white border-2">6
                <div className="h-full relative bg-red-900 max-w-[1px] left-[150px]"></div>
            </div>
            <div className="min-w-[300px] h-64 bg-cyan-950 rounded-md mr-14 border-solid border-white border-2">7
                <div className="h-full relative bg-red-900 max-w-[1px] left-[150px]"></div>
            </div>
            <div className="min-w-[300px] h-64 bg-cyan-950 rounded-md mr-14 border-solid border-white border-2">8
                <div className="h-full relative bg-red-900 max-w-[1px] left-[150px]"></div>
            </div>
            { align == 'center' &&
                <div className="min-w-[150px] h-64 bg-transparent rounded-md mr-14">
                    <div className="h-full relative bg-red-900 max-w-[1px] left-0"></div>
                </div>
            }
        </div>
    )
}

export default ScrollCards;