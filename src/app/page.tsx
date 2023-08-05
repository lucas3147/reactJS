"use client"

import { CustomButton } from "@/components/CustomButton";

const Page = () => {

  const handleButton1 = () => alert('clicou no botão 1');
  const handleButton2 = () => alert('clicou no botão 2');
  const handleButton3 = () => alert('clicou no botão 3');

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <CustomButton label="Clique  aqui 1" onClick={handleButton1} />
      <CustomButton label="Clique  aqui 2" onClick={handleButton2} />
      <CustomButton label="Clique  aqui 3" onClick={handleButton3} />
    </div>
  );
}

export default Page;