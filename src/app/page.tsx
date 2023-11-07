"use client"

import { Input } from '@mui/material';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

export default function Home() {

  const {
    control,
    handleSubmit
  } = useForm<SignUpForm>();

  const handleFormSubmit: SubmitHandler<SignUpForm> = (data) => {
    console.log(data);
  }

  return (
    <div className="container mx-auto">
      <form onSubmit={handleSubmit(handleFormSubmit)}>

        <Controller 
          control={control}
          name="name"
          rules={{required: true, minLength: 2, maxLength: 20}}
          render={({field, fieldState}) => 
            <Input 
              {...field} 
              error={fieldState.invalid}
              style={{backgroundColor: 'white'}}
            />
          }
        />

        <Controller 
          control={control}
          name="lastName"
          render={({field}) => 
            <Input 
              {...field} 
              style={{backgroundColor: 'white'}} 
            />}
        />

        <Controller 
          control={control}
          name="age"
          rules={{required: true, min: 18}}
          render={({field, fieldState}) => 
            <Input 
              {...field} 
              error={fieldState.invalid}
              style={{backgroundColor: 'white'}} 
            />}
        />
        
        <input className="mt-4" type="submit" value="Enviar" />
        
      </form>
    </div>
  )
}
