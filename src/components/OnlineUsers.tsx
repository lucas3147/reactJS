import { CountContext } from "@/Contexts/CountContext";
import { useContext } from "react";


export const OnlineUsers = () => {

    const countCtx = useContext(CountContext)

    const handleBanAll = () => {
        countCtx?.setOnlineCount(0);
    }

    return (
        <>
            <p>Usuários Online: {countCtx?.onlineCount}</p>
            <button onClick={handleBanAll}>Banir todo mundo</button>
        </>
       
    )
}