"use client"

import { User } from "@/Types/User";
import { useEffect, useState, useRef } from "react";

const Page = () => {
  const [legendInput, setLegendInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSend = async () => {
    if (fileInputRef.current?.files) {
      const fileItem = fileInputRef.current.files[0];
      const allowed = ['image/png','image/jpeg','image/jpg',];

      if (allowed.includes(fileItem.type)) {

        const data = new FormData();
        data.append('image', fileItem);
        data.append('legend', legendInput);

        const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
          method: 'POST',
          headers: {
            'Content-type': 'multipart/form-data'
          },
          body: data
        });
        
        const json = await res.json();
        console.log(json);
      } else {
        alert("Arquivo incompatível!");
      }
    }
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl mt-4">Upload de Imagens</h1>
      <div className="max-w-md rounded-md flex flex-col gap-3 border border-solid border-white p-3 mt-4">
        <input 
          type="file"
          ref={fileInputRef}
          />
        <input 
          type="text" 
          placeholder="Digite a legenda"
          className="p-3 bg-white rounded-md text-black"
          value={legendInput} 
          onChange={e => setLegendInput(e.target.value)}/>
        <button onClick={handleFileSend}>Enviar Imagem</button>
      </div>
    </div>
  )
}

export default Page;