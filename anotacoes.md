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