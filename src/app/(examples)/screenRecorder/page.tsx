import CardTitle from "@/components/CardTitle"
import ContainerPages from "@/components/Container"

const screenRecorder = () => {
    return (
        <ContainerPages>
            <CardTitle
                title='Gravador de tela'
                subtitle='Para gravar a janela aberta no lado do cliente e exportar esse vídeo. Template pronto para utilizar'
            />
            <button
                className="bg-zinc-700 px-10 py-6 font-bold uppercase rounded-lg border-b-8 border-b-zinc-400"
            >
                Gravar
            </button>
        </ContainerPages>
    )
}

export default screenRecorder;