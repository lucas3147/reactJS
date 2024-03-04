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

    - É importante entender que o TanStackQuery possui o recurso que verifica se no nosso cache já possui os dados da requisição, para não requisitar novamente.
        É através da chave da requisição que ele verifica isso

## MONTANDO UMA API PRA USAR

    Para que o nosso código fique bagunçado. Vamos colocar as requisições do axios em um só lugar

    Para isso. Vamos fazer a nossa própria Api, que vai ser basicamente uma função que agrupa as requisições que vamos fazer.

    Foi criado um arquivo api.ts onde agrupa todas as nossas requisições. Dê uma olhada lá.

## FORMAS DE ORGANIZAR O CÓDIGO

    Além de montarmos um arquivo que agrupava as urls das apis.

    Devemos organizar ainda mais o nosso código:

    - Devemos ter um arquivo que chamam os hooks (useQuery()) do TanStackQuery para montar as queries e retornar o valor.

    - No nosso caso criamos o queries.ts na pasta utils, para agrupar esses hooks

## ENTENDENDO O QUERYFUNCTION

É um parâmetro do useQuery utilizado para retornar os dados quenecessitamos daquela requisição.

Não necessariamente podemos usar esse parâmetro para fazerrequisições, mas sim para retornar dados

<strong>
Podemos utilizar a queryFn para retornar erros
</strong>

```typescript

export const usePost = (id: number) => useQuery({
    queryKey: ['posts', id],
    queryFn: () => {
        const post = getPost(id);

        if (post) {
            return post;
        } else {
            return new Error['Post não encontrado'];
        }
    }
});

//Acessando erro

const post = usePost(10);

// Tem erro?
post.isError;

// error
post.error;

```

## STATUS DE INTERNET

Além do QueryKey e QueryFunction nos parâmetros do useQuery(), é possível também colocar o nwtworkMode

```typescript

export const usePosts = () => useQuery({ 
    networkMode: 'online',
    queryKey: ['posts'],
    queryFn: getPosts 
});

// o valor padrão é online

// Se estiver online. Ele só executa o getPosts se estiver conectado na internet.

// Se eu utilizasse outra fonte de dados que não necessita de internet, deve-se mudar o modo online para always.

```

O networkMode é um exemplo de status de internet, no qual conseguimos controlar via código.

### Exemplo de status de internet

```
Imagine que você está usando uma aplicação na web que utilize o TanStackQuery.

Se por algum momento você perder a conexão (estiver offline). O status de internet do TanStackQuery fica como paused.

Quando retornar o status fica como stale (velho), o que significa que aqueles dados que você está vendo são antigos, e é necessário uma nova requisição para atualizá-los.

Desse modo ele pega novamente os dados, apenas ligando a internet do computador.
```

## LOADING E FETCHING

Já conhecemos o status loading (isLoading)

Vamos conhecer o fetching (isFetching)

É bem sutil a diferença entre eles, mas o fetching para cada requisição que é feita, ele é ativado.

Enquanto que o loading parece ser ativado na primeira vez da requisição.

## CONTROLANDO STALETIME

Já conhecemos alguns dos status do TanStack, que é o [stale] e o [paused]

Os status são:

- fresh (fresco)

    - Enquanto estiver com esse status, o TanStack não vai fazer novas requisições

- fetching (requisitando)

- Paused

    - Quando está offline. Requisição pausada

- Stale (obsoleto/velho)

    - Quando está obsoleto, o TanStackQuery sempre vai fazer uma requisição, seja mudar de abas e voltar novamente para aplicação, ou qualquer outro momento

- Inactive (inativo)

Sabendo dos status, é possível controlar o staleTime, ou seja, controlar o tempo do status stale, para não realizar tantas requisições, sem necessidade

### EXEMPLO

Bem simples. Segue código

```typescript
export const usePosts = () => useQuery({ 
    networkMode: 'online',
    queryKey: ['posts'],
    queryFn: getPosts,
    staleTime: 2000 // Tempo em milisegundos
});

// Enquanto a aplicação rodar em menos de 2 segundos, o status query é fresh (fresco), após esse tempo, muda para stale.

// Caso você queira colocar tempo ilimitado. Você coloca uma representação do tempo infinito.

export const usePosts = () => useQuery({ 
    networkMode: 'online',
    queryKey: ['posts'],
    queryFn: getPosts,
    staleTime: Infinity // Tempo infinito
});
```

## CONFIGURAÇÕES PADRÃO NO QUERCLIENT

Podemos ter configurações globais que servem para todas as requisições dentro do provider do UseQuery.

Para o código ficar mais organizado, foi feito a seguinte reestruturação:

