"use client"

import { useMutation } from "@tanstack/react-query";
import { invalidatePosts, usePosts, useUsersPrefetch } from "../utils/queries";
import { addPost } from "../utils/api";

const Page = () => {
  useUsersPrefetch();

  const posts = usePosts();

  const addMutation = useMutation({
    mutationFn: addPost
  });

  const handleAddButton = async () => {
    const data = {
      title: 'Teste',
      body: 'Corpo de Teste',
      userId: 7
    }

    const post = await addMutation.mutateAsync(data);
    console.log('Deu tudo certo')
    console.log('Executado depois do mutate')
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-white text-2xl">Opa, tudo bem?</h1>

      <div className="border border-white p-3">
        <p>Adicionar Novo Post</p>
        <p onClick={() => addMutation.reset()}>Status: {addMutation.status}</p>
        <button disabled={addMutation.isPending} onClick={handleAddButton}>Adicionar</button>
      </div>

      {posts.isLoading && 
        <p>Carregando...</p>
      }

      {posts.data &&
        <ul>
          {posts.data.map((p) => (
            <li key={p.id}>{p.title}</li>
          ))}
        </ul>
      }
    </div>
  )
}

export default Page;
