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

