"use client"

import { usePost, usePosts } from "../utils/queries";

const Page = () => {

  const posts = usePosts();

  return (
    <div className="container mx-auto">
      <h1 className="text-white text-2xl">Opa, tudo bem?</h1>

      {posts.isLoading && 
        <p>Carregando...</p>
      }

      {posts.isFetching && 
        <p>Está recarregando...</p>
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
