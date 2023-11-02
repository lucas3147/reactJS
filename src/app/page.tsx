"use client"

import { SubmitHandler, useForm } from 'react-hook-form';

type Inputs = {
  name: string;
  lastName: string;
  age: number;
}

export default function Home() {

  const {handleSubmit, register, formState: { errors }} = useForm<Inputs>();

  const handleFormSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  }

  return (
    <div className="container mx-auto">
      <form onSubmit={handleSubmit(handleFormSubmit)}>

        <input 
          {...register('name', { required: true, maxLength: 10 })} 
          placeholder="Digite seu nome"
          className="border mt-4 border-white p-3 text-black"/>
          {errors.name?.type === 'required' && 
            <p className="text-red-500">Campo obrigatório</p> 
          }
          {errors.name?.type === 'maxLength' && 
            <p className="text-red-500">O nome precisa ter no máximo 10 caracteres</p>
          }

        <input 
          {...register('lastName')} 
          placeholder="Digite seu sobrenome"
          className="block border mt-4 border-white p-3 text-black"/>
          
          
        <input 
          {...register('age', { required: 'Campo idade obrigatório', min: 18, max: 120 })} 
          placeholder="Digite sua idade"
          type='number'
          className="block border mt-4 border-white p-3 text-black"/>
          {errors.age && 
            <p className="text-red-500">{errors.age.message}</p>
          }

        <input className="mt-4" type="submit" value="Enviar" />
        
      </form>
    </div>
  )
}
