import { ReactNode, createContext, useState } from "react";

type CountContextType = {
    onlineCount: number;
    setOnlineCount: (n: number) => void;
}

type Props = {
    children: ReactNode;
}

export const CountContext = createContext<CountContextType | null>(null);

export const CountProvider = ({ children }: Props) => {
    const [onlineCount, setOnlineCount] = useState(100);

    return (
        <div className="container mx-auto">
            <CountContext.Provider value={{onlineCount, setOnlineCount}}>
                {children}
            </CountContext.Provider>
        </div>
    )
}