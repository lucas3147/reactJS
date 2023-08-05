"use client"

import { useState } from "react";

const Page = () => {

  const [showSecret, setShowSecret] = useState(false);

  const handleClickButton = () => {
    setShowSecret(!showSecret);
  }

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <button onClick={handleClickButton} className="bg-blue-500 p-3">
        {showSecret ? 'Ocultar': 'Mostrar'} área secreta
      </button>
      {showSecret && 
        <div className="p-3 bg-blue-300 rounded-md mt-3">Área Secreta</div>
      }
    </div>
  );
}

export default Page;