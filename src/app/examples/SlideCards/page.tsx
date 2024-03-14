import ContainerPage from "@/components/ContainerPage";
import ScrollCards from "@/app/(examples)/SlideCards/resource/ScrollCards";
import TitlePage from "@/components/TitlePage";

const SliderCard = () => {
    return (
        <ContainerPage>
            <TitlePage
                title="cards simples"
                subtitle="Padrão simples para utilizar"
            />
            <ScrollCards
                align="LeftToRight"
            />
        </ContainerPage>
    )
}

export default SliderCard;