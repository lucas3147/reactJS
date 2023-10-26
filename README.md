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