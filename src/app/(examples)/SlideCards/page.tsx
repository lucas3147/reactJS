import ContainerPages from "@/components/Container";
import ScrollCards from "@/app/(examples)/SlideCards/resource/ScrollCards";
import CardTitle from "@/components/CardTitle";

const SliderCard = () => {
    return (
        <ContainerPages>
            <CardTitle
                title="cards simples"
                subtitle="Padrão simples para utilizar"
            />
            <ScrollCards
                align="LeftToRight"
            />
        </ContainerPages>
    )
}

export default SliderCard;