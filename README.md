# REACTJS 

  Minha biblioteca sobre o reactJS

## Iniciando um projeto com next

    Next é um framework que tem várias funcionalidades integradas para usar com o reactJS

    Para criarmos o projeto com o Next devemos colocar o seguinte comando:

      npx create-next-app

    Antes de criarmos o projeto com Next é importante que se você quiser criar o projeto com a versão
    mais nova do Next, é necessário atualiza-lo com o seguinte comando:

      npm install -g create-next-app

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
  
    As páginas no react são criadas em pastas.

  Para tornar as pastas públicas para o navegador devemos colocar o arquivo page.tsx retornando o front da  página.

  Essas páginas podem ter diferentes layouts. Basta criar o arquivo layout.tsx na pasta da sua página. Eles precisam receber o children por parâmetro.
