"use client"

import { TodoItem } from "@/types/TodoItem";
import { useState } from "react";

const Page = () => {

  const [itemInput, setitemInput] = useState('');

  const [List, setList] = useState<TodoItem[]>([
    {id: 1, label: 'Estudar react', checked: true},
    {id: 2,label: 'Estudar violino', checked: false},
    {id: 3,label: 'Estudar para concursos', checked: false}
  ]);

  const handleAddButton = () => {
    if (itemInput.trim() === '') return;

    setList([...List, {id: List.length + 1, label: itemInput, checked: false}]);
    setitemInput('');
  }

  const deleteItem = (id: number) => {
    setList(
      List.filter((item) => item.id !== id)
    )
  }

  const toggleItem = (id: number) => {
    let newList = [...List];

    for (let i in newList) {
      if (newList[i].id === id) {
        newList[i].checked = !newList[i].checked;
      }
    }

    setList(newList);
  }

  return (
    <div className="w-screen h-screen flex flex-col items-center text-2xl">
      <h1 className="text-4xl mt-5">Lista de tarefas</h1>

      <div className="flex w-full max-w-lg my-3 p-4 rounded-md bg-gray-700 border-2 border-double">
        <input 
          type="text"
          placeholder="O que deseja fazer?"
          value={itemInput}
          onChange={(e) => setitemInput(e.target.value)}
          className="flex-1 border border-black p-3 text-2xl text-black rounded-md mr-3"
           />
          <button onClick={handleAddButton}>Adicionar</button>
      </div>

      <p className="my-4">{List.length} items na lista</p>

      <ul className="w-full max-w-lg list-disc pl-5">
      {List && List.map((item) => 
          <li key={item.id}>
            <input onClick={() => toggleItem(item.id)} type="checkbox" checked={item.checked} className="w-6 h-6 mr-3" />
            {item.label} - <button className="hover:underline"  onClick={() => deleteItem(item.id)}>[deletar]</button></li>
        )
      }
      </ul>
      
    </div>
  );
}

export default Page;