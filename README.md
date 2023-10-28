# TanStack Query (Conehcido como React Query)

É um intermediário entre a aplicação e a requisição. Podendo ser feita com o fetch ou o axios.

Mas por que eu preciso de um intermediário entre eles para fazer a requisição?

## Funções do TanStack Query

    - Ele ajuda no fetching da requisição
    - Ele faz o cache da requisição
    - Ele sincroniza e atualiza dados de State da sua aplicação

## Exemplo de uso

    - Imagine que em uma tela fazemos uma requisição para pegar os usuários de uma aplicação
    - Em um certo momento, você volta para essa tela, e faz outra requisição para pegar os usuários novamente
    - O TanStack irá perceber que já foi feito uma mesma requisição para essa url por causa do cache armazenado
    - O TanStack Query vai pegar os dados do cache ao invés de requisitar novamente a Api.
    - Caso os dados estejam desatualizados, o TanStack irá perceber e requisitar a Api para atualizar os dados.

    - Podemos usar ele também para manipularmos os dados recebidos sempre que requistarmos

## Instalando e configurando o provider

    - npm i @tanstack/react-query
    - Se você estiver com react puro como o Vite. Devemos colocar ele no primeiro compontente iniciado. Geramente é o MyApp.
    - No Next colocamos ele no layout.tsx

## TanStack DevTools

    - É uma biblioteca opcional, que vai adicionar um detalhe na nossa aplicação, para que quando estivermos desenvolvendo nós termos mais dados do que está acontecendo por de baixo dos panos no nosso TanStackQuery.

    - É importante também que você coloque ele como foi feito no DevTools, no ponto mais alto da aplicação, ou então, até dentro do próprio provider.tsx

    - Ele simplesmente é um debugador do TanStack Query

### Instalação TanStack DevTools

    - npm i @tanstack/react-query-devtools

### Atributos

    - InitialIsOpen: Significa que ao ser inicializada, ela não vai inicializar aberta, com as configurações maximizadas
    - position: Define a posição do botão (valores: "top-left")
    - panelPosition: Define a posição do painel (valores: "right")

## FAZENDO UMA QUERY

    Para realizar uma requisição devemos definir o hook (gancho) do TanStack

    const query = useQuery({
        queryKey: ['posts'],
        queryFn: async (): Promise<Post[]> =>{
        const result = await axios.get('https://jsonplaceholder.typicode.com/posts');
        return result.data;
        }
    });

    - Ele possui algumas configurações:

    queryKey: define a chave de acesso para executar a função

    queryFn: define uma função onde fica a requisição da nossa Api. Essa função deve retornar os dados da chamada
