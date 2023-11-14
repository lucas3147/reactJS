# REACTJS 

  Minha biblioteca sobre o reactJS

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
