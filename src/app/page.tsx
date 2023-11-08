"use client"

import { Form, useForm } from "react-hook-form"

export default function Home() {
  const { register, control } = useForm();

  const handleSuccess = () => {
    alert('Deu tudo certo!');
  }

  const handleError = () => {
    alert('Deu erro!');
  }

  return (
    <div className="container mx-auto">
      
      <Form 
        control={control}
        encType="application/json"
        action={'https://jsonplaceholder.typicode.com/posts'}
        method="post"
        onSuccess={handleSuccess}
        onError={handleError}
        >
        <input {...register('title', {required: true})} className="mr-3 rounded-md border border-black p-3 text-black"/>
        <input {...register('body', {required: true})} className="mr-3 rounded-md border border-black p-3 text-black"/>
        <input {...register('userId', {required: true})} className="mr-3 rounded-md border border-black p-3 text-black"/>

        <button>Enviar</button>
      </Form>

    </div>
  )
}
