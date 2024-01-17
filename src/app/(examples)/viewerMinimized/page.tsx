'use client'
import CardTitle from "@/components/CardTitle"
import ContainerPages from "@/components/Container"
import { RefObject, useEffect, useRef, useState } from "react";
import HoverCardItem from "./resources/hoverCardItem";
import ViewCardItem from "./resources/viewerCardItem";
import ScrollCards from "../SlideCards/resource/ScrollCards";
import SliderCard from "../SlideCards/page";
import html2canvas from "html2canvas";


const viewerMinimized = () => {

    return (
        <ContainerPages >
            <CardTitle
                title="Exibição de páginas minimizada"
                subtitle="Para usar quando quiser renderizar alguma coisa em html ao passar o mouse em cima"
            />
            <div className="flex border-b-2 border-b-white pl-8">
                <HoverCardItem
                    title="Caixa 1"
                    className="w-64 h-14 mr-8 bg-zinc-700 p-4 cursor-pointer rounded-t-lg hover:bg-zinc-600"
                    scale={1}
                >
                    <div className="bg-black w-96 h-40">Olá Mundo</div>
                </HoverCardItem>
                <HoverCardItem
                    title="Caixa 2"
                    className="w-64 h-14 mr-8 bg-zinc-700 p-4 cursor-pointer rounded-t-lg hover:bg-zinc-600"
                    scale={1}
                >
                    <div className="bg-green-600 w-96 h-40">Olá Mundo</div>
                </HoverCardItem>
                <HoverCardItem
                    title="Caixa 3"
                    className="w-64 h-14 mr-8 bg-zinc-700 p-4 cursor-pointer rounded-t-lg hover:bg-zinc-600"
                >
                    <div className="bg-blue-500 w-96 h-40">Olá Mundo</div>
                </HoverCardItem>
            </div>
        </ContainerPages>
    )
}

export default viewerMinimized;