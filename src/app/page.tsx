"use client"

import { User } from "@/Types/User";
import { useEffect, useState } from "react";

const Page = () => {

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then((res) => res.json())
    .then(json => {
      setUsers(json);
    })
    .catch(() => {
      console.log('DEU ALGUM ERRO')
    })
    .finally(() => {
      setLoading(false);
      console.log('TERMINOU TODA A REQUISIÇÃO')
    });
  }, []);

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl">Lista de Usuários:</h1>

      {loading && "Carregando..."}
      {!loading && users.length > 0 && 
        <ul>
        {users.map(user => 
          <li key={user.id}>{user.name} ({user.email})</li>
        )}
        </ul>
      }
      {!loading && users.length === 0 && 
        "Não há usuários para exibir."
      }
    </div>
  );
}

export default Page;