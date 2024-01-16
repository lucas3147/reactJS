'use client'
import ExampleCard from "@/components/ExampleCard";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main
      className="h-screen w-screen flex justify-center items-center"
    >
      <div
        className="max-w-[1250px] max-h-[820px] h-full w-full bg-zinc-700 flex flex-col"
      >
        <div className="w-full flex flex-row py-4 px-6">
          <input type="text"
            className="flex-1 h-10 rounded-md bg-zinc-900 mr-2 px-4 outline-none"
            placeholder="Pesquisar exemplo..."
          />
          <button
            className="rounded-md bg-zinc-900 px-4 hover:border-2"
          >
            Pesquisar
          </button>
        </div>

        <div
          className="flex-1"
        >
          <ExampleCard
            title='cards simples'
            subtitle="Padrão simples para utilizar"
            onSubmit={() => router.push('/SlideCards')}
          />
        </div>
      </div>

    </main>
  )
}
