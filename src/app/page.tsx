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