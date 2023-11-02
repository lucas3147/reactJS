# React Hook Form + Zod 

    O React Hook Form oferece um ecossistema de funcionalidade que teríamos que fazer manualmente.

    Manualmente. Todos os inputs são individuais e tratamos esses campos na validação de diferentes formas.

    No React Hook Form vamos agrupar esses campos, e todos eles vão ser comunicativos entre um e outro.

    Um exemplo de uso é que, se informarmos que o campo nome deve ser obrigatório, o Hook Form irá nos dizer quantos campos deverão

    Observação: O hook no nome se dá pelo fato de haver vários hooks (ganchos) nessa biblioteca para trabalharmos

## Instalando

    npm i react-hook-form

## Utilizando

    Chamada do hook:

        const {handleSubmit, register} = useForm<Inputs>();

        Para utilizar os recursos do hook form. Iremos usar o gancho useForm().

        Também definimos um type Inputs para mesclar a biblioteca useForm com typescript. Assim ficará mais fácil quando abordarmos os assuntos de validação de formulário

    handleSubmit:

        Controla a ação do formulário caso ele seja validado corretamente ou não

    register:

        Registra os campos inputs para fazerem parte do react hook form

    Formulário:

    const {handleSubmit, register} = useForm<Inputs>();

    const handleFormSubmit: SubmitHandler<Inputs> = (data) => {
        console.log(data);
    }

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)}>

            <input {...register('name')} />
            // Definimos nesse ponto que esse input se refere à propriedade name do tipo Inputs.
        
        </form>
    );

        // Perceba que definimos o tipo da função handleFormSubmit como SubmitHandler<Inputs>, e ela se encarrega de passar os parâmetros para a nossa função

        // handleSubmit aceita dois parâmetros que são callbacks
        // O primeiro é executado quando os inputs passam na validação
        // O segundo é executado quando os inputs não passam na validação

## Aplicando Validação

    Definir um campo obrigatório:

      No segundo parâmetro da função register passamos um objeto. Esse objeto tem várias propriedades, uma delas é o required.

    Propriedades básicas no objeto do register()

        min:
            Define o valor mínimo do campo
        
        max: 
            Define o valor máximo do campo

        required:
            Define o preenchimento obrigatório

        minLength:
            Define a quantidade mínima de caracteres

        maxLength:
            Define a quantidade máxima de caracteres

        pattern:
            Define a expressão regular daquele campo

## Lidando com erro de validação

    Podemos capturar todos os erros do formulário por campo:

        const {formState: { errors }} = useForm<Inputs>();

    Em errors terá todos os campos que estão com erros na validação

    Aplicando no formulário:

        {errors.name && 
            <p className="text-red-500">Este item precisa ser preenchido corretamente...</p>
        }

    Podemos separar os tipos de erros assim:

        {errors.name?.type === 'required' && 
            <p className="text-red-500">Item obrigatório</p> 
        }
        {errors.name?.type === 'maxLength' && 
          <p className="text-red-500">O nome precisa ter no máximo 10 caracteres</p>
        }

        // na propriedade vem o type que informa qual o tipo de erro, customizamos como quisermos

    Podemos colocar a mensagem de erro no próprio required:

        {...register('age', { required: 'Campo idade obrigatório', min: 18, max: 120 })}

        e apresentamos a informação assim:

        {errors.age && 
            <p className="text-red-500">{errors.age.message}</p>
        }