'use client'
import CardTitle from "@/components/CardTitle"
import ContainerPages from "@/components/Container"
import { RefObject, useRef, useState } from "react";
import HoverCardItem from "./resources/hoverCardItem";
import ViewCardItem from "./resources/viewerCardItem";
import ScrollCards from "../SlideCards/resource/ScrollCards";
import SliderCard from "../SlideCards/page";
import html2canvas from "html2canvas";


const viewerMinimized = () => {
    const [activedCard1, setActivedCard1] = useState(false);
    const [activedCard2, setActivedCard2] = useState(false);
    const [activedCard3, setActivedCard3] = useState(false);
    var content = useRef<any>();
    var screenshot = document.querySelector('#screenshot');
    html2canvas(content.current).then(function(canvas) {
        screenshot.appendChild(canvas);
    })

    return (
        <ContainerPages >
            <CardTitle
                title="Exibição de páginas minimizada"
                subtitle="Para usar quando quiser renderizar alguma coisa em html ao passar o mouse em cima"
            />
            <div ref={content} className="flex border-b-2 border-b-white pl-8">
                <div className="relative">
                    <HoverCardItem
                        title="Caixa 1"
                        callback={setActivedCard1}
                        className="w-64 h-14 mr-8 bg-zinc-700 p-4 cursor-pointer rounded-t-lg hover:bg-zinc-600"
                    />
                    <div id="screenshot"></div>
                </div>
                <div className="relative">
                    <HoverCardItem
                        title="Caixa 2"
                        callback={setActivedCard2}
                        className="w-64 h-14 mr-8 bg-zinc-700 p-4 cursor-pointer rounded-t-lg hover:bg-zinc-600"
                    />
                    <ViewCardItem
                        title="Exibidor da caixa 2"
                        actived={activedCard2}
                        scale={0.25}
                    >
                        <SliderCard/>
                    </ViewCardItem>
                </div>
                <div className="relative">
                    <HoverCardItem
                        title="Caixa 3"
                        callback={setActivedCard3}
                        className="w-64 h-14 mr-8 bg-zinc-700 p-4 cursor-pointer rounded-t-lg hover:bg-zinc-600"
                    />
                    <ViewCardItem
                        title="Exibidor da caixa 3"
                        actived={activedCard3}
                        scale={0.25}
                    >
                        <SliderCard/>
                    </ViewCardItem>
                </div>
            </div>
        </ContainerPages>
    )
}

export default viewerMinimized;