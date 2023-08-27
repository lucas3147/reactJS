import { LoggedUserContext } from "@/Contexts/LoggerUser"
import { useContext } from "react";

export const Header = () => {

    const loggedUserCtx = useContext(LoggedUserContext);

    const handleLogout = () => {
        loggedUserCtx?.setName('');
    }

    return (
        <header>
            <h1 className="text-3xl">Título da página</h1>
            {loggedUserCtx?.name && 
                <>
                    <p>Usuário logado: {loggedUserCtx?.name}</p>
                    <button onClick={handleLogout}>Sair</button>
                </>
            }
            {!loggedUserCtx || loggedUserCtx?.name === '' &&
                <p>Usuário deslogado</p>
            }
        </header>
    )
}