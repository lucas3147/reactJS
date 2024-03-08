'use client'
import CardItem from "@/components/CardItem";
import { useRouter } from "next/navigation";
import { ChangeEvent, ChangeEventHandler, EventHandler, useEffect, useState } from "react";
import { CardItemType } from "@/types/CardItemType";
import ContainerPage from "@/components/ContainerPage";


export default function Home() {
  const router = useRouter();

  const ListExamples: CardItemType[] = [
    {title: 'cards simples', subtitle: 'Padrão simples para utilizar', onSubmit: () => router.push('/SlideCards'), iconTheme: 'DashboardOutlinedIcon'},
    {title: 'Exibição em mini tela', subtitle: 'Exibir página sem abrir', onSubmit: () => router.push('/viewerMinimized'), iconTheme: 'VrpanoOutlinedIcon'},
    {title: 'Foto na webcam', subtitle: 'Ativar webcam e tirar um print da tela', onSubmit: () => router.push('/printOnWebcam'), iconTheme: 'MonochromePhotosOutlinedIcon'},
    {title: 'Gravar Webcam', subtitle: 'Gravamento da webcam e salvar o vídeo', onSubmit: () => router.push('/recordWebcam'), iconTheme: 'CameraOutlinedIcon'},
    {title: 'Gravador de tela', subtitle: 'Gravar a janela aberta da página', onSubmit: () => router.push('/screenRecorder'), iconTheme: 'CameraOutlinedIcon'},
    {title: 'Vídeo Chamada', subtitle: 'Emulando uma vídeo chamada com socket simples', onSubmit: () => router.push('/VideoCall'), iconTheme: 'CameraOutlinedIcon'},
    {title: 'Meus botões', subtitle: 'Estilização de botões', onSubmit: () => router.push('/Buttons'), iconTheme: 'GamepadOutlinedIcon'},
  ]

  const [myExamples, setMyExamples] = useState<CardItemType[]>(ListExamples);
  const [searchExample, setSearchExample] = useState('');

  const handleSearchExample = (e: any) => {
    setSearchExample(e.target.value);
    let examples = ListExamples.filter(ex => ex.title.toLowerCase().includes(e.target.value.toLowerCase()) || e.target.value.trim() == '');
    setMyExamples(examples);
  }

  return (
    <ContainerPage>
      <div
        className="max-w-[1280px] max-h-[700px] rounded-[10px] pb-6 h-full w-full bg-zinc-700 flex flex-col"
      >
        <div className="w-full flex flex-row py-4 px-[44px]">
          <input type="text"
            className="w-full h-10 rounded-md bg-zinc-800 px-4 py-6 outline-none"
            placeholder="Pesquisar exemplo..."
            value={searchExample}
            onChange={handleSearchExample}
          />
        </div>

        <div
          className="cardList"
        >
          {myExamples.map((example, key) =>
          (
            <CardItem
              key={key}
              title={example.title}
              subtitle={example.subtitle}
              onSubmit={example.onSubmit}
              iconTheme={example.iconTheme}
            />
          )
          )}
        </div>
      </div>
    </ContainerPage>
  )
}
