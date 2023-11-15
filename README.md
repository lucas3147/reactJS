# REACTJS 

  Minha biblioteca sobre o reactJS

  - Cada branch(ramo) pode ser um estudo sobre uma funcionalidade ou um projeto desenvolvido
  - Os commits descrevem qual foi o estudo abordado
  - Em cada um dos ramos existe um arquivo txt chamado "anotacoes.txt". Que é o resumo de cada estudo

## Iniciando um projeto com next

    Next é um framework que tem várias funcionalidades integradas para usar com o reactJS

    Para criarmos o projeto com o Next devemos colocar o seguinte comando:

      npx create-next-app

    Antes de criarmos o projeto com Next é importante que se você quiser criar o projeto com a versão
    mais nova do Next, é necessário atualiza-lo com o seguinte comando:

      npm install -g create-next-app

    Caso já tenha o next instalado, apenas atualize o create-next-app

      npm update -g create-next-app

    Dessa forma, ele atualiza o next para a sua versão mais nova, e instala ele globalmente

## Iniciando um projeto com vite

    É possível iniciar o reactJS sem nenhum framework integrado, e fazemos isso com o VITE

### Instalando o Vite:

    npm create vite

    Após a instalação e escolhido as opções desejadas, faça o seguinte no terminal

    cd react_com_vite
    npm install
    npm run dev
    
## Roteamento entre páginas

  As páginas no react são criadas em pastas.

  Para tornar as pastas públicas para o navegador devemos colocar o arquivo page.tsx retornando o front da  página.

  Essas páginas podem ter diferentes layouts. Basta criar o arquivo layout.tsx na pasta da sua página. Eles precisam receber o children por parâmetro.

  ### Primeira forma

  O Roteamento entre as páginas pode ser feito entre o Link:

    import Link from "next/link";
    
    return (
          <ul>
              {users.map(user => 
                  <Link key={user.id} href={`/users`}>
                      <li>nome: {user.nome} - Idade: {user.idade}</li>
                  </Link>
              )}
          </ul>
      )
  
  ### Segunda forma

  Usando useRouter

    Código:

    import { useRouter } from "next/navigation";
    import { useState, useEffect } from "react";
    
    const Page = () => {
      const router = useRouter();
    
      const users = [
        {id: 1, nome: 'Lucas', idade: 19},
        {id: 2, nome: 'Gustavo', idade: 18},
        {id: 3, nome: 'Josy', idade: 38}
    ]
    
      return (
          <div>
              <ul>
                  {users.map(user => 
                      <li key={user.id} onClick={() => router.push('/users')}>nome: {user.nome} - Idade: {user.idade}</li>
                  )}
              </ul>
          </div>
          
      )
    }

    É importante tomar cuidado ao importar o useRouter para vir de next/router, que não se trata de diretórios


  ### Terceira forma

  Usando redirect

    Código:

    import { redirect} from "next/navigation";
    import { useState, useEffect } from "react";
    
    const Page = () => {
    
      const [link, setLink] = useState('');
    
      useEffect(() => {
        if (link != '') {
          redirect(link)
        }
      }, [link]);
    
      const users = [
          {id: 1, nome: 'Lucas', idade: 19},
          {id: 2, nome: 'Gustavo', idade: 18},
          {id: 3, nome: 'Josy', idade: 38}
      ]
    
      return (
          <div>
              <ul>
                  {users.map(user => 
                      <li key={user.id} onClick={() => setLink('/users')}>nome: {user.nome} - Idade: {user.idade}</li>
                  )}
              </ul>
          </div>
          
      )
    }

    A função redirect não vai funcionar se fosse usada no onClick assim: onClick={() => redirect('/users/')}. Ela funciona apenas em tempo de execução do código, não pode ser guardada como um callback.

    Por esse motivo, usei um useEffect sempre o link for alterado. 

    Importante:
    
      Ela não guarda as rotas anteriores no cache do navegador

## Agrupando rotas

  Imagine que você precisa de um layout para duas páginas distintas. Você poderia criar a seguinte estrutura de pastas:

      Auth

        SignIn

        SigUp

        Layout.tsx

    Para acessar essa rota ficaria assim: domainname.com/auth/signin ou domainname.com/auth/signup

    Funciona, mas e se quisermos tirar o caminho auth/ da rota, poderíamos? Sim. Basta agrupar as rotas.

    Para agrupar rotas apenas nomeie a pasta que você quer agrupar com o mesmo nome porém abrindo e fechando parênteses:

        (Auth)

          SignIn
  
          SigUp
  
          Layout.tsx

    Rota: domainname.com/signin ou domainname.com/signup

