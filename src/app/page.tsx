"use client"

import { usePost, usePosts } from "../utils/queries";

const Page = () => {

  const postItem = usePost(2);

  return (
    <div className="container mx-auto">
      <h1 className="text-white text-3xl">Opa, tudo bem?</h1>

      {postItem.isLoading && 
        <p>Carregando...</p>
      }


      {postItem.data &&
        <ul>
            <li key={postItem.data.id}>{postItem.data.title}</li>
        </ul>
      }
    </div>
  )
}

export default Page;
