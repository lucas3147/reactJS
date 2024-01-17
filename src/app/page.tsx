'use client'
import CardItem from "@/components/CardItem";
import { useRouter } from "next/navigation";
import { ChangeEvent, ChangeEventHandler, EventHandler, useEffect, useState } from "react";
import { CardItemType } from "@/types/CardItemType";


export default function Home() {
  const router = useRouter();

  const ListExamples = [
    {title: 'cards simples', subtitle: 'Padrão simples para utilizar', onSubmit: () => router.push('/SlideCards')},
    {title: 'Exibição em mini tela', subtitle: 'Exibir página sem abrir', onSubmit: () => router.push('/viewerMinimized')},
    {title: 'Gravador de tela', subtitle: 'Gravar a janela aberta da página', onSubmit: () => router.push('/screenRecorder')}
  ]

  const [myExamples, setMyExamples] = useState<CardItemType[]>(ListExamples);
  const [searchExample, setSearchExample] = useState('');

  const handleSearchExample = (e: any) => {
    setSearchExample(e.target.value);

    console.log(e.target.value);
    let examples = ListExamples.filter(ex => ex.title.includes(e.target.value) || e.target.value.trim() == '');

    setMyExamples(examples);
  }

  return (
    <main
      className="h-screen w-screen flex justify-center items-center"
    >
      <div
        className="max-w-[1280px] max-h-[820px] rounded-md pb-6 h-full w-full bg-zinc-700 flex flex-col"
      >
        <div className="w-full flex flex-row py-4 px-6">
          <input type="text"
            className="w-full h-10 rounded-[15px] bg-zinc-800 px-4 py-6 outline-none"
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
            />
          )
          )}
        </div>
      </div>

    </main>
  )
}
