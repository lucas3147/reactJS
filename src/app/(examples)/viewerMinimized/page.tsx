import CardTitle from "@/components/CardTitle"
import ContainerPages from "@/components/Container"

const viewerMinimized = () => {
    return (
        <ContainerPages>
            <CardTitle
                title="Exibição de páginas minimizada"
                subtitle="Para usar quando quer renderizar alguma coisa em html ao passar o mouse em cima"
            />
        </ContainerPages>
    )
}

export default viewerMinimized;