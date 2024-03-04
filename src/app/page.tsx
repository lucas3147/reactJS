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

  const handleAddButton = () => {
    addMutation.mutate({
      title: 'Teste',
      body: 'Corpo de Teste',
      userId: 7
    })
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-white text-2xl">Opa, tudo bem?</h1>

      <div className="border border-white p-3">
        <p>Adicionar Novo Post</p>
        <button disabled={addMutation.isPending} onClick={handleAddButton}>Adicionar</button>
      </div>

      <p>{addMutation.isPending && 'Inserindo...'}</p>
      <p>{addMutation.isIdle && 'Ocioso...'}</p>
      <p>{addMutation.isSuccess && 'Sucesso!'}</p>

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
