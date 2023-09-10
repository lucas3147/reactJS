"use client"

import { User } from "@/Types/User";
import { useEffect, useState } from "react";

const Page = () => {

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const getUsers = async () => {
    try{
      setLoading(true);
      const res = await fetch('https://jsonplaceholder.typicode.com/users');
      const json = await res.json();
      setUsers(json);
    }
    catch(err){
      console.log(err);
    }
    finally{
      setLoading(false);
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  const handleAddPostNovo = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify({
        title: 'Post de teste',
        body: 'Corpo de teste',
        userId: 99
      })
    });

    const json = await res.json();
    console.log(json);
  }

  return (
    <div className="container mx-auto">
      <button onClick={handleAddPostNovo}>Adicionar Novo Post</button>
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