'use client'
import ContainerPage from "@/components/ContainerPage"
import TitlePage from "@/components/TitlePage"
import { useRef } from "react"
import './style.css'
import ButtonRipple from "./resources/ButtonRipple"

const Buttons = () => {
    return (
        <ContainerPage>
            <TitlePage
                title="Animações de botões"
                subtitle="Templates de botões para usar com facilitade"
            />

            <ButtonRipple/>
        </ContainerPage>
    )
}

export default Buttons;