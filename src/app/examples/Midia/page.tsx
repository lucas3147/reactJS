import TitlePage from "@/components/TitlePage"
import ContainerPage from "@/components/ContainerPage"

const Midia = () => {
    return (
        <ContainerPage>
            <TitlePage
                title="Captura de mídia"
                subtitle="Teste dos recursos fornecidos pelo W3C. Consulte o site: https://pt.stackoverflow.com/questions/252823/existe-alguma-forma-de-gravar-a-webcam-pelo-html5"
            />

            
            <input type="file" accept="video/*;capture=camcorder"/>
            <input type="file" accept="audio/*;capture=microphone"/>

        </ContainerPage>
    )
}

export default Midia;