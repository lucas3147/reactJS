"use client"

import { SubmitHandler, useForm } from 'react-hook-form';

type Inputs = {
  name: string;
  lastName: string;
}

export default function Home() {

  const {handleSubmit, register} = useForm<Inputs>();

  const handleFormSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  }

  return (
    <div className="container mx-auto">
      <form onSubmit={handleSubmit(handleFormSubmit)}>

        <input 
          {...register('name')} 
          placeholder="Digite seu nome"
          className="border mt-4 border-white p-3 text-black"/>

        <input 
          {...register('lastName')} 
          placeholder="Digite seu sobrenome"
          className="block border mt-4 border-white p-3 text-black"/>

        <input type="submit" value="Enviar" />
        
      </form>
    </div>
  )
}
