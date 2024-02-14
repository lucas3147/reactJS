"use client"

import { useState } from "react";
import { usePost, usePosts } from "../utils/queries";

const Page = () => {
  const [page, setPage] = useState(0);

  const limit = 3;

  const posts = usePosts(limit, page * limit);

  const handleNextPage = () => {
    setPage(page + 1);
  }

  const handlePrevPage = () => {
    setPage(page == 0 ? 0 : page - 1);
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-white text-2xl">Opa, tudo bem?</h1>

      <div
        className="border border-white p-3 m-3"
      >
        <div>Itens por página: {limit}</div>
        <div>Número da página: {page}</div>
        <button
          onClick={handlePrevPage}
          className="border border-white p-3 m-3"
        >
          Página anterior
        </button>
        <button
          onClick={handleNextPage}
          className="border border-white p-3 m-3"
        >
          Próxima página
        </button>
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