- Criado arquivo queryClient.ts

    - src>app>utils>queryClient.ts

Nesse arquivo terá as configurações globais para todas as requisições que acontecer dentro do provedor.

Segue código:

```typescript
import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: Infinity
        }
    }
});

export default queryClient;
```

## FAZENDO QUERY SOB DEMANDA

E se quisermos criar um botão que direpara uma requisição?

Conseguimos fazer isso. Porém o TanStackQuery tem um recurso que faz o seguinte. Ele cria a requisição no momento da renderização da página, mas não requisita, é como se ficasse desativado. E depois de clicarmos no botão ele ativa.

Propridade:

```typescript
export const usePosts = (enabled?: boolean) => useQuery({ 
    networkMode: 'online',
    queryKey: ['posts'],
    queryFn: getPosts,
    staleTime: 2 * 1000,
    enabled
});
// Controlando por uma variável por parâmetro.
```

## DADOS INICIAIS E PLACEHOLDER DE QUERY

Existem duas maneiras de definir dados iniciais, a primeira utiliza dados reais, ou seja o TanStackQuery trata esses dados relevantes, e a segunda, são dados fictícios, como um placeholdes

Definição

- Dados iniciais: 

```typescript
export const usePosts = (limit: number, start: number) => useQuery({
    queryKey: ['posts', {limit, start}],
    queryFn: () => getPosts(limit, start),
    InitialData: postsInitialData
});

// Terceiro parâmetro: InitialData

export const usePosts = (limit: number, start: number) => useQuery({
    queryKey: ['posts', {limit, start}],
    queryFn: () => getPosts(limit, start),
    placeholderData: postsInitialData
});

// Terceiro parâmetro: placeholderData
```

## PREFETCH NO TANSTACK

Prefetch significa realizar uma requisição, e guardar os dados dessa requisição, no entanto, naquele momento, não será utilizado esses dados, mas sim no momento em que acharmos mais conviniente.

<strong>
Observação:
</strong>

- A utilização do prefetch também se comporta do mesmo modo que uma requisição normal. Ou seja, a utilização status de internet (do stale e e fresh por exemplo) vão influenciar no momento da requisição.

Como realizar esse processo?

- Definindo função:

```ts
export const useUsersPrefetch = async () => {
    await queryClient.prefetchQuery({
        queryKey: ['users'],
        queryFn: getUsers
    });
}
```

- Chamdno função:

```ts
useUsersPrefetch();
```

## PEGAR O QUERYCLIENT POR HOOK

Ao invés de exportarmos o queryClient, e importar-los para os nossos arquivos, podemos usar hook que pega o queryClient que está sendo usado naquele contexto.

<strong>
CÓDIGO
</strong>

```ts
const queryClient = useQueryClient();
```

## INVALIDANDO QUERY

O efeito de invalidar uma query, faz o TanStack realizar uma nova requisição. 

```
Utilizamos esse recurso por exemplo quando enviamos informações de um formulário por exemplo, e queremos após isso, atualizar alguma lista, porém o TanStack vai ver que o status da requisição está fresh, fazendo com que ele pegue os valores do cache.
```

### Como utilizamos?

```js
export const invalidatePosts = () => {
    queryClient.invalidateQueries({
        queryKey: ['posts'], //Chaves que queremos invalidar
        exact: true //Invalida apenas chaves que são exatamente ['posts'], se tirarmos o parâmetro, ele invalida todas as chaves que possuem 'posts' no array
    });
}
```

## O QUE SÃO MUTATIONS?

Usamos mutations para realizar uma requisição quando o usuário disparar alguma ação, seja um botão, ou o carregamento de um componente...

Mutations se comporta similuar a uma query normal do TanStack, porém elas são preparadas antes de dispararmos a ação. 

Quando disparamos o gatilho que executa a mutation, ela vem acompanhada de dados, como se fosse um post mesmo.

Com a mutation você consegue enviar dados com a requisição que vai ser feita.

## FAZENDO UMA MUTATION SIMPLES

Para criar um Mutation é bem simples, basta chamar o seu hook, e após a ação do usuário chamar a função que dispara a requisição.

```ts
//Em page.tsx
//Construindo mutation
const mutation = useMutation({
  mutationFn: addPost
});

//Realizando requisição
const handleAddButton = () => {
    addMutation.mutate({
      title: 'Teste',
      body: 'Corpo de Teste',
      userId: 7
    })
}

//Em api.ts
export const addPost = async (data: Omit<Post, "id">): Promise<Post> => {
    const result = await req.post('/posts', data);
    return result.data;
}
// Omit, significa que data é um objeto de Post, sem o atributo 'id'
```