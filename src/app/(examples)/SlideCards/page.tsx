import ScrollCards from "@/components/ScrollCards";
import TitleExample from "@/components/TitleExample";

const SliderCard = () => {
    return (
        <TitleExample
            title="cards simples"
            subtitle="Padrão simples para utilizar"
        >
            <ScrollCards
                align="LeftToRight"
            />
        </TitleExample>
    )
}

export default SliderCard;