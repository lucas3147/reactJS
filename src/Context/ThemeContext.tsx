import { createContext, ReactNode, useState, useContext, useEffect } from "react";

type Theme = {
    theme: string;
    setTheme: (newTheme: string) => void;
}

const STORAGE_KEY = 'theContextKey';

const ThemeContext = createContext<Theme | null>(null);

export const ThemeProvider = ({children} : {children: ReactNode;}) => {

    const themeStorage = localStorage.getItem(STORAGE_KEY);

    const [theme, setTheme] = useState(themeStorage || 'light');

    useEffect(() => {
        if (theme === 'dark'){
            document.documentElement.classList.add(theme);
        } else {
            document.documentElement.classList.remove('dark');
        }

        localStorage.setItem(STORAGE_KEY, theme);
    }, [theme])

    return (
        <ThemeContext.Provider value={{theme, setTheme}}>
            {children}
        </ThemeContext.Provider>
    )
};

export const useTheme = () => useContext(ThemeContext);

