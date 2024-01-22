import ContainerPage from "@/components/Container";
import ScrollCards from "@/app/(examples)/SlideCards/resource/ScrollCards";
import CardTitle from "@/components/CardTitle";

const SliderCard = () => {
    return (
        <ContainerPage>
            <CardTitle
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