## Pastas privadas

  Para criarmos pastas privadas no nosso projeto. Podemos usar o underline antes do nome da pasta:

      _helpers

      Geralmente essas pastas são usadas para códigos auxiliares na nossa aplicação.

## Rotas dinâmicas

  Também podemos criar pastas que irão formar rotas dinâmicas para a nossa aplicação. Para isso crie a pasta com o nome entre colchetes:

    [name]

    Utilizadas rotas onde as informações das páginas irão mudar conforme os dados da url.

  O nome da pasta vai conforme as requisições do usuário. Conseguimos pegar isso no código da seguinte forma:

    type Props = {
      params : {
        name: string
      }
    }

    // a propriedade 'name' do params precisa ter o mesmo nome da pasta [name] sem os colchetes

    const Page = ({params}: Props) => {
      return (
        <div>
          Página do {params.name}
        </div>
      )
    }

    export default Page;

  Em outro caso... E se no nosso site tivermos uma grande quantidade de rotas dinâmicas, e você queira uma pasta apenas que sirva de base para todas, assim, como poderíamos pegar essas informações da rota que estamos criando? 

  Esse caso é mais difícil de acontecer, mas é possível. Temos a seguinte estrutura de rotas:

    /shop/roupas
    /shop/roupas/shorts
    /shop/roupas/shorts/branco
    /shop/roupas/shorts/preto

  Todos eles são dinâmicos, as páginas mudam conforme a url também muda
  Podemos pegar todos eles em uma pasta apenas da seguinte forma. Nomeando a pasta que receberá os dados dinâmicos com abre e fecha colchetes porém três pontos antes do nome da pasta:

    /shop/[...roupas]/page.tsx

  Pegando os dados:

    type Props = {
      params : {
        roupas: string[]
      }
    }

    const Page = ({params}: Props) => {
      return (
        <div>
          Página do {params.roupas.join(', ')}
        </div>
      )
    }

    // O join transforma o array em uma string, separando os valores por uma vírgula...

    export default Page;

## Rotas dinamicamente estáticas

  O reactJS tem dois ambientes finais. O ambiente de desenvolvimento e o ambiente de produção.

  - O ambiente de desenvolvimento fica constantemente renderizando as páginas conforme modificamos o código.
  - Já o ambiente de produção permanece o mesmo, esse ambiente apresenta mais velocidade, por não ter que ficar se renderizando a cada modificação.

     O ambiente de produção passa por um processo de compilação, para entendermos melhor o que acontece, podemos imaginar que na nossa página, ela requisita uma api e apresenta o resultado de usuários por exemplo. Todo esse processo é feito no servidor, gerando a página pronta para o navegador, sem ter a necessidade de uma renderização feita no navegador como acontece no ambiente de desenvolvimento.

  Rotas dinamicamente estáticas são rotas guardadas e acessadas no momento de build (compilação) no ambiente de produção.

  Podemos informar para o servidor que, no processo de build, ele acesse algumas páginas da nossa aplicação para reduzir o tempo de velocidade carregado entre uma página e outra, geralmente esse recurso é utilizado em produtos de um e-commerce mais vendidos.

    ** Esse recurso só irá funcionar no ambiente de produção **

  Código:

    import { Post } from "@/types/Post";

    type Props = {
      params: {
        postId: string;
      }
    }

    const Page = async ({ params } : Props) => {
      const postRequest = await fetch(`[https://](https://jsonplaceholder.typicode.com/posts)https://jsonplaceholder.typicode.com/posts/${params.postId}`)
      const post: Post = await postRequest.json();

      if (!post.id) return <div>Página não encontrada</div>

      return (
        <div>
          <div className="text-center"></div>
          <h1 className="text-3xl uppercase my-3">{post.title}</h1>
          <p>{post.body}</p>
        </div>
      );
    }

    export default Page;

    export const generateStaticParams = async () => {
      const postReq = await fetch("https://jsonplaceholder.typicode.com/posts");
      const posts: Post[] = await postReq.json();

      return posts.map(post => ({
        postId: post.id.toString()
      }))
    }

    // Aqui estamos dizendo ao servidor para acessar essas rotas e guardar esses dados quando ele estiver compilando o projeto. Recebemos todos os dados dos posts. e retornarmos todos os parâmetros que ele vai precisar para acessar a rota
