"use client"

import { invalidatePosts, usePosts, useUsersPrefetch } from "../utils/queries";

const Page = () => {
  useUsersPrefetch();

  const posts = usePosts();

  const handleInsertNewPostButton = () => {
    // fazer todo o procedimento de inserção...

    invalidatePosts();
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-white text-2xl">Opa, tudo bem?</h1>

      <div className="p-3 border border-white">
        <p>Área de inserção de novo post</p>
        <button onClick={handleInsertNewPostButton} className="border border-white">Inserir novo post</button>
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
