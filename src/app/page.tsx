"use client"

import { Input } from '@/components/Input';
import { SubmitHandler, useForm } from 'react-hook-form';

export default function Home() {

  const {
    control,
    handleSubmit,
    setValue
  } = useForm<SignUpForm>();

  const handleFormSubmit: SubmitHandler<SignUpForm> = (data) => {
    console.log(data);
  }

  return (
    <div className="container mx-auto">
      <form onSubmit={handleSubmit(handleFormSubmit)}>

        <Input
          control={control}
          name='name'
          rules={{required: true,  minLength: 2, maxLength: 20}}
        />

        <Input
          control={control}
          name='lastName'
        />  

        <Input
          control={control}
          name='age'
          rules={{ required: 'Campo idade obrigatório', min: 18, max: 120 }}
        /> 

        <input className="mt-4" type="submit" value="Enviar" />
        
      </form>

      <button className="mt-4" onClick={() => setValue('name', 'Lucas')}>Definir meu nome</button>
    </div>
  )
}
