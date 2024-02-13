"use client"

import { useState } from "react";
import { usePosts } from "../utils/queries";

const Page = () => {
  const [canLoadPosts, setCanLoadPosts] = useState(false);

  const posts = usePosts(canLoadPosts);

  const handleLoadingPostsButton = () => {
    setCanLoadPosts(true);
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-white text-3xl">Opa, tudo bem?</h1>

      <button
        onClick={handleLoadingPostsButton}
        className="border border-white p-3 rounded-md m-3"
      >
        Carregar posts
      </button>

      {posts.isLoading && 
        <p>Carregando...</p>
      }

      {!posts.isLoading && 
       posts.isFetching && 
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
