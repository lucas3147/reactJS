'use client'
import ContainerPage from "@/components/ContainerPage"
import TitlePage from "@/components/TitlePage"
import ButtonRipple from "./resources/ButtonRipple/Button"
import ButtonLineBorder from "./resources/ButtonLineBorder/Button"

const Buttons = () => {
    return (
        <ContainerPage>
            <TitlePage
                title="Animações de botões"
                subtitle="Templates de botões para usar com facilitade"
            />
            <div className="bg-zinc-700 p-10 rounded-[10px]">
                <div className="grid grid-cols-2 gap-x-8">
                    <ButtonRipple/>
                    <ButtonLineBorder/>
                </div>
            </div>
            
        </ContainerPage>
    )
}

export default Buttons;