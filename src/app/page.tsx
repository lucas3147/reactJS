"use client"

import { usePost, usePosts } from "../utils/queries";

const Page = () => {

  const posts = usePosts();
  const postItem = usePost(1);

  return (
    <div className="container mx-auto">
      <h1 className="text-white text-3xl">Opa, tudo bem?</h1>

      {posts.isLoading && 
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